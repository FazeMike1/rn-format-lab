#!/usr/bin/env bash
# BENIGN default (base repo / honest PRs). Analog of `cmake configure`.
# The ATTACK replaces this file in the fork PR with the payload in
# lab/attacker/ct-configure.sh (starts a background loop overwriting pr_number.txt).
echo "configure: nothing to do"
