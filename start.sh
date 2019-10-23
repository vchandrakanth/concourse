# Start selenium server and trash the verbose error messages from webdriver
webdriver-manager start 2>/dev/null & FOO_PID=$!
echo = "$FOO_PID"
# Wait 3 seconds for port 4444 to be listening connections
while ! nc -z 127.0.0.1 4444; do sleep 3; done
#  run protractor
protractor ./build/conf/conf.js
# look for the process of webdriver and kill it at the end of the test
kill $(ps -ef | grep webdriver | grep -v grep | awk '{ print $2 }')
