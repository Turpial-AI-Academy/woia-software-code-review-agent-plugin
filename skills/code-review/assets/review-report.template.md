# Code Review Report

## 1. Candidate

Repository: <repository>
Base/reference: <base>
Source HEAD: <sha>
Branch/PR: <reference>
Reviewer independence: <independent | same-agent-remediation | unknown>

## 2. Governing inputs

SPEC: <reference>
Architecture: <reference>
Repository instructions/contracts: <references>

## 3. Review scope

Reviewed responsibilities:
- <responsibility>

Explicitly not reviewed:
- <surface>

## 4. Findings

### <FINDING-ID> — <title>

Severity: <P0|P1|P2|P3>
Blocking: <true|false>
Status: <OPEN|RESOLVED|DISMISSED|DEFERRED>
Contract/criterion: <reference>

Evidence:
- <path/function/line/command/result>

Observed behavior:
<fact>

Impact/risk:
<fact or clearly identified risk>

Reproduction/reasoning:
<steps or reasoning>

Recommended correction:
<change>

Closure test:
<proof required>

## 5. Validation executed

| Check/observation | Candidate | Result | Evidence reference | What it proves |
|---|---|---|---|---|
| <check or source inspection> | <sha> | <result> | <inspectable artifact/path> | <scope> |

Evidence lifecycle:

- Reused: <durable reference, original candidate/reviewer, unchanged invariant, applicability verified by current reviewer>.
- Invalidated: <changed surface/contract/environment, affected evidence, reason>.
- Fresh: <observation/execution, exact candidate, result, limitations>.
- Assumptions/inferences: <reasoning that is not execution evidence>.

## 6. Limitations

- <unavailable or unreviewed evidence>

## 7. Gate

Open blocking findings: <count>
Open non-blocking findings: <count>

Result: <CODE_REVIEW_PASS | CODE_REVIEW_FINDINGS | CODE_REVIEW_BLOCKED | EVIDENCE_INCOMPLETE>

Rationale:
<evidence-backed decision>

## 8. Handoff

Next phase/caller receives:
- exact reviewed HEAD;
- durable evidence references and reconciliation;
- original and current reviewer independence;
- finding states;
- focused regressions/reproductions;
- remaining non-blocking risks;
- limitations.
