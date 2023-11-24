#!/bin/bash
set -e
if [ -z $1 ]
then
  echo "please provide new version like patch, minor or major"
  exit 1
fi
git checkout -B release origin/main -q
npm version $1 -m "build: release %s"
git push origin release --follow-tags -q
git checkout main -q
git branch -D release -q
