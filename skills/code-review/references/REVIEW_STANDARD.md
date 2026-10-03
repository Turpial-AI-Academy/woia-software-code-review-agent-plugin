# Code Review Standard

## Purpose

Define the minimum behavior required for an evidence-based software code review without imposing a language, framework, architecture style, or reviewer preference.

## Review object

A review targets one exact source candidate.

The review anchor should identify, when available:

~~~text
repository
base/ref
source HEAD SHA
branch or PR
review context
~~~

A review conclusion is candidate-specific. If the source HEAD changes, the reviewer must determine which evidence is stale and re-run affected review work before carrying forward a PASS.

## Governing inputs

Judge the candidate against evidence in this precedence:

~~~text
explicit task / approved SPEC
repository instructions and acceptance criteria
architecture and public contracts
existing compatible behavior
repository conventions that encode real constraints
general engineering heuristics
personal preference
~~~

A lower item must not silently override a higher one.

## Review boundaries

Code review owns defect discovery and evidence for the changed source candidate. It may use focused tests or reproductions to establish a finding.

It does not claim to replace comprehensive testing strategy, dedicated security assessment, architecture certification, release-candidate QA, or deployment approval.

If the review discovers a concern in one of those domains, record the concrete defect and hand off deeper work rather than claiming that entire domain was completed.

## Signal over noise

A review comment is useful when it changes a decision or identifies a concrete defect/risk.

Do not file findings for purely aesthetic style preferences already accepted by the repository, speculative problems without a plausible execution path or contract violation, broad refactor suggestions unrelated to the requested change, duplicate symptoms with one shared root cause, or unchanged historical debt unless the current change newly depends on it, worsens it, or the task explicitly includes it.

Existing defects can still be material when the candidate preserves behavior that the governing SPEC explicitly requires to be corrected. Label their origin accurately instead of calling them regressions.

## Reviewer independence

Independent review is preferred for material changes.

Record whether the reviewer is independent from the implementation. If the same reviewer authors a fix, that person may verify mechanics of the correction but must not describe that self-check as independent review when repository policy requires separation.

Independence is metadata, not a reason to fabricate another reviewer.

## No hidden mutation

Normal review is read-only.

If remediation is authorized, keep review evidence and mutation evidence distinct:

~~~text
review candidate A
-> finding
-> authorized remediation
-> candidate B
-> focused fix validation
-> review affected surfaces on candidate B
~~~

Do not silently edit candidate A and still report its original SHA as the reviewed source.
