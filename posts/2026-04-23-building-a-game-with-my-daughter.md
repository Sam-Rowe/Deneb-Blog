# Building a Simple Game With a 9-Year-Old Using AI

Published: 2026-04-23

My daughter is nine. Despite having done an hour of code (several times) and many hours playing with scratch, she doesn't know any programming languages in the traditional sense. Neither does she need to; and possibly might never need too? What she does know is what she enjoys, what she wants a game to do and look like, and how to explain what is wrong with a game that doesn't quite work (yet). It turns out that is (almost) all you need with AI coding tools to write a simple platformer game.

We spent a few hours together building [HDTwist](https://sam-rowe.github.io/HDTwist/) a simple browser game, now live on GitHub Pages and [open source on GitHub](https://github.com/Sam-Rowe/HDTwist). GitHub Copilot did the dev work. We did the thinking and explaining.

This post is about what that process actually looked like, and why I think it matters for how we talk about AI and creativity; especially with the people who will grow up assuming AI assistance is just part of how things get made.

## Start With a Conversation, Not a Prompt

The first thing we did was not open a code editor. We talked to each other about the game. What kind of game did she want? What should it feel like? What makes a game visually appealing? What rules would make it interesting? What characters would it have? What would the player do?

My daughter had opinions, strong ones. She knew she wanted something dark and moody but becoming colourful. She knew what she liked about the games she already played. She could describe with real specificity what she wanted the characters to do and be like.

The planning conversation produced something concrete: a short, clear description of what the game should do, how it should behave, and what success looked like. That document became the first anchor point for everything that followed. It is the same principle as any good software development life cycle (SDLC) — understand the requirement before you build the thing.

## Letting Copilot Build the First Version

With the design agreed, we handed the brief to Copilot and let it build. We did not micro-manage every line. We gave it the plan, pointed it at a blank repository, and asked it to produce a working first version.

It did. The game ran. It looked roughly like what we had described. And it had bugs.

This is the moment that usually gets glossed over in AI demos: the first version is never the final version. That is not a failure — it is how software works. The difference here was what came next.

## The Bug-Fixing Cycle

Rather than diving straight back into the editor, we did something more structured. We played the game. My daughter played it with no expectations just for fun. She found things she didn't like that were not as she expected. Behaviours that were technically correct but felt wrong and things that just didn't work.

We turned each problem into a GitHub Issue. Short, specific, and with enough context to be actionable: what was expected, what actually happened, what the fix should probably look like.

> Insight Writing issues before jumping to fixes is one of the most underrated habits in software development, and AI makes it even more valuable. A well-written issue is an anchor point. It tells the agent exactly what the problem is, what the expected behaviour is, and what constraints any fix must respect. Agents that receive vague instructions produce vague fixes. Agents that receive structured bug reports produce targeted ones. Confidence: High

We then used Copilot to work through each issue, and Copilot Code Review to catch anything we might have introduced in the process. This tight loop — play, observe, write, fix, review — is not exotic. It is just a good engineering cycle, applied to a game built by a nine-year-old and her dad on a Saturday afternoon.

## What We Ended Up With

HDTwist is not a complex game. It is not trying to be. It is a browser-based game that works (mostly), that we are proud of, that is live for anyone to play and fork, and that we built together in a few hours without either of us needing to understand every line of JavaScript involved.

My daughter's contribution was not trivial. She defined the requirements. She did the acceptance testing. She caught bugs that code review would not catch, because they were bugs in the game play rather than bugs of logic. She wrote half the issues. She made decisions about the game that shaped what Copilot built. Most importantly, she had fun and is very proud of the game we made together. That is the real win here. The fact that we built something together is a bonus, but the fact that she had fun and is proud of what we made is the real point.

In any honest accounting of who built HDTwist, she is on the list.

## What This Experiment Demonstrates

A few things that I think are worth naming clearly:

- **AI lowers the floor, not just the ceiling.** You do not need programming experience to participate in building software. You need ideas, judgment, and the ability to describe what you want. Those are learnable, human skills.
- **Process still matters.** We did not just ask Copilot to build a game. We planned, we structured feedback, we wrote issues, we reviewed. The AI was faster than doing it manually, but the shape of the work was recognisably the same.
- **The artefacts are real.** The game is real. The repository is real. The issues are real. The code review comments are real. None of that evaporates when the session ends.
- **This is reproducible.** We did not have access to anything special. GitHub Copilot, a browser, and a few hours. That is the entire stack. This cost us copilot credits (PRU's) but the hosting on GitHub pages is free!

## What Would You Build?

That is the question I keep coming back to. Not "what could AI build?" — that framing puts the agent at the centre and leaves the human as a spectator. The better question is what you have always wanted to build but haven't, because the implementation felt too far out of reach.

A tool for something you do at work. A small utility for something you find annoying. A game. An experiment. Something silly, or something genuinely useful. The idea does not need to be large. It needs to be yours.

The loop is simple: plan it, build it, play it, fix it. Do that a few times and you have something real. Do it with someone who has never written code in their life, and you might be surprised by what they catch that you would have missed.

My daughter was not impressed by the technology. She was impressed by the game we made. That distinction matters more than it might seem.

Tags: AI, GitHub Copilot, Games, SDLC
