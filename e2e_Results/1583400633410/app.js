var app = angular.module('reportingApp', []);

//<editor-fold desc="global helpers">

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};
var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
    } else if (getSpec(item.description) !== getSpec(prevItem.description)) {
        item.displaySpecName = true;
    }
};

var getParent = function (str) {
    var arr = str.split('|');
    str = "";
    for (var i = arr.length - 2; i > 0; i--) {
        str += arr[i] + " > ";
    }
    return str.slice(0, -3);
};

var getShortDescription = function (str) {
    return str.split('|')[0];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};

var convertTimestamp = function (timestamp) {
    var d = new Date(timestamp),
        yyyy = d.getFullYear(),
        mm = ('0' + (d.getMonth() + 1)).slice(-2),
        dd = ('0' + d.getDate()).slice(-2),
        hh = d.getHours(),
        h = hh,
        min = ('0' + d.getMinutes()).slice(-2),
        ampm = 'AM',
        time;

    if (hh > 12) {
        h = hh - 12;
        ampm = 'PM';
    } else if (hh === 12) {
        h = 12;
        ampm = 'PM';
    } else if (hh === 0) {
        h = 12;
    }

    // ie: 2013-02-18, 8:35 AM
    time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

    return time;
};

var defaultSortFunction = function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) {
        return -1;
    } else if (a.sessionId > b.sessionId) {
        return 1;
    }

    if (a.timestamp < b.timestamp) {
        return -1;
    } else if (a.timestamp > b.timestamp) {
        return 1;
    }

    return 0;
};

//</editor-fold>

