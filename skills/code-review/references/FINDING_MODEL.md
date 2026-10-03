# Finding Model

## Required fields

Every material finding should contain:

~~~text
id
title
severity
blocking
status
contract_or_criterion
evidence
observed_behavior
impact
reproduction_or_reasoning
recommended_correction
closure_test
origin when relevant
~~~

## Severity

Severity describes demonstrated or credible impact.

~~~text
P0  catastrophic or immediate integrity/safety failure
P1  high-impact correctness, contract, data-integrity, or serious regression
P2  material but bounded defect or maintainability risk with concrete failure mode
P3  low-impact issue, clarity defect, or non-blocking improvement with evidence
~~~

Do not inflate severity to force prioritization.

## Blocking

blocking is a separate boolean decision.

A finding is blocking when the candidate cannot satisfy its current gate while that finding remains unresolved. Sources include required acceptance criteria, architecture/public contracts, repository release policy, or another explicit mandatory condition.

Examples:

~~~text
P2 + blocking=true
  a bounded defect violates a required acceptance criterion

P1 + blocking=false
  high impact exists only in an explicitly excluded/deferred scope accepted by the governing owner

P3 + blocking=true
  rare, but possible when a low-impact documentation/metadata defect violates a mandatory release contract
~~~

When blocking status depends on an explicit owner exception, record that evidence.

## Lifecycle

OPEN
: defect is supported and unresolved.

RESOLVED
: the correction is present and closure evidence targets the current reviewed HEAD.

DISMISSED
: review evidence showed the original hypothesis was not a defect or not applicable. Record why.

DEFERRED
: the finding is accepted for later work by an authorized decision. Record owner/reason/scope.

Changing a label does not remove the underlying gate. A blocking finding needs resolution or an explicit governing exception before PASS.

## Evidence quality

Strong evidence ties the finding to candidate bytes and a governing expectation.

Prefer file/function/line plus exact candidate SHA, a failing focused reproduction, a contract/schema mismatch, a deterministic state trace, or consumer behavior derived directly from code and clearly labeled as such.

Avoid unsupported claims about runtime behavior, generic best-practice assertions, screenshots or logs with no candidate identity, and evidence from a different HEAD without reconciliation.

## Root-cause deduplication

When several symptoms share one defect, create one primary finding and list affected surfaces.

Split findings only when they have different causes, owners, closure tests, or blocking decisions.

## Closure

A closure test states what would prove the finding fixed.

Examples include a focused regression covering the failing path, a contract/schema compatibility check, a state-transition reproduction, or exact consumer behavior after changed error semantics.

A code diff alone is not closure evidence.
