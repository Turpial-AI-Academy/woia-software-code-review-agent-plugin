# Evidence Protocol

## Candidate identity

Every final review evidence set records the exact reviewed source HEAD.

If the source changes:

~~~text
old review evidence
-> determine affected surfaces
-> re-run affected review/reproduction
-> record new HEAD
-> recalculate finding states
~~~

Never attach PASS from one SHA to another without reconciliation.

## Reuse and invalidation

Durable review evidence identifies its location, producing reviewer/agent, candidate SHA, scope/criterion, actual source observations or executed command/procedure, result, limitations, and material environment/configuration. A prose claim or recollection without inspectable support is not evidence of execution.

The current reviewer independently verifies the artifacts, required scope, candidate bytes, governing contracts, affected consumers, and relevant environment before carrying evidence forward. Preserve the original reviewer's independence metadata; an implementation author's or remediation agent's self-check cannot be promoted to independent review. Reuse does not transfer ownership of the current review gate.

Classify each material evidence item:

- reusable: its supported invariant and material inputs remain unchanged;
- invalidated: changed source, contracts, consumers, environment, or a failed invariant affects its claim;
- fresh: observation or reproduction required for changed/unsupported obligations;
- assumption/inference: useful reasoning, but assumptions and inferences are not execution evidence.

Preserve unaffected valid evidence with its original provenance. Map previous-SHA evidence to the new candidate by stating the unaffected invariant and confirming its inputs stayed unchanged. Re-run affected review/reproductions and mandatory cross-cutting invariants; recalculate findings and issue a new candidate-level decision only after reconciliation. Do not present an earlier command as executed on the new SHA.

Reuse inspected evidence on an unchanged candidate, scope, and environment across turns. When required evidence is missing, unavailable, stale, or cannot be tied to the invariant, independently collect fresh observations or execute the relevant check. If that cannot be done, record the limitation and return EVIDENCE_INCOMPLETE or CODE_REVIEW_BLOCKED rather than PASS.

## Evidence classes

Verified fact
: directly observed in source, diff, executed command, test, schema, migration, or runtime evidence.

Inference
: conclusion derived from facts but not directly executed. Mark it as inference.

Risk
: plausible consequence whose occurrence was not directly observed. State conditions.

Recommendation
: proposed change. It is not evidence that the defect is fixed.

## Reproductions

Record commands/procedures actually executed and their candidate.

A reproduction that intentionally fails because it demonstrates the defect is successful review evidence. Preserve that distinction in reports.

If a harness itself fails before exercising the product, record it separately and do not count it as evidence for or against the product.

## Remediation verification

For a resolved finding:

1. identify the new exact HEAD;
2. verify the intended code change;
3. run the closure test or equivalent direct evidence;
4. inspect materially affected consumers;
5. ensure the correction did not create a new contract violation;
6. mark RESOLVED only after those checks.

If the same agent authored the fix, record reviewer independence = false for that remediation pass.

## Gate calculation

Compute:

~~~text
open_blocking_findings
open_non_blocking_findings
resolved_findings
dismissed_findings
deferred_findings
~~~

CODE_REVIEW_PASS requires open_blocking_findings = 0 and complete required evidence for the exact reviewed HEAD.

Open non-blocking findings are allowed only when explicitly reported.

A missing SPEC, missing architecture contract, inaccessible source candidate, or unstable/unidentifiable HEAD can prevent a trustworthy PASS.

## Handoff to testing

When PASS is warranted, testing receives the exact source HEAD, review scope, durable review evidence references with reuse/invalidation provenance, reviewer independence, resolved/open non-blocking findings, focused reproductions/regressions added or recommended, and limitations that testing should consider.

Do not tell testing that a behavior is proven beyond the evidence actually collected.
