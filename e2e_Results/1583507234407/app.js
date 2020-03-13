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
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008b0003-006e-001e-0080-00bb00d500ef.png",
        "timestamp": 1583507245716,
        "duration": 18859
    },
    {
        "description": "Step 2: Edit Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001c00bb-00e4-00f7-0097-00f500f800ce.png",
        "timestamp": 1583507265300,
        "duration": 19219
    },
    {
        "description": "Step 3: Delete Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0038006e-0012-0091-00dc-0014001700bb.png",
        "timestamp": 1583507285150,
        "duration": 19714
    },
    {
        "description": "Step 4: Verify Attribute Tag Deleted or Not|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ed00ae-0096-0089-003c-006100350052.png",
        "timestamp": 1583507305395,
        "duration": 10520
    },
    {
        "description": "Step 1: Create Attribute Tag|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:167:11)\nFrom: Task: Run it(\"Step 1: Create Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:27:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "005f00ff-001f-003a-00c6-00e400620096.png",
        "timestamp": 1583507316408,
        "duration": 27805
    },
    {
        "description": "Step 2: Create New Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 2: Create New Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:34:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cf00a7-0049-0048-008c-00c2007d0043.png",
        "timestamp": 1583507344714,
        "duration": 20328
    },
    {
        "description": "Step 3: Edit Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:307:11)\nFrom: Task: Run it(\"Step 3: Edit Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:44:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a100b9-0009-00ea-0099-007900ee00f8.png",
        "timestamp": 1583507365525,
        "duration": 30803
    },
    {
        "description": "Step 4: Delete Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:307:11)\nFrom: Task: Run it(\"Step 4: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:51:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a70046-001c-00c4-00d3-006600a100b2.png",
        "timestamp": 1583507396810,
        "duration": 30912
    },
    {
        "description": "Step 5: Verify Enclave Model Deleted Or Not|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [placeholder=\"Search\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [placeholder=\"Search\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:301:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/assetManager.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 5: Verify Enclave Model Deleted Or Not\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:57:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00070007-001c-002e-00f6-00ed005d006f.png",
        "timestamp": 1583507428233,
        "duration": 20405
    },
    {
        "description": "Step 6: Clean Up|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:167:11)\nFrom: Task: Run it(\"Step 6: Clean Up\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/assetManager.ts:63:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/assetManager.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a20082-003f-00a5-0033-002400dc0043.png",
        "timestamp": 1583507449150,
        "duration": 22282
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:167:11)\nFrom: Task: Run it(\"Step 1: Create Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:34:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009f0026-0073-00be-00a9-005e00cb001f.png",
        "timestamp": 1583507471965,
        "duration": 30502
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:167:11)\nFrom: Task: Run it(\"Step 2: Create Another Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:41:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b10007-006f-004e-0000-0064006f00d7.png",
        "timestamp": 1583507502988,
        "duration": 30428
    },
    {
        "description": "Step 3: Create New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:307:11)\nFrom: Task: Run it(\"Step 3: Create New Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:48:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0091002b-0040-00e6-00ca-001c003000db.png",
        "timestamp": 1583507533986,
        "duration": 32489
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at LogicalDeployment.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/logicalDeployment.Po.ts:249:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:57:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00af0007-000b-005f-00a5-00a9007600e6.png",
        "timestamp": 1583507567055,
        "duration": 30960
    },
    {
        "description": "Step 4: Update New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:254:11)\nFrom: Task: Run it(\"Step 4: Update New Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:67:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0098006b-00e3-00ca-00a0-006d008b000e.png",
        "timestamp": 1583507598500,
        "duration": 20326
    },
    {
        "description": "Step 6: Update Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment72'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment72'])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at LogicalDeployment.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/logicalDeployment.Po.ts:175:15)\nFrom: Task: Run it(\"Step 6: Update Logical Deployement\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:76:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "005700a5-00a0-008b-00b2-00dd006800b1.png",
        "timestamp": 1583507619326,
        "duration": 75744
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment72'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment72'])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at LogicalDeployment.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:86:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00fd0059-001e-00a8-00b7-00aa000e00d8.png",
        "timestamp": 1583507695585,
        "duration": 26410
    },
    {
        "description": "Step 8: Clean Up|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model351'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model351'])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Clean Up\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeployment.ts:92:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeployment.js:18:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00100021-004c-0019-0077-007000d600a1.png",
        "timestamp": 1583507722530,
        "duration": 24527
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment Violations",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c700d9-00f4-0030-009b-008000e700fb.png",
        "timestamp": 1583507747654,
        "duration": 24091
    },
    {
        "description": "Step 2: Create New Enclave Model|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: invalid argument: File not found : /Users/intone/Documents/GitHub/concourse/build/pageObjects/C:/Users/intone-wv/Desktop/e2e/src/conf/ec2template.json\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: invalid argument: File not found : /Users/intone/Documents/GitHub/concourse/build/pageObjects/C:/Users/intone-wv/Desktop/e2e/src/conf/ec2template.json\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.sendKeys (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2174:19)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:157:27)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/pageObjects/assetManager.Po.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/pageObjects/assetManager.Po.js:4:12)\n    at AssetManager.fileUpload (/Users/intone/Documents/GitHub/concourse/build/pageObjects/assetManager.Po.js:144:16)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:98:16)\nFrom: Task: Run it(\"Step 2: Create New Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:54:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00850032-000d-002c-00e1-005700ab00c6.png",
        "timestamp": 1583507772265,
        "duration": 49869
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group Template with  Published\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:64:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00de0080-0093-0072-005c-00570077003f.png",
        "timestamp": 1583507822714,
        "duration": 121548
    },
    {
        "description": "Step 4: Creating Policy Group with  Published|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementSendkeys (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:57:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with  Published\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:71:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009f007e-00d0-009f-00e8-00d5001300fa.png",
        "timestamp": 1583507944801,
        "duration": 35399
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model684'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model684'])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at LogicalDeployment.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/logicalDeployment.Po.ts:65:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:81:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d90053-0009-00d8-00fc-004e002d007c.png",
        "timestamp": 1583507980771,
        "duration": 36148
    },
    {
        "description": "Step 6: Verify Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2157:16)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.sendKeys (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2174:19)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Risk.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/risks.Po.ts:45:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 6: Verify Risk\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:91:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "002300f6-0045-00fa-00ad-0035008000a9.png",
        "timestamp": 1583508017444,
        "duration": 14264
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at LogicalDeployment.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/logicalDeployment.Po.ts:249:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:98:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a60072-00c1-00f8-001f-00d800890063.png",
        "timestamp": 1583508032280,
        "duration": 30845
    },
    {
        "description": "Step 8: Re verifying Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at ActionSequence.mouseMove (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:189:14)\n    at ActionSequence.mouseDown (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:225:17)\n    at Risk.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/risks.Po.ts:62:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bf00d7-0012-001c-0055-00ba00c100b3.png",
        "timestamp": 1583508063618,
        "duration": 41080
    },
    {
        "description": "Step 9: Clean Up|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:307:11)\nFrom: Task: Run it(\"Step 9: Clean Up\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/logicalDeploymentViolation.ts:111:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a6007c-0021-0079-007a-008800b0006e.png",
        "timestamp": 1583508105183,
        "duration": 26418
    },
    {
        "description": "Step 1: Create New Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 1: Create New Policy Group Template With Draft Status\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroupTemplate.ts:21:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d70011-00f3-0058-00bb-00a4002800e2.png",
        "timestamp": 1583508132105,
        "duration": 52224
    },
    {
        "description": "Step 2: Edit Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft492\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft492\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:171:11)\nFrom: Task: Run it(\"Step 2: Edit Policy Group Template With Draft Status\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroupTemplate.ts:28:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "007a007b-0030-0040-0055-0078001900e2.png",
        "timestamp": 1583508184892,
        "duration": 35224
    },
    {
        "description": "Step 3: Delete Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft492 Updated\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e=\"Policy Group Template With Draft492 Updated\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:220:11)\nFrom: Task: Run it(\"Step 3: Delete Policy Group Template With Draft Status\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroupTemplate.ts:35:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroupTemplate.js:16:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000300c3-0094-00f3-0064-00ad00db0033.png",
        "timestamp": 1583508220656,
        "duration": 26784
    },
    {
        "description": "Step 4: Verify Policy Group Template With Draft Status Deleted or Not|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00980055-0011-009e-008d-004400b50083.png",
        "timestamp": 1583508248003,
        "duration": 34811
    },
    {
        "description": "Step 5: Creating Policy Group Template with  Published|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f3006c-0099-00a4-00cb-009a001c00ad.png",
        "timestamp": 1583508283358,
        "duration": 128814
    },
    {
        "description": "Step 6: CleanUp|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f500d0-00ea-00ea-0049-00c900890066.png",
        "timestamp": 1583508412700,
        "duration": 17249
    },
    {
        "description": "Step 1: Creating Attribute Tag|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00920060-0001-003d-00b9-004800a500ef.png",
        "timestamp": 1583508430722,
        "duration": 18853
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f00016-0007-005b-00ba-0046005e0036.png",
        "timestamp": 1583508450101,
        "duration": 26607
    },
    {
        "description": "Step 3: Creating Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementSendkeys (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:57:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:48:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ef0068-0003-002a-0059-009e00c700de.png",
        "timestamp": 1583508477242,
        "duration": 34677
    },
    {
        "description": "Step 4: Editing Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 4: Editing Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:55:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e3008e-008f-0046-0016-00710036009e.png",
        "timestamp": 1583508512498,
        "duration": 41635
    },
    {
        "description": "Step 5: Deleting Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 5: Deleting Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:62:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "006600d4-00a1-00de-00fa-004a00a30056.png",
        "timestamp": 1583508554633,
        "duration": 28045
    },
    {
        "description": "Step 6: Verify Policy Group With Draft Status Deleted or Not|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [placeholder=\"Search\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [placeholder=\"Search\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as clear] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as clear] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:34:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClear (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:50:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:940:11)\nFrom: Task: Run it(\"Step 6: Verify Policy Group With Draft Status Deleted or Not\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:69:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b90099-002e-00ce-00e3-004900ea00ac.png",
        "timestamp": 1583508583185,
        "duration": 28562
    },
    {
        "description": "Step 7: Creating Policy Group with  Published|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 7: Creating Policy Group with  Published\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:76:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "007f0070-0049-0017-00ee-00d0002f004a.png",
        "timestamp": 1583508612268,
        "duration": 30803
    },
    {
        "description": "Step 8: Edit Policies And Publish Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 8: Edit Policies And Publish Policy Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:83:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ce00ea-009a-007e-0049-003c00a200a8.png",
        "timestamp": 1583508643588,
        "duration": 26891
    },
    {
        "description": "Step 9: Delete Published Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish487'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish487'])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 9: Delete Published Policy Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyGroup.ts:90:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyGroup.js:19:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "001a0065-0049-009f-00bd-00d9003f00ed.png",
        "timestamp": 1583508671000,
        "duration": 24700
    },
    {
        "description": "Step 10: CleanUp|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d900d2-00df-00c2-0077-006300d100d5.png",
        "timestamp": 1583508696238,
        "duration": 27502
    },
    {
        "description": "Step 1: Create New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00f50055-0066-00fc-0054-0087001000d4.png",
        "timestamp": 1583508724410,
        "duration": 14007
    },
    {
        "description": "Step 2: Search Default Group For New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ae0005-0073-00b6-00ec-0078001100d1.png",
        "timestamp": 1583508738979,
        "duration": 17069
    },
    {
        "description": "Step 3: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Expected true to be false."
        ],
        "trace": [
            "Error: Failed expectation\n    at /Users/intone/Documents/GitHub/concourse/src/utils/expectHelper.ts:283:27\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d200be-0077-00d1-003a-00d500a00051.png",
        "timestamp": 1583508756613,
        "duration": 24766
    },
    {
        "description": "Step 4: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:341:15)\nFrom: Task: Run it(\"Step 4: Remove Identity Admin Role From Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:47:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e30074-0097-00bb-002b-005800ba0004.png",
        "timestamp": 1583508781985,
        "duration": 8190
    },
    {
        "description": "Step 5: Remove Permission Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:341:15)\nFrom: Task: Run it(\"Step 5: Remove Permission Admin Role From Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:52:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009800b8-0001-0071-001a-00b100b500a7.png",
        "timestamp": 1583508790756,
        "duration": 1435
    },
    {
        "description": "Step 6: Remove Surface Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:341:15)\nFrom: Task: Run it(\"Step 6: Remove Surface Admin Role From Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:57:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e50000-00a7-00b2-00b6-000900290022.png",
        "timestamp": 1583508792777,
        "duration": 1436
    },
    {
        "description": "Step 7: Deassociate Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:159:15)\nFrom: Task: Run it(\"Step 7: Deassociate Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:62:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bd008b-00f9-00d2-0027-00c500da0047.png",
        "timestamp": 1583508794776,
        "duration": 1465
    },
    {
        "description": "Step 8: Delete Surface|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Surface.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/surfaces.Po.ts:148:15)\nFrom: Task: Run it(\"Step 8: Delete Surface\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:67:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cb0014-007b-0017-000e-009a00f70038.png",
        "timestamp": 1583508796816,
        "duration": 1398
    },
    {
        "description": "Step 9: Verify Surface|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Surface.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/surfaces.Po.ts:171:15)\nFrom: Task: Run it(\"Step 9: Verify Surface\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:71:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00be0015-00bb-004a-003b-00a8004e0063.png",
        "timestamp": 1583508798799,
        "duration": 11451
    },
    {
        "description": "Step 10: Remove User From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kln-c1=\"\" class=\"nav-link active\" data-e2e=\"linkUserGroups\" routerlink=\"user-management/groups\" routerlinkactive=\"active\" href=\"/user-management/groups\">...</a> is not clickable at point (146, 546). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:241:15)\nFrom: Task: Run it(\"Step 10: Remove User From Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:76:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00eb00fe-00bc-00b9-0057-0046009d00a1.png",
        "timestamp": 1583508810824,
        "duration": 1452
    },
    {
        "description": "Step 11: Delete Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkUserGroups\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkUserGroups\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Group.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/groups.Po.ts:134:15)\nFrom: Task: Run it(\"Step 11: Delete Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/surfaces.ts:80:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/surfaces.js:17:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f20092-00d3-00f0-006d-006800fb0014.png",
        "timestamp": 1583508812861,
        "duration": 30961
    },
    {
        "description": "Step 1: Creating Attribute Tag|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:35:11)\nFrom: Task: Run it(\"Step 1: Creating Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:33:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "002b006c-00ae-0001-0039-0029000c0064.png",
        "timestamp": 1583508844356,
        "duration": 17793
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007900f1-0094-009f-004f-00df00aa002f.png",
        "timestamp": 1583508862685,
        "duration": 28511
    },
    {
        "description": "Step 3: Creating Policy Group|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementSendkeys (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:57:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:45:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ef0079-00f6-001e-0018-00fe00e500fc.png",
        "timestamp": 1583508891784,
        "duration": 34203
    },
    {
        "description": "Step 4: Verify Approval Request For Publish|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Approvals.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/approvals.Po.ts:69:11)\nFrom: Task: Run it(\"Step 4: Verify Approval Request For Publish\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:53:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c10019-0041-0089-009d-004e004000d1.png",
        "timestamp": 1583508926623,
        "duration": 11507
    },
    {
        "description": "Step 5: Approve Publish Request|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Approvals.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 5: Approve Publish Request\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:58:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009b0004-00e8-0078-0053-00a0002e00fb.png",
        "timestamp": 1583508938733,
        "duration": 11514
    },
    {
        "description": "Step 6: Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 550). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 550). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" style=\"display: block;\" aria-modal=\"true\">...</modal-container>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Approvals.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/approvals.Po.ts:85:11)\nFrom: Task: Run it(\"Step 6: Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:62:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c40035-0047-00ae-0065-001e00280077.png",
        "timestamp": 1583508950844,
        "duration": 11490
    },
    {
        "description": "Step 7: Verify Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 428). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 428). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Approvals.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/approvals.Po.ts:112:11)\nFrom: Task: Run it(\"Step 7: Verify Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:66:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000800b2-00ae-004b-000d-0002009a00e7.png",
        "timestamp": 1583508962931,
        "duration": 11439
    },
    {
        "description": "Step 8: Approve Delete Action|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 428). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-xpm-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 428). Other element would receive the click: <h5 _ngcontent-xpm-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=80.0.3987.132)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'ip-10-10-10-10.ec2.internal', ip: '10.10.10.10', os.name: 'Mac OS X', os.arch: 'x86_64', os.version: '10.13.6', java.version: '1.8.0_77'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/error.js:546:15)\n    at parseHttpResponse (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:509:13)\n    at doSend.then.response (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:807:17)\n    at WebElement.schedule_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2010:25)\n    at WebElement.click (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/webdriver.js:2092:17)\n    at actionFn (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:461:65)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at Approvals.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 8: Approve Delete Action\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:71:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00db000f-00ab-008c-0021-00ef00e6003f.png",
        "timestamp": 1583508974966,
        "duration": 11472
    },
    {
        "description": "Step 9: Verify Policy Group Deleted Or Not|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 9: Verify Policy Group Deleted Or Not\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:75:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00900002-008f-00e2-0058-003e002700e8.png",
        "timestamp": 1583508987031,
        "duration": 30881
    },
    {
        "description": "Step 10: CleanUp|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 10: CleanUp\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/approvals.ts:80:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/approvals.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00de0090-00bb-00a9-00cc-00ab004c0083.png",
        "timestamp": 1583509018441,
        "duration": 231655
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:35:11)\nFrom: Task: Run it(\"Step 1: Create Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:44:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ef0088-00a5-00f4-0021-002400d900ac.png",
        "timestamp": 1583509250660,
        "duration": 10386
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:35:11)\nFrom: Task: Run it(\"Step 2: Create Another Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:52:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a60001-00aa-00ac-0020-00de00c60059.png",
        "timestamp": 1583509261569,
        "duration": 20394
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group Template with  Published\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:60:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "004700d2-00a5-0067-0061-00ea005000a8.png",
        "timestamp": 1583509282514,
        "duration": 231730
    },
    {
        "description": "Step 4: Creating Policy Group with S3 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with S3 \") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:68:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ae00aa-003d-0004-00de-00a40031001c.png",
        "timestamp": 1583509514768,
        "duration": 21001
    },
    {
        "description": "Step 5: Creating Policy Group with EC2 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 5: Creating Policy Group with EC2 \") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:78:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b8009b-0042-008b-000b-009300aa005b.png",
        "timestamp": 1583509536330,
        "duration": 30983
    },
    {
        "description": "Step 6: Create New Enclave Model With Above Created Attribute Tags|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 6: Create New Enclave Model With Above Created Attribute Tags\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:88:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "007f001e-007b-002e-00d4-008000d5006d.png",
        "timestamp": 1583509567933,
        "duration": 10365
    },
    {
        "description": "Step 7: Verifying Risk |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at ActionSequence.mouseMove (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:189:14)\n    at ActionSequence.mouseDown (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:225:17)\n    at Risk.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/risks.Po.ts:34:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ff0025-00be-0050-0099-006800230003.png",
        "timestamp": 1583509578820,
        "duration": 21034
    },
    {
        "description": "Step 8: Delete Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"surfaceSwitcherDropdown\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:307:11)\nFrom: Task: Run it(\"Step 8: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:105:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00810033-002b-0040-00b7-009000f9003f.png",
        "timestamp": 1583509600384,
        "duration": 30921
    },
    {
        "description": "Step 9: Verifying Risk After Deletion Of Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at ActionSequence.mouseMove (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:189:14)\n    at ActionSequence.mouseDown (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:225:17)\n    at Risk.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/risks.Po.ts:62:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "006e00da-002d-009f-00f8-00b500cd003b.png",
        "timestamp": 1583509631842,
        "duration": 31036
    },
    {
        "description": "Step 10: CleanUp|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 10: CleanUp\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/modelViolation.ts:118:3)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/modelViolation.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cd0012-00b9-000b-0080-0038003100f7.png",
        "timestamp": 1583509663440,
        "duration": 30943
    },
    {
        "description": "Step 1: Create Attribute Tag|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:35:11)\nFrom: Task: Run it(\"Step 1: Create Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyViolations.ts:40:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b1002e-00e4-0025-006a-00af0044008f.png",
        "timestamp": 1583509694904,
        "duration": 10359
    },
    {
        "description": "Step 2: Create New Enclave Model With Above Created Attribute Tag|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 2: Create New Enclave Model With Above Created Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyViolations.ts:48:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a8000c-0075-0072-00b0-008f00c80006.png",
        "timestamp": 1583509705807,
        "duration": 10381
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group Template with  Published\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyViolations.ts:58:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d3005f-000a-0001-0010-004200c00032.png",
        "timestamp": 1583509716759,
        "duration": 221451
    },
    {
        "description": "Step 4: Creating Policy Group with S3 |Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with S3 \") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyViolations.ts:66:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00bb002a-001d-0049-0085-008e009000d6.png",
        "timestamp": 1583509938783,
        "duration": 31261
    },
    {
        "description": "Step 5: Verifying Risk |Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at ActionSequence.mouseMove (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:189:14)\n    at ActionSequence.mouseDown (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/actions.js:225:17)\n    at Risk.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/risks.Po.ts:34:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (/Users/intone/Documents/GitHub/concourse/build/pageObjects/risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f00007-00e2-00b0-000d-0069003d00b1.png",
        "timestamp": 1583509970616,
        "duration": 31029
    },
    {
        "description": "Step 6: CleanUp |Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at PolicyGroup.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 6: CleanUp \") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/policyViolations.ts:83:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/policyViolations.js:21:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e4009c-0030-00a4-000a-0075004800e0.png",
        "timestamp": 1583510002263,
        "duration": 30917
    },
    {
        "description": "Step 1: Create Attribute Tag|Update Policy Violation ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"linkAttributeTags\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AttributeTag.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/attributeTags.Po.ts:35:11)\nFrom: Task: Run it(\"Step 1: Create Attribute Tag\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/UpdatePolicyViolation.ts:51:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a100ed-0008-003f-00c4-000300c500e0.png",
        "timestamp": 1583510033748,
        "duration": 20375
    },
    {
        "description": "Step : Create Enclave Model With EC2 Template|Update Policy Violation ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step : Create Enclave Model With EC2 Template\") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/UpdatePolicyViolation.ts:59:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00180057-00bd-00cc-001b-00b500aa00ff.png",
        "timestamp": 1583510054775,
        "duration": 10423
    },
    {
        "description": "Step 3: Create Enclave Model With S3 Template |Update Policy Violation ",
        "passed": false,
        "pending": false,
        "os": "mac os x",
        "sessionId": "9aa5ac2de51003ae8b35750e0fe98f9e",
        "instanceId": 26747,
        "browser": {
            "name": "chrome",
            "version": "80.0.3987.132"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, a[data-e2e=\"linkAssets\"])\n    at elementArrayFinder.getWebElements.then (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:814:27)\n    at ManagedPromise.invokeCallback_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:1376:14)\n    at TaskQueue.execute_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3084:14)\n    at TaskQueue.executeNext_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:3067:27)\n    at asyncRun (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2927:27)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/built/element.js:831:22)\n    at Object.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/utils/utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/utils/utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:4:12)\n    at Object.elementClick (/Users/intone/Documents/GitHub/concourse/build/utils/utils.js:23:12)\n    at AssetManager.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/pageObjects/assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 3: Create Enclave Model With S3 Template \") in control flow\n    at UserContext.<anonymous> (/Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:94:19)\n    at attempt (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4297:26)\n    at QueueRunner.run (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4217:20)\n    at runNext (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4257:20)\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4264:13\n    at /Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4172:9\n    at /Users/intone/Documents/GitHub/concourse/node_modules/jasminewd2/index.js:64:48\n    at ControlFlow.emit (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/events.js:62:21)\n    at ControlFlow.shutdown_ (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2674:10)\n    at shutdownTask_.MicroTask (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/selenium-webdriver/lib/promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/src/specs/UpdatePolicyViolation.ts:69:5)\n    at Generator.next (<anonymous>)\n    at /Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:4:12)\n    at Suite.<anonymous> (/Users/intone/Documents/GitHub/concourse/build/specs/UpdatePolicyViolation.js:20:12)\n    at addSpecsToSuite (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1107:25)\n    at Env.describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:1074:7)\n    at describe (/Users/intone/Documents/GitHub/concourse/node_modules/protractor/node_modules/jasmine-core/lib/jasmine-core/jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a900f1-0065-001d-009f-001e00d90022.png",
        "timestamp": 1583510065829,
        "duration": 10410
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
