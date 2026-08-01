# Prompt Engineering as a Craft Skill

Published: 2026-05-01

Every domain has invisible truths that only practitioners recognise. Ask a grid operator what the hard problem in renewable energy is, and they will not say "build more solar panels." They will likely say something like "frequency stability." Ask an experienced logistics engineer what caused the Suez Canal disruption to cascade so badly, and they will not say "one ship got stuck." They will likely say something like "the fragility of just-in-time systems." Ask a senior developer working on an insurance system what is hard about policy dates, and they will not say "the database." They will likely say something about "the timezones of the servers and where the policy is being created."

Expertise reveals the actual problem underneath the apparent one. And that is precisely why domain expertise is a force multiplier when working with AI in the SDLC (Software Development Life Cycle).

This post is not about prompt tricks. There is no shortage of that content. This is about framing prompt engineering as a genuine learnable craft — one with explicit stages of development — and understanding why what you know about the system you are building matters at least as much as any technique you apply at the keyboard.

## The Dreyfus Model and Why It Fits

In the early 1980s, brothers Stuart and Hubert Dreyfus published a model of skill acquisition that identified five stages through which practitioners move in any complex domain: novice, advanced beginner, competent, proficient, and expert. The model has been applied to nursing, chess, flying, software engineering, and many other fields. It fits working with AI in the SDLC surprisingly well — partly because software engineering is genuinely complex, and partly because the most important input to AI in the SDLC at every stage is not the technique being applied but the knowledge informing it.

What follows is not a strict academic application of the Dreyfus framework. Think of it as a lens. A way of recognising where you are, understanding what the next stage looks like, and seeing why the journey matters. For the rest of this post I will use "prompt engineering" as shorthand for the broader skill of effectively leveraging AI across the SDLC — from requirements gathering to architecture, design, code generation, review and testing. The same principles apply across all those stages, and the same developmental path applies to the skill as a whole, not just to the act of writing prompts at the keyboard. This is important context for this article but I am not using the term to minimise the importance of software engineering or to suggest that prompting is the new skill. Prompt engineering is a suboptimal term to reference the interaction of a software engineer with domain expertise to work with AI in the SDLC.

## Stage One: Novice

The novice prompt engineer has just discovered that asking AI better questions gets better answers. They experiment. They try rephrasing things. They add the word "step by step" and notice it helps. They are learning context-free rules — techniques that seem to work without needing to understand why.

The novice also tends to benchmark the AI against their own knowledge and find it impressive. If the output looks plausible and compiles, it probably is good enough. The novice is not yet equipped to judge what they cannot see the edge cases, the assumptions baked in, the constraints that were never stated because they were never known to be constraints.

This is not a failing. It is the start of a journey. But it is worth naming clearly: at this stage, the quality ceiling is the prompter's domain knowledge, not the model's capability.

Expect AI slop at this stage, it probably will work but could be wrong in a lot of ways and will be unmaintainable quickly.

## Stage Two: Advanced Beginner

The advanced beginner has accumulated enough experience to start recognising situational patterns. They have seen the AI confidently produce subtly wrong code enough times that they no longer fully trust the output without checking. They have started to learn what kinds of problems the AI handles well and which require more guidance.

They are beginning to provide context — sharing existing code, explaining constraints, hinting at the architectural style of the project. They are moving from treating the AI as an oracle to treating it as a capable collaborator that needs orientation.

Importantly, the advanced beginner is also starting to build domain knowledge in parallel. The more they understand the system they are building, the more they notice the gaps in what the AI is producing. The two skills reinforce each other.

Failure modes at this stage include over-trusting the AI on edge cases, and under-investing in domain knowledge because the AI seems to be doing so much of the work. Documentation and specification gaps, especially domain context specific ones, are common, and the prompter does not yet have the experience to know which ones matter.

## Stage Three: Competent

The competent practitioner has a deliberate approach. They prepare their thoughts before prompting. Gathering the right artefacts, grounding the conversation in the anchor points to identify correctness in the output, ensuring the AI has the information it needs to reason correctly. The prompter has started to develop an instinct for the difference between what the AI knows from training data and what it needs to know from the specific system it is helping build.

They have also internalised the importance of verification. They do not just check whether the generated code runs — they check whether it handles the edge cases that matter in their domain. And crucially, they know which edge cases those are because they have earned that knowledge through experience.

