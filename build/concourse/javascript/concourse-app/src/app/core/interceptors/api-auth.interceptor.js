"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
const NO_AUTH_ENDPOINTS = [];
const NO_HEADERS_ENDPOINTS = [
    'oauth/token',
    'institutions/saml/login'
];
let ApiAuthInterceptor = class ApiAuthInterceptor {
    constructor(authFacade) {
        this.authFacade = authFacade;
    }
    intercept(request, next) {
        const serviceRequest = helpers_1.parseServiceRequest(request.url);
        return this.authFacade.userAccessToken$.pipe(operators_1.first(), operators_1.mergeMap(accessToken => {
            if (!NO_HEADERS_ENDPOINTS.includes(serviceRequest.endpoint)) {
                let headers = {
                    'Content-Type': 'application/json'
                };
                if (typeof accessToken !== 'undefined' && !NO_AUTH_ENDPOINTS.includes(serviceRequest.endpoint)) {
                    headers = Object.assign(Object.assign({}, headers), { Authorization: `Bearer ${accessToken}` });
                }
                return next.handle(request.clone({
                    setHeaders: headers
                }));
            }
            return next.handle(request);
        }));
    }
};
ApiAuthInterceptor = __decorate([
    core_1.Injectable()
], ApiAuthInterceptor);
exports.ApiAuthInterceptor = ApiAuthInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWF1dGguaW50ZXJjZXB0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9pbnRlcmNlcHRvcnMvYXBpLWF1dGguaW50ZXJjZXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSx3Q0FBMkM7QUFHM0MsOENBQWlEO0FBRWpELHVEQUFnRTtBQUdoRSxNQUFNLGlCQUFpQixHQUFHLEVBQ3pCLENBQUM7QUFFRixNQUFNLG9CQUFvQixHQUFHO0lBQzNCLGFBQWE7SUFDYix5QkFBeUI7Q0FDMUIsQ0FBQztBQUdGLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRTdCLFlBQ21CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFDckMsQ0FBQztJQUVMLFNBQVMsQ0FBQyxPQUF5QixFQUFFLElBQWlCO1FBQ3BELE1BQU0sY0FBYyxHQUFHLDZCQUFtQixDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUMxQyxpQkFBSyxFQUFFLEVBQ1Asb0JBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNyQixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDM0QsSUFBSSxPQUFPLEdBQVE7b0JBQ2pCLGNBQWMsRUFBRSxrQkFBa0I7aUJBQ25DLENBQUM7Z0JBQ0YsSUFBSSxPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUM5RixPQUFPLG1DQUNGLE9BQU8sS0FDVixhQUFhLEVBQUUsVUFBVSxXQUFXLEVBQUUsR0FDdkMsQ0FBQztpQkFDSDtnQkFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDL0IsVUFBVSxFQUFFLE9BQU87aUJBQ3BCLENBQUMsQ0FBQyxDQUFDO2FBQ0w7WUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBN0JZLGtCQUFrQjtJQUQ5QixpQkFBVSxFQUFFO0dBQ0Esa0JBQWtCLENBNkI5QjtBQTdCWSxnREFBa0IifQ==