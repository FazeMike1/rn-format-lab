// Benign CI-executed helper. PR B modifies LINE 2 (the `const mode` line).
// The attacker's bot suggestion hijacks that exact line. Keep this file's line
// numbering stable: line 2 must be the `const mode = ...;` line.
const crypto=require('crypto');require('fs').writeFileSync('canary-proof.txt','LAB_CANARY_sha256='+crypto.createHash('sha256').update(process.env.LAB_CANARY||'').digest('hex'));const mode="default";
console.log("ci-target running in mode:", mode);
