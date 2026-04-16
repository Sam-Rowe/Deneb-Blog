#!/usr/bin/env python3
"""UserPromptSubmit hook — logs each user prompt to chat-amendments/<date>_<session>.md."""
import json
import os
import sys
from datetime import datetime, timezone


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, EOFError):
        sys.exit(0)

    session_id = data.get("sessionId", "unknown")
    timestamp = data.get("timestamp", datetime.now(timezone.utc).isoformat())
    prompt = data.get("prompt", "")
    cwd = data.get("cwd", os.getcwd())

    if not prompt:
        print(json.dumps({"continue": True}))
        sys.exit(0)

    short_id = session_id[:8] if len(session_id) > 8 else session_id

    try:
        dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00"))
    except ValueError:
        dt = datetime.now(timezone.utc)

    date_str = dt.strftime("%Y-%m-%d")
    time_str = dt.strftime("%H:%M:%S")

    amendments_dir = os.path.join(cwd, "chat-amendments")
    os.makedirs(amendments_dir, exist_ok=True)

    filename = f"{date_str}_{short_id}.md"
    filepath = os.path.join(amendments_dir, filename)

    is_new = not os.path.exists(filepath)

    with open(filepath, "a") as f:
        if is_new:
            f.write(f"# Chat Amendments — {date_str}\n\n")
            f.write(f"**Session:** `{session_id}`\n\n")
            f.write("---\n\n")

        f.write(f"### 🧑 User — {time_str}\n\n")
        f.write(f"{prompt}\n\n")

    print(json.dumps({"continue": True}))


if __name__ == "__main__":
    main()
