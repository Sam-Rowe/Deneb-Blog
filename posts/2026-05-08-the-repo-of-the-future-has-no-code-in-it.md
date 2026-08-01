# The repo of the future has no code in it

Published: 2026-05-08

## The repo with no code in it

Imagine cloning a repository and finding no `.ts` files. No `.py`. No compiled assets. Instead: a prose description of what the system does, a handful of scenario documents written as user stories, a few data shapes with worked examples, and a rough sketch of the screens. That's it. You push a button, and the application builds itself.

That image feels like a recipe for disaster and science fiction. I think we're closer to it than it sounds; and I think the trajectory is already visible in the way the best AI-assisted engineering teams are working right now. More than that, I predict when the repo-with-no-code arrives, it will be the dominant pattern for software because folk will love the customisation; it will be the only way to deal with the complexity and speed of software security and it will be incredibly powerful to create experiences that currently cannot be created.

## The pattern we're already living

This isn't a break from current practice. It's an extreme of something already underway.

Spec-driven development; the idea of capturing domain expertise in human-readable specifications that sit alongside or ahead of code, is gaining real traction. Projects like [Spec Kit](https://speckit.org/) treat the specification as a first-class engineering artifact: something you version, review, and test against, not just a document you write once and then ignore.

Earlier posts on this blog have circled the same idea from different angles. [Prompt engineering as a craft skill](2026-05-01-prompt-engineering-as-a-craft-skill.html) argued that the scarce input in AI-assisted development is not tooling but domain knowledge, the ability to articulate intent precisely enough that a model can act on it reliably. [Boundaries first](2026-04-18-boundaries-first.html) made the case for defining interfaces and contracts before touching implementation. [Multiple anchor points](2026-04-16-multiple-anchor-points.html) explored how layered, overlapping specifications make AI output more predictable. In each case, the prose — the intent — is doing the real engineering work. The code is output, not input.

Today, these artifacts sit *alongside* code. The prediction is that they replace it.

## What "source" actually becomes

Not source code. Not a formal specification in the software engineering sense. Something closer to what you'd tell a sharp new hire on day one: what this system is for, what it must never do, who uses it and how, what the data looks like when it arrives and when it leaves, what the screens feel like to use. The compiler is a model.

It's worth being precise about the spectrum here. For **UX-only applications** — things that consume fixed-contract APIs or sit in front of a well-defined message bus — a description plus screen sketches may genuinely be enough. The boundaries are already drawn. The model's job is to render them.

For **full systems** — anything with its own storage, business logic, or non-trivial data handling — prose alone collapses. You need worked examples of data in and out. You need explicit treatment of storage and retrieval patterns. You need someone to have thought carefully about the second- and third-order effects of data exposure decisions, because a model cannot infer those from intent alone and the cost of getting them wrong compounds quickly.

So the "no code" repository isn't weightless. It contains intent, scenarios, data examples, storage and retrieval patterns, and a UX sketch. Still no code. But there is real engineering in those artifacts. Someone has to put it there.

## Today vs. tomorrow

| Today | Tomorrow |
| --- | --- |
| Code is canonical | Prompts and specs are canonical |
| Prompts are scaffolding | Code is exhaust |
| Tests verify code | Tests verify intent |
| Design is a reference | Design is the spec |
| One build, many users | One user, one build |

## The personalisation dividend

The most interesting consequence of disposable, regenerated applications isn't faster delivery. It's that every user could get a different build.

Consider a theoretical personal finance view. Today you manage your money across four or five siloed apps — a current account here, a pension there, a mortgage portal you log in to twice a year (and immediately have to go through the biometric authentication dance each time). Each one either wants to know about all the others without adequate connectors or live in a world of purist isolation denying any other financial dimension exists. None of them present your finances the way *you uniquely* actually think about your money.

In a regenerated-application world, you describe what you want to see and how you want to see it. The application is built for you — pulling from your banks, pension providers, and mortgage provider via open APIs — and rendered in the mental model that makes sense to you personally. Not a feature flag. Not a dashboard configuration. A regeneration. Your neighbour's finance app and yours share no UI at all, because they shouldn't.

> Insight Personalised regeneration breaks the shared digital culture assumption that sits under most of our current thinking about design systems, brand consistency, and user research. Today we ask "how do users experience feature X?" In a per-user build world, there is no feature X — only the version of X built for each individual. Design systems become intent libraries. Brand consistency becomes a set of constraints on what the model may produce, not a fixed visual language. User research becomes harder to aggregate, and far more powerful if you can. Confidence: Medium

## The downsides we have to stare at

I want to be honest about the problems, because they are significant.

### Compute and climate

Rebuilding the world on every request is not free. If every application interaction triggers a model generation, the energy cost is orders of magnitude above what we pay today for serving compiled code. This is not a reason the trajectory won't happen. It is a reason the trajectory has to be honest about its costs. In a few years will we have optimised the models and the hardware enough that local compute on modest hardware for this application regeneration is feasible? I am hopeful, but it is a big question mark.

### Non-determinism and regressions

"It worked yesterday" becomes a literal statement rather than a figure of speech. When the artifact that ran is regenerated on demand, you lose the ability to bisect against a fixed codebase. Testing intent rather than implementation is possible — it's actually a better model — but it requires a discipline around scenario coverage that most teams currently don't have. New frameworks that allow non-developers to effectively customise their applications without losing consistency, reliability and security will be a critical part of the ecosystem that makes this trajectory viable.

### Security and supply chain

When the model chooses the libraries at generation time, who chose your CVEs? Software supply chain security is already a hard problem with fixed dependency trees. It becomes a different category of problem when the dependency graph is generated fresh each time and neither the developer nor the operator ever sees it. On the plus side, with the right guardrails this could be a powerful way to keep pace with the rapidly evolving security landscape. If a new vulnerability emerges, the model could automatically exclude vulnerable dependencies from future builds, without waiting for developers to patch and release new versions. But it also opens up new attack vectors if not handled carefully.

### Auditability and liability

When the artifact that ran no longer exists, what do regulators inspect? In financial services, healthcare, and any regulated domain, the answer to "what did your system actually do?" currently points at code and logs. In a regenerated-application world, the answer points at intent documents and generation logs that may not exist in a form that satisfies an auditor. I am confident this is solvable with the right audit trails and logging standards and frameworks. But it is a significant shift from the way we currently think about compliance and will require new thinking from regulators as well as engineers.

## What this means right now

The repo-with-no-code is not on a shelf you can reach today. But the trajectory is real, and there are things worth doing now in response to it.

**Treat prompts, specs and scenarios as primary engineering artifacts.** Version them. Review them. Test against them. If your intent documents live in a Word document or Confluence page that nobody owns and never gets updated, you are already behind where you need to be.

**Push for open standards for personal data portability.** Personalised regeneration is meaningless without the data to feed it. If your bank doesn't expose an API and your pension provider considers your balance proprietary, the finance app of your imagination stays theoretical. The technical capability is arriving before the data infrastructure that makes it useful. This also requires open standards for authentication and data portability that don't exist yet in all the domains where they are needed. They do exist in the UK for many financial systems with the Open Banking standards, but they are not yet universal. If we want a future where users can choose to have their data flow into custom-built applications, we need to start building the infrastructure for that now. I want to shout out to Salesforce here for their vision of a Headless future — [Salesforce Headless 360](https://www.salesforce.com/news/stories/salesforce-headless-360-announcement/) — which I think is a really exciting and early example of this trajectory in the enterprise space. They are building the data infrastructure and access interfaces for AI Agents and users to personalise in real time their experience. While Salesforce are doing this to enable their customers to build richer, more personalised experiences on top of their platform, I hope to see more of this kind of work from other platform providers in the coming years.

**Reframe personalisation and accessibility.** This is the one that I find most exciting, and I want to say it clearly.

In a regenerated, single-user world, accessibility stops being "add ramps to a shared building." The audience of a UX is one person. That is not a constraint. That is an opportunity to build something that genuinely fits them — and to omit everything that doesn't.

A blind user doesn't need a colour palette. They don't need a font choice. A deaf user doesn't need audible feedback. A dyslexic user might want a complex table rendered as a logical sequence of steps they can move through one at a time. Right now we ask whether the shared application is accessible to all of these people simultaneously, which is a hard design problem. In a per-user build world, you ask a different question: what does this person actually need, and what can we leave out to optimise for their experience?

The build conforms to the human. Not the other way round.

## Confidence note

This is a prediction, not a roadmap. The trajectory feels clear to me. The timescale and the exact shape of arrival do not.

The compute and governance problems are real obstacles, not just engineering challenges to be iterated away. The data portability infrastructure is patchy and incomplete in many areas. And the cultural shift — from code as the thing that matters to intent as the thing that matters — will be slow and uneven, because it requires engineers to let go of a very deeply held identity with customisers and tinkerers to become the curators of their own destinies.

But the direction is high. The destination matters. And the work required to get there is work worth starting now. Even if you can't build the future today you can sweep the pavement towards it and along the way innovate in ways that are valuable in their own right.

**Confidence: medium. Direction: high.**

Tags: AI, Future, SDLC, Prediction, Accessibility
