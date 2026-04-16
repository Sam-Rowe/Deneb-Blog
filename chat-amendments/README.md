# Chat Amendments

This folder captures conversations between the author and AI during the editorial process for blog posts.

Each file represents a single chat session and is generated automatically by [VS Code agent hooks](https://code.visualstudio.com/docs/copilot/customization/hooks).

## How it works

Two hooks in `.github/hooks/chat-amendments.json` fire during chat sessions:

| Hook | Event | Purpose |
|------|-------|---------|
| **Pre** | `UserPromptSubmit` | Logs each user prompt as it is submitted |
| **Post** | `Stop` | Appends the full conversation transcript when the session ends |

## File naming

Files are named `<date>_<session-id>.md`, for example `2026-04-16_a1b2c3d4.md`.

## Usage

Review these files alongside their corresponding blog posts to see the narrative of human input and AI output that shaped each piece of content.