app.controller('ScreenshotReportController', ['$scope', '$http', 'TitleService', function ($scope, $http, titleService) {
    var that = this;
    var clientDefaults = {};

    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, clientDefaults.searchSettings || {}); // enable customisation of search settings on first page hit

    this.warningTime = 1400;
    this.dangerTime = 1900;
    this.totalDurationFormat = clientDefaults.totalDurationFormat;
    this.showTotalDurationIn = clientDefaults.showTotalDurationIn;

    var initialColumnSettings = clientDefaults.columnSettings; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        } else {
            this.inlineScreenshots = false;
        }
        if (initialColumnSettings.warningTime) {
            this.warningTime = initialColumnSettings.warningTime;
        }
        if (initialColumnSettings.dangerTime) {
            this.dangerTime = initialColumnSettings.dangerTime;
        }
    }


    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        return getParent(str);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };

    this.getShortDescription = function (str) {
        return getShortDescription(str);
    };
    this.hasNextScreenshot = function (index) {
        var old = index;
        return old !== this.getNextScreenshotIdx(index);
    };

    this.hasPreviousScreenshot = function (index) {
        var old = index;
        return old !== this.getPreviousScreenshotIdx(index);
    };
    this.getNextScreenshotIdx = function (index) {
        var next = index;
        var hit = false;
        while (next + 2 < this.results.length) {
            next++;
            if (this.results[next].screenShotFile && !this.results[next].pending) {
                hit = true;
                break;
            }
        }
        return hit ? next : index;
    };

    this.getPreviousScreenshotIdx = function (index) {
        var prev = index;
        var hit = false;
        while (prev > 0) {
            prev--;
            if (this.results[prev].screenShotFile && !this.results[prev].pending) {
                hit = true;
                break;
            }
        }
        return hit ? prev : index;
    };

    this.convertTimestamp = convertTimestamp;


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };

    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.totalDuration = function () {
        var sum = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.duration) {
                sum += result.duration;
            }
        }
        return sum;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };


    var results = [
    {
        "description": "Step 1: Create Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00eb00ca-0067-00a0-0095-00010066009b.png",
        "timestamp": 1583400645893,
        "duration": 21781
    },
    {
        "description": "Step 2: Edit Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00140057-002d-00f8-0090-0085001c006a.png",
        "timestamp": 1583400668417,
        "duration": 13385
    },
    {
        "description": "Step 3: Delete Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d90011-003c-00ed-00da-008000620088.png",
        "timestamp": 1583400682493,
        "duration": 19357
    },
    {
        "description": "Step 4: Verify Attribute Tag Deleted or Not|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00df0050-0016-0068-00ca-00bb00f0004a.png",
        "timestamp": 1583400702429,
        "duration": 10659
    },
    {
        "description": "Step 1: Create Attribute Tag|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004800c8-0048-00be-00a7-0049001900ff.png",
        "timestamp": 1583400713701,
        "duration": 13926
    },
    {
        "description": "Step 2: Create New Enclave Model|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00af00b3-003e-0089-00d8-00c5000d00cb.png",
        "timestamp": 1583400728281,
        "duration": 31432
    },
    {
        "description": "Step 3: Edit Enclave Model|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d2000d-0073-00be-0029-002b00bf002c.png",
        "timestamp": 1583400760376,
        "duration": 20507
    },
    {
        "description": "Step 4: Delete Enclave Model|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f60037-00b0-0094-008f-000a002000cc.png",
        "timestamp": 1583400781472,
        "duration": 16458
    },
    {
        "description": "Step 5: Verify Enclave Model Deleted Or Not|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006b004c-00b4-0020-0048-006000c5009d.png",
        "timestamp": 1583400798539,
        "duration": 10742
    },
    {
        "description": "Step 6: Clean Up|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "009000eb-0085-0027-00b8-00e900860059.png",
        "timestamp": 1583400809919,
        "duration": 4913
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e0044-006f-004c-008b-0084006900d2.png",
        "timestamp": 1583400815564,
        "duration": 18922
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0023001e-003e-008f-000f-007400af003d.png",
        "timestamp": 1583400835119,
        "duration": 17982
    },
    {
        "description": "Step 3: Create New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '7669\nUser Permissions\nv0.1\npublished\nself managed\nOct 23, 2019, 4:02:14 PM\nOct 23, 2019, 4:02:14 PM' to match 'Test Enclave Model244', 'Field Test Enclave Model244 should Test Enclave Model244 have value as Test Enclave Model244'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00460089-00f1-0048-006d-007100870037.png",
        "timestamp": 1583400853720,
        "duration": 29736
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: By(xpath, //span[.='us-east-1'])Region \nWait timed out after 10043ms"
        ],
        "trace": [
            "TimeoutError: By(xpath, //span[.='us-east-1'])Region \nWait timed out after 10043ms\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: By(xpath, //span[.='us-east-1'])Region \n    at scheduleWait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at thenableWebDriverProxy.wait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\waitHelper.ts:24:24)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\waitHelper.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\waitHelper.js:4:12)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:57:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00dc0029-001d-008f-00b9-0010000300f6.png",
        "timestamp": 1583400884133,
        "duration": 34109
    },
    {
        "description": "Step 4: Update New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-axv-c2=\"\" class=\"nav-link active\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" ng-reflect-router-link=\"assets\" ng-reflect-router-link-active=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-axv-c2=\"\" class=\"nav-link active\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" ng-reflect-router-link=\"assets\" ng-reflect-router-link-active=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:254:11)\nFrom: Task: Run it(\"Step 4: Update New Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:67:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "008f00cb-0059-0090-00c2-00f8009b00bf.png",
        "timestamp": 1583400918847,
        "duration": 494
    },
    {
        "description": "Step 6: Update Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment271'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment271'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:175:15)\nFrom: Task: Run it(\"Step 6: Update Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:76:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a7002e-008d-00b1-0001-00a2000a00b8.png",
        "timestamp": 1583400919963,
        "duration": 15292
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment271'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment271'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:86:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0027006d-0056-0054-0005-0040004d00fa.png",
        "timestamp": 1583400935855,
        "duration": 15972
    },
    {
        "description": "Step 8: Clean Up|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model244'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model244'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Clean Up\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:92:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c60001-00f5-0088-009f-00bb00370098.png",
        "timestamp": 1583400952401,
        "duration": 25655
    },
    {
        "description": "Step 1: Create New Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //strong[.='Allowed AWS Products in Stacks'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //strong[.='Allowed AWS Products in Stacks'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:189:14)\n    at ActionSequence.mouseDown (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:225:17)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:116:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\policyGroupTemplate.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "003f0099-0059-0085-00f3-005f00a000d5.png",
        "timestamp": 1583400978720,
        "duration": 25571
    },
    {
        "description": "Step 2: Edit Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft71\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft71\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:171:11)\nFrom: Task: Run it(\"Step 2: Edit Policy Group Template With Draft Status\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroupTemplate.ts:28:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ab0080-0061-007c-0041-003000680067.png",
        "timestamp": 1583401004933,
        "duration": 20922
    },
    {
        "description": "Step 3: Delete Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft71 Updated\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft71 Updated\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:220:11)\nFrom: Task: Run it(\"Step 3: Delete Policy Group Template With Draft Status\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroupTemplate.ts:35:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b900cb-00df-0058-00ab-007100980035.png",
        "timestamp": 1583401026464,
        "duration": 16245
    },
    {
        "description": "Step 4: Verify Policy Group Template With Draft Status Deleted or Not|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c500b7-008c-0052-00ed-002300680045.png",
        "timestamp": 1583401043335,
        "duration": 14565
    },
    {
        "description": "Step 5: Creating Policy Group Template with  Published|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //strong[.='Allowed AWS Products in Stacks'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //strong[.='Allowed AWS Products in Stacks'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:189:14)\n    at ActionSequence.mouseDown (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:225:17)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:116:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\policyGroupTemplate.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b500e6-00db-0052-0016-0098000700a3.png",
        "timestamp": 1583401058485,
        "duration": 25427
    },
    {
        "description": "Step 6: CleanUp|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Publish130\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Publish130\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:220:11)\nFrom: Task: Run it(\"Step 6: CleanUp\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroupTemplate.ts:54:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "006700a4-00ed-0099-0025-002e002e0006.png",
        "timestamp": 1583401084563,
        "duration": 16316
    },
    {
        "description": "Step 1: Create New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00860010-001d-0072-0026-008c000c0005.png",
        "timestamp": 1583401101510,
        "duration": 12186
    },
    {
        "description": "Step 2: Search Default Group For New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007e00e7-0004-00e1-0076-004400110038.png",
        "timestamp": 1583401114337,
        "duration": 10136
    },
    {
        "description": "Step 3: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Identity Admin')]//button[@data-e2e='deleteRoleAssignment'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Identity Admin')]//button[@data-e2e='deleteRoleAssignment'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:355:37)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a400ec-009d-009f-00dd-00c400800063.png",
        "timestamp": 1583401125133,
        "duration": 22050
    },
    {
        "description": "Step 4: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Institution Admin')]//button[@data-e2e='deleteRoleAssignment'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Institution Admin')]//button[@data-e2e='deleteRoleAssignment'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:355:37)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00340066-00ec-0017-0062-00cb006300c8.png",
        "timestamp": 1583401147869,
        "duration": 22258
    },
    {
        "description": "Step 5: Remove Permission Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Permission Admin')]//button[@data-e2e='deleteRoleAssignment'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Permission Admin')]//button[@data-e2e='deleteRoleAssignment'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:355:37)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "005b0051-00bb-0081-003e-0096009600c0.png",
        "timestamp": 1583401170835,
        "duration": 22375
    },
    {
        "description": "Step 6: Remove Surface Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Surface Admin')]//button[@data-e2e='deleteRoleAssignment'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //li[contains(.,'Surface Admin')]//button[@data-e2e='deleteRoleAssignment'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:355:37)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "001700b7-00b5-0085-0096-008e008c0096.png",
        "timestamp": 1583401193919,
        "duration": 22391
    },
    {
        "description": "Step 7: Deassociate Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00dd009a-0092-0082-0012-00e700ed000f.png",
        "timestamp": 1583401216975,
        "duration": 4077
    },
    {
        "description": "Step 8: Delete Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d8004d-0076-0092-0008-00d000c3003c.png",
        "timestamp": 1583401221650,
        "duration": 10211
    },
    {
        "description": "Step 9: Verify Surface|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-nxa-c2=\"\" class=\"nav-link active\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" ng-reflect-router-link=\"surfaces\" ng-reflect-router-link-active=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-nxa-c2=\"\" class=\"nav-link active\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" ng-reflect-router-link=\"surfaces\" ng-reflect-router-link-active=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Surface.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\surfaces.Po.ts:171:15)\nFrom: Task: Run it(\"Step 9: Verify Surface\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\surfaces.ts:71:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a700d7-00b1-000f-0026-00c300200066.png",
        "timestamp": 1583401232578,
        "duration": 520
    },
    {
        "description": "Step 10: Remove User From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-nxa-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-nxa-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:241:15)\nFrom: Task: Run it(\"Step 10: Remove User From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\surfaces.ts:76:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "005800f3-00b9-00d0-008a-00c300a30059.png",
        "timestamp": 1583401233793,
        "duration": 512
    },
    {
        "description": "Step 11: Delete Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, .delete)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .delete)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:197:33)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "002f009c-006b-00a9-006d-005b00d70090.png",
        "timestamp": 1583401234982,
        "duration": 30837
    },
    {
        "description": "Step 1:Invite User|Invite Users",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"email\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"email\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at InviteUser.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\inviteUser.Po.ts:30:15)\nFrom: Task: Run it(\"Step 1:Invite User\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\inviteUser.ts:17:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\inviteUser.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\inviteUser.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\inviteUser.js:16:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009e00ce-00a9-00e7-00b3-009800970062.png",
        "timestamp": 1583401266487,
        "duration": 21163
    },
    {
        "description": "Step 1: Create New Cloud Role|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, .btn-sm.btn-primary)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, .btn-sm.btn-primary)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:104:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\cloudRoles.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "002f0005-00cc-0017-0063-00ab00360049.png",
        "timestamp": 1583401288317,
        "duration": 28256
    },
    {
        "description": "Step 2: Create New Group|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:84:15)\nFrom: Task: Run it(\"Step 2: Create New Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:46:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fb00a2-0064-002d-0039-007d00b400c0.png",
        "timestamp": 1583401317258,
        "duration": 560
    },
    {
        "description": "Step 3: Asign User For New Group|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:208:15)\nFrom: Task: Run it(\"Step 3: Asign User For New Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:53:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003e003c-0028-00aa-00be-00f1006e00cb.png",
        "timestamp": 1583401318457,
        "duration": 513
    },
    {
        "description": "Step 4: Add Cloud Role For Group|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kip-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:373:15)\nFrom: Task: Run it(\"Step 4: Add Cloud Role For Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:58:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0045003f-0072-0091-005d-00b600560095.png",
        "timestamp": 1583401319608,
        "duration": 503
    },
    {
        "description": "Step 5: Edit AWS Action and Publish|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:157:11)\nFrom: Task: Run it(\"Step 5: Edit AWS Action and Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:63:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "002d0066-00e3-00e5-0015-00070023009e.png",
        "timestamp": 1583401320753,
        "duration": 13935
    },
    {
        "description": "Step 6: Edit AWS Non Action and Publish|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:157:11)\nFrom: Task: Run it(\"Step 6: Edit AWS Non Action and Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:67:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ce0061-0057-000c-0035-00e7009e000d.png",
        "timestamp": 1583401335324,
        "duration": 13995
    },
    {
        "description": "Step 7: Edit AWS Non Action and Publish|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:157:11)\nFrom: Task: Run it(\"Step 7: Edit AWS Non Action and Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:71:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ef009e-00b0-0014-00b7-00da00000065.png",
        "timestamp": 1583401349957,
        "duration": 14048
    },
    {
        "description": "Step 8: Edit AWS Non Action and Publish|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:157:11)\nFrom: Task: Run it(\"Step 8: Edit AWS Non Action and Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:75:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0080003e-0063-000f-00c6-00da00ec005b.png",
        "timestamp": 1583401364638,
        "duration": 14037
    },
    {
        "description": "Step 9: Edit Cloud Role|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:157:11)\nFrom: Task: Run it(\"Step 9: Edit Cloud Role\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:79:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00dc0038-003b-0015-00a5-00c2006a0050.png",
        "timestamp": 1583401379277,
        "duration": 14037
    },
    {
        "description": "Step 10: Remove Cloud Role|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:151:15)\nFrom: Task: Run it(\"Step 10: Remove Cloud Role\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:85:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00540099-00f7-0068-001b-005e00e9008a.png",
        "timestamp": 1583401393974,
        "duration": 11729
    },
    {
        "description": "Step 11: Remove User From Group|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:151:15)\nFrom: Task: Run it(\"Step 11: Remove User From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:89:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "004b00c3-00e7-00be-0049-00e700810005.png",
        "timestamp": 1583401406322,
        "duration": 11545
    },
    {
        "description": "Step 12: De-associate Group From Surface|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, span[data-e2e='null'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[data-e2e='null'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:170:33)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00170048-00a9-0084-00b8-00a100a100bd.png",
        "timestamp": 1583401418518,
        "duration": 23528
    },
    {
        "description": "Step 13: Delete Group|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //h5[.='E2E Test Group332'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:151:15)\nFrom: Task: Run it(\"Step 13: Delete Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:98:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "005b0085-0078-0044-0000-007e00b00088.png",
        "timestamp": 1583401442732,
        "duration": 18520
    },
    {
        "description": "Step 14: Delete Cloud Role|Creating Cloud Roles",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637 Updated'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e='E2E-Cloud Role637 Updated'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at CloudRoles.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\cloudRoles.Po.ts:361:11)\nFrom: Task: Run it(\"Step 14: Delete Cloud Role\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\cloudRoles.ts:102:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\cloudRoles.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ea005b-008b-00de-0065-009c00a30010.png",
        "timestamp": 1583401461965,
        "duration": 15194
    },
    {
        "description": "Step 1: Create New Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00cb00c8-00a6-00cd-0039-005b003200b9.png",
        "timestamp": 1583401477803,
        "duration": 6834
    },
    {
        "description": "Step 2: Asign User For New Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002c0020-0040-0094-00ef-008200a300e1.png",
        "timestamp": 1583401485370,
        "duration": 7387
    },
    {
        "description": "Step 3: Add Role Assignment For Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002300eb-00ed-0090-0078-00810090002e.png",
        "timestamp": 1583401493396,
        "duration": 19474
    },
    {
        "description": "Step 4: Add Another Role Assignment For Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00050077-00bb-001a-0094-004d00960048.png",
        "timestamp": 1583401513571,
        "duration": 20122
    },
    {
        "description": "Step 5: Remove Role Assignment From Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004f0070-00fe-00ee-00d7-006a00840075.png",
        "timestamp": 1583401534422,
        "duration": 17150
    },
    {
        "description": "Step 6: Verify Role Assignment Removed Or Not|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00db0084-0091-0069-0049-003a006b00ce.png",
        "timestamp": 1583401552230,
        "duration": 22226
    },
    {
        "description": "Step 7: Remove Role Assignment From Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003200d4-0095-00d8-0035-00a8005700f9.png",
        "timestamp": 1583401575077,
        "duration": 15231
    },
    {
        "description": "Step 8: Verify Role Assignment Removed Or Not|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0054005a-00aa-0020-0053-008b005400a6.png",
        "timestamp": 1583401590941,
        "duration": 22090
    },
    {
        "description": "Step 9: Remove User From Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0031000c-00df-00fc-00fe-008e00a1007e.png",
        "timestamp": 1583401613640,
        "duration": 18762
    },
    {
        "description": "Step 10: Deassociate Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00100089-002b-00de-009c-00fa00730064.png",
        "timestamp": 1583401633257,
        "duration": 4128
    },
    {
        "description": "Step 11: Delete Group|Creating Groups Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "005900bd-0020-0053-000c-00fc00320054.png",
        "timestamp": 1583401638171,
        "duration": 14430
    },
    {
        "description": "Step 1: Create New Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001d0097-00d6-00a5-00da-002d00d30056.png",
        "timestamp": 1583401653314,
        "duration": 12971
    },
    {
        "description": "Step 2: Asign User For New Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0053009c-00ca-00ea-001f-00ae006f00e2.png",
        "timestamp": 1583401667311,
        "duration": 10299
    },
    {
        "description": "Step 3: Add Role Assignment For Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004600c8-00bc-0052-004a-002800a20089.png",
        "timestamp": 1583401678234,
        "duration": 30673
    },
    {
        "description": "Step 4: Create Attribute Tag|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007400fa-0070-007b-00d4-00a900dd009b.png",
        "timestamp": 1583401709569,
        "duration": 18032
    },
    {
        "description": "Step 5: Create New Enclave Model|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00940071-00d3-009e-00e4-002d000100f8.png",
        "timestamp": 1583401728446,
        "duration": 31102
    },
    {
        "description": "Step 6: Logical Deployement|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: By(xpath, //span[.='us-east-1'])Region \nWait timed out after 10063ms"
        ],
        "trace": [
            "TimeoutError: By(xpath, //span[.='us-east-1'])Region \nWait timed out after 10063ms\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2201:17\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: By(xpath, //span[.='us-east-1'])Region \n    at scheduleWait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2188:20)\n    at ControlFlow.wait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2517:12)\n    at thenableWebDriverProxy.wait (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:934:29)\n    at run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\browser.js:59:33)\n    at ProtractorBrowser.to.(anonymous function) [as wait] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\browser.js:67:16)\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\waitHelper.ts:24:24)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\waitHelper.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\waitHelper.js:4:12)\nFrom: Task: Run it(\"Step 6: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:80:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c100aa-004f-0079-008f-00e300a90038.png",
        "timestamp": 1583401760222,
        "duration": 33995
    },
    {
        "description": "Step 7: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kdp-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kdp-c2=\"\" class=\"nav-link\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:341:15)\nFrom: Task: Run it(\"Step 7: Remove Role Assignment From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:90:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0030008d-009d-00e5-005e-00fa009400b5.png",
        "timestamp": 1583401794854,
        "duration": 555
    },
    {
        "description": "Step 8: Delete Logical Deployment|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment322'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment322'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 8: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:97:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e600b0-00b8-001d-004d-0073003a006f.png",
        "timestamp": 1583401796124,
        "duration": 15977
    },
    {
        "description": "Step 9: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected true to be false."
        ],
        "trace": [
            "Error: Failed expectation\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:283:27\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ed0065-007b-0087-0047-0041005b0057.png",
        "timestamp": 1583401812795,
        "duration": 5472
    },
    {
        "description": "Step 10: Verify Role Assignment Removed Or Not|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xbn-c2=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xbn-c2=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:449:15)\nFrom: Task: Run it(\"Step 10: Verify Role Assignment Removed Or Not\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:109:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00380049-00a5-001f-00c2-0002008d0086.png",
        "timestamp": 1583401818943,
        "duration": 548
    },
    {
        "description": "Step 11: Add Role Assignment again For Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xbn-c2=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xbn-c2=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" ng-reflect-router-link=\"user-management/groups\" ng-reflect-router-link-active=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 585). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:281:15)\nFrom: Task: Run it(\"Step 11: Add Role Assignment again For Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:115:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "001f008b-00c3-0091-00f8-0024003d00ae.png",
        "timestamp": 1583401820251,
        "duration": 783
    },
    {
        "description": "Step 12: Delete Enclave Model|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00dc009f-009d-00e0-00d7-00fe00e9007a.png",
        "timestamp": 1583401821784,
        "duration": 15957
    },
    {
        "description": "Step 13: Delete Attribute Tag|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "003000f0-0015-0059-0070-002200c2003c.png",
        "timestamp": 1583401838396,
        "duration": 4840
    },
    {
        "description": "Step 14: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008d0072-0042-006f-0086-00d400ee001c.png",
        "timestamp": 1583401843968,
        "duration": 20755
    },
    {
        "description": "Step 15: Remove User From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008000b2-0086-0092-0014-006400bb0091.png",
        "timestamp": 1583401865409,
        "duration": 18707
    },
    {
        "description": "Step 16: Deassociate Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002f0065-00f2-006b-00e7-00fb000e0032.png",
        "timestamp": 1583401884835,
        "duration": 4083
    },
    {
        "description": "Step 17: Delete Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba7c0744f05078fb272f217d20bd04c8",
        "instanceId": 5516,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00e0003c-00d1-0048-004d-00ae00e700c0.png",
        "timestamp": 1583401889614,
        "duration": 13471
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});

    };

    this.setTitle = function () {
        var title = $('.report-title').text();
        titleService.setTitle(title);
    };

    // is run after all test data has been prepared/loaded
    this.afterLoadingJobs = function () {
        this.sortSpecs();
        this.setTitle();
    };

    this.loadResultsViaAjax = function () {

        $http({
            url: './combined.json',
            method: 'GET'
        }).then(function (response) {
                var data = null;
                if (response && response.data) {
                    if (typeof response.data === 'object') {
                        data = response.data;
                    } else if (response.data[0] === '"') { //detect super escaped file (from circular json)
                        data = CircularJSON.parse(response.data); //the file is escaped in a weird way (with circular json)
                    } else {
                        data = JSON.parse(response.data);
                    }
                }
                if (data) {
                    results = data;
                    that.afterLoadingJobs();
                }
            },
            function (error) {
                console.error(error);
            });
    };


    if (clientDefaults.useAjax) {
        this.loadResultsViaAjax();
    } else {
        this.afterLoadingJobs();
    }

}]);

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        if (!items) {
            return filtered; // to avoid crashing in where results might be empty
        }
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            var isHit = false; //is set to true if any of the search criteria matched
            countLogMessages(item); // modifies item contents

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    isHit = true;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    isHit = true;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    isHit = true;
                }
            }
            if (isHit) {
                checkIfShouldDisplaySpecName(prevItem, item);

                filtered.push(item);
                prevItem = item;
            }
        }

        return filtered;
    };
});

