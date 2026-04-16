#!/usr/bin/env python3
"""Stop hook — captures the full conversation transcript to chat-amendments/<date>_<session>.md."""
import json
import os
import subprocess
import sys
from datetime import datetime, timezone


def get_git_hash(cwd):
    """Return the short git commit hash, or 'unknown' on failure."""
    try:
        result = subprocess.run(
            ["git", "rev-parse", "--short", "HEAD"],
            capture_output=True, text=True, cwd=cwd, timeout=5
        )
        return result.stdout.strip() if result.returncode == 0 else "unknown"
    except (OSError, subprocess.TimeoutExpired):
        return "unknown"


def format_transcript(transcript):
    """Convert a transcript structure into readable Markdown."""
    lines = []

    if isinstance(transcript, list):
        for entry in transcript:
            role = entry.get("role", "unknown")
            content = entry.get("content", "")

            if isinstance(content, list):
                text_parts = [
                    p.get("text", "")
                    for p in content
                    if isinstance(p, dict) and "text" in p
                ]
                content = "\n".join(text_parts)

            if not content or not content.strip():
                continue

            label = "🧑 User" if role == "user" else "🤖 Assistant"
            lines.append(f"### {label}\n\n{content.strip()}\n")

        return "\n".join(lines)

    # Fallback: dump raw JSON
    return f"```json\n{json.dumps(transcript, indent=2)}\n```"


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    session_id = data.get("sessionId", "unknown")
    timestamp = data.get("timestamp", datetime.now(timezone.utc).isoformat())
    transcript_path = data.get("transcript_path", "")
    cwd = data.get("cwd", os.getcwd())

    short_id = session_id[:8] if len(session_id) > 8 else session_id

    try:
        dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
    except ValueError:
        dt = datetime.now(timezone.utc)

    date_str = dt.strftime("%Y-%m-%d")

    amendments_dir = os.path.join(cwd, "chat-amendments")
    os.makedirs(amendments_dir, exist_ok=True)

    filename = f"{date_str}_{short_id}.md"
    filepath = os.path.join(amendments_dir, filename)

    # Read transcript if available
    transcript = None
    if transcript_path and os.path.exists(transcript_path):
        try:
            with open(transcript_path, "r") as f:
                transcript = json.load(f)
        except (json.JSONDecodeError, OSError):
            transcript = None

    commit_hash = get_git_hash(cwd)

    with open(filepath, "a") as f:
        f.write("---\n\n")
        f.write(f"## Full Conversation Transcript (`{commit_hash}`)\n\n")

        if transcript:
            f.write(format_transcript(transcript))
        else:
            f.write("*No transcript was available for this session.*\n\n")
            if transcript_path:
                f.write(f"*Expected at:* `{transcript_path}`\n\n")

        f.write(f"\n---\n\n*Session `{session_id}` ended at {timestamp}*\n")

    print(json.dumps({"continue": True}))


if __name__ == "__main__":
    main()
