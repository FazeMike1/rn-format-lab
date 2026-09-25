// BENIGN default format step (base repo / honest PRs).
// In react-native this is `yarn format-*` + `git diff > format.patch`. Here it just
// declares "formatting is clean" -> empty patch -> exit 0 -> reporter posts nothing.
// The ATTACK replaces THIS file in PR A's fork with lab/attacker/format-step.js.
'use strict';
const fs = require('fs');
fs.mkdirSync('.format-results', {recursive: true});
fs.writeFileSync('.format-results/format.patch', '');
fs.writeFileSync('.format-results/output.txt', 'formatting clean');
process.exit(0);
