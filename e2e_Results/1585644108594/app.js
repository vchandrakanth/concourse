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
        "description": "Step 1: Create New Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Expected 'E2E Admin\n1 users\n51692\n3/31/20, 2:05 pm\nTest Surface - Root Group\n1 users\n51693\n3/31/20, 2:05 pm\nE2E Test Group985\n0 users\n51823\n2/21/20, 2:25 pm\ne2e Group\n0 users\n51882\n3/2/20, 1:26 pm\nE2E Surface406 - Root Group\n1 users\n51912\n3/31/20, 2:05 pm\nE2E Surface33 - Root Group\n1 users\n51943\n3/31/20, 2:05 pm\nE2E Surface988 - Root Group\n1 users\n51952\n3/31/20, 2:05 pm\nE2E Test Group834\n0 users\n51972\n3/31/20, 2:07 pm' to match 'E2E Test Group593', 'Field E2E Test Group593 should E2E Test Group593 have value as E2E Test Group593'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "009300fb-00dc-007b-00e6-0058008b0054.png",
        "timestamp": 1585644128811,
        "duration": 10199
    },
    {
        "description": "Step 2: Asign User For New Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: Cannot read property 'user' of undefined"
        ],
        "trace": [
            "TypeError: Cannot read property 'user' of undefined\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:51:78)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:60:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:112:25\n    at new ManagedPromise (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1077:7)\n    at ControlFlow.promise (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2505:12)\n    at schedulerExecute (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:95:18)\nFrom: Task: Run it(\"Step 2: Asign User For New Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:49:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "006e00a4-00f8-00c7-006e-00e5005a00ce.png",
        "timestamp": 1585644139669,
        "duration": 481
    },
    {
        "description": "Step 3: Add Role Assignment For Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001c006a-00ef-00a8-009e-000200e50053.png",
        "timestamp": 1585644140809,
        "duration": 31401
    },
    {
        "description": "Step 4: Create Attribute Tag|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": true,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b80074-0054-0012-00bf-00e8003400a2.png",
        "timestamp": 1585644172824,
        "duration": 48054
    },
    {
        "description": "Step 5: Create New Enclave Model|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='E2E Test Group593'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='E2E Test Group593'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:76:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\assetManager.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "002400b4-00fa-0085-0060-00020083000e.png",
        "timestamp": 1585644221504,
        "duration": 23649
    },
    {
        "description": "Step 6: Logical Deployement|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:243:15)\nFrom: Task: Run it(\"Step 6: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:78:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "004600c4-0088-00c4-0042-00ca00fd007d.png",
        "timestamp": 1585644245784,
        "duration": 2604
    },
    {
        "description": "Step 7: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 7: Remove Role Assignment From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:88:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000900e0-0093-00ed-002b-00f0000e0099.png",
        "timestamp": 1585644249040,
        "duration": 4022
    },
    {
        "description": "Step 8: Delete Logical Deployment|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:243:15)\nFrom: Task: Run it(\"Step 8: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:96:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003b00aa-004d-0027-001a-00db001000e2.png",
        "timestamp": 1585644253702,
        "duration": 2652
    },
    {
        "description": "Step 12: Delete Enclave Model|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"deleteAssetButton\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"deleteAssetButton\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:239:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\assetManager.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e40054-008f-0068-003d-00620063008c.png",
        "timestamp": 1585644257153,
        "duration": 33141
    },
    {
        "description": "Step 9: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 9: Remove Role Assignment From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:108:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00020008-0093-00db-00e7-00460028000f.png",
        "timestamp": 1585644290921,
        "duration": 3949
    },
    {
        "description": "Step 10: Verify Role Assignment Removed Or Not|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 10: Verify Role Assignment Removed Or Not\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:114:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000f0074-002a-00c1-005d-00e0001e0009.png",
        "timestamp": 1585644295456,
        "duration": 3820
    },
    {
        "description": "Step 11: Add Role Assignment again For Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 11: Add Role Assignment again For Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:120:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "008c004c-0031-00e6-00ea-0028008900bc.png",
        "timestamp": 1585644299982,
        "duration": 3937
    },
    {
        "description": "Step 13: Delete Attribute Tag|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"deleteAttributeTagButton\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"deleteAttributeTagButton\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at AttributeTag.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\attributeTags.Po.ts:146:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\attributeTags.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "001600d8-00cc-00ba-00c5-008700fd001a.png",
        "timestamp": 1585644304579,
        "duration": 55337
    },
    {
        "description": "Step 14: Remove Role Assignment From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 14: Remove Role Assignment From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:137:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e4000d-00ef-00cb-00e2-00b100b7007e.png",
        "timestamp": 1585644360570,
        "duration": 3939
    },
    {
        "description": "Step 15: Remove User From Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 15: Remove User From Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:143:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d300de-00ed-0064-0092-00e900770044.png",
        "timestamp": 1585644365125,
        "duration": 3846
    },
    {
        "description": "Step 16: Deassociate Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-ysi-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-ysi-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:159:15)\nFrom: Task: Run it(\"Step 16: Deassociate Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:149:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ba008f-00b3-00da-0032-000f000f00cb.png",
        "timestamp": 1585644369659,
        "duration": 1501
    },
    {
        "description": "Step 17: Delete Group|Removing Business Author Role Assignments with Underlying LogicalDeployment on Model",
        "passed": false,
        "pending": false,
        "os": "Windows",
        "instanceId": 12280,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.149"
        },
        "message": [
            "Failed: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <select _ngcontent-ysi-c4=\"\" class=\"btn btn-secondary form-control\" data-e2e=\"surfaceSwitcherDropdown\">...</select> is not clickable at point (1096, 22). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.149)\n  (Driver info: chromedriver=80.0.3987.106 (f68069574609230cf9b635cd784cfb1bf81bb53a-refs/branch-heads/3987@{#882}),platform=Windows NT 6.3.9600 x86_64)\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at Driver.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:16:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:24:12)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:139:15)\nFrom: Task: Run it(\"Step 17: Delete Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\removeBusinessAuthorRoleAssignment.ts:154:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\removeBusinessAuthorRoleAssignment.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "007100fe-000a-0064-00b1-00a7003500c5.png",
        "timestamp": 1585644371828,
        "duration": 3897
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
