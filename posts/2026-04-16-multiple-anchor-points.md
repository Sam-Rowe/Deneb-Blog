# Multiple Anchor Points: How to Ground AI Agents and Get Better Code

Published: 2025-04-16

AI agents write code confidently. That confidence is not always warranted. The gap between a plausible-looking function and one that actually fits your system is where most AI-assisted development goes wrong — and it is almost never the model's fault. It is a context problem.

Give an AI agent one reference point and it will produce something generic. Give it two and you get a straight line between them — closer, but still approximate. Give it three or more and something changes: the agent can triangulate. It can identify contradictions, fill gaps, and produce output that is genuinely grounded in your system rather than in a statistical average of every system it has ever seen.

This is the idea behind multiple anchor points — and once you understand it, it changes how you work with AI agents at every stage of the SDLC (Software Development Life Cycle).

## The Geometry of Context

Think about how you navigate in three dimensions. Two fixed points give you a line — useful, but it does not tell you where you actually are. A third point breaks the ambiguity. A fourth eliminates it further. This is how GPS works. This is how sonar works. And this, more or less, is how AI agents produce better output when given richer context.

In software development, every artefact you create is a potential anchor point. The question is which ones you choose to share with the agent, and in what combination.

> Insight The single most common mistake when using AI agents for code generation is treating them like a search engine — asking a question and hoping for a perfect answer. They are not search engines. They are completion engines. What you put in shapes what comes out far more than the model's raw capability. Confidence: High

## What Counts as an Anchor Point?

An anchor point is any artefact that constrains the solution space. It does not have to be code. It does not have to be complete. It just has to be specific — specific enough that the agent can use it to rule things out as well as rule things in.

### Unit Tests

A well-written test suite is one of the most powerful anchors available. Tests are deterministic — they pass or they fail, every time, with no ambiguity. That determinism directly counteracts the non-deterministic nature of the underlying large language model that powers the agent. The model may produce slightly different code on each run, but a test suite does not — A test suite gives a binary signal about correctness. When you give an AI agent your existing tests alongside a new requirement, you are not just describing what you want — you are giving the agent a repeatable, machine-verifiable standard that holds its output accountable regardless of the probabilistic path it took to get there. ( being the eternal optimist I am over simplifying and ignoring flaky tests that may fail non-deterministically, but the point still stands that tests are a much more reliable anchor than prose descriptions of behaviour )

Even a small set of unit tests changes the character of generated code dramatically. The agent stops producing plausible generalities and starts producing something that has to pass specific assertions. That constraint is immensely valuable.

### Existing Code and Codebases

Sharing relevant parts of your codebase — especially for migrations and refactors — gives the agent a concrete style reference. If guided too, it can match your naming conventions, your error handling patterns, your abstractions. Without this, the agent defaults to whatever pattern is most common in its training data, which may be perfectly reasonable code, but not *your* code.

For large migrations, sharing the old implementation alongside the new interface is particularly effective. The agent can see what the code does, what it needs to become, and what constraints it has to respect throughout the transition.

### Documentation

Architecture decision records (ADRs), README files, runbooks, and design documents all encode context that does not appear in code. Why a technology was chosen. What alternatives were rejected and why. What constraints the team is working under. This kind of context prevents the agent from suggesting perfectly valid solutions that are wrong for your situation.

### API Contracts

OpenAPI specifications, GraphQL schemas, Protobuf definitions — these are exact, machine-readable descriptions of interfaces. Like tests, they offer a deterministic way to measure whether generated code is valid. Either the code conforms to the contract it must expose, or it correctly consumes the contract it must connect to — there is no grey area. That binary pass-or-fail quality makes API contracts one of the strongest anchors you can provide, because the agent's output can be validated against them mechanically rather than judged subjectively.

API contracts are particularly effective anchor points because they are already structured in a way agents understand well. An OpenAPI spec is not prose — it is a schema, and schemas are close to what the agent natively reasons about. When generating code that interacts with an API, sharing the contract is the difference between getting something that looks right and getting something that will actually run without modification.

### Coding Standards and Style Guides

Your team's conventions — whether they live in a linting configuration, a contributing guide, or an internal wiki — define the rules the agent needs to follow. Without them, the agent will write valid code that fails your code review for purely stylistic reasons. With them, the gap between generated code and mergeable code closes significantly.

> Insight Linting configuration files are underused anchor points. An ESLint config, a Prettier config, a Checkstyle file — these are precise, structured descriptions of your style requirements. Agents can read them directly and apply them. There is no need to describe your preferences in prose when you already have them encoded. Confidence: High

### Planning Documentation

Tickets, user stories, acceptance criteria, and technical design documents carry intent that code alone cannot express. Sharing a well-written ticket alongside the implementation task gives the agent the "why" behind the "what". That context matters most when there are multiple reasonable ways to solve a problem — the agent can use the intent to choose between them rather than picking arbitrarily.

### User Feedback and Bug Reports

When fixing bugs or improving features, raw user feedback and bug reports are valuable anchor points. They describe the actual failure mode, not an abstraction of it. Sharing a well-documented bug report alongside the relevant code gives the agent a concrete problem to solve rather than a hypothetical one.

### Usage Data and Observability

Logs, traces, metrics, and error rates tell the agent how the system actually behaves in production — not how it was designed to behave. This is particularly useful for performance work and reliability improvements. A slow query plan, a spike in error rates, a flame graph — these anchor the agent in the real system rather than the idealised one.

## The Combination is What Matters

Each anchor point narrows the solution space from a different angle. Unit tests constrain behaviour. Existing code constrains style. API contracts constrain interfaces. Planning documents constrain intent. The power of the approach comes from combining them — not from any one artefact in isolation.

A practical way to think about this: before handing a task to an AI agent, ask yourself what artefacts exist in your system that are relevant to this change. Gather them. Share them. The overhead is small and the improvement in output quality is significant.

## Getting Started

You do not need to change your tools or your workflow dramatically to apply this. Start with the artefacts you already have:

- **New feature?** Share the ticket, the relevant existing code, and any related tests. Three anchor points, immediately.
- **Bug fix?** Share the bug report, the failing test (or write one first), and the code under investigation.
- **Migration?** Share the old implementation, the new interface contract, and a documentation of expected behaviour.
- **API integration?** Share the OpenAPI spec, a usage example from the existing codebase, and the error handling conventions your team follows.
- **Performance improvement?** Share the slow code, the relevant metrics or trace, and the performance budget or target.

In each case, you are giving the agent a geometry to work within — not just a task to complete. That difference in framing consistently produces better results than any amount of prompt engineering applied to a single input.

> Insight Writing the failing test before generating the implementation is one of the highest-leverage habits in AI-assisted development. It gives the agent a verifiable target, keeps the human in control of the requirements, and makes the generated code immediately testable. Test-driven development was always good practice. With AI agents, it is a force multiplier. Confidence: High

## The Deeper Point

There is a subtler benefit to the multiple anchor points approach that is worth naming explicitly: it forces clarity. To gather your anchor points, you have to know what the task actually requires. You have to have a test that defines success. You have to understand the existing code well enough to find the relevant parts. You have to read the ticket carefully enough to extract the intent.

This is not overhead — it is the work. The AI agent does not remove the need to understand your system. It amplifies what you already understand. The more precisely you can define the problem, the more precisely the agent can help you solve it. Multiple anchor points are as much a thinking discipline as a prompting technique. Just as self reflection is a good habit for understanding your own behaviour, spending the time to understand the product you are trying to build is a good habit for guiding AI agents.

Ground the agent. Ground yourself. The output improves for both reasons.

Tags: AI, SDLC, Agents
