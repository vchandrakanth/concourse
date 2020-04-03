"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const catalog_service_1 = require("./catalog.service");
describe('CatalogService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [catalog_service_1.CatalogService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(catalog_service_1.CatalogService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy5zZXJ2aWNlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvY2F0YWxvZy1zZXJ2aWNlL3NlcnZpY2VzL2NhdGFsb2cuc2VydmljZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMERBQThGO0FBQzlGLG1EQUE0RDtBQUU1RCx1REFBbUQ7QUFFbkQsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUM5QixJQUFJLFFBQWlCLENBQUM7SUFDdEIsSUFBSSxPQUF1QixDQUFDO0lBQzVCLElBQUksUUFBK0IsQ0FBQztJQUVwQyxVQUFVLENBQUMsR0FBRyxFQUFFO1FBQ2QsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQztZQUM3QixPQUFPLEVBQUUsQ0FBQyxpQ0FBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsQ0FBQyxnQ0FBYyxDQUFDO1NBQzVCLENBQUMsQ0FBQztRQUVILFFBQVEsR0FBRyxvQkFBVSxFQUFFLENBQUM7UUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsZ0NBQWMsQ0FBQyxDQUFDO1FBQ3ZDLFFBQVEsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLCtCQUFxQixDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=