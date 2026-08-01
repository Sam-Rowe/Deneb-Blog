# When the Map Runs Out: Why Domain Experts Win at AI Engineering

Published: 2026-07-16

A map is useful when the ground stays still. It records known routes, reliable landmarks and the places where others have already got lost. Follow it carefully enough and, in a well-understood environment, you can expect to arrive where you intended.

AI engineering is not that environment. The ground moves. The tools change, the feedback is voluminous enough to hide subtle inaccuracies, and the same technique can produce a good result in one codebase and a mess in another. The map is often out of date before the ink dries.

That does not make experience worthless. It changes which kind of experience matters. When the map runs out, the advantage belongs to people who know how to navigate by stars, instinct and animal tracks.

## Mapped terrain rewards repetition

Psychologist Robin Hogarth distinguishes between *kind* and *wicked* learning environments. In a kind environment, the rules are stable, patterns repeat, and feedback arrives quickly enough to teach the right lesson. Chess is the standard example: the board does not change its mind, a legal move remains legal, and the consequences of a decision become visible.

Kind environments reward deliberate repetition. A playbook gets better as it absorbs more of the terrain. Tutorials, certifications and established patterns can all be valuable because yesterday's lesson remains useful tomorrow.

David Epstein develops this distinction in [Range](https://davidepstein.com/range/). His broader argument is that narrow specialisation is exceptionally powerful in kind environments, but breadth and analogical thinking become more valuable as environments grow wicked. Most interesting work does not come with a chessboard.

## AI engineering is moving terrain

AI engineering has all the characteristics of a wicked environment. Its rules are unstable: models, tools and interaction patterns shift monthly. Its boundaries are contextual: every codebase has different conventions, histories and constraints. Its feedback is abundant but difficult to read. An agent can produce a working feature, a confident explanation, a green test suite and a subtle architectural mistake in the same session.

This is not a lack of feedback. It is the opposite. We can receive thousands of lines of plausible code, commentary and test output in minutes. The signal is buried inside the volume. A small inaccuracy can pass unnoticed precisely because everything around it looks so complete.

> Insight AI raises the volume and apparent completeness of feedback. It does not guarantee that the feedback is teaching you the right lesson. That is what makes judgement more valuable. Confidence: High

A learn-by-rote playbook struggles here. By the time a pattern has become a universal recipe, the environment that produced it may already have moved. The transferable skill is not memorising the route. It is recognising the terrain.

## When there is no map, triangulate

In the physical world, one landmark tells you very little about your position. Several landmarks let you triangulate it. The more reliable points you can see, the more accurately you can work out where you are and which direction to travel.

I have used the same idea on several large AI-assisted software projects. In an earlier post, I called these landmarks [multiple anchor points](2026-04-16-multiple-anchor-points.html). Tests constrain behaviour. Documentation carries intent. Existing code reveals conventions. Runtime observations show what the system really does. Together they reduce the space of answers an AI agent can plausibly offer.

The connection I had not made explicit then is that this is analogical thinking. A technique for finding a position in the physical world becomes a way to constrain probabilistic software generation. The domains differ, but the shape of the problem transfers.

That transfer is how people navigate wicked systems. They rarely have a complete map. Instead, they carry a library of partial maps from other places: a production incident that resembles an ecological cascade, an API boundary that behaves like a contract, or a set of tests that acts like a surveying point. No analogy is perfect. The skill lies in knowing which part transfers and where it breaks.

## Domain expertise supplies the landmarks

This is why domain experts have such a strong advantage with AI. They have more than facts. They have taste: a felt sense for what a good outcome looks like, which edge cases matter, and which apparently harmless shortcuts will become expensive later. They know the fixed points of their domain.

Consider an expert in UK mortgage systems. They may not be an expert in the programming language used to build a new service. AI can help bridge that engineering gap. What it cannot supply reliably is the expert's judgement about the transaction: which rules are specific to the UK market rather than universal, which customer journeys are dangerous, and which answer is technically valid but operationally wrong.

Depth and breadth are not opposites here. They operate on different axes. Domain depth supplies trustworthy landmarks. Engineering breadth supplies analogies and ways to connect them. AI helps translate between the two. The strongest practitioners will not know everything; they will know what must remain fixed while the implementation moves around it.

## AI does not flatten expertise; it amplifies judgement

The popular counterargument is that AI levels the playing field. In one sense, it does. More people can produce code, query data, sketch an interface or explore an unfamiliar technology. The entry cost has fallen dramatically.

But lowering the cost of producing an answer does not lower the value of recognising a good one. It may do the reverse. When everyone can generate ten plausible routes, the scarce capability is choosing which route reaches the right destination without crossing a cliff.

That should change how we build teams. We should look for domain experts who can learn to work fluently with AI, not only AI specialists trying to absorb a domain after the fact. We should value people who have moved between contexts, tested their judgement against reality, and shown that they can form useful analogies without mistaking them for proof.

Certifications can be evidence of exactly that breadth. The distinction is not between certified and uncertified people. It is between wicked-system people who thrive in wicked systems and people who can only follow a learned-by-rote playbook. One treats knowledge as a collection of bearings; the other waits for a route someone else has already marked.

> Team implication Hire for domain judgement and evidence of navigating ambiguity. Train for AI fluency. Tool knowledge is teachable; trustworthy taste takes longer to build. Confidence: High

The AI era will create more maps, faster than ever. It will also make them expire faster. The winning teams will not be those with the thickest playbook. They will be the ones with enough reliable landmarks, enough range to connect them, and enough judgement to keep moving when the map runs out.

## Sources and further reading

- Robin M. Hogarth and Emre Soyer, ["The Two Settings of Kind and Wicked Learning Environments"](https://doi.org/10.1177/1745691610375556).
- David Epstein, [Range: Why Generalists Triumph in a Specialized World](https://davidepstein.com/range/).

Tags: AI, Engineering, Leadership, Domain Expertise
