"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const asset_service_1 = require("./asset.service");
describe('PolicyGroupService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [asset_service_1.AssetService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(asset_service_1.AssetService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuc2VydmljZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Fzc2V0L3NlcnZpY2VzL2Fzc2V0LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE4RjtBQUM5RixtREFBNEQ7QUFFNUQsbURBQStDO0FBRS9DLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksT0FBcUIsQ0FBQztJQUMxQixJQUFJLFFBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsaUNBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMsNEJBQVksQ0FBQztTQUMxQixDQUFDLENBQUM7UUFFSCxRQUFRLEdBQUcsb0JBQVUsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUNyQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9