> Insight The competent stage is where the returns on domain investment become clearly visible. A competent prompt engineer who deeply understands their domain produces output that would take a novice multiple revision cycles to approach — not because they have different techniques, but because they know what to ask for, what to specify, and what to challenge in the response. Confidence: High

## Stage Four: Proficient

The proficient practitioner has developed genuine intuition. They can look at a generated output and immediately sense something is off often before they have run the code or read it carefully. They understand the system they are building well enough that AI-generated suggestions that do not fit the real constraints register as wrong at a level below conscious analysis and often in real time as the agents are moving through the steps.

At this stage, the relationship with the AI shifts again. The proficient practitioner works with the AI as a thinking partner exploring trade-offs, and pressure-testing their own assumptions. They are confident enough in their own judgment to push back on the AI when it is wrong, and humble enough to recognise when the AI has surfaced something they had missed.

## Stage Five: Expert

The expert operates fluidly. They do not consult explicit rules or deliberate technique checklists. Their domain knowledge and their understanding of how to leverage AI are so deeply integrated that the discipline has become largely invisible — the way a skilled surgeon does not think about how to hold a scalpel.

The expert's greatest asset is not their prompting technique. It is the density and accuracy of the mental model they bring to every interaction. They know what the AI is likely to miss before they ask the question, so they front-load the context. They know which parts of the output require careful scrutiny because they understand the failure modes of both the AI and the domain. And they know when to stop using AI entirely and rely on their own judgment — which is itself a form of expertise.

## The Insurance Date: A Case Study in Domain Depth

Consider what seems like a simple programming task: store the start date of an insurance policy. A domain novice will write a field, maybe add a date picker, and consider the task done. Sensible. Expedient. Almost certainly incomplete.

A domain expert asks a different set of questions. Which timezone? Is the server in UTC or local time? Is the database server consistent with the application server? If the customer is in one country and the insurer is domiciled in another, whose local time governs the inception of cover?

And then it gets richer. Insurance inception dates are not always the calendar date on which the policy was issued. Some lines of business have local conventions — certain policies in certain markets always start at midnight, others at noon, others at the moment of payment. Some regulatory environments require a cooling-off period before cover actually attaches. Some billing systems prorate the premium based on the fraction of the first billing cycle that has elapsed, which means the start date interacts directly with the billing cycle in ways that can produce incorrect charges if handled naively.

A domain novice prompting an AI for this feature gets something that works in the happy path. The code is clean, it is correct for the general case, and it passes obvious tests. A domain expert sprinkles that complexity into the planning prompts from the beginning — and then applies the same knowledge during code review and testing to catch what the AI could not anticipate because it was never told to. The AI did not change. The human's ability to direct and verify it did.

> Insight The insurance date example generalises. Almost every domain has a concept that looks simple from the outside and reveals enormous hidden complexity on inspection. The grid operator's frequency stability problem. The logistics engineer's bottleneck identification. The clinician's medication dosing edge cases. In each domain, the AI produces code that handles the obvious case correctly. Only the practitioner can identify the non-obvious cases. Confidence: High

## Domain Knowledge Across the SDLC

The amplifying effect of domain expertise is not confined to code generation. It operates at every stage of the software development lifecycle.

### Requirements and Planning

A domain expert prompting an AI to help refine requirements will surface the constraints and edge cases that should be in the acceptance criteria before a line of code is written. The novice gets a functional requirements list. The expert gets a requirements list plus the questions the AI would never have thought to raise — because the expert raises them first.

### Architecture and Design

Domain knowledge changes what trade-offs matter. A logistics system that needs to model flow constraints requires different architectural thinking than one that models inventory levels. A financial system that needs to reason about regulatory reporting windows requires different data modelling than one that just needs to track transactions. The AI can generate architectures for both, but only the domain expert knows which one to ask for and which details to scrutinise.

### Code Review

The most underappreciated leverage point. An expert reviewing AI-generated code is not just checking syntax and logic — they are checking whether the code handles the domain correctly. Does it account for the policy inception date edge cases? Does the grid simulation model respond correctly to frequency drift? Does the supply chain model distinguish between the binding constraint and the visible symptom?

These questions cannot be answered by reading the code in isolation. They require the reviewer to carry the domain model in their head and apply it to what they are seeing. That is expertise and where human judgment with AI shines brightest. These are the 10x engineers of the AI-enabled SDLC.

### Testing

