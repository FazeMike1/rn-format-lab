#!/usr/bin/env bash
# BENIGN default (base repo / honest PRs). Analog of building+running the PR's pyrefly
# and emitting the primer diff. The ATTACK replaces this in the fork PR with
# lab/attacker/mp-run.sh.
printf '+example added line\n-example removed line\n' > fulldiff.txt
echo "mp-run: benign diff written"
