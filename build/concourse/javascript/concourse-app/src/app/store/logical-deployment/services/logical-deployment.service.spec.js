"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/common/http/testing");
const logical_deployment_service_1 = require("./logical-deployment.service");
describe('LogicalDeploymentService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [logical_deployment_service_1.LogicalDeploymentService]
        });
        injector = testing_1.getTestBed();
        service = injector.get(logical_deployment_service_1.LogicalDeploymentService);
        httpMock = injector.get(testing_2.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naWNhbC1kZXBsb3ltZW50LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9sb2dpY2FsLWRlcGxveW1lbnQvc2VydmljZXMvbG9naWNhbC1kZXBsb3ltZW50LnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUE0RDtBQUM1RCwwREFBOEY7QUFFOUYsNkVBQXdFO0FBRXhFLFFBQVEsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUU7SUFDeEMsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksT0FBaUMsQ0FBQztJQUN0QyxJQUFJLFFBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsaUNBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMscURBQXdCLENBQUM7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsUUFBUSxHQUFHLG9CQUFVLEVBQUUsQ0FBQztRQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxREFBd0IsQ0FBQyxDQUFDO1FBQ2pELFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLCtCQUFxQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=