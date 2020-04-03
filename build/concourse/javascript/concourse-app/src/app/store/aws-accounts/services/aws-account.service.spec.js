"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/common/http/testing");
const testing_2 = require("@angular/core/testing");
const aws_accounts_service_1 = require("./aws-accounts.service");
describe('AwsAccountsService', () => {
    let injector;
    let service;
    let httpMock;
    beforeEach(() => {
        testing_2.TestBed.configureTestingModule({
            imports: [testing_1.HttpClientTestingModule],
            providers: [aws_accounts_service_1.AwsAccountsService]
        });
        injector = testing_2.getTestBed();
        service = injector.get(aws_accounts_service_1.AwsAccountsService);
        httpMock = injector.get(testing_1.HttpTestingController);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLWFjY291bnQuc2VydmljZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2F3cy1hY2NvdW50cy9zZXJ2aWNlcy9hd3MtYWNjb3VudC5zZXJ2aWNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwREFBOEY7QUFDOUYsbURBQTREO0FBRTVELGlFQUE0RDtBQUU1RCxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO0lBQ2xDLElBQUksUUFBaUIsQ0FBQztJQUN0QixJQUFJLE9BQTJCLENBQUM7SUFDaEMsSUFBSSxRQUErQixDQUFDO0lBRXBDLFVBQVUsQ0FBQyxHQUFHLEVBQUU7UUFDZCxpQkFBTyxDQUFDLHNCQUFzQixDQUFDO1lBQzdCLE9BQU8sRUFBRSxDQUFDLGlDQUF1QixDQUFDO1lBQ2xDLFNBQVMsRUFBRSxDQUFDLHlDQUFrQixDQUFDO1NBQ2hDLENBQUMsQ0FBQztRQUVILFFBQVEsR0FBRyxvQkFBVSxFQUFFLENBQUM7UUFDeEIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMseUNBQWtCLENBQUMsQ0FBQztRQUMzQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywrQkFBcUIsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9