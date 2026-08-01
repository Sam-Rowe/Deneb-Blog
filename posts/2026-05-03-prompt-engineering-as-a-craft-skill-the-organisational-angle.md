# AI Engineering as a Craft Skill: The Organisational Angle

Published: 2026-05-03

A previous post examined how an individual engineer develops AI engineering mastery alongside domain expertise — moving through the Dreyfus stages from context-free rule-following to the fluid, integrated judgment of an expert. See [AI Engineering as a Craft Skill](2026-05-01-prompt-engineering-as-a-craft-skill.html) for that individual angle first, because this post builds on it.

This post asks the harder question: once you accept that AI engineering is a genuine craft skill that develops over time and depends on domain expertise. What does that mean for the organisations responsible for hiring, developing, and deploying teams of engineers?

The answer turns out to be uncomfortable in several directions at once. It challenges how organisations write job specs, how they measure performance, how they structure teams, and most pressingly how they grow the next generation of domain experts in an environment where AI is doing more and more of the work those experts would previously have learned from.

## The Signal Problem: Who Actually Has This Skill?

Before you can hire for a skill, you have to be able to recognise it. That turns out to be harder than it sounds with AI engineering, because the visible outputs of a skilled practitioner and an overconfident novice can look identical from a distance.

Both will tell you they are good at working with AI. Both will have shipped things using it. The novice will have generated plausible code with impressive speed. The expert will have done the same; but the expert's output will handle the edge cases the novice did not know to specify, will integrate correctly with the domain constraints the novice was not aware of, and will have fewer production surprises six months later.

The signal is not in the output rate. It is in the failure rate, the edge case handling, and the friction the work creates downstream. Those are harder to measure in an interview, harder to see in a portfolio, and often invisible until something goes wrong in production.

> Insight One practical signal worth looking for: how does a candidate talk about AI failures? A novice describes them as model limitations. An expert describes them as a mismatch between what they specified and what the domain actually required and can give specific examples of constraints they had to surface explicitly. The locus of responsibility shifts inward as expertise develops. Confidence: High

## The Hiring Dilemma

Most job specifications do not mention AI engineering at all. Some are beginning to add phrases like "experience with AI tools" or "familiarity with GitHub Copilot"; but these are shallow proxies that describe exposure, not capability. They are the equivalent of hiring a builder by asking whether they have used a hammer.

The difficulty is partly definitional. AI engineering is not a certification or a framework. There is no standard curriculum, no widely recognised credential, and no industry consensus on what intermediate competency looks like versus expert competency. Organisations cannot simply add it to a required skills list the way they might add experience with a particular programming language.

What organisations can do is restructure their evaluation around the underlying capabilities that make AI engineering skill visible. Domain depth is important. The ability to identify edge cases, constraints, and failure modes in a given problem space is a direct proxy for the kind of knowledge that separates effective AI-assisted work from plausible-looking work that will cause problems later.

Additionally, the ability to talk concretely about verification. How does a candidate know when AI-generated output is wrong? What do they check? What does a credible answer look like for your domain specifically? An engineer who can only say "I run the tests" is demonstrating that they are delegating verification to the test suite. This is only as good as the domain knowledge embedded in the tests themselves and shows a lack of thinking about the broader verification problem. An AI engineer with domain depth will have a more nuanced answer that includes testing but also other forms of verification that are necessary to catch what the tests miss.

Importantly as well, intellectual humility about the tool. Candidates who are evangelical about AI tend to be at an earlier stage of development than candidates who are precise about its limitations. The expert intuits where it can fail and why, then plans for it. The novice finds it impressive and is often unaware that there is anything to plan for.

## The Pairing Question

One intuitive response to the domain-expertise problem is to pair people. Put a domain expert with someone who is fluent in AI tooling and let the skills complement each other. It sounds reasonable in theory. In practice, it is considerably more complicated and may be a skill in itself.

The core challenge is that effective AI-assisted work in the Software Development Life Cycle (SDLC) requires the domain knowledge and the AI fluency to be applied simultaneously, in the same cognitive act. When a domain expert is reviewing AI-generated code after the fact, they can catch domain errors; but they cannot easily inject domain context into the prompts that produced the code in the first place. The upstream specification quality, which is where domain knowledge matters most, is lost if the domain expert is not involved at the point of generation.