Domain experts write better tests because they know which scenarios are actually likely and which edge cases are actually risky. A novice's test suite tests what the code does. An expert's test suite tests whether the code is correct for the domain — which is a different and much harder question.

## The Three Misconceptions

Most developers approach AI capability with a skewed mental model. There are three common patterns that limit the value they extract, and understanding them is useful at every stage of the Dreyfus ladder.

### Over-trust

The over-trusting engineer expects the AI to understand the full complexity of their domain (the industry and business context the software serves, whether finance, insurance, or another field) from minimal description. They ask for the insurance policy and include vague information about the date and trust that the AI will handle the timezone in the data and systems, the regulatory and cultural nuances, and the billing cycle proration without being told. When the bugs emerge, **and they will**, they are attributed to AI limitations rather than to the missing context that would have prevented them.

### Micromanagement

The opposite failure mode. The over-cautious engineer decomposes every task into tiny prescriptive steps, effectively writing pseudocode and asking the AI to translate it. The result is technically functional but misses the entire value proposition. An AI that is told exactly what to do in granular detail adds very little but consumes tokens. The value comes from giving the AI enough context and latitude to bring its broad knowledge to bear while the human directs, constrains, and verifies the output.

### Dunning-Kruger on Domain Complexity

Perhaps the most interesting failure mode. The engineer who has enough domain knowledge to be dangerous; but not enough to recognise what they are missing, who prompts with confidence that their description is complete. They do not know about the inception date conventions, so they do not mention them. In an energy system context they do not know about the frequency stability constraints, so they describe the energy system in aggregate terms. The prompt sounds thorough. The output looks correct. The bugs are invisible until production.

This is not a failure of the AI. It is a signal of where the engineer is on the Dreyfus ladder and an invitation to go deeper.

## How the Skill Is Built

The encouraging news is that this is a genuine developmental path, not a fixed capability. The less encouraging news is that domain expertise cannot be shortcut — it has to be earned through exposure.

The most reliable mechanism is curiosity combined with proximity. Working with domain experts. Reading the regulatory documents. Understanding not just what the system does but why it works the way it does and what would happen if it worked differently. Someone with adjacent domain experience ramps up fast because they already have the intuition to know what the AI is likely to miss. That intuition is the accumulated residue of past surprises.

There are practical habits that accelerate the journey. Reviewing AI output against domain constraints, not just logic. Writing acceptance criteria into the specs, forcing explicit articulation of edge cases. Reading post-incident reports from production systems in your domain; the bugs that made it to production are a guide to exactly the kinds of complexity that get overlooked. Building a mental library of the "invisible truths" in your domain and making it a habit to surface them in every planning conversation with the AI agents.

> Insight The multiple anchor points approach; sharing tests, existing code, contracts, and documentation alongside a task, is partly a prompting technique and partly a forcing function for domain clarity. To gather the right anchor points, you have to know what matters about the system. That act of selection is itself a domain-knowledge exercise. See [Multiple Anchor Points](2026-04-16-multiple-anchor-points.html) for more on how context shapes AI output. Confidence: High

## What This Means for Your Career

There is a version of the AI story that is dispiriting for engineers: the AI gets better, the marginal value of writing a line of code decreases, the profession slowly edges towards commoditisation. That version is worth taking seriously, but it is incomplete.

The more complete version is this: the value of deep domain expertise, good judgment, and the ability to identify invisible complexity is increasing, not decreasing. An AI that can write any code that can be clearly specified is only as valuable as the human who can specify it clearly in enough detail to guide its output while not over-constraining it; This specification and understanding of any complex domain requirements is precisely what takes years of experience to develop.

The engineer who combines deep domain knowledge with fluency in how to leverage AI is not a more productive version of the same role. They are something qualitatively different; capable of operating at a level of quality and speed that would previously have required a much larger team. The domain expertise does not become less valuable as AI improves. If anything, it becomes the scarce input.

For engineers earlier in their career: the path forward is to go deep on your domain, stay curious, and resist the temptation to treat AI fluency as a substitute for understanding the systems you are building. The combination of the two is genuinely powerful. Neither is sufficient on its own.

The invisible truths in your domain are yours to find. No model has seen your specific system, your specific regulatory environment, your specific production edge cases. That knowledge lives with you. The tool does not replace it — it amplifies it. Which means the more there is to amplify, the more valuable the combination becomes.

Tags: AI, SDLC, Craft, Domain Knowledge
