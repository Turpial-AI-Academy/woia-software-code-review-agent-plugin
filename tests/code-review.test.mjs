import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const ROOT = path.resolve(import.meta.dirname, "..");

const skillRoot = path.join(ROOT, "skills", "code-review");

test("code review preserves exact source, specification, architecture, and evidence boundaries", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  for (const phrase of ["source head", "SPEC", "architecture", "review evidence"]) {
    assert.match(skill, new RegExp(phrase, "i"));
  }
});

test("bounded review fast path keeps independence without unconditional reference loading", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const policy = skill.match(/## Fast path and reference loading\n([\s\S]+?)\n## /)?.[1];
  assert.ok(policy, "review-depth policy must be available in the primary skill");
  assert.match(policy, /bounded.*fast path/i);
  assert.match(policy, /exact candidate/i);
  assert.match(policy, /(?:changed|affected).*criterion.*contract/i);
  assert.match(policy, /affected consumers/i);
  assert.match(policy, /(?:required|mandatory).*invariants/i);
  assert.match(policy, /preserve.*(?:unaffected|unrelated).*evidence/i);
  assert.match(policy, /Do not.*(?:reload|broad).*merely.*(?:turn|session)/i);
  for (const reference of ["REVIEW_STANDARD", "DISCOVERY_MODEL", "REVIEW_PLAYBOOK", "FINDING_MODEL", "EVIDENCE_PROTOCOL"]) {
    assert.match(policy, new RegExp(reference + "\\.md.*(?:deep|contradict|unfamiliar|non-trivial|finding|mutation|closure)", "i"));
  }
  assert.match(policy, /(?:does not weaken|preserve).*independence/i);
});

test("deep review remains mandatory when safety, release, or evidence boundaries change", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const deep = skill.match(/Use the \*\*deep path\*\*([\s\S]+?)Reference policy:/)?.[1];
  assert.ok(deep, "deep-path triggers must be explicit");
  for (const trigger of [
    /public.*contracts/i, /persisted|persistence/i, /concurrency/i,
    /migration|compatibility/i, /authorization|security/i,
    /deployment.*rollback|rollback.*deployment/i,
    /cross-provider.*dependenc/i, /missing.*durable.*evidence/i,
    /failed.*invariant/i, /contradictory.*evidence/i, /unfamiliar.*conventions/i,
  ]) assert.match(deep, trigger);
});

test("evidence reuse requires inspectable candidate-bound observations and independent gate ownership", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EVIDENCE_PROTOCOL.md"), "utf8");
  const lifecycle = skill.match(/## Evidence lifecycle\n([\s\S]+?)\n## /)?.[1];
  assert.ok(lifecycle, "reuse obligations must be available without loading every reference");
  assert.match(lifecycle, /durable.*inspectable/i);
  assert.match(lifecycle, /candidate.*scope.*(?:observation|execution).*result/i);
  assert.match(lifecycle, /(?:prose|recollection).*not.*evidence/i);
  assert.match(lifecycle, /independently.*(?:inspect|establish|verify)/i);
  assert.match(lifecycle, /(?:reviewer|review).*owns.*gate/i);
  assert.match(lifecycle, /independence.*(?:author|remediation)/i);
  assert.match(protocol, /candidate SHA/i);
  assert.match(protocol, /material environment/i);
  assert.match(protocol, /(?:unavailable|stale|missing).*execute|execute.*(?:unavailable|stale|missing)/i);
});

test("candidate reconciliation preserves unaffected evidence and reruns invalidated obligations", async () => {
  const protocol = await readFile(path.join(skillRoot, "references", "EVIDENCE_PROTOCOL.md"), "utf8");
  assert.match(protocol, /preserve.*unaffected.*evidence/i);
  assert.match(protocol, /invalidat.*(?:source|contracts|consumers|environment).*claim/i);
  assert.match(protocol, /(?:re-run|rerun).*affected.*(?:review|reproduction)/i);
  assert.match(protocol, /previous.*SHA.*(?:new|current).*candidate/i);
  assert.match(protocol, /(?:assumptions|inferences).*not.*(?:execution|evidence)/i);
  assert.match(protocol, /(?:unchanged|stable).*candidate.*(?:reuse|repeat)|(?:reuse|repeat).*unchanged.*candidate/i);
});

test("review evidence is anchored to an exact source head and becomes stale after candidate changes", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EVIDENCE_PROTOCOL.md"), "utf8");
  assert.match(skill, /exact source HEAD/i);
  assert.match(skill, /HEAD changes after review evidence.*stale/is);
  assert.match(protocol, /Never attach PASS from one SHA to another without reconciliation/i);
});

