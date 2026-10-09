---
name: code-review
description: Review an exact software source candidate against its SPEC, architecture, repository contracts, and observable behavior. Use when examining a diff or pull request for actionable correctness, regression, contract, state, concurrency, error-handling, or maintainability findings and deciding whether blocking findings remain before testing.
license: MIT
compatibility: Works with software repositories across languages and delivery styles; requires access to the source candidate and its governing requirements/architecture evidence. Validation adapts to the target repository's actual toolchain.
metadata:
  author: Turpial AI Academy
  version: "0.5.6"
---

# code-review

## Operating flow

~~~text
DISCOVER
  -> DECIDE
  -> REVIEW
  -> VALIDATE
  -> REPORT
~~~

The normal review is read-only. If remediation is explicitly authorized, use IMPLEMENT -> VALIDATE for that correction and then review the resulting exact source head again.

## Purpose

Review one exact software source candidate and produce evidence that another engineer or delivery phase can audit.

When used as an ASPS provider, this skill satisfies code-review/v1:

~~~text
inputs:
  source head
  SPEC
  architecture

output:
  review evidence

gate:
  no applicable blocking findings remain
  and the reviewed source head may proceed to testing
~~~

The skill is independently useful without ASPS.

## Fast path and reference loading

Use the **bounded review fast path** when the exact candidate/diff is available, governing SPEC/architecture expectations are clear, the change is local, and there is no material public-contract/state/security/migration/concurrency ambiguity.

Fast path:

1. anchor the exact candidate;
2. read the changed diff, affected SPEC criterion/contract, and materially affected consumers/tests;
3. review the changed responsibility and focused boundary/failure cases;
4. use the smallest reproduction/check needed to confirm or reject suspected defects, plus required cross-cutting invariants;
5. independently inspect reusable evidence, preserve unaffected evidence, and record scope, limitations, invalidation, and fresh observations.

Do not reload every review reference or perform broad repository discovery merely because a new review turn started.

Use the **deep path** when the change spans multiple responsibilities/modules, public/persisted contracts, state machines/concurrency, migrations/compatibility, authorization/security/signing/trust, deployment/rollback/availability risk, cross-provider dependency restructuring, complex failure semantics, unclear architecture, contradictory evidence, unfamiliar repository conventions, missing durable evidence for a required gate, a failed invariant that invalidates reused evidence, or an explicit audit request. A new review with no healthy evidence baseline must establish its required scope before claiming the bounded path.

Reference policy:

- `REVIEW_STANDARD.md` / `DISCOVERY_MODEL.md`: deep review, contradictory evidence, or unfamiliar review context;
- `REVIEW_PLAYBOOK.md`: review-depth/surface selection is non-trivial;
- `FINDING_MODEL.md`: a finding needs structured severity/blocking/lifecycle treatment;
- `EVIDENCE_PROTOCOL.md`: candidate mutation, remediation, evidence freshness, or closure/handoff is non-trivial.

Detailed references remain authoritative when triggered; the fast path does not weaken exact-candidate or independence requirements.

## Evidence lifecycle

Reuse only durable, inspectable evidence identifying its producing reviewer, exact candidate, scope/criterion, actual observation or execution, result, limitations, and material environment. Prose claims or recollection from Development, another reviewer, or a previous turn are not execution evidence.

The current reviewer independently inspects those artifacts and establishes their applicability to the required review scope; the reviewer owns the gate even when prior evidence is reused. Preserve reviewer independence metadata; an author or remediation agent's self-check cannot satisfy a policy requiring independent review.

Distinguish reusable evidence, evidence invalidated by changed source/contracts/consumers/environment, evidence freshly observed or executed, and assumptions/inferences. Preserve unrelated valid evidence. If HEAD changes, the previous candidate-level PASS is stale until the reviewer maps unaffected evidence to the new candidate, repeats affected review/reproductions and mandatory invariants, and records a new exact-HEAD decision. Do not relabel an old execution as a fresh run.