//formats millseconds to h m s
app.filter('timeFormat', function () {
    return function (tr, fmt) {
        if(tr == null){
            return "NaN";
        }

        switch (fmt) {
            case 'h':
                var h = tr / 1000 / 60 / 60;
                return "".concat(h.toFixed(2)).concat("h");
            case 'm':
                var m = tr / 1000 / 60;
                return "".concat(m.toFixed(2)).concat("min");
            case 's' :
                var s = tr / 1000;
                return "".concat(s.toFixed(2)).concat("s");
            case 'hm':
            case 'h:m':
                var hmMt = tr / 1000 / 60;
                var hmHr = Math.trunc(hmMt / 60);
                var hmMr = hmMt - (hmHr * 60);
                if (fmt === 'h:m') {
                    return "".concat(hmHr).concat(":").concat(hmMr < 10 ? "0" : "").concat(Math.round(hmMr));
                }
                return "".concat(hmHr).concat("h ").concat(hmMr.toFixed(2)).concat("min");
            case 'hms':
            case 'h:m:s':
                var hmsS = tr / 1000;
                var hmsHr = Math.trunc(hmsS / 60 / 60);
                var hmsM = hmsS / 60;
                var hmsMr = Math.trunc(hmsM - hmsHr * 60);
                var hmsSo = hmsS - (hmsHr * 60 * 60) - (hmsMr*60);
                if (fmt === 'h:m:s') {
                    return "".concat(hmsHr).concat(":").concat(hmsMr < 10 ? "0" : "").concat(hmsMr).concat(":").concat(hmsSo < 10 ? "0" : "").concat(Math.round(hmsSo));
                }
                return "".concat(hmsHr).concat("h ").concat(hmsMr).concat("min ").concat(hmsSo.toFixed(2)).concat("s");
            case 'ms':
                var msS = tr / 1000;
                var msMr = Math.trunc(msS / 60);
                var msMs = msS - (msMr * 60);
                return "".concat(msMr).concat("min ").concat(msMs.toFixed(2)).concat("s");
        }

        return tr;
    };
});


function PbrStackModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;
    ctrl.convertTimestamp = convertTimestamp;
    ctrl.isValueAnArray = isValueAnArray;
    ctrl.toggleSmartStackTraceHighlight = function () {
        var inv = !ctrl.rootScope.showSmartStackTraceHighlight;
        ctrl.rootScope.showSmartStackTraceHighlight = inv;
    };
    ctrl.applySmartHighlight = function (line) {
        if ($rootScope.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return '';
    };
}


app.component('pbrStackModal', {
    templateUrl: "pbr-stack-modal.html",
    bindings: {
        index: '=',
        data: '='
    },
    controller: PbrStackModalController
});

function PbrScreenshotModalController($scope, $rootScope) {
    var ctrl = this;
    ctrl.rootScope = $rootScope;
    ctrl.getParent = getParent;
    ctrl.getShortDescription = getShortDescription;

    /**
     * Updates which modal is selected.
     */
    this.updateSelectedModal = function (event, index) {
        var key = event.key; //try to use non-deprecated key first https://developer.mozilla.org/de/docs/Web/API/KeyboardEvent/keyCode
        if (key == null) {
            var keyMap = {
                37: 'ArrowLeft',
                39: 'ArrowRight'
            };
            key = keyMap[event.keyCode]; //fallback to keycode
        }
        if (key === "ArrowLeft" && this.hasPrevious) {
            this.showHideModal(index, this.previous);
        } else if (key === "ArrowRight" && this.hasNext) {
            this.showHideModal(index, this.next);
        }
    };

    /**
     * Hides the modal with the #oldIndex and shows the modal with the #newIndex.
     */
    this.showHideModal = function (oldIndex, newIndex) {
        const modalName = '#imageModal';
        $(modalName + oldIndex).modal("hide");
        $(modalName + newIndex).modal("show");
    };

}