This does not mean pairing is useless. It means pairing works best when the domain expert is a genuine collaborator at the prompting, specification and evaluation stages, not a reviewer of the final feature after deployment. Pairing a domain expert who is learning AI fluency with an AI-fluent engineer who is building domain knowledge can accelerate both directions of learning. But the pair needs to be present at the keyboard together, not operating in sequence.

> Insight The most productive pairing configuration is probably not "domain expert plus AI expert" but "domain expert learning AI" alongside "AI-fluent engineer building domain knowledge." Both parties are growing in both directions. The pairing accelerates the convergence toward the genuinely powerful state: two people who have both. Confidence: Medium

The harder truth is that neither pairing configuration fully replaces the compound individual. An engineer who has deep domain knowledge and genuine AI fluency is qualitatively different from two engineers who each have one of those things. The compound individual can move faster, make better trade-offs in real time, and maintain quality without the coordination overhead that pairing requires. Organisations that recognise this will invest in developing compound individuals through pairing people who have complementary skills.

## The Great Leveller Trap

There is a version of the AI story that organisational leaders find appealing: AI democratises expertise, raises the floor, and makes it possible for junior engineers to produce work that previously required senior experience. In one narrow sense this can be true. In the broader sense that matters for organisational outcomes, it is a trap.

AI raises the floor in domains where the quality bar is set by rule compliance. For example, writing boilerplate, following standard patterns, generating tests for well-specified functions. In those areas, the gap between novice and expert output narrows. But the value in complex software delivery does not come from rule compliance. It comes from navigating the problems that the rules do not cover — the edge cases, the regulatory subtleties, the architectural decisions that will constrain the system for years, the incidents that nobody foresaw because the foresight required a depth of domain knowledge that junior engineers have not yet developed.

The risk of the great leveller narrative is that it encourages organisations to thin out senior engineering investment on the assumption that AI has made it less necessary. What tends to happen instead is that the output rate increases while the output quality becomes harder to assure; because the people best positioned to catch what the AI misses are fewer, more stretched, and operating later in the process than they should be.

Domain expertise is still the differentiator. AI amplifies it which is precisely why losing it is so costly when it finally becomes visible.

## Team Topology When Skills Are Distributed Unevenly

The practical reality in most organisations is that AI engineering skill and domain expertise are distributed unevenly across teams, and the distribution does not correspond to seniority in any simple way. You will have junior engineers who are highly AI-fluent and senior engineers who are domain-deep but AI-resistant. You will have mid-level engineers who have developed genuine compound skill, and others at the same level who have neither.

The worst team configuration is one where AI-fluent engineers work independently of domain experts, producing output that the domain experts then review in batches, late in the cycle. This is structurally similar to the pre-agile waterfall problem — disconnected from the knowledge that would make it better, with feedback arriving after most of the consequential decisions have already been made.

A healthier configuration involves domain experts actively participating in the SDLC at specification and planning stages through generation and into verification, not just review. If domain experts are involved in writing the acceptance criteria, grounding the AI's context at the start of a task, and reviewing the edge case handling; not just smoke testing the final feature, the quality of the AI-assisted work improves substantially.

This has structural implications for how teams are composed and how work is sequenced. Domain experts need to be present earlier in the flow than many organisations currently position them. The specification work; which tends to be undervalued, is where the domain expertise does its most important work in an AI-assisted delivery environment.

> Insight The architectural principle from [Boundaries First](2026-04-18-boundaries-first.html) applies here at the team level too. Small, well-specified units of work — with explicit domain context embedded in the specification — are easier for AI-assisted engineers to execute correctly, and easier for domain experts to review efficiently. The boundary-setting work is domain-knowledge work. It should be done by people who have it. Confidence: High

## The Talent Pipeline Problem

The most difficult question on the organisational angle is also the one with the longest time horizon: how do you grow the next generation of domain experts if AI is doing so much of the work they would previously have learned from?

