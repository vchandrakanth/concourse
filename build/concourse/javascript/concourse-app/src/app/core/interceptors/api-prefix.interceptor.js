"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const env_1 = require("@concourse/env");
const helpers_1 = require("@concourse/shared/helpers");
const ENDPOINT_EXCEPTIONS = [
    'catalog/azure-specifications',
    'catalog',
    'catalog/aws-product-actions',
    'catalog/aws-regions',
    'catalog/azure-regions',
    'catalog/aws-product-actions',
    'catalog/azure-product-actions',
    'catalog/cloud-services/providers',
    'catalog/cloud-services/aws',
    'catalog/cloud-services/azure',
    'catalog/aws-specifications',
    'catalog/azure-resource-types',
    'catalog/cloud-services',
    'catalog/institution-data',
    'catalog/network-protocols',
    'institutions/saml/login',
    'oauth/token',
    'policy-templates',
    'roles',
    'users/confirm',
    'users/password/reset',
    'users/password/tokenUpdatePassword',
    'users/password/validatetoken',
    'users/recreateconfirmation',
    'users/reinvite',
    'users/validateinvitation',
    'users/catalog/security-questions'
];
let ApiPrefixInterceptor = class ApiPrefixInterceptor {
    constructor(authFacade) {
        this.authFacade = authFacade;
        this.buildEndpoint = (serviceRequest, instId, exceptions) => {
            let baseUrl;
            baseUrl = env_1.environment.apiEnvironment.length > 0 ? `${env_1.environment.apiEnvironment}.${env_1.environment.apiDomain}` : env_1.environment.apiDomain;
            baseUrl = `${serviceRequest.name}.${baseUrl}`;
            baseUrl = env_1.environment.apiUseHttps ? `https://${baseUrl}` : `http://${baseUrl}`;
            baseUrl = env_1.environment.apiPathPrefix ? `${baseUrl}/api/${serviceRequest.version}` : `${baseUrl}/${serviceRequest.version}`;
            if (!serviceRequest.endpoint.includes('institutions') && !exceptions.includes(serviceRequest.endpoint)) {
                baseUrl = `${baseUrl}/institutions/${instId}`;
            }
            return baseUrl;
        };
    }
    intercept(request, next) {
        return this.authFacade.institutionId$.pipe(operators_1.first(), operators_1.mergeMap(instId => {
            let baseUrl;
            const serviceRequest = helpers_1.parseServiceRequest(request.url);
            // TODO: Refactor to allow mapping of request methods to urls
            // tslint:disable-next-line:prefer-conditional-expression
            if (serviceRequest.endpoint === 'users' && request.method === 'POST') {
                baseUrl = this.buildEndpoint(serviceRequest, instId, [...ENDPOINT_EXCEPTIONS, 'users']);
            }
            else {
                baseUrl = this.buildEndpoint(serviceRequest, instId, ENDPOINT_EXCEPTIONS);
            }
            if (typeof instId === 'undefined' && baseUrl.includes('institutions')) {
                return rxjs_1.EMPTY;
            }
            return next.handle(request.clone({ url: `${baseUrl}/${serviceRequest.endpoint}` }));
        }));
    }
};
ApiPrefixInterceptor = __decorate([
    core_1.Injectable()
], ApiPrefixInterceptor);
exports.ApiPrefixInterceptor = ApiPrefixInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXByZWZpeC5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2ludGVyY2VwdG9ycy9hcGktcHJlZml4LmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBTUEsd0NBQTJDO0FBRTNDLCtCQUF5QztBQUN6Qyw4Q0FBaUQ7QUFFakQsd0NBQW9EO0FBQ3BELHVEQUFzRjtBQUd0RixNQUFNLG1CQUFtQixHQUFHO0lBQzFCLDhCQUE4QjtJQUM5QixTQUFTO0lBQ1QsNkJBQTZCO0lBQzdCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsNkJBQTZCO0lBQzdCLCtCQUErQjtJQUMvQixrQ0FBa0M7SUFDbEMsNEJBQTRCO0lBQzVCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsOEJBQThCO0lBQzlCLHdCQUF3QjtJQUN4QiwwQkFBMEI7SUFDMUIsMkJBQTJCO0lBQzNCLHlCQUF5QjtJQUN6QixhQUFhO0lBQ2Isa0JBQWtCO0lBQ2xCLE9BQU87SUFDUCxlQUFlO0lBQ2Ysc0JBQXNCO0lBQ3RCLG9DQUFvQztJQUNwQyw4QkFBOEI7SUFDOUIsNEJBQTRCO0lBQzVCLGdCQUFnQjtJQUNoQiwwQkFBMEI7SUFDMUIsa0NBQWtDO0NBQ25DLENBQUM7QUFHRixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQUMvQixZQUNtQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBd0J6QyxrQkFBYSxHQUFHLENBQUMsY0FBb0MsRUFBRSxNQUFjLEVBQUUsVUFBb0IsRUFBVSxFQUFFO1lBQ3JHLElBQUksT0FBZSxDQUFDO1lBQ3BCLE9BQU8sR0FBRyxpQkFBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLGlCQUFHLENBQUMsY0FBYyxJQUFJLGlCQUFHLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLGlCQUFHLENBQUMsU0FBUyxDQUFDO1lBQ25HLE9BQU8sR0FBRyxHQUFHLGNBQWMsQ0FBQyxJQUFJLElBQUksT0FBTyxFQUFFLENBQUM7WUFDOUMsT0FBTyxHQUFHLGlCQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxDQUFDO1lBQ3ZFLE9BQU8sR0FBRyxpQkFBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLFFBQVEsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3RHLE9BQU8sR0FBRyxHQUFHLE9BQU8saUJBQWlCLE1BQU0sRUFBRSxDQUFDO2FBQy9DO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQyxDQUFDO0lBakNFLENBQUM7SUFFTCxTQUFTLENBQUMsT0FBeUIsRUFBRSxJQUFpQjtRQUNwRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDeEMsaUJBQUssRUFBRSxFQUNQLG9CQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxPQUFlLENBQUM7WUFDcEIsTUFBTSxjQUFjLEdBQUcsNkJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hELDZEQUE2RDtZQUM3RCx5REFBeUQ7WUFDekQsSUFBSSxjQUFjLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLE1BQU0sRUFBRTtnQkFDcEUsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxDQUFDLEdBQUcsbUJBQW1CLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUN6RjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLG1CQUFtQixDQUFDLENBQUM7YUFDM0U7WUFDRCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO2dCQUNyRSxPQUFPLFlBQUssQ0FBQzthQUNkO1lBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxPQUFPLElBQUksY0FBYyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBY0YsQ0FBQTtBQXRDWSxvQkFBb0I7SUFEaEMsaUJBQVUsRUFBRTtHQUNBLG9CQUFvQixDQXNDaEM7QUF0Q1ksb0RBQW9CIn0=