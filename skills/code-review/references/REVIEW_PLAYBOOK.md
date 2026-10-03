# Review Playbook

## Risk-first procedure

Start with the intended behavioral delta, then trace the code paths that can violate it.

For each responsibility:

1. identify the governing criterion;
2. locate the implementation and materially affected consumers;
3. trace success, failure, and state-transition paths;
4. identify assumptions at boundaries;
5. test the most consequential assumptions with focused evidence;
6. file only supported findings.

## High-value defect searches

### Contract mismatch

Compare names, types, required/optional fields, status/error semantics, events, schemas, and persistence expectations across producers and consumers.

### Invalid success

Look for null, empty, partial, malformed, timeout, transport failure, or failed side effects being normalized into success.

### Invalid failure

Look for valid empty states, idempotent replay, expected absence, or recoverable conditions being rejected as defects.

### State transition gaps

Trace initial, in-progress, success, error, retry, cancellation, cleanup, expiration, and replay states. Check whether a later action can observe an impossible or stale state.

### Concurrency and ordering

When material, reason about duplicate invocation, lost response, races between read/claim/effect/commit, stale responses, cancellation, and retries. Do not claim distributed guarantees from a single-threaded reproduction.

### Data integrity

Follow writes, partial writes, rollback, uniqueness, idempotency keys, migrations, serialization, retention, and compatibility with existing persisted data.

### Boundary ownership

Check whether the change violates an architecture boundary, bypasses an existing public contract, duplicates policy across layers, or hides an external effect in a domain core.

### Error handling

Verify that errors retain enough semantics for the caller to make the correct decision without leaking sensitive internals.

## Focused reproduction

A good reproduction is the smallest execution that distinguishes expected from observed behavior.

Record:

~~~text
candidate SHA
precondition
action
observed result
expected result
why expected result is governed
~~~

Use real repository code when possible. Stubs/fakes are acceptable for controlling a boundary, but state exactly what remains unproven.

Do not modify the product merely so the reproduction passes.

## Review of tests

Tests are evidence, not truth by themselves.

Inspect whether tests assert the intended contract rather than current implementation accidents, exercise the meaningful failure path, can fail for the suspected defect, hide behavior through mocks that are looser than the real boundary, or omit an important consumer or state transition.

Do not expand code review into a full test-plan exercise.

## Review completion

Before reporting:

- deduplicate findings by root cause;
- verify file/line references still match the reviewed candidate;
- separate open defects from rejected hypotheses;
- state unreviewed areas and unavailable checks;
- recalculate blocking findings from current states.
