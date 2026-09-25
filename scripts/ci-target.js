// Benign CI-executed helper. PR B modifies LINE 2 (the `const mode` line).
// The attacker's bot suggestion hijacks that exact line. Keep this file's line
// numbering stable: line 2 must be the `const mode = ...;` line.
const mode = "testing";
console.log("ci-target running in mode:", mode);