app.component('pbrScreenshotModal', {
    templateUrl: "pbr-screenshot-modal.html",
    bindings: {
        index: '=',
        data: '=',
        next: '=',
        previous: '=',
        hasNext: '=',
        hasPrevious: '='
    },
    controller: PbrScreenshotModalController
});

app.factory('TitleService', ['$document', function ($document) {
    return {
        setTitle: function (title) {
            $document[0].title = title;
        }
    };
}]);


app.run(
    function ($rootScope, $templateCache) {
        //make sure this option is on by default
        $rootScope.showSmartStackTraceHighlight = true;
        
  $templateCache.put('pbr-screenshot-modal.html',
    '<div class="modal" id="imageModal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="imageModalLabel{{$ctrl.index}}" ng-keydown="$ctrl.updateSelectedModal($event,$ctrl.index)">\n' +
    '    <div class="modal-dialog modal-lg m-screenhot-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="imageModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="imageModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <img class="screenshotImage" ng-src="{{$ctrl.data.screenShotFile}}">\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <div class="pull-left">\n' +
    '                    <button ng-disabled="!$ctrl.hasPrevious" class="btn btn-default btn-previous" data-dismiss="modal"\n' +
    '                            data-toggle="modal" data-target="#imageModal{{$ctrl.previous}}">\n' +
    '                        Prev\n' +
    '                    </button>\n' +
    '                    <button ng-disabled="!$ctrl.hasNext" class="btn btn-default btn-next"\n' +
    '                            data-dismiss="modal" data-toggle="modal"\n' +
    '                            data-target="#imageModal{{$ctrl.next}}">\n' +
    '                        Next\n' +
    '                    </button>\n' +
    '                </div>\n' +
    '                <a class="btn btn-primary" href="{{$ctrl.data.screenShotFile}}" target="_blank">\n' +
    '                    Open Image in New Tab\n' +
    '                    <span class="glyphicon glyphicon-new-window" aria-hidden="true"></span>\n' +
    '                </a>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

  $templateCache.put('pbr-stack-modal.html',
    '<div class="modal" id="modal{{$ctrl.index}}" tabindex="-1" role="dialog"\n' +
    '     aria-labelledby="stackModalLabel{{$ctrl.index}}">\n' +
    '    <div class="modal-dialog modal-lg m-stack-modal" role="document">\n' +
    '        <div class="modal-content">\n' +
    '            <div class="modal-header">\n' +
    '                <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
    '                    <span aria-hidden="true">&times;</span>\n' +
    '                </button>\n' +
    '                <h6 class="modal-title" id="stackModalLabelP{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getParent($ctrl.data.description)}}</h6>\n' +
    '                <h5 class="modal-title" id="stackModalLabel{{$ctrl.index}}">\n' +
    '                    {{$ctrl.getShortDescription($ctrl.data.description)}}</h5>\n' +
    '            </div>\n' +
    '            <div class="modal-body">\n' +
    '                <div ng-if="$ctrl.data.trace.length > 0">\n' +
    '                    <div ng-if="$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer" ng-repeat="trace in $ctrl.data.trace track by $index"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                    <div ng-if="!$ctrl.isValueAnArray($ctrl.data.trace)">\n' +
    '                        <pre class="logContainer"><div ng-class="$ctrl.applySmartHighlight(line)" ng-repeat="line in $ctrl.data.trace.split(\'\\n\') track by $index">{{line}}</div></pre>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '                <div ng-if="$ctrl.data.browserLogs.length > 0">\n' +
    '                    <h5 class="modal-title">\n' +
    '                        Browser logs:\n' +
    '                    </h5>\n' +
    '                    <pre class="logContainer"><div class="browserLogItem"\n' +
    '                                                   ng-repeat="logError in $ctrl.data.browserLogs track by $index"><div><span class="label browserLogLabel label-default"\n' +
    '                                                                                                                             ng-class="{\'label-danger\': logError.level===\'SEVERE\', \'label-warning\': logError.level===\'WARNING\'}">{{logError.level}}</span><span class="label label-default">{{$ctrl.convertTimestamp(logError.timestamp)}}</span><div ng-repeat="messageLine in logError.message.split(\'\\\\n\') track by $index">{{ messageLine }}</div></div></div></pre>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '            <div class="modal-footer">\n' +
    '                <button class="btn btn-default"\n' +
    '                        ng-class="{active: $ctrl.rootScope.showSmartStackTraceHighlight}"\n' +
    '                        ng-click="$ctrl.toggleSmartStackTraceHighlight()">\n' +
    '                    <span class="glyphicon glyphicon-education black"></span> Smart Stack Trace\n' +
    '                </button>\n' +
    '                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
     ''
  );

    });
