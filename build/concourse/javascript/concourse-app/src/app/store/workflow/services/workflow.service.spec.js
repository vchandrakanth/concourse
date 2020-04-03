"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/common/http/testing");
const workflow_service_1 = require("./workflow.service");
describe('WorkflowService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [workflow_service_1.WorkflowService]
        });
        injector = testing_1.getTestBed();
        service = injector.get(workflow_service_1.WorkflowService);
        httpMock = injector.get(testing_2.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Zsb3cuc2VydmljZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL3dvcmtmbG93L3NlcnZpY2VzL3dvcmtmbG93LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUE0RDtBQUM1RCwwREFBOEY7QUFFOUYseURBQXFEO0FBRXJELFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFDL0IsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksT0FBd0IsQ0FBQztJQUM3QixJQUFJLFFBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsaUNBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMsa0NBQWUsQ0FBQztTQUM3QixDQUFDLENBQUM7UUFFSCxRQUFRLEdBQUcsb0JBQVUsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLGtDQUFlLENBQUMsQ0FBQztRQUN4QyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9