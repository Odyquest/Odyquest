#!/bin/bash

hostname=data-backend
port=8080

counter_passed=0
counter_failed=0
current_test_failures=0

function compare_files() {
  diff <(jq --sort-keys . "$1") <(jq --sort-keys . "$2")
  cmp <(jq --sort-keys . "$1") <(jq --sort-keys . "$2") || return 1
}

function print_summary() {
  echo "Tests passed: $counter_passed"
  echo "Tests failed: $counter_failed"
}
function assertion_incorrect() {
  ((current_test_failures++))
}
function assertion_correct() {
  ((counter_passed++))
  echo "TEST PASSED"
}
function test_failed() {
  echo "TEST FAILED"
  ((counter_failed++))
}
function test_passed() {
  ((counter_passed++))
  echo "TEST PASSED"
}
function test_result() {
  # evaluate current test
  if [ "$current_test_failures" == 0 ]; then
    test_passed
  else
    test_failed
  fi
  # prepare for next test
  current_test_failures=0
}

mkdir -p temp
sleep 5 # wait until service is started

echo 'RUN TEST 001 "Public list should be empty"'
result_file=001-empty-list.json
expect_file=001-result-empty-list.json
curl -s -X GET \
  http://${hostname}:${port}/protected/chase -o temp/${result_file}
compare_files "temp/${result_file}" "testcases/${expect_file}" || assertion_incorrect
test_result

echo 'RUN TEST 002 "Protected list should be empty"'
result_file=002-empty-list.json
expect_file=002-result-empty-list.json
curl -s -X GET \
  http://${hostname}:${port}/protected/chase -o temp/${result_file}
compare_files "temp/${result_file}" "testcases/${expect_file}" || assertion_incorrect
test_result

echo 'RUN TEST 003 "Should add new chase"'
data_file=003-data-add-chase.json
result_file=003-add-chase.json
curl -s -X POST -H "Content-Type: application/json" \
  -d @./testcases/${data_file} \
  http://${hostname}:${port}/protected/chase -o temp/${result_file}
chase_id=$(jq '.chaseId' temp/${result_file})
chase_id=${chase_id//\"/}
echo "chase_id is $chase_id"
if [ "$chase_id" != 'null' ]; then echo "upload seems ok"; else assertion_incorrect; fi
test_result

echo 'RUN TEST 004 "Should download chase"'
result_file=004-added-chase.json
expect_file=003-data-add-chase.json
curl -s -X GET \
  "http://${hostname}:${port}/chase/${chase_id}" -o temp/${result_file}
compare_files "temp/${result_file}" "testcases/${expect_file}" # TODO fix this comparison
test_result

echo 'RUN TEST 005 "Should add image file"'
result_file=005-add-image.json
curl -s -X POST -H "Content-Type: multipart/form-data" \
  -F "chaseId=$chase_id" -F "name=test_image" \
  -F "file=@../../odyquest-app/src/assets/icons/icon-128x128.png" \
  http://${hostname}:${port}/protected/media -o temp/${result_file}
image_url=$(jq '.url' temp/${result_file})
image_url=${image_url//\"/}
if [ "$image_url" != 'null' ]; then echo "upload seems ok"; else assertion_incorrect; fi
image_mimetype=$(jq '.mimetype' temp/${result_file})
if [ "$image_mimetype" == '"image/png"' ]; then echo "mimetype is correct"; else assertion_incorrect; fi
test_result

echo 'RUN TEST 006 "Should download image"'
result_file=006-added-media.png
curl -s -X GET \
  "http://${hostname}:${port}/protected/${image_url}" -o temp/${result_file}
# TODO add check
echo "WARNING: no validation yet"
test_result

echo 'RUN TEST 007 "Should delete added chase"'
result_file=007-add-chase.json
curl -s -X DELETE \
  "http://${hostname}:${port}/protected/chase/${chase_id}" -o temp/${result_file}
api_status=$(jq '.status' temp/${result_file})
if [ "$api_status" == '"success"' ]; then echo "deleting seems ok"; else assertion_incorrect; fi
test_result

print_summary
exit $counter_failed
