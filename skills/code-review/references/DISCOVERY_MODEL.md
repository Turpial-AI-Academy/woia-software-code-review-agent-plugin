# Discovery Model

## 1. Anchor the candidate

Before reviewing implementation details, identify the exact candidate.

Prefer immutable evidence:

~~~text
git commit SHA
PR head SHA
tree/diff tied to that SHA
~~~

If only a mutable branch name is available, resolve and record its current SHA before review.

When local state is relevant, record whether uncommitted changes exist. A dirty worktree means the commit SHA alone may not describe the bytes being reviewed.

## 2. Identify the comparison

Determine what changed relative to the requested base branch or merge base, a previous candidate, a released version, or another explicit baseline.

Do not assume main is always the correct comparison.

## 3. Read governing evidence

Collect the smallest sufficient set:

~~~text
task / SPEC
acceptance criteria
architecture decision or boundary
repository AGENTS/instructions
public schemas/contracts
affected tests
migrations/persistence rules
generated clients/types where authoritative
~~~

Record contradictions instead of silently choosing whichever source is convenient.

## 4. Build a semantic change map

Map changed files to changed responsibilities.

Example:

~~~text
input validation
-> domain decision
-> persistence/effect
-> response/event
-> consumer
~~~

File count is not review scope. One small edit can affect a large public contract; a broad generated diff can have little semantic change.

## 5. Follow affected consumers

Review changed call sites and consumers far enough to validate the behavioral claim.

Look for new assumptions about nullable/empty data, changed error/status behavior, stale callers after signature changes, retries/idempotency behavior, state cleanup and cancellation, serialization or compatibility changes, and hidden ordering/concurrency effects.

## 6. Declare coverage and limits

A review report should say what was inspected and what was not.

Never infer whole-repository safety from a sampled diff. When a required source cannot be inspected, return a limitation or blocked status.
