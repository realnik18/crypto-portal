#!/bin/bash

git filter-branch --force --env-filter '
if [ "$GIT_COMMITTER_NAME" = "lovable-dev[bot]" ] || [ "$GIT_AUTHOR_NAME" = "lovable-dev[bot]" ]
then
    export GIT_COMMITTER_NAME="realnik18"
    export GIT_COMMITTER_EMAIL="svstnnk@gmail.com"
    export GIT_AUTHOR_NAME="realnik18"
    export GIT_AUTHOR_EMAIL="svstnnk@gmail.com"
fi
' --tag-name-filter cat -- --all 