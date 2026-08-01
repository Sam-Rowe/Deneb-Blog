# Cost of Delay in an AI World: A Map for When the Ground Moves

Published: 2026-05-24

## The line and the map

Imagine a kitchen that has built a smooth, efficient line for one thing only: making the perfect burger and fries, reliably and repeatably, in under 30 seconds for a coach of hungry sports fans who all want the same meal at the same time. Now imagine a restaurant next door getting a steady flow of customers ordering pizza, pasta, lasagne, and other Italian favourites at random. The first kitchen wins on efficiency. The second needs flexibility, fast judgement, and a team that can adapt to whatever walks through the door.

That is the business argument in the AI era. Efficiency metrics still matter. They always will. A kitchen that can produce the same meal quickly and reliably is invaluable when demand is predictable. But when the orders, the customers, or the market itself keep changing, cost of delay matters more, sooner, and often with painful consequences. The winners are not the companies that pick one doctrine forever. The winners are the companies that know which metric matters for which decision.

## The accountant's dilemma

Most leadership teams can measure efficiency in their sleep. Utilisation rates, margins, cost per ticket, cost per seat, sprint velocity, engineering spend per shipped feature. Efficiency is legible. It is auditable. It behaves nicely in dashboards and board packs.

Cost of delay is harder because it is mostly counterfactual. It asks: what value did we fail to capture because we waited? What churn did we trigger because we reacted after the market moved? What optionality did we lose by deciding too late? There is no invoice that cleanly states "this was your delay bill."

Don Reinertsen's core point in *The Principles of Product Development Flow* is still the sharpest: If you only quantify one thing, quantify cost of delay. The concept is proven. The obstacle is organisational design: most organisations reward what is easy to count, not what is economically decisive.

## What AI changed

AI did not invent competitive pressure. It compressed it.

The developer-tooling race is a current example. GitHub Copilot became a default enterprise baseline with major scale and distribution. Cursor jumped from niche power-user darling to serious revenue and adoption velocity in a short window. Windsurf, Claude Code, and Devin pushed agentic workflows from novelty to practical evaluation criteria. In this category, "best in class" is no longer an annual award. It became a quarterly challenge and may even be heading to monthly cycles in line with the pace of AI innovation and adoption.

When users can trial alternatives quickly and switching friction keeps falling, delay gets expensive faster. A feature shipped six months late used to be inconvenient. In AI-sensitive categories, it can be existential. By the time the feature lands, the reference point has moved on the map.

> Insight AI competition is not just "faster release cycles." It is a shortened half-life of differentiation. The moment between "we are ahead with feature X" and "feature X is table stakes" keeps shrinking. Confidence: High

## The metered economy amplifies delay

The same pattern appears beyond dev tooling. As more businesses move from annual contracts to monthly subscriptions and metered consumption, market feedback arrives in tighter loops. Good will decays faster. So does revenue.

In a yearly renewal world, a bad month might be absorbed. In a metered world, a bad month is the invoice. A reliability wobble, pricing confusion, or public mistake can change customer behaviour inside one or two billing cycles. The cost of delay is no longer a strategic abstraction. It is cash-flow timing.

This is why sales, support, and customer success should be part of the same CoD conversation as product and engineering. If customer sentiment moves weekly, response latency in go-to-market functions is no less strategic than response latency in the platform team.

## The frameworks we already have

We are not starting from zero. Reinertsen gave us CoD as an economic lens. CD3 (cost of delay divided by duration) gave us a prioritisation rule. WSJF gave many teams an operable version of that logic in portfolio and program planning.

These are useful and battle-tested. But they are strongest inside a known backlog. They assume the work items are estimable enough and the landscape is stable enough that ranking known work is the main challenge.

In AI-heavy domains, the backlog itself can become unstable. New capabilities repeatedly re-open areas that looked settled. Old assumptions decompose. The question is no longer only "what should we do first?" It is also "what terrain are we standing on now?"

## Wardley Maps: the missing layer

Wardley Mapping gives us a way to answer that terrain question. At a high level: map user needs and value chain components vertically, then map each component's evolution horizontally from Genesis to Custom to Product to Commodity.

Once you can see the landscape, the efficiency-versus-delay argument becomes less ideological and more practical.

Example map for AI developer tooling: emergent agentic capabilities on the left, skills and custom instructions in the middle, and foundation models as utility on the right.

| Wardley evolution stage | Primary lens | What's the impact |
| --- | --- | --- |
| Genesis / Custom | Cost of Delay | Uncertainty is high, and waiting burns option value quickly. |
| Product / Rental | Balanced (CoD + Efficiency) | Both speed and operating leverage matter in contested middle markets. |
| Commodity / Utility | Efficiency | Differentiation is low; scale, reliability, and unit economics dominate. |

The AI twist is that evolution does not always move in a smooth line from left to right. New model capabilities can seemingly drag parts of the stack leftward again, reopening experimentation in places that had started to commoditise. If your strategy only sees the right side of the map, you will optimise the system just as the game changes. *Simon:* if you are reading this, I am simplifying here, evolution is one way and a new feature does not literally un-evolve a product. But the mental model of "the new feature can make something feel totally new" is real and important.

## A practical framework: the CoD/Efficiency switch

If we want "right tool for the job" instead of ideology, we need a simple operating mechanism. Here is one:

### 1. Map the decision context

Place the capability, feature, or team on a Wardley Map. If you cannot place it, you need to really understand it first before you can optimise it.

### 2. Read three dials

**Evolution stage:** Where is this component today? **Left-drift risk:** Is AI likely to reopen this space in the next few months with a new capability? **Signal latency:** How fast does delay show up in customer behaviour, sentiment, or revenue?

### 3. Pick the dominant lens

If the component sits left on the map, has high left-drift risk, or has fast signal latency, run CoD-led choices: smaller batches, higher responsiveness, more option-preserving bets, and less focus on utilisation optimisation.

If the component sits right on the map, has low left-drift risk, and has slow signal latency, run efficiency-led choices: automation, standardisation, tighter unit economics, and predictable throughput.

In the middle, do both deliberately: efficiency for run operations and CoD for change and signal operations.

## What this means for CFOs, CTOs, and product leaders

The CFO does not need to abandon efficiency. The CFO needs a strategy for where efficiency is the wrong first move. The CTO does not need to worship speed. The CTO needs to know where speed is economically mandatory. Product leadership does not need a new religion. It needs a shared map so trade-offs are argued on common ground.

Treat CoD and efficiency as complementary controls, not competing identities. One tells you how well you run the machine. The other tells you what it costs to run the wrong machine for too long.

## Conclusion: read the right signal

In an AI world, the map redraws itself faster than most operating models were designed to handle. The organisations that endure will not be the ones that are always fastest or always leanest. They will be the ones that can tell when and where speed should dominate and when and where efficiency should dominate, then mix them cleanly.

Right tool. Right signal. Right now.

## References

- Don Reinertsen, *The Principles of Product Development Flow*, Celeritas Publishing, 2009.
- Scaled Agile Framework, [Weighted Shortest Job First (WSJF)](https://www.scaledagileframework.com/wsjf/).
- Simon Wardley, [Wardley Maps series](https://medium.com/wardleymaps).
- [Learn Wardley Mapping](https://learnwardleymapping.com/).
- Sacra, [Cursor at $200M ARR](https://sacra.com/research/cursor-at-200m-arr/).
- Buun Group, [Cursor vs GitHub Copilot vs Claude Code (2026)](https://buungroup.com/blog/cursor-vs-copilot-vs-claude-code-2026/).

Tags: AI, Strategy, Economics, Wardley Maps, SDLC
