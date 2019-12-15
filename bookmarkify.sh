#!/usr/bin/env bash

bookmarkify() {
  declare name=$1

  : ${name:? required}
  : ${BOOKMARKIFY_SESSION:? required}

  name=${name%.js}
  if ! [[ -e ${name}.js ]] ;then 
    echo "---> missing file: ${name}.js"
    return
  fi
  base=https://bookmarkify.it/bookmarklets

  curl ${base} \
    -H "cookie: _bookmarkify_session=${BOOKMARKIFY_SESSION}" \
    -d "utf8=%E2%9C%93" \
    -d "authenticity_token=kRIiQ1a1xnhBdGEP0hiqbDLy2WvEQcb7%2BUY4c2PwqOHodGTO%2Fh8MX4yY2vj0U3phT0W8%2BsMkzZr8UA%2Fn6WHXDg%3D%3D" \
    -d "bookmarklet[name]=${name}" \
    -d "bookmarklet[code]=$(cat ${name}.js)"
}

[[ -e .profile ]] && source .profile
alias r='. bookmarkify.sh'
