---
title: "Building in the open"
description: "Small releases, useful notes, and why documenting the process is part of building good software."
pubDate: 2026-10-17
tags: ["Engineering", "Open source", "Learning"]
---

## Start with a problem you can observe

A useful project often starts with a small frustration: a connection that drops,
a tool that hides its state, or a task that takes more steps than it should.
Before choosing a framework, I try to write down what is happening and what a
better outcome would look like.

Building in the open gives that process a home. A repository can hold more than
finished code; it can explain the decisions that made the code possible.

### Keep the first experiment small

For a network utility, my first checklist would be:

- Record the conditions under which the connection fails.
- Separate authentication problems from connectivity problems.
- Make the current state visible before automating recovery.
- Test the smallest change that could improve the experience.

This makes progress easier to evaluate. **A clear observation is more useful than
a large feature list.**

## Make assumptions explicit

> Write the explanation you would want to find when returning to the project
> six months later.

A simple retry policy is a good example. The code is short, but the reason for
bounding retries matters: an unavailable service should not create an endless
loop of requests.

```typescript
function retryDelay(attempt: number): number {
  const baseDelayMs = 1_000;
  const maximumDelayMs = 30_000;
  return Math.min(baseDelayMs * 2 ** attempt, maximumDelayMs);
}

for (let attempt = 0; attempt < 3; attempt += 1) {
  console.log(`Attempt ${attempt + 1}: wait ${retryDelay(attempt)} ms`);
}
```

The `maximumDelayMs` value is a decision, not a universal constant. Document the
tradeoff and measure whether it fits the system you are working on.

## Publish a small, understandable change

My preferred release loop is straightforward:

1. Describe the problem and how to reproduce it.
2. Implement a focused change.
3. Check the behavior, including failure cases.
4. Write down what changed and what remains uncertain.

```sh
npm run check
npm run build
npm test
```

The commands are only part of the work. Reading the output, trying the interface
with a keyboard, and checking it on a narrow screen are just as valuable.

## Leave a trail for the next person

Good project notes help someone decide whether an approach fits their own
problem. They also make it easier to contribute a correction.

You can explore my [selected projects](/#work) for more context. This blog is where
I will keep the smaller observations: the experiments, the constraints, and the
lessons that do not fit into a project summary.
