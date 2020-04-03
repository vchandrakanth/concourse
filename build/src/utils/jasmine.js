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
        request.post(self.slackUrl, { json: true, body: payload }, function (err, res, body) {
            console.log(err);
        });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamFzbWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9qYXNtaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBVSxPQUFPO0lBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU87UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRywrRUFBK0U7UUFDL0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUM7SUFFN0IsSUFBSSxPQUFPLEdBQUc7UUFDZCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7UUFDN0IsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXO1FBQzdCLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsS0FBSyxFQUFFLEVBQUU7S0FDUixDQUFDO0lBRUYsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLEVBQUU7UUFDNUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzFCLGlDQUFpQztRQUNqQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6RCxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNyQztRQUNELFNBQVMsRUFBRSxDQUFDO1FBQ1osSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUM5QixPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUN6QjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDOUIsVUFBVSxFQUFFLENBQUM7U0FDWjtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLEdBQUc7UUFDbkIsMkNBQTJDO1FBQzNDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNqQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzdFLElBQUksSUFBSSxHQUFHLGVBQWUsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLHVCQUF1QixHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ3hILElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUNyQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ2pDLEtBQUssR0FBRyxNQUFNLENBQUM7U0FDZDtRQUNELElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDekUsSUFBSSxPQUFPLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsQ0FBQztRQUM1RixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQzFCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQzdCLFVBQVUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFDLENBQUM7SUFDSCxDQUFDLENBQUM7QUFDRixDQUFDLENBQUMifQ==