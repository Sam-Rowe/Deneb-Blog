# Boundaries First: How Software Architecture Shapes What AI Agents Can Deliver

Published: 2026-04-18

Most software was not designed with AI agents in mind. It was designed for humans — humans can intuit implicit context, who can navigate sprawling inheritance trees because of an unwritten logical pattern, who can intuit the side effects of a change across a tangled codebase because they wrote it. AI agents cannot do this reliably. The context window of AI has a hard ceiling (thought that is continuing to increase) and the larger the context the more hallucinations occur. Implicit coupling is invisible to AI. And the bigger the unit of change, the higher the risk of unintended consequences that the AI agent has no way to predict with reliability.

This leads to a hypothesis worth testing: software architectures built around small, deterministic, contract-bound units are significantly better suited to AI-assisted delivery than architectures built around larger, stateful, implicitly coupled components. Better not in an abstract sense, but in the ways that matter operationally — faster cycle times, fewer regressions, higher maintainability under change, and more predictable outcomes when an agent is asked to extend or modify the system.

This post lays out the argument, acknowledges the genuine trade-offs, and invites you to design your own experiment.

## What "Better" Means Here

Before the argument, a definition. When this post claims one architectural approach is better for AI-assisted delivery, it means better across a specific set of dimensions:

- **Speed and cycle time:** how quickly a change can be designed, implemented, reviewed, and shipped.
- **Predictability:** whether the system behaves as expected after a change is made — not just in tests, but in production.
- **Defect rate:** fewer regressions, fewer unintended consequences, fewer incidents triggered by changes that looked safe.
- **Maintainability under AI-assisted change:** when a new capability is added using an agent, the rest of the system should not break in unexpected ways.
- **Recoverability:** when something does go wrong, how quickly the team can identify the source and restore correct behaviour.

These are not new goals. They are the outcomes any good software delivery practice aims for. What changes with AI agents is the mechanism. The question is which architectural patterns make those mechanisms more reliable.

## The Core Problem: Context Has a Ceiling

An AI agent's ability to reason accurately about a codebase is bounded by what it can see and test. Context windows have grown significantly in recent years, but larger windows do not solve the problem — they defer it. In practice, the quality of reasoning degrades as the amount of context increases, especially when that context contains implicit relationships that are not explicitly declared anywhere and a lack of determinism in the code that makes it harder for the agent to infer the correct behaviour.

A monolithic application with shared state, deep inheritance hierarchies, and global configuration creates exactly this problem. The agent can read the function it is asked to change. It cannot reliably infer every caller, every side effect, every downstream dependency that could be affected. And it will not always tell you when it is uncertain as we have all seen in practice where AI Agents confidently produce incorrect output.

> Insight Larger context windows still break down in practice when the underlying coupling is implicit. The problem is not always how much the agent can read — it is whether what it reads is sufficient to reason correctly. Explicit contracts change that equation. Confidence: High

## The Case for Boundaries

A different architectural style changes the equation. When software is decomposed into small, independently operable units — functions, services, or packages — with explicit input/output contracts between them, the agent's task becomes bounded in a way that supports reliable output.

Each unit has a defined surface area. The agent can understand what the unit does, what it consumes, and what it must produce, without needing to understand the entire system. The contract is the boundary. Everything outside that boundary is irrelevant to the correctness of this unit, and the agent does not need to know about it.

This is the principle at work in systems like AWS Lambda functions or Azure Functions: small, independently deployable units with explicit triggers and outputs. It is also the principle behind Unix-style ecosystems of independent tools — each one does one thing, honours a shared interface convention, and composes cleanly with others. The composed system is reliable not because every component knows about every other, but because each one honours its contract at the boundary.

## Zooming In and Zooming Out

One of the most useful ways to frame this kind of architecture is the ability to zoom in and out — to move between the detail of a single function and the wider shape of the system without losing clarity at either level.

In a contract-driven, decomposed system, this is structurally possible. Zoom in to a single unit: you see its inputs, its outputs, its tests, its contract. Zoom out to the system level: you see how units compose, what flows between them, where the integration points are. The two views are consistent. Nothing important lives implicit but unarticulated in the gaps between them.

In a large monolith with implicit coupling, zooming out loses detail in ways that matter. There are behaviours that only emerge when specific combinations of components interact. There are side effects that are only visible at the module level. An agent working at the function level cannot see them. An agent working at the system level cannot reason about the detail. The zoom levels are incoherent.

## Functional Styles Versus Object-Oriented Programming

The architectural argument extends to language and paradigm, though here the case is logical rather than empirical — the evidence is still accumulating.

