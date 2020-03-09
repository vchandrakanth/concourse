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
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e90083-0098-0014-0023-00330022006b.png",
        "timestamp": 1583404983385,
        "duration": 19382
    },
    {
        "description": "Step 2: Edit Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0075006a-0033-00f9-00b0-00ff00fa00aa.png",
        "timestamp": 1583405003452,
        "duration": 20312
    },
    {
        "description": "Step 3: Delete Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a30026-0049-00c1-0035-006e00b700d0.png",
        "timestamp": 1583405024375,
        "duration": 19613
    },
    {
        "description": "Step 4: Verify Attribute Tag Deleted or Not|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c000ce-001a-0076-006b-007f00710080.png",
        "timestamp": 1583405044537,
        "duration": 10662
    },
    {
        "description": "Step 1: Create Attribute Tag|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00cf00d8-00c2-0083-0051-001d006f000b.png",
        "timestamp": 1583405055761,
        "duration": 13914
    },
    {
        "description": "Step 2: Create New Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model842', 'Field Test Enclave Model842 should Test Enclave Model842 have value as Test Enclave Model842'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "004000c0-001d-002c-00c1-00c40003001b.png",
        "timestamp": 1583405070278,
        "duration": 33786
    },
    {
        "description": "Step 3: Edit Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model842'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model842'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:180:11)\nFrom: Task: Run it(\"Step 3: Edit Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\assetManager.ts:44:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00550072-00a9-004c-0009-00e80071003e.png",
        "timestamp": 1583405104767,
        "duration": 24376
    },
    {
        "description": "Step 4: Delete Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model842  Updated'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model842  Updated'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 4: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\assetManager.ts:51:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "005800da-00ee-005d-00fc-002100a00012.png",
        "timestamp": 1583405129839,
        "duration": 24397
    },
    {
        "description": "Step 5: Verify Enclave Model Deleted Or Not|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e00071-00e2-0057-002d-000400f100ee.png",
        "timestamp": 1583405154923,
        "duration": 20782
    },
    {
        "description": "Step 6: Clean Up|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00550043-001c-000b-0010-0087009500fa.png",
        "timestamp": 1583405176358,
        "duration": 15142
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00e20095-0078-0057-0025-00d100fe00af.png",
        "timestamp": 1583405192205,
        "duration": 18697
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007800a0-0015-007f-00c5-00b500f300ef.png",
        "timestamp": 1583405211543,
        "duration": 23841
    },
    {
        "description": "Step 3: Create New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model10', 'Field Test Enclave Model10 should Test Enclave Model10 have value as Test Enclave Model10'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "0032008c-00d0-00cd-00a0-00a100560003.png",
        "timestamp": 1583405236093,
        "duration": 33737
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:65:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:57:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00050037-0086-0039-00c0-00430080002b.png",
        "timestamp": 1583405270533,
        "duration": 26454
    },
    {
        "description": "Step 4: Update New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:258:11)\nFrom: Task: Run it(\"Step 4: Update New Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:67:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "004b0071-00bd-00c1-0063-00d600ee006b.png",
        "timestamp": 1583405297729,
        "duration": 34610
    },
    {
        "description": "Step 6: Update Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment505'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment505'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:175:15)\nFrom: Task: Run it(\"Step 6: Update Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:76:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009b00b0-0041-00b3-00ce-00eb00410029.png",
        "timestamp": 1583405333018,
        "duration": 24319
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment505'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment505'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:86:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00990063-00d6-0016-0053-006d006f00ac.png",
        "timestamp": 1583405357978,
        "duration": 26222
    },
    {
        "description": "Step 8: Clean Up|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model10'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Clean Up\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:92:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00660090-009c-0059-00a7-00320027007b.png",
        "timestamp": 1583405384820,
        "duration": 24503
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment Violations",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "001a0038-0002-0072-00e2-001b004e0079.png",
        "timestamp": 1583405410034,
        "duration": 24834
    },
    {
        "description": "Step 2: Create New Enclave Model|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model108', 'Field Test Enclave Model108 should Test Enclave Model108 have value as Test Enclave Model108'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "007e00bd-008c-001e-0066-00ed003c0035.png",
        "timestamp": 1583405435576,
        "duration": 34089
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Logical Deployment Violations",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006100ba-00a1-005e-0031-00cc00cf00b9.png",
        "timestamp": 1583405470423,
        "duration": 27077
    },
    {
        "description": "Step 4: Creating Policy Group with  Published|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with  Published\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:71:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b200a9-00c2-00ae-001e-00ee00cb00e5.png",
        "timestamp": 1583405498108,
        "duration": 34408
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model108'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model108'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:65:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:81:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e600ef-00cc-0007-009c-003800cc004e.png",
        "timestamp": 1583405533192,
        "duration": 27242
    },
    {
        "description": "Step 6: Verify Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Risk.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\risks.Po.ts:45:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 6: Verify Risk\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:91:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c8000f-006b-00af-0040-0065001b0025.png",
        "timestamp": 1583405561096,
        "duration": 14650
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment289'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment289'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:98:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00b1000b-0062-00ec-00ba-00f300b00020.png",
        "timestamp": 1583405576412,
        "duration": 26351
    },
    {
        "description": "Step 8: Re verifying Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Risk.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\risks.Po.ts:73:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 8: Re verifying Risk\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:104:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f80098-00f7-00d1-00bb-001800750034.png",
        "timestamp": 1583405603372,
        "duration": 14437
    },
    {
        "description": "Step 9: Clean Up|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model108'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model108'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 9: Clean Up\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:111:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0071009a-00e7-006d-00ba-0020006a00db.png",
        "timestamp": 1583405618460,
        "duration": 24343
    },
    {
        "description": "Step 1: Create New Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c90054-00e9-0088-007a-00d9007200af.png",
        "timestamp": 1583405643466,
        "duration": 26229
    },
    {
        "description": "Step 2: Edit Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "002d0070-0091-000c-0063-001800ee0007.png",
        "timestamp": 1583405670353,
        "duration": 37657
    },
    {
        "description": "Step 3: Delete Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fe009a-001b-00f1-008b-003f004c00b3.png",
        "timestamp": 1583405708684,
        "duration": 27640
    },
    {
        "description": "Step 4: Verify Policy Group Template With Draft Status Deleted or Not|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007800c1-00a5-00b4-00d0-00c6004d0059.png",
        "timestamp": 1583405736955,
        "duration": 14784
    },
    {
        "description": "Step 5: Creating Policy Group Template with  Published|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00190095-0099-003b-00cf-00e100f9006a.png",
        "timestamp": 1583405752345,
        "duration": 26965
    },
    {
        "description": "Step 6: CleanUp|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002d0030-0084-0070-00a3-007400860028.png",
        "timestamp": 1583405779924,
        "duration": 17463
    },
    {
        "description": "Step 1: Creating Attribute Tag|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d800cc-003c-00bd-00ae-00a7009c00c5.png",
        "timestamp": 1583405798177,
        "duration": 18827
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00030012-00fa-005e-0039-002400e70046.png",
        "timestamp": 1583405817633,
        "duration": 26869
    },
    {
        "description": "Step 3: Creating Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:48:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e90041-0006-0010-00c2-00ac00d20063.png",
        "timestamp": 1583405845266,
        "duration": 34440
    },
    {
        "description": "Step 4: Editing Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft606'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft606'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:331:11)\nFrom: Task: Run it(\"Step 4: Editing Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:55:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e500d7-0062-007b-0001-00e000970017.png",
        "timestamp": 1583405880339,
        "duration": 35278
    },
    {
        "description": "Step 5: Deleting Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft606 Updated'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft606 Updated'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 5: Deleting Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:62:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0070006b-007c-0080-00bc-00bb001500e8.png",
        "timestamp": 1583405916255,
        "duration": 24293
    },
    {
        "description": "Step 6: Verify Policy Group With Draft Status Deleted or Not|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00270006-006d-0087-00e6-006a00b800f3.png",
        "timestamp": 1583405941127,
        "duration": 34753
    },
    {
        "description": "Step 7: Creating Policy Group with  Published|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 7: Creating Policy Group with  Published\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:76:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00d80096-0050-005c-00da-008a007900e7.png",
        "timestamp": 1583405976543,
        "duration": 34271
    },
    {
        "description": "Step 8: Edit Policies And Publish Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish935'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish935'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:402:11)\nFrom: Task: Run it(\"Step 8: Edit Policies And Publish Policy Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:83:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00cd00c9-006e-0040-00b6-00730098008d.png",
        "timestamp": 1583406011507,
        "duration": 24258
    },
    {
        "description": "Step 9: Delete Published Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish935'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish935'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 9: Delete Published Policy Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:90:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000000fa-009c-00f8-0022-004b00430087.png",
        "timestamp": 1583406036424,
        "duration": 24478
    },
    {
        "description": "Step 10: CleanUp|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "000b00a9-00c9-00e3-000c-008800ea005c.png",
        "timestamp": 1583406061490,
        "duration": 28043
    },
    {
        "description": "Step 1: Create New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00300072-0031-008c-005a-002d00fc00b2.png",
        "timestamp": 1583406090279,
        "duration": 13847
    },
    {
        "description": "Step 2: Search Default Group For New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f700a4-006d-001b-00af-008500d00014.png",
        "timestamp": 1583406104731,
        "duration": 17140
    },
    {
        "description": "Step 3: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
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
        "screenShotFile": "00170052-0033-0003-00fc-002100b8009b.png",
        "timestamp": 1583406122506,
        "duration": 25250
    },
    {
        "description": "Step 4: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b9009b-0015-007a-0055-00b400e60074.png",
        "timestamp": 1583406148506,
        "duration": 19919
    },
    {
        "description": "Step 5: Remove Permission Admin Role From Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "000c00bb-00c1-00aa-004c-001c00b50021.png",
        "timestamp": 1583406169097,
        "duration": 15276
    },
    {
        "description": "Step 6: Remove Surface Admin Role From Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00370028-000f-00d5-0090-008d00380028.png",
        "timestamp": 1583406185003,
        "duration": 15330
    },
    {
        "description": "Step 7: Deassociate Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0044000d-0082-006d-007e-005f00fc0070.png",
        "timestamp": 1583406200941,
        "duration": 3789
    },
    {
        "description": "Step 8: Delete Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "004e0035-00b3-0075-0005-00410090005e.png",
        "timestamp": 1583406205357,
        "duration": 10010
    },
    {
        "description": "Step 9: Verify Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00dd007c-0088-00a3-001b-00bb00850080.png",
        "timestamp": 1583406216003,
        "duration": 15801
    },
    {
        "description": "Step 10: Remove User From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='e2e Test <ramakrishna+e2etest@concourselabs.com>'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='e2e Test <ramakrishna+e2etest@concourselabs.com>'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at Group.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\groups.Po.ts:259:33)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\groups.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "001800cb-0091-0006-00c6-002d0019004b.png",
        "timestamp": 1583406232409,
        "duration": 27524
    },
    {
        "description": "Step 11: Delete Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
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
        "screenShotFile": "002a004e-008c-00c0-00d5-00f40081007d.png",
        "timestamp": 1583406260602,
        "duration": 32844
    },
    {
        "description": "Step 1: Creating Attribute Tag|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b5002b-00b9-007d-00a1-0067001300a6.png",
        "timestamp": 1583406294154,
        "duration": 24292
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ae00c1-00e6-00aa-008f-0023000c0023.png",
        "timestamp": 1583406319054,
        "duration": 25778
    },
    {
        "description": "Step 3: Creating Policy Group|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:45:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003e0013-0014-00da-0060-00c500920093.png",
        "timestamp": 1583406345509,
        "duration": 34073
    },
    {
        "description": "Step 4: Verify Approval Request For Publish|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:69:11)\nFrom: Task: Run it(\"Step 4: Verify Approval Request For Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:53:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00110086-00ec-007c-008b-00fd002700f6.png",
        "timestamp": 1583406380293,
        "duration": 10560
    },
    {
        "description": "Step 5: Approve Publish Request|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 5: Approve Publish Request\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:58:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000300b0-0005-004d-0096-006d008300d1.png",
        "timestamp": 1583406391559,
        "duration": 10497
    },
    {
        "description": "Step 6: Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 559). Other element would receive the click: <button _ngcontent-fgr-c13=\"\" class=\"btn btn-primary\">...</button>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 559). Other element would receive the click: <button _ngcontent-fgr-c13=\"\" class=\"btn btn-primary\">...</button>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:85:11)\nFrom: Task: Run it(\"Step 6: Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:62:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000e0035-0096-009c-0092-008c00bf0058.png",
        "timestamp": 1583406402738,
        "duration": 10545
    },
    {
        "description": "Step 7: Verify Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:112:11)\nFrom: Task: Run it(\"Step 7: Verify Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:66:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "008d00b4-008e-0037-0023-00de00ae000f.png",
        "timestamp": 1583406413961,
        "duration": 10482
    },
    {
        "description": "Step 8: Approve Delete Action|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-fgr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-fgr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 8: Approve Delete Action\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:71:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0016000e-0060-0071-0081-006c008100ea.png",
        "timestamp": 1583406425192,
        "duration": 10589
    },
    {
        "description": "Step 9: Verify Policy Group Deleted Or Not|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b2003e-00ad-0007-00b9-004f00930000.png",
        "timestamp": 1583406436501,
        "duration": 28934
    },
    {
        "description": "Step 10: CleanUp|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "002200e7-0066-0028-0082-00eb00b600e5.png",
        "timestamp": 1583406466047,
        "duration": 30180
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c300c3-001a-0078-0043-0027008500f0.png",
        "timestamp": 1583406496937,
        "duration": 21462
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003c0065-004a-00e6-0042-00ec00a40050.png",
        "timestamp": 1583406519041,
        "duration": 24079
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d200fa-00f6-00fb-00a7-001300680051.png",
        "timestamp": 1583406543861,
        "duration": 26799
    },
    {
        "description": "Step 4: Creating Policy Group with S3 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with S3 \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:68:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "009100fb-0023-00b3-00cd-007100390037.png",
        "timestamp": 1583406571353,
        "duration": 34453
    },
    {
        "description": "Step 5: Creating Policy Group with EC2 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"name\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"name\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:38:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementSendkeys (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:57:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:159:11)\nFrom: Task: Run it(\"Step 5: Creating Policy Group with EC2 \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:78:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00630058-0068-00ba-005e-0044002c008f.png",
        "timestamp": 1583406606549,
        "duration": 34586
    },
    {
        "description": "Step 6: Create New Enclave Model With Above Created Attribute Tags|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-tbh-c1=\"\" class=\"nav-link\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <section _ngcontent-tbh-c13=\"\" class=\"templates ng-untouched ng-pristine ng-valid\" formgroupname=\"policies\">...</section>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-tbh-c1=\"\" class=\"nav-link\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <section _ngcontent-tbh-c13=\"\" class=\"templates ng-untouched ng-pristine ng-valid\" formgroupname=\"policies\">...</section>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 6: Create New Enclave Model With Above Created Attribute Tags\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:88:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00af0001-00d7-004a-00d2-004100920016.png",
        "timestamp": 1583406641825,
        "duration": 10457
    },
    {
        "description": "Step 7: Verifying Risk |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Risk.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\risks.Po.ts:45:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 7: Verifying Risk \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:98:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0042001a-0077-0073-0074-00c400f40009.png",
        "timestamp": 1583406652979,
        "duration": 14573
    },
    {
        "description": "Step 8: Delete Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Enclave Model For Violation600'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Enclave Model For Violation600'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:105:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00a600ce-00d1-0080-002c-00c00057008b.png",
        "timestamp": 1583406668246,
        "duration": 24576
    },
    {
        "description": "Step 9: Verifying Risk After Deletion Of Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: each key must be a number of string; got undefined"
        ],
        "trace": [
            "TypeError: each key must be a number of string; got undefined\n    at keys.forEach.key (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2162:21)\n    at Array.forEach (<anonymous>)\n    at Promise.all.then.keys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2157:16)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.sendKeys()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.sendKeys (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2174:19)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as sendKeys] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Risk.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\risks.Po.ts:73:23)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: Run it(\"Step 9: Verifying Risk After Deletion Of Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:111:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "002e00d3-004c-006e-000d-0048000b007a.png",
        "timestamp": 1583406693492,
        "duration": 14465
    },
    {
        "description": "Step 10: CleanUp|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group Model Violation217'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group Model Violation217'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 10: CleanUp\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:118:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00750037-00a4-00d0-00f2-0054007500a4.png",
        "timestamp": 1583406708653,
        "duration": 24422
    },
    {
        "description": "Step 1: Create Attribute Tag|Verifying Policy Violation",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0078007a-009e-0061-0070-003200540071.png",
        "timestamp": 1583406733738,
        "duration": 24271
    },
    {
        "description": "Step 2: Create New Enclave Model With Above Created Attribute Tag|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Enclave Model For Violation646', 'Field Enclave Model For Violation646 should Enclave Model For Violation646 have value as Enclave Model For Violation646'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f6004d-00f8-009a-009a-009e008b0085.png",
        "timestamp": 1583406758631,
        "duration": 34745
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Verifying Policy Violation",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "16277367e0d99711de1b66df721884a7",
        "instanceId": 2696,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00910094-00b5-0055-0075-006c002e0073.png",
        "timestamp": 1583406794119,
        "duration": 26246
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