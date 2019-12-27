#!/usr/bin/env bash
set -exo pipefail

# Script inspired by Matt Zeunert
# https://stackoverflow.com/a/40178818/763231
STATUS=`git status`

if [[ $STATUS == *'nothing to commit, working '*' clean'* ]]
then
    git add -f dist
    git commit -m 'Force-commit dist for publish'
    git push origin `git subtree split --prefix dist master`:gh-pages --force
    git reset HEAD^
else
    echo 'Refusing to publish: Need a clean working directory.'
fi
