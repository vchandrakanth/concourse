exports.WebReporter = function (options) {
let self = this;
let testPassed = 0;
let testTotal = 0;

self.url = options.url;
self.projectName = 'Concourse Labs',
self.environment = 'adhoc',
self.slackUrl = 'https://hooks.slack.com/services/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',
self.channel = 'qa-e2e-test';

let testRun = {
projectName: self.projectName,
environment: self.environment,
status: 'passed',
endTime: Date,
tests: [],
};

self.specDone = function (sp) {
let spec = JSON.parse(JSON.stringify(sp));
spec.endTime = new Date();
// remove not needed stack trace.
for (let i = 0; i < spec.failedExpectations.length; i++) {
spec.failedExpectations[i].stack = '';
}
testTotal++;
if (spec.status === 'failed') {
testRun.status = 'failed';
}
if (spec.status === 'passed') {
testPassed++;
}
testRun.tests.push(spec);
};

self.jasmineDone = function () {
// spec.endTime = new Date(); = new Date();
let request = require('request');
let pretext = testRun.projectName + ' -->>  ' + testRun.status.toUpperCase();
let text = 'Environment: ' + testRun.environment.toUpperCase() + '  -->> Tests passed: ' + testPassed + '/' + testTotal;
let color = 'danger';
if (testRun.status === 'passed') {
color = 'good';
}
let attachments = [{ 'pretext': pretext, 'text': text, 'color': color }];
let payload = { 'channel': self.channel, 'username': 'QA-E2E', 'attachments': attachments };
request.post(self.slackUrl,
{ json: true, body: payload },
function (err, res, body) {
console.log(err);
});
};
};