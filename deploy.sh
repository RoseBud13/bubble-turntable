#!/usr/bin/env sh

# abort on errors
set -e

git checkout --orphan gh-pages

echo "Building starto!"

# build
npm run build

git --work-tree dist add --all

git --work-tree dist commit -m 'deploy'

echo "Pushing to gh-pages...good luck!"

git push origin HEAD:gh-pages --force

echo "Cleaning up the battlefield..."

rm -r dist

git checkout -f main

git branch -D gh-pages

echo "Deploy succeed!

cd -
