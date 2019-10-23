"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// See README.md for important details.
const protractor_1 = require("protractor");
const expectHelper_1 = require("../utils/expectHelper");
const controlTopology_Po_1 = require("../pageObjects/controlTopology.Po");
describe('Login Concourse ', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let originalTimeout;
        let EC = protractor_1.ExpectedConditions;
        let controlTopology = new controlTopology_Po_1.ControlTopology();
        let properties = require('../conf/properties');
        beforeEach(function () {
            originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 200000;
        });
        it('Step 1: Create New Organization', function () {
            return __awaiter(this, void 0, void 0, function* () {
                yield controlTopology.createOrganization();
                expectHelper_1.ExpectHelper.isListElementExists(controlTopology.chart, 'Test Org');
            });
        });
        afterEach(function () {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbFRvcG9sb2d5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NwZWNzL2NvbnRyb2xUb3BvbG9neS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHVDQUF1QztBQUN2QywyQ0FBMEY7QUFDMUYsd0RBQXFEO0FBR3JELDBFQUFvRTtBQUdwRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7O1FBQzNCLElBQUksZUFBZSxDQUFDO1FBQ3BCLElBQUksRUFBRSxHQUFHLCtCQUFrQixDQUFDO1FBQzVCLElBQUksZUFBZSxHQUFHLElBQUksb0NBQWUsRUFBRSxDQUFDO1FBQzVDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRS9DLFVBQVUsQ0FBQztZQUVULGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUM7WUFDbkQsT0FBTyxDQUFDLHdCQUF3QixHQUFHLE1BQU0sQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FBQztRQUdILEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRTs7Z0JBRXBDLE1BQU0sZUFBZSxDQUFDLGtCQUFrQixFQUFFLENBQUM7Z0JBQzNDLDJCQUFZLENBQUMsbUJBQW1CLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUVsRSxDQUFDO1NBQUEsQ0FBQyxDQUFDO1FBRVAsU0FBUyxDQUFDO1lBQ1IsT0FBTyxDQUFDLHdCQUF3QixHQUFHLGVBQWUsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FBQSxDQUFDLENBQUMifQ==