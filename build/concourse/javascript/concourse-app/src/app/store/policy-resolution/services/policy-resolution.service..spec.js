"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/common/http/testing");
const policy_resolution_service_1 = require("./policy-resolution.service");
describe('PolicyViolationResolutionServiceRequest', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.HttpClientTestingModule],
            providers: [policy_resolution_service_1.PolicyResolutionService]
        });
        injector = testing_1.getTestBed();
        service = injector.get(policy_resolution_service_1.PolicyResolutionService);
        httpMock = injector.get(testing_2.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LXJlc29sdXRpb24uc2VydmljZS4uc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9wb2xpY3ktcmVzb2x1dGlvbi9zZXJ2aWNlcy9wb2xpY3ktcmVzb2x1dGlvbi5zZXJ2aWNlLi5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQTREO0FBQzVELDBEQUE4RjtBQUU5RiwyRUFBc0U7QUFFdEUsUUFBUSxDQUFDLHlDQUF5QyxFQUFFLEdBQUcsRUFBRTtJQUN2RCxJQUFJLFFBQWlCLENBQUM7SUFDdEIsSUFBSSxPQUFnQyxDQUFDO0lBQ3JDLElBQUksUUFBaUMsQ0FBQztJQUV0QyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyxpQ0FBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsQ0FBQyxtREFBdUIsQ0FBQztTQUNyQyxDQUFDLENBQUM7UUFFSCxRQUFRLEdBQUcsb0JBQVUsRUFBRSxDQUFDO1FBQ3hCLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLG1EQUF1QixDQUFDLENBQUM7UUFDaEQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsK0JBQXFCLENBQUMsQ0FBQTtJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUU7UUFDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==