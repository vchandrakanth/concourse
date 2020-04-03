"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const baseline_asset_service_1 = require("./baseline-asset.service");
describe('BaselineAssetService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [baseline_asset_service_1.BaselineAssetService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(baseline_asset_service_1.BaselineAssetService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuc2VydmljZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L3NlcnZpY2VzL2Jhc2VsaW5lLWFzc2V0LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE4RjtBQUM5RixtREFBNEQ7QUFFNUQscUVBQWdFO0FBRWhFLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUU7SUFDcEMsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksT0FBNkIsQ0FBQztJQUNsQyxJQUFJLFFBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsaUNBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMsNkNBQW9CLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxHQUFHLG9CQUFVLEVBQUUsQ0FBQztRQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyw2Q0FBb0IsQ0FBQyxDQUFDO1FBQzdDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLCtCQUFxQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=