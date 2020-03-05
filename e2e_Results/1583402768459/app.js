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
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "009e00a3-00c8-001b-002f-001c00ce0075.png",
        "timestamp": 1583402781783,
        "duration": 18894
    },
    {
        "description": "Step 2: Edit Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0036005e-00a6-0046-00eb-00f400a90046.png",
        "timestamp": 1583402801357,
        "duration": 19977
    },
    {
        "description": "Step 3: Delete Attribute Tag|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00070005-00b6-00c0-0001-00ba008700e9.png",
        "timestamp": 1583402822016,
        "duration": 19967
    },
    {
        "description": "Step 4: Verify Attribute Tag Deleted or Not|Creaing Attribute Tags",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "006300c4-00d0-00e9-00b4-007d00400056.png",
        "timestamp": 1583402842617,
        "duration": 10623
    },
    {
        "description": "Step 1: Create Attribute Tag|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007f00fa-00c3-0061-0030-004500af00f6.png",
        "timestamp": 1583402853884,
        "duration": 14234
    },
    {
        "description": "Step 2: Create New Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model456', 'Field Test Enclave Model456 should Test Enclave Model456 have value as Test Enclave Model456'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00dc0005-0090-0027-003f-00bc0053000c.png",
        "timestamp": 1583402868774,
        "duration": 34134
    },
    {
        "description": "Step 3: Edit Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model456'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model456'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:180:11)\nFrom: Task: Run it(\"Step 3: Edit Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\assetManager.ts:44:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00c400c5-00b9-000a-0076-00b3008f00df.png",
        "timestamp": 1583402903631,
        "duration": 25193
    },
    {
        "description": "Step 4: Delete Enclave Model|Creating Enclave Models ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model456  Updated'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model456  Updated'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 4: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\assetManager.ts:51:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\assetManager.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003e00b5-00f4-00dd-008f-00cf00cb0070.png",
        "timestamp": 1583402929555,
        "duration": 24632
    },
    {
        "description": "Step 5: Verify Enclave Model Deleted Or Not|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f3005b-009f-0010-0078-009a003600fc.png",
        "timestamp": 1583402954943,
        "duration": 20810
    },
    {
        "description": "Step 6: Clean Up|Creating Enclave Models ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "008b0022-00b1-006d-0016-009c00b500b9.png",
        "timestamp": 1583402976434,
        "duration": 15414
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "008900d4-0088-009a-00b1-00b8005300c6.png",
        "timestamp": 1583402992507,
        "duration": 18831
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Logical Deployment",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00a300a7-0050-000f-00aa-003800bf00f9.png",
        "timestamp": 1583403011992,
        "duration": 23685
    },
    {
        "description": "Step 3: Create New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model267', 'Field Test Enclave Model267 should Test Enclave Model267 have value as Test Enclave Model267'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "00150072-0094-0055-006d-00ad00d70079.png",
        "timestamp": 1583403036307,
        "duration": 34105
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:65:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:57:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00220067-00dd-0061-0097-005c00ad007b.png",
        "timestamp": 1583403071085,
        "duration": 26516
    },
    {
        "description": "Step 4: Update New Enclave Model|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:258:11)\nFrom: Task: Run it(\"Step 4: Update New Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:67:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003300c2-0089-0009-0072-00cd005400ad.png",
        "timestamp": 1583403098280,
        "duration": 34686
    },
    {
        "description": "Step 6: Update Logical Deployement|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment660'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment660'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:175:15)\nFrom: Task: Run it(\"Step 6: Update Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:76:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0007006a-00c4-00d3-001e-00c900ff008d.png",
        "timestamp": 1583403133683,
        "duration": 24654
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment660'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment660'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:86:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e400a2-00b6-00b0-003c-00380082003d.png",
        "timestamp": 1583403159031,
        "duration": 26503
    },
    {
        "description": "Step 8: Clean Up|Creaing Logical Deployment",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model267'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Clean Up\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeployment.ts:92:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeployment.js:18:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "007700d8-0031-00ce-00f3-00ff00db00a7.png",
        "timestamp": 1583403186216,
        "duration": 24972
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Logical Deployment Violations",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b800c3-00f1-006c-00b5-00d1007f004b.png",
        "timestamp": 1583403211837,
        "duration": 24189
    },
    {
        "description": "Step 2: Create New Enclave Model|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Expected '15151\nEC2 Test - Enclave Model192\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:40:57 PM\nFeb 28, 2020, 4:40:57 PM\n15148\nEnclave Model For Violation416\nv0.1\npublished\nself managed\nFeb 28, 2020, 4:26:03 PM\nFeb 28, 2020, 4:26:03 PM\n15103\nTest Enclave Model956\nv0.1\npublished\nself managed\nFeb 27, 2020, 10:03:01 PM\nFeb 27, 2020, 10:03:01 PM\n15102\nTest Enclave Model221\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:55:20 PM\nFeb 27, 2020, 9:55:20 PM\n15091\nTest Enclave Model144\nv0.1\npublished\nself managed\nFeb 27, 2020, 9:47:43 PM\nFeb 27, 2020, 9:47:43 PM\n15090\nTest Enclave Model742\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:51:32 PM\nFeb 27, 2020, 8:51:32 PM\n15089\nTest Enclave Model460\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:43:44 PM\nFeb 27, 2020, 8:43:44 PM\n15088\nTest Enclave Model283\nv0.1\npublished\nself managed\nFeb 27, 2020, 8:36:00 PM\nFeb 27, 2020, 8:36:00 PM\n15087\nNew Enclave Model 0227\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:57:19 PM\nFeb 27, 2020, 6:57:19 PM\n15086\ne2e Enclave Model\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:52:34 PM\nFeb 27, 2020, 6:52:34 PM\n15085\nTest Enclave Model697\nv0.1\npublished\nself managed\nFeb 27, 2020, 6:50:49 PM\nFeb 27, 2020, 6:50:49 PM' to match 'Test Enclave Model879', 'Field Test Enclave Model879 should Test Enclave Model879 have value as Test Enclave Model879'."
        ],
        "trace": [
            "Error: Failed expectation\n    at Function.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\expectHelper.ts:275:14)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\expectHelper.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "005200c7-000f-007f-007e-003a005500dd.png",
        "timestamp": 1583403236733,
        "duration": 34045
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Logical Deployment Violations",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "007c0089-00ea-0001-0088-003500200091.png",
        "timestamp": 1583403271550,
        "duration": 28244
    },
    {
        "description": "Step 4: Creating Policy Group with  Published|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00d400dc-00c2-00ce-0078-0010004c00b8.png",
        "timestamp": 1583403300439,
        "duration": 34714
    },
    {
        "description": "Step 5: Logical Deployement|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model879'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model879'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:65:15)\nFrom: Task: Run it(\"Step 5: Logical Deployement\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:81:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000500ca-0020-00e4-0025-0039002600a6.png",
        "timestamp": 1583403335828,
        "duration": 26750
    },
    {
        "description": "Step 6: Verify Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00b400d9-0037-007e-0036-0070000600d3.png",
        "timestamp": 1583403363285,
        "duration": 14697
    },
    {
        "description": "Step 7: Delete Logical Deployment|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, span[title='E2E Test Deployment892'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, span[title='E2E Test Deployment892'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at LogicalDeployment.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\logicalDeployment.Po.ts:221:15)\nFrom: Task: Run it(\"Step 7: Delete Logical Deployment\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:98:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00af00f8-0007-0059-000d-006e003200e0.png",
        "timestamp": 1583403378644,
        "duration": 26406
    },
    {
        "description": "Step 8: Re verifying Risk|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00e80063-00cc-0036-00b5-007500fc0014.png",
        "timestamp": 1583403405695,
        "duration": 14657
    },
    {
        "description": "Step 9: Clean Up|Creaing Logical Deployment Violations",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Test Enclave Model879'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Test Enclave Model879'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 9: Clean Up\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\logicalDeploymentViolation.ts:111:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\logicalDeploymentViolation.js:22:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0029007c-0072-008c-00e8-00b3006000ba.png",
        "timestamp": 1583403421033,
        "duration": 24882
    },
    {
        "description": "Step 1: Create New Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00d300f5-0012-000e-009b-00eb00f30074.png",
        "timestamp": 1583403446610,
        "duration": 26431
    },
    {
        "description": "Step 2: Edit Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c0001c-009a-00f9-00f5-0033002d00ff.png",
        "timestamp": 1583403473618,
        "duration": 38703
    },
    {
        "description": "Step 3: Delete Policy Group Template With Draft Status|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c600c9-00d3-0052-00dc-006d00bf0057.png",
        "timestamp": 1583403512876,
        "duration": 27457
    },
    {
        "description": "Step 4: Verify Policy Group Template With Draft Status Deleted or Not|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00140065-004d-00bb-0062-0001001d000c.png",
        "timestamp": 1583403541016,
        "duration": 14996
    },
    {
        "description": "Step 5: Creating Policy Group Template with  Published|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0012006f-0080-00f8-0012-000c009e0056.png",
        "timestamp": 1583403556700,
        "duration": 27462
    },
    {
        "description": "Step 6: CleanUp|Creaing Policy Group Template Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0064006c-000f-002e-00a2-00120082005a.png",
        "timestamp": 1583403584765,
        "duration": 17484
    },
    {
        "description": "Step 1: Creating Attribute Tag|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00fc0075-005a-00e1-00cc-00930009008c.png",
        "timestamp": 1583403603055,
        "duration": 19481
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "003700d9-008f-004d-00c2-0063007e003c.png",
        "timestamp": 1583403623216,
        "duration": 27069
    },
    {
        "description": "Step 3: Creating Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00e90091-0082-000e-001c-008100d90045.png",
        "timestamp": 1583403650925,
        "duration": 34704
    },
    {
        "description": "Step 4: Editing Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft834'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft834'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:331:11)\nFrom: Task: Run it(\"Step 4: Editing Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:55:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00910002-008b-0041-0006-004b001b00a9.png",
        "timestamp": 1583403686356,
        "duration": 34865
    },
    {
        "description": "Step 5: Deleting Policy Group with  Draft|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft834 Updated'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Draft834 Updated'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 5: Deleting Policy Group with  Draft\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:62:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00e60054-0076-009d-0047-00a5004b00ae.png",
        "timestamp": 1583403721889,
        "duration": 24677
    },
    {
        "description": "Step 6: Verify Policy Group With Draft Status Deleted or Not|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c80049-00e0-004b-001c-001f004600d4.png",
        "timestamp": 1583403747207,
        "duration": 34668
    },
    {
        "description": "Step 7: Creating Policy Group with  Published|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "000900bf-0006-0087-00d2-00be0085008d.png",
        "timestamp": 1583403782521,
        "duration": 34246
    },
    {
        "description": "Step 8: Edit Policies And Publish Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish971'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish971'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:402:11)\nFrom: Task: Run it(\"Step 8: Edit Policies And Publish Policy Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:83:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00440006-0036-0079-0052-000500260020.png",
        "timestamp": 1583403817478,
        "duration": 24340
    },
    {
        "description": "Step 9: Delete Published Policy Group|Creaing Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish971'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group with Publish971'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 9: Delete Published Policy Group\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyGroup.ts:90:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyGroup.js:19:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000500da-0018-008b-003e-001b00690073.png",
        "timestamp": 1583403842403,
        "duration": 24507
    },
    {
        "description": "Step 10: CleanUp|Creaing Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00ee0035-00d4-00f8-00ee-00ad00b40039.png",
        "timestamp": 1583403867541,
        "duration": 28404
    },
    {
        "description": "Step 1: Create New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "001900f8-00b0-005b-003e-00430097005d.png",
        "timestamp": 1583403896651,
        "duration": 14499
    },
    {
        "description": "Step 2: Search Default Group For New Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b40010-00ca-007d-0051-008d00cf0053.png",
        "timestamp": 1583403911789,
        "duration": 17351
    },
    {
        "description": "Step 3: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "006d006f-00c7-007e-00b1-00b300f70026.png",
        "timestamp": 1583403929747,
        "duration": 25157
    },
    {
        "description": "Step 4: Remove Identity Admin Role From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "002e00aa-001b-00ee-00c9-0085007d00e1.png",
        "timestamp": 1583403955566,
        "duration": 11796
    },
    {
        "description": "Step 5: Remove Permission Admin Role From Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00ff008c-002f-0051-00eb-007500c60026.png",
        "timestamp": 1583403968009,
        "duration": 20040
    },
    {
        "description": "Step 6: Remove Surface Admin Role From Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00f9002e-00b4-0092-0081-00b700b7002a.png",
        "timestamp": 1583403988687,
        "duration": 14911
    },
    {
        "description": "Step 7: Deassociate Group|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "0013002a-0022-001a-00a5-00f000180042.png",
        "timestamp": 1583404004292,
        "duration": 3818
    },
    {
        "description": "Step 8: Delete Surface|Surface Creation Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00b600e4-0067-00f7-00ff-001900c70092.png",
        "timestamp": 1583404008760,
        "duration": 10320
    },
    {
        "description": "Step 9: Verify Surface|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-mvf-c1=\"\" class=\"nav-link active\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" aria-modal=\"true\" style=\"display: block;\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-mvf-c1=\"\" class=\"nav-link active\" data-e2e=\"linkSurfaces\" routerlink=\"surfaces\" routerlinkactive=\"active\" href=\"/surfaces\">...</a> is not clickable at point (146, 80). Other element would receive the click: <modal-container class=\"modal fade show\" role=\"dialog\" tabindex=\"-1\" aria-modal=\"true\" style=\"display: block;\">...</modal-container>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Surface.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\surfaces.Po.ts:171:15)\nFrom: Task: Run it(\"Step 9: Verify Surface\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\surfaces.ts:71:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\surfaces.js:17:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "004500f3-0092-0000-00f5-0087004d00d8.png",
        "timestamp": 1583404019735,
        "duration": 461
    },
    {
        "description": "Step 10: Remove User From Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00540097-00ec-0006-00f2-001e00910070.png",
        "timestamp": 1583404020880,
        "duration": 32341
    },
    {
        "description": "Step 11: Delete Group|Surface Creation Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00000027-007b-0028-0065-0028006200db.png",
        "timestamp": 1583404053848,
        "duration": 32890
    },
    {
        "description": "Step 1: Creating Attribute Tag|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005100f8-00a1-00d1-00e9-00f5009900aa.png",
        "timestamp": 1583404087365,
        "duration": 24579
    },
    {
        "description": "Step 2: Creating Policy Group Template with  Published|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00c200c3-0090-00e4-00d8-00a600e70030.png",
        "timestamp": 1583404112593,
        "duration": 26567
    },
    {
        "description": "Step 3: Creating Policy Group|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00b40087-00fc-007d-0044-00df002f009e.png",
        "timestamp": 1583404139797,
        "duration": 34622
    },
    {
        "description": "Step 4: Verify Approval Request For Publish|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:69:11)\nFrom: Task: Run it(\"Step 4: Verify Approval Request For Publish\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:53:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00aa0023-00ed-0093-0007-006f007d0050.png",
        "timestamp": 1583404175150,
        "duration": 10600
    },
    {
        "description": "Step 5: Approve Publish Request|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 5: Approve Publish Request\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:58:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "001300f0-00df-007e-00cf-00fd00e40067.png",
        "timestamp": 1583404186467,
        "duration": 10552
    },
    {
        "description": "Step 6: Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 559). Other element would receive the click: <button _ngcontent-trr-c13=\"\" class=\"btn btn-primary\">...</button>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link active\" data-e2e=\"policyGroupMenu\" routerlink=\"policy-groups\" routerlinkactive=\"active\" href=\"/policy-groups\">...</a> is not clickable at point (146, 559). Other element would receive the click: <button _ngcontent-trr-c13=\"\" class=\"btn btn-primary\">...</button>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:85:11)\nFrom: Task: Run it(\"Step 6: Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:62:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "008d00e1-001f-00bd-00fd-0059001000c6.png",
        "timestamp": 1583404197682,
        "duration": 10604
    },
    {
        "description": "Step 7: Verify Approval Request For Delete|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:112:11)\nFrom: Task: Run it(\"Step 7: Verify Approval Request For Delete\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:66:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00640077-00f8-00df-0032-007800140038.png",
        "timestamp": 1583404208947,
        "duration": 10526
    },
    {
        "description": "Step 8: Approve Delete Action|Policy Group Concourse ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-trr-c1=\"\" class=\"nav-link\" data-e2e=\"linkApprovals\" routerlink=\"workflows/approvals\" routerlinkactive=\"active\" href=\"/workflows/approvals\">...</a> is not clickable at point (146, 435). Other element would receive the click: <h5 _ngcontent-trr-c13=\"\" class=\"d-flex align-items-center\">...</h5>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at Approvals.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\approvals.Po.ts:45:11)\nFrom: Task: Run it(\"Step 8: Approve Delete Action\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\approvals.ts:71:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\approvals.js:20:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "003100d1-0072-0046-008b-00c800fe00ae.png",
        "timestamp": 1583404220182,
        "duration": 10577
    },
    {
        "description": "Step 9: Verify Policy Group Deleted Or Not|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "004100a4-0033-00d8-00e3-00f000dd005e.png",
        "timestamp": 1583404231451,
        "duration": 26503
    },
    {
        "description": "Step 10: CleanUp|Policy Group Concourse ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00340062-0053-004f-00e4-002b00b7007c.png",
        "timestamp": 1583404258614,
        "duration": 28353
    },
    {
        "description": "Step 1: Create Attribute Tag|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "0059001c-0017-0034-0081-005700bc00ca.png",
        "timestamp": 1583404287673,
        "duration": 19096
    },
    {
        "description": "Step 2: Create Another Attribute Tag|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00b50093-008c-004c-0048-006d00c800c5.png",
        "timestamp": 1583404307473,
        "duration": 24295
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Creaing Model Violations ",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "005d00eb-00c6-0060-00ca-00cd00c40075.png",
        "timestamp": 1583404332398,
        "duration": 26202
    },
    {
        "description": "Step 4: Creating Policy Group with S3 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "007f00ad-005b-0099-004a-006b005600db.png",
        "timestamp": 1583404359239,
        "duration": 34783
    },
    {
        "description": "Step 5: Creating Policy Group with EC2 |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00ce0003-00cf-006f-0042-004d004f006c.png",
        "timestamp": 1583404394664,
        "duration": 34412
    },
    {
        "description": "Step 6: Create New Enclave Model With Above Created Attribute Tags|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: element click intercepted: Element <a _ngcontent-kgi-c1=\"\" class=\"nav-link\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <section _ngcontent-kgi-c13=\"\" class=\"templates ng-untouched ng-pristine ng-valid\" formgroupname=\"policies\">...</section>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown"
        ],
        "trace": [
            "WebDriverError: element click intercepted: Element <a _ngcontent-kgi-c1=\"\" class=\"nav-link\" data-e2e=\"linkAssets\" routerlink=\"assets\" routerlinkactive=\"active\" href=\"/assets\">...</a> is not clickable at point (146, 270). Other element would receive the click: <section _ngcontent-kgi-c13=\"\" class=\"templates ng-untouched ng-pristine ng-valid\" formgroupname=\"policies\">...</section>\n  (Session info: chrome=76.0.3809.100)\nBuild info: version: '3.141.59', revision: 'e82be7d358', time: '2018-11-14T08:25:53'\nSystem info: host: 'NB0013011', ip: '10.8.0.30', os.name: 'Windows 8.1', os.arch: 'amd64', os.version: '6.3', java.version: '1.8.0_221'\nDriver info: driver.version: unknown\n    at Object.checkLegacyResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\error.js:546:15)\n    at parseHttpResponse (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:509:13)\n    at doSend.then.response (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\http.js:441:30)\n    at process._tickCallback (internal/process/next_tick.js:68:7)\nFrom: Task: WebElement.click()\n    at thenableWebDriverProxy.schedule (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:807:17)\n    at WebElement.schedule_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2010:25)\n    at WebElement.click (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\webdriver.js:2092:17)\n    at actionFn (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:89:44)\n    at Array.map (<anonymous>)\n    at actionResults.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:461:65)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:50:11)\nFrom: Task: Run it(\"Step 6: Create New Enclave Model With Above Created Attribute Tags\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:88:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "000f0075-00b1-00b4-0034-00900090008c.png",
        "timestamp": 1583404429797,
        "duration": 10486
    },
    {
        "description": "Step 7: Verifying Risk |Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00790024-0054-0072-0084-0089004c00f5.png",
        "timestamp": 1583404440954,
        "duration": 14323
    },
    {
        "description": "Step 8: Delete Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(xpath, //span[.='Enclave Model For Violation919'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(xpath, //span[.='Enclave Model For Violation919'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:233:11)\nFrom: Task: Run it(\"Step 8: Delete Enclave Model\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:105:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "006600c8-001f-0045-005f-002300e10081.png",
        "timestamp": 1583404455976,
        "duration": 24364
    },
    {
        "description": "Step 9: Verifying Risk After Deletion Of Enclave Model|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
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
        "screenShotFile": "00ba0078-0038-00d4-0022-00c100170039.png",
        "timestamp": 1583404481002,
        "duration": 14926
    },
    {
        "description": "Step 10: CleanUp|Creaing Model Violations ",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, h5[data-e2e='Policy Group Model Violation537'])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, h5[data-e2e='Policy Group Model Violation537'])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:377:11)\nFrom: Task: Run it(\"Step 10: CleanUp\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\modelViolation.ts:118:3)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\modelViolation.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00ae005a-00cf-00e5-00c3-001f00ed00f6.png",
        "timestamp": 1583404496609,
        "duration": 24469
    },
    {
        "description": "Step 1: Create Attribute Tag|Verifying Policy Violation",
        "passed": true,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": "Passed.",
        "trace": "",
        "browserLogs": [],
        "screenShotFile": "00300045-00d2-0006-00f6-007300a300f9.png",
        "timestamp": 1583404521708,
        "duration": 23942
    },
    {
        "description": "Step 2: Create New Enclave Model With Above Created Attribute Tag|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, [data-e2e=\"newAssetButton\"])"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, [data-e2e=\"newAssetButton\"])\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at AssetManager.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\assetManager.Po.ts:58:11)\nFrom: Task: Run it(\"Step 2: Create New Enclave Model With Above Created Attribute Tag\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyViolations.ts:48:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00070099-0002-0063-00ec-006100f40019.png",
        "timestamp": 1583404546352,
        "duration": 34809
    },
    {
        "description": "Step 3: Creating Policy Group Template with  Published|Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroupTemplatePage.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroupTemplate.Po.ts:245:11)\nFrom: Task: Run it(\"Step 3: Creating Policy Group Template with  Published\") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyViolations.ts:58:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "0011000a-0012-0047-006b-0064009a0052.png",
        "timestamp": 1583404581809,
        "duration": 222130
    },
    {
        "description": "Step 4: Creating Policy Group with S3 |Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "Failed: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as click] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at Object.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\utils\\utils.ts:13:25)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:4:12)\n    at Object.elementClick (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\utils\\utils.js:23:12)\n    at PolicyGroup.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\policyGroup.Po.ts:948:11)\nFrom: Task: Run it(\"Step 4: Creating Policy Group with S3 \") in control flow\n    at UserContext.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:94:19)\n    at attempt (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4297:26)\n    at QueueRunner.run (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4217:20)\n    at runNext (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4257:20)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4264:13\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4172:9\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\jasminewd2\\index.js:64:48\n    at ControlFlow.emit (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\events.js:62:21)\n    at ControlFlow.shutdown_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2674:10)\n    at shutdownTask_.MicroTask (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2599:53)\nFrom asynchronous test: \nError\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\specs\\policyViolations.ts:66:5)\n    at Generator.next (<anonymous>)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:8:71\n    at new Promise (<anonymous>)\n    at __awaiter (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:4:12)\n    at Suite.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\specs\\policyViolations.js:21:12)\n    at addSpecsToSuite (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1107:25)\n    at Env.describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:1074:7)\n    at describe (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\jasmine-core\\lib\\jasmine-core\\jasmine.js:4399:18)"
        ],
        "browserLogs": [],
        "screenShotFile": "00f900c4-0015-0050-003b-00f400760073.png",
        "timestamp": 1583404804539,
        "duration": 21259
    },
    {
        "description": "Step 5: Verifying Risk |Verifying Policy Violation",
        "passed": false,
        "pending": false,
        "os": "windows nt",
        "sessionId": "ba2bb5e8fa8233198db9563a3ccd28fa",
        "instanceId": 4348,
        "browser": {
            "name": "chrome",
            "version": "76.0.3809.100"
        },
        "message": [
            "NoSuchElementError: No element found using locator: By(css selector, select)"
        ],
        "trace": [
            "NoSuchElementError: No element found using locator: By(css selector, select)\n    at elementArrayFinder.getWebElements.then (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:814:27)\n    at ManagedPromise.invokeCallback_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:1376:14)\n    at TaskQueue.execute_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3084:14)\n    at TaskQueue.executeNext_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:3067:27)\n    at asyncRun (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:2927:27)\n    at C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\promise.js:668:7\n    at process._tickCallback (internal/process/next_tick.js:68:7)Error\n    at ElementArrayFinder.applyAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:459:27)\n    at ElementArrayFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:91:29)\n    at ElementFinder.(anonymous function).args [as getId] (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\built\\element.js:831:22)\n    at ActionSequence.mouseMove (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:151:44)\n    at ActionSequence.scheduleMouseAction_ (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:189:14)\n    at ActionSequence.mouseDown (C:\\Users\\intone-wv\\Desktop\\e2e\\node_modules\\protractor\\node_modules\\selenium-webdriver\\lib\\actions.js:225:17)\n    at Risk.<anonymous> (C:\\Users\\intone-wv\\Desktop\\e2e\\src\\pageObjects\\risks.Po.ts:34:29)\n    at Generator.next (<anonymous>)\n    at fulfilled (C:\\Users\\intone-wv\\Desktop\\e2e\\build\\pageObjects\\risks.Po.js:5:58)\n    at process._tickCallback (internal/process/next_tick.js:68:7)"
        ],
        "browserLogs": [],
        "screenShotFile": "000f0037-00d1-0013-006a-002e007300b1.png",
        "timestamp": 1583404826491,
        "duration": 21392
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