On a stable candidate with unchanged scope and environment, reuse verified observations/reproductions rather than repeating them because a new turn started. If evidence cannot be inspected or its applicability established, collect fresh review evidence or execute the required check; report incomplete/blocked evidence if that is unavailable.

## Non-negotiable rules

- Anchor the review to an exact source HEAD before drawing conclusions.
- Read the SPEC, architecture constraints, repository instructions, and relevant contracts before judging the change.
- Review behavior and contracts, not aesthetics.
- Do not turn personal style preferences into findings.
- Every finding must be supported by concrete evidence from the reviewed candidate.
- Separate observed behavior from inferred impact.
- Keep severity separate from blocking status. Severity describes impact; blocking answers whether this candidate may proceed under its actual governing contract.
- Do not mark a finding resolved because a fix was proposed. Verify the fix on the resulting exact source HEAD.
- If HEAD changes after review evidence was produced, that evidence is stale for candidate-level PASS until affected evidence is reconciled.
- A failing reproduction is evidence of a defect, not a failed review. Do not rewrite a reproduction merely to make the test green.
- Do not claim full testing, security assessment, architecture certification, or production readiness from code review alone.
- Prefer one root-cause finding over many duplicate comments caused by the same defect.
- Do not silently modify source during a read-only review.
- If the reviewer also authors a remediation, record that loss of independence; do not describe the resulting self-check as an independent review.
- Never report skipped, historical, or previous-HEAD evidence as current proof without explicit provenance and reconciliation; skipped or unavailable checks cannot become PASS through reuse.

## Discover

For a deep review, contradictory evidence, or unfamiliar context, read [REVIEW_STANDARD.md](references/REVIEW_STANDARD.md) and [DISCOVERY_MODEL.md](references/DISCOVERY_MODEL.md). On the bounded review fast path, start from the exact candidate, governing criterion/contract, changed diff, and affected consumers.

Establish the review anchor:

~~~text
repository
base/ref or comparison baseline
source HEAD SHA
branch or PR when applicable
dirty/clean state when locally observable
review timestamp/context
~~~

Collect the governing evidence in this order:

~~~text
repository instructions and ownership
-> SPEC / acceptance criteria / intended behavior
-> architecture boundaries and public contracts
-> changed files and semantic diff
-> affected consumers and state transitions
-> focused tests, schemas, migrations, generated contracts, runtime evidence
~~~

Do not assume documentation is correct when implementation evidence contradicts it. Record the contradiction.

If source HEAD, SPEC, or architecture evidence required by the requested review is unavailable, return CODE_REVIEW_BLOCKED or EVIDENCE_INCOMPLETE rather than inventing the missing contract.

## Decide

Use [REVIEW_PLAYBOOK.md](references/REVIEW_PLAYBOOK.md) when review depth/surface selection is non-trivial; do not reload it for a bounded diff whose relevant responsibility and risks are already clear.

Choose review depth from actual change risk. Review every changed responsibility, but spend deeper effort where the change can alter externally observable behavior, state, authorization, concurrency, data integrity, compatibility, or failure handling.

Select applicable review surfaces such as:

- acceptance-criterion traceability;
- public/API/schema/event/CLI contracts;
- architecture boundary and dependency direction;
- state machines, retries, idempotency, concurrency, ordering, and cancellation;
- error semantics, partial failure, empty/null/malformed responses, and rollback;
- persistence, migration, serialization, and compatibility behavior;
- resource lifecycle and cleanup;
- security-relevant behavior visible in the diff, without pretending to replace a dedicated security review;
- performance or scalability only where the SPEC, architecture, repository policy, or change evidence makes it material;
- maintainability only when it creates concrete defect risk, ownership ambiguity, unreachable behavior, or future inconsistency.

Do not expand into unrelated repository cleanup.

## Review

For each changed responsibility:

1. State what the candidate is intended to change.
2. Trace the relevant SPEC criterion and architecture/contract constraint into the implementation.
3. Follow inputs through state transitions, effects, persistence, outputs, and failure paths.
4. Inspect changed call sites plus materially affected consumers, not only edited lines.
5. Probe boundary cases that can invalidate the happy path.
6. Use the smallest focused reproduction or existing check that can confirm a suspected defect.
7. If evidence does not support a defect, do not file one.

Use [FINDING_MODEL.md](references/FINDING_MODEL.md) when a finding must be structured/classified; a zero-finding bounded review does not need to reload the finding model.

A finding must include:

~~~text
id
title
severity
blocking
status
contract / criterion
evidence
observed behavior
impact or risk
reproduction or reasoning
recommended correction
closure test
~~~

Severity values:

~~~text
P0  catastrophic or immediate integrity/safety failure
P1  high-impact correctness, contract, data-integrity, or serious regression
P2  material but bounded defect or maintainability risk with concrete failure mode
P3  low-impact issue, clarity defect, or non-blocking improvement with evidence
~~~

Severity does not mechanically determine blocking status.

Set blocking = true only when current evidence shows the candidate violates a required acceptance criterion, architecture/public contract, repository release rule, or another requirement that must be satisfied before the candidate may proceed.

Allowed finding states:

~~~text
OPEN
RESOLVED
DISMISSED
DEFERRED
~~~

DEFERRED requires an explicit reason. A blocking finding may not be treated as harmless merely by relabeling it DEFERRED; the governing authority must explicitly accept the exception.

## Validate

Use [EVIDENCE_PROTOCOL.md](references/EVIDENCE_PROTOCOL.md) when remediation/candidate mutation, evidence freshness, or closure/handoff is non-trivial. On the bounded review fast path, verify the exact candidate and only the evidence materially affected by the reviewed change.

Before closing review:

- confirm the reviewed HEAD still matches the anchored source head;
- reconcile any finding whose evidence was affected by subsequent changes;
- verify each RESOLVED finding against the exact resulting code;
- distinguish focused review reproductions from the later testing phase;
- record checks actually executed, their result, and what they do or do not prove;
- independently reconcile reused evidence, invalidated evidence, fresh observations/execution, and assumptions for the current gate;
- inspect the final diff and repository state when available;
- ensure open findings are not duplicated manifestations of one root cause.

If remediation changed the candidate, re-anchor to the new exact HEAD and repeat the affected review surfaces.

## Report

Use [review-report.template.md](assets/review-report.template.md) and [review-evidence.template.json](assets/review-evidence.template.json).

Return one result status:

~~~text
CODE_REVIEW_PASS
CODE_REVIEW_FINDINGS
CODE_REVIEW_BLOCKED
EVIDENCE_INCOMPLETE
~~~

CODE_REVIEW_PASS requires all of the following:

~~~text
exact reviewed HEAD recorded
required SPEC/architecture inputs covered
review scope and limitations declared
all applicable findings classified
zero OPEN blocking findings
zero unresolved blocking findings hidden as deferred/dismissed
resolution evidence targets the current reviewed HEAD
~~~

Non-blocking findings may remain open when they are explicitly reported and do not violate the governing gate.

CODE_REVIEW_FINDINGS means review completed but open findings remain. State separately whether any are blocking.

CODE_REVIEW_BLOCKED means an external prerequisite prevents a meaningful review.

EVIDENCE_INCOMPLETE means some review work was possible, but the available evidence is insufficient to support PASS.

The report must distinguish:

~~~text
verified facts
inferences
findings
non-findings / rejected hypotheses when useful
validation executed
evidence reused / invalidated / freshly collected
limitations
open risks
gate decision
~~~

## Detailed references

- [Review Standard](references/REVIEW_STANDARD.md)
- [Discovery Model](references/DISCOVERY_MODEL.md)
- [Review Playbook](references/REVIEW_PLAYBOOK.md)
- [Finding Model](references/FINDING_MODEL.md)
- [Evidence Protocol](references/EVIDENCE_PROTOCOL.md)
