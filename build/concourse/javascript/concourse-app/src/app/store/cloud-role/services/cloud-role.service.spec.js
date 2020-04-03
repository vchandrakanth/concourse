"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const cloud_role_service_1 = require("./cloud-role.service");
describe('RoleService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [cloud_role_service_1.CloudRoleService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(cloud_role_service_1.CloudRoleService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2xvdWQtcm9sZS9zZXJ2aWNlcy9jbG91ZC1yb2xlLnNlcnZpY2Uuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBEQUE4RjtBQUM5RixtREFBNEQ7QUFFNUQsNkRBQXdEO0FBRXhELFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO0lBQzNCLElBQUksUUFBaUIsQ0FBQztJQUN0QixJQUFJLE9BQXlCLENBQUM7SUFDOUIsSUFBSSxRQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLGlDQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLHFDQUFnQixDQUFDO1NBQzlCLENBQUMsQ0FBQztRQUVILFFBQVEsR0FBRyxvQkFBVSxFQUFFLENBQUM7UUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMscUNBQWdCLENBQUMsQ0FBQztRQUN6QyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9