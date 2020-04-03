"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const cloud_role_assignment_service_1 = require("./cloud-role-assignment.service");
describe('CloudRoleAssignmentService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [cloud_role_assignment_service_1.CloudRoleAssignmentService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(cloud_role_assignment_service_1.CloudRoleAssignmentService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1hc3NpZ25tZW50LnNlcnZpY2Uuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jbG91ZC1yb2xlLWFzc2lnbm1lbnRzL3NlcnZpY2VzL2Nsb3VkLXJvbGUtYXNzaWdubWVudC5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBOEY7QUFDOUYsbURBQTREO0FBRTVELG1GQUE2RTtBQUU3RSxRQUFRLENBQUMsNEJBQTRCLEVBQUUsR0FBRyxFQUFFO0lBQzFDLElBQUksUUFBaUIsQ0FBQztJQUN0QixJQUFJLE9BQW1DLENBQUM7SUFDeEMsSUFBSSxRQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLGlDQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLDBEQUEwQixDQUFDO1NBQ3hDLENBQUMsQ0FBQztRQUVILFFBQVEsR0FBRyxvQkFBVSxFQUFFLENBQUM7UUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsMERBQTBCLENBQUMsQ0FBQztRQUNuRCxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9