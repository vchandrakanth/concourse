exports.WebReporter = function (options) {
    var self = this;
    var testPassed = 0;
    var testTotal = 0;
    self.url = options.url;
    self.projectName = 'Concourse Labs',
        self.environment = 'adhoc',
        self.slackUrl = 'https://hooks.slack.com/services/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',
        self.channel = 'qa-e2e-test';
    var testRun = {
        projectName: self.projectName,
        environment: self.environment,
        status: "passed",
        endTime: Date,
        tests: []
    };
    self.specDone = function (sp) {
        var spec = JSON.parse(JSON.stringify(sp));
        spec.endTime = new Date();
        //remove not needed stack trace.
        for (var i = 0; i < spec.failedExpectations.length; i++) {
            spec.failedExpectations[i].stack = '';
        }
        testTotal++;
        if (spec.status === 'failed') {
            testRun.status = "failed";
        }
        if (spec.status === 'passed') {
            testPassed++;
        }
        testRun.tests.push(spec);
    };
    self.jasmineDone = function () {
        //spec.endTime = new Date(); = new Date();
        var request = require('request');
        var pretext = testRun.projectName + " -->>  " + testRun.status.toUpperCase();
        var text = 'Environment: ' + testRun.environment.toUpperCase() + '  -->> Tests passed: ' + testPassed + '/' + testTotal;
        var color = 'danger';
        if (testRun.status === 'passed') {
            color = 'good';
        }
        var attachments = [{ "pretext": pretext, "text": text, "color": color }];
        var payload = { "channel": self.channel, "username": "QA-E2E", "attachments": attachments };
        request.post(self.slackUrl, { json: true, body: payload }, function (err, res, body) {
            console.log(err);
        });
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamFzbWluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvZTJlL3NyYy91dGlscy9qYXNtaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxXQUFXLEdBQUcsVUFBUyxPQUFPO0lBQ3JDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztJQUNoQixJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDbkIsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBRWxCLElBQUksQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLGdCQUFnQjtRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFJLE9BQU87UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRywrRUFBK0U7UUFDL0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUE7SUFFL0IsSUFBSSxPQUFPLEdBQ1Y7UUFDQyxXQUFXLEVBQUcsSUFBSSxDQUFDLFdBQVc7UUFDOUIsV0FBVyxFQUFHLElBQUksQ0FBQyxXQUFXO1FBQ3JCLE1BQU0sRUFBRyxRQUFRO1FBQ2pCLE9BQU8sRUFBRyxJQUFJO1FBQ3ZCLEtBQUssRUFBRyxFQUFFO0tBQ1YsQ0FBQztJQUVILElBQUksQ0FBQyxRQUFRLEdBQUcsVUFBUyxFQUFFO1FBQzFCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUMxQixnQ0FBZ0M7UUFDaEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ3REO1lBQ0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDdEM7UUFDRCxTQUFTLEVBQUUsQ0FBQztRQUNaLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUM7WUFDNUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDMUI7UUFDRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFDO1lBQzVCLFVBQVUsRUFBRSxDQUFDO1NBQ2I7UUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxHQUFHO1FBQ2xCLDBDQUEwQztRQUMxQyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3RSxJQUFJLElBQUksR0FBRyxlQUFlLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyx1QkFBdUIsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUN4SCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUM7UUFDckIsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFDL0I7WUFDQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1NBQ2Y7UUFDRCxJQUFJLFdBQVcsR0FBRyxDQUFDLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO1FBQ2xFLElBQUksT0FBTyxHQUFHLEVBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUcsVUFBVSxFQUFFLFFBQVEsRUFBQyxhQUFhLEVBQUMsV0FBVyxFQUFFLENBQUE7UUFDekYsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUN6QixFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQyxFQUMzQixVQUFTLEdBQUcsRUFBQyxHQUFHLEVBQUMsSUFBSTtZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0gsQ0FBQyxDQUFDIn0=