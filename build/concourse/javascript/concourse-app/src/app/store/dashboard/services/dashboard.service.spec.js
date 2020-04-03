"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/common/http/testing");
const dashboard_service_1 = require("./dashboard.service");
describe('DashboardService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [dashboard_service_1.DashboardService]
        });
        injector = testing_1.getTestBed();
        service = injector.get(dashboard_service_1.DashboardService);
        httpMock = injector.get(testing_2.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9kYXNoYm9hcmQvc2VydmljZXMvZGFzaGJvYXJkLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1EQUE0RDtBQUM1RCwwREFBOEY7QUFFOUYsMkRBQXVEO0FBRXZELFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7SUFDaEMsSUFBSSxRQUFpQixDQUFDO0lBQ3RCLElBQUksT0FBeUIsQ0FBQztJQUM5QixJQUFJLFFBQStCLENBQUM7SUFFcEMsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLGlCQUFPLENBQUMsc0JBQXNCLENBQUM7WUFDN0IsT0FBTyxFQUFFLENBQUMsaUNBQXVCLENBQUM7WUFDbEMsU0FBUyxFQUFFLENBQUMsb0NBQWdCLENBQUM7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsUUFBUSxHQUFHLG9CQUFVLEVBQUUsQ0FBQztRQUN4QixPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3pDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLCtCQUFxQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=