The traditional path to domain expertise in software engineering runs through exposure and failure. Junior engineers work on production systems. They make mistakes. They work alongside senior engineers who explain why something is wrong at the domain level, not just the technical level. They read prior post-incident reports and work through live site incidents as they happen to help them learn. Ensure they are part of writing the next post-incident reports. They sit in requirements sessions where domain complexity is debated and negotiated. Over several years, they accumulate the invisible truths of their domain; the things that do not appear in the documentation but that every experienced practitioner knows, building that instinct is the core part of the domain expertise development process.

AI changes this path in a way that is not immediately visible as a problem. When a junior engineer uses AI to generate their first feature, they get a working implementation quickly. The AI has done the pattern-matching, the boilerplate, the basic structure. The junior engineer has not had to think through why those patterns exist, what they protect against, what would happen if they were violated. The learning that would previously have happened during the struggle to produce that implementation has been bypassed.

Organisations may need to do something counterintuitive in the AI era: **reintroduce friction on purpose.** One option is deliberate "failure injection" for people, not platforms: give junior engineers AI-generated code that is intentionally wrong in domain-specific ways, then make them diagnose and repair it. Think of it like Chaos Monkey for capability building. In high performing DevOps teams, Chaos Monkey style practices build system resilience by introducing controlled faults; in training AI augmented software engineers, this approach builds engineering judgment by introducing controlled domain failures. It forces early in career engineers to confront constraints they would otherwise glide past with AI assistance, and forces senior engineers to externalise tacit expertise that too often stays locked in instinct.

This is not an argument against AI-assisted development for junior engineers. It is an argument for being deliberate about what learning still needs to happen alongside it. The risk is that organisations conflate output velocity with learning velocity and discover five years later that they have a cohort of engineers who are highly productive in familiar patterns but who lack the domain depth to navigate the next order of complexity.

> Insight One heuristic worth testing: can a junior engineer explain, without AI assistance, why the domain requires what they just built to work the way it does? Not just what the code does — but why the domain constraint exists, what would go wrong if it were violated, and where in production that failure would manifest. If they cannot, they have produced an output without building the underlying knowledge. The output is valuable; the learning deficit may cost more later. Confidence: Medium

## What Deliberate Development Looks Like

The organisations that navigate this well are likely to have a few things in common.

They treat domain knowledge as a first-class investment, not a by-product of tenure. They create structured exposure to domain complexity (regulatory documents, post-incident reviews, cross-functional requirements sessions) rather than assuming engineers will absorb it incidentally. They make the invisible truths of their domain visible and discussable.

They evaluate AI engineering skill through domain-specific lenses, not generic AI fluency assessments. They ask candidates to walk through a domain scenario and identify the constraints the AI would need to be given to handle it correctly. They look for the ability to spot what is missing from a plausible-looking output.

They structure mentoring explicitly around domain transfer, not just technical transfer. The most valuable thing an experienced engineer can give a junior colleague is the accumulated mental model of why the system works the way it does; the invisible truths. That transfer happens through conversation, code review, and shared exposure to production complexity. It does not happen automatically, and it does not scale easily. It requires time and deliberate investment.

And they resist the organisational temptation to thin out engineering investment on the back of AI productivity gains. Those gains are real, but they are built on a foundation of accumulated domain knowledge that takes years to develop and is surprisingly easy to erode if the organisational conditions that created it are changed too quickly. Institutional knowledge is a fragile thing. It needs to be tended, not just tapped.

## The Honest Summary

The individual who has deep domain expertise and genuine AI fluency is an exceptionally valuable asset. The individual is rare, gets rarer if organisations stop investing in the conditions that produce them, and becomes the bottleneck if organisations over-index on their scarcity without addressing it structurally.

Organisations that treat AI as a great leveller or accelerator will tend to discover its limitations the hard way; through production incidents, through quality degradation that takes time to become visible (and hard to fix), and through a growing gap between increasing output velocity and genuine reduction in delivery quality.

Organisations that treat domain expertise as the scarce input and AI as the amplifier of that expertise will build better products, sustain that quality over time, and grow a pipeline of engineers who compound in value rather than plateau.

The craft skill is real. The organisational conditions for developing it are not automatic. They have to be chosen.

Tags: AI, SDLC, Craft, Teams, Hiring