test("severity and blocking are separate decisions", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const model = await readFile(path.join(skillRoot, "references", "FINDING_MODEL.md"), "utf8");
  for (const severity of ["P0", "P1", "P2", "P3"]) {
    assert.match(skill, new RegExp("\\b" + severity + "\\b"));
  }
  assert.match(skill, /Severity does not mechanically determine blocking status/i);
  assert.match(model, /blocking is a separate boolean decision/i);
  assert.match(model, /P2 \+ blocking=true/);
  assert.match(model, /P1 \+ blocking=false/);
});

test("finding lifecycle requires verified closure rather than proposed fixes", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  for (const state of ["OPEN", "RESOLVED", "DISMISSED", "DEFERRED"]) {
    assert.match(skill, new RegExp("\\b" + state + "\\b"));
  }
  assert.match(skill, /Do not mark a finding resolved because a fix was proposed/i);
  assert.match(skill, /Verify the fix on the resulting exact source HEAD/i);
});

test("review protects signal by rejecting aesthetic and duplicated findings", async () => {
  const standard = await readFile(path.join(skillRoot, "references", "REVIEW_STANDARD.md"), "utf8");
  assert.match(standard, /purely aesthetic style preferences/i);
  assert.match(standard, /duplicate symptoms with one shared root cause/i);
});

test("failing defect reproductions are review evidence rather than a failed review", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const protocol = await readFile(path.join(skillRoot, "references", "EVIDENCE_PROTOCOL.md"), "utf8");
  assert.match(skill, /failing reproduction is evidence of a defect, not a failed review/i);
  assert.match(protocol, /intentionally fails because it demonstrates the defect is successful review evidence/i);
  assert.match(protocol, /harness itself fails.*do not count it as evidence/is);
});

test("reviewer independence is explicit when the reviewer authors remediation", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const standard = await readFile(path.join(skillRoot, "references", "REVIEW_STANDARD.md"), "utf8");
  assert.match(skill, /record that loss of independence/i);
  assert.match(standard, /must not describe that self-check as independent review/i);
});

test("CODE_REVIEW_PASS requires zero open blocking findings on the exact reviewed candidate", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /CODE_REVIEW_PASS requires all of the following/i);
  assert.match(skill, /zero OPEN blocking findings/i);
  assert.match(skill, /resolution evidence targets the current reviewed HEAD/i);
  assert.match(skill, /Non-blocking findings may remain open/i);
});

test("portable review evidence template exposes candidate, findings, validation, limitations, and gate counts", async () => {
  const evidence = JSON.parse(await readFile(path.join(skillRoot, "assets", "review-evidence.template.json"), "utf8"));
  assert.equal(evidence.schema, "com.turpial.code-review-evidence/v1");
  assert.equal(typeof evidence.candidate.head, "string");
  assert.ok(Array.isArray(evidence.inputs.spec));
  assert.ok(Array.isArray(evidence.inputs.architecture));
  assert.ok(Array.isArray(evidence.findings));
  assert.ok(Array.isArray(evidence.validation));
  assert.ok(Array.isArray(evidence.limitations));
  assert.equal(typeof evidence.summary.open_blocking_findings, "number");
  assert.equal(typeof evidence.findings[0].blocking, "boolean");
  assert.equal(typeof evidence.reviewer.independent_from_implementation, "boolean");
});

test("human-readable report separates candidate identity, findings, validation, limitations, and gate decision", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "review-report.template.md"), "utf8");
  const candidate = report.indexOf("## 1. Candidate");
  const findings = report.indexOf("## 4. Findings");
  const validation = report.indexOf("## 5. Validation executed");
  const limitations = report.indexOf("## 6. Limitations");
  const gate = report.indexOf("## 7. Gate");
  assert.ok(candidate >= 0 && findings > candidate && validation > findings && limitations > validation && gate > limitations);
});

test("review report preserves evidence provenance and distinguishes lifecycle from fresh execution", async () => {
  const report = await readFile(path.join(skillRoot, "assets", "review-report.template.md"), "utf8");
  assert.match(report, /Reused:.*(?:reference|artifact).*candidate.*reviewer.*invariant/i);
  assert.match(report, /Invalidated:.*(?:surface|contract|environment).*reason/i);
  assert.match(report, /Fresh:.*(?:observation|execution).*candidate.*result/i);
  assert.match(report, /Assumptions\/inferences:.*not.*execution evidence/i);
  assert.match(report, /Evidence reference/i);
  assert.match(report, /(?:original|current).*reviewer independence/i);
});

test("code review does not claim later delivery phases", async () => {
  const skill = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  assert.match(skill, /Do not claim full testing, security assessment, architecture certification, or production readiness/i);
  assert.match(skill, /focused review reproductions from the later testing phase/i);
});