Functional programming styles tend to create harder structural barriers around separation. Functions are pure, or close to it. Side effects are explicit and pushed to the edges. State is not shared implicitly. An agent asked to modify a function in a functional codebase can, in many cases, reason about that function in near-isolation. The type system — especially in strongly-typed functional languages — makes the contract explicit at the language level rather than in documentation.

Object-oriented programming (OOP) is not inherently worse, but it enables patterns that are harder for agents to navigate. Inheritance trees require the agent to understand superclass behaviour. Mutable shared state means a change in one place has non-local effects. The abstractions that make OOP powerful for human reasoning — encapsulation, polymorphism, inheritance — create implicit context that agents must reason about without explicit code to tweak the probabilities of the next token being correct.

The practical implication is not "rewrite everything in Haskell." It is that within OOP codebases, preferring immutable data, explicit interfaces, and small classes with single responsibilities moves the design closer to the properties that make functional code agent-friendly. The paradigm matters less than the discipline with which its constraints are applied.

> Insight The strongest predictor of how well an agent performs on a change is not the language, the framework, or the model — it is the clarity and explicitness of the boundary around the unit being changed. A well-bounded class in Java is easier for an agent than a loosely-bounded function in Haskell. Confidence: Medium

## A Concrete Scenario

Consider two teams asked to add a new validation rule to their order processing pipeline. One team has a monolithic service — the validation logic is spread across several classes, shares state with the persistence layer, and has test coverage that is partial and integration-heavy.

The other team has decomposed the pipeline into independently deployable functions. Validation is a single function with a clear input schema, a clear output schema, and a suite of unit tests against those schemas. The function knows nothing about persistence. Persistence knows nothing about validation.

Ask an AI agent to implement the new validation rule on both systems. In the first system, the agent must infer which classes are involved, understand the implicit state dependencies, and produce a change that is correct across a surface it cannot fully see. In the second, the agent gets the function, the input schema, the output schema, and the existing tests. The task is bounded. The correctness criteria are explicit. The generated code can be validated against the contract deterministically.

This is not a theoretical difference. It is the difference between a change that takes a careful human review to verify and one that a test suite can validate automatically.

## Acknowledging the Trade-offs

Over-decomposition is a real failure mode. A system fragmented into hundreds of nano-functions with no coherent model of the domain becomes harder to reason about, not easier. Operational overhead grows. Orchestration complexity increases. Debugging distributed failures requires tooling and discipline that many teams underestimate. Maintaining explicit contracts is work. Maintaining dependencies in a sprawling number of small fragments is more work unless automated effectively. There are real costs to this approach.

The goal is not maximum decomposition — it is disciplined decomposition. Units should be sized around natural domain boundaries. Contracts should be stable at the interfaces that matter and flexible where flexibility is genuinely needed. Tests should validate behaviour at the contract surface, not just internal implementation details.

A well-maintained monolith can still work in this model, provided it has strong domain documentation, and enforces a clear policy for how and when large files are split. The monolith is not the enemy. Implicit, unmanaged coupling is.

## The Experiment Worth Running

This is a hypothesis, not a settled claim. The argument is logical and directionally supported by experience, but the systematic evidence is still being assembled. What would make the case stronger is practitioners running controlled comparisons in their own organisations.

A useful experiment might look like this: take two components in your system — one with explicit contracts and good test coverage, one with implicit coupling and partial coverage. Ask an AI agent to implement the same category of change in both. Measure the number of review iterations, the defect rate in production, and the time from task to mergeable code. Then share what you found.

The most valuable contributions are not confirmations — they are counterexamples and failure modes. If tightly-bounded units did not help your team, or if the overhead of maintaining contracts outweighed the benefit, that is important information. The hypothesis only strengthens when it is exposed to evidence that tries to break it.

> Insight The most interesting experiments will come from teams working in brownfield systems — codebases that were not designed for this and cannot be rewritten. How do you improve the boundary quality of an existing system incrementally? What is the minimum viable contract that gives an agent enough to work reliably? These are open questions worth pursuing. Confidence: Medium

## Where This Leaves Us

The architecture decisions made today will shape how well AI agents can assist in delivering and maintaining software for years ahead. The teams that will benefit most are not necessarily those with the best models or the most sophisticated tooling — they are the ones whose systems are designed so that a bounded, contract-respecting unit of change is always available for the agent to work with.

Design for boundaries. Make contracts explicit. Keep units small enough that their behaviour can be described completely. That discipline was good practice before AI agents. With AI agents, it becomes a structural advantage.

If you have run experiments, seen this succeed, or seen it fail — Open an issue in the repo to share your experience or DM me on LinkedIn/X. The argument gets sharper with evidence.

Tags: Architecture, AI, Agents
