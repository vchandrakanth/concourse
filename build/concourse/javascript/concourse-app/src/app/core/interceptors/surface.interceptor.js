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
const QS_ENDPOINTS = [
    'discovered-aws-deployments',
    'role-assignments'
];
const PATH_ENDPOINTS = [
    'surface-layers\/[0-9]+\/logical-deployments\/',
    'surface-layers',
    'workflow-summaries',
    'actions',
    'approvals',
    'policy-resolutions'
];
let SurfaceInterceptor = class SurfaceInterceptor {
    constructor(surfaceFacade) {
        this.surfaceFacade = surfaceFacade;
    }
    intercept(request, next) {
        return this.surfaceFacade.selectedId$.pipe(operators_1.first(), operators_1.mergeMap(surfaceId => {
            const { name, endpoint, version } = helpers_1.parseServiceRequest(request.url);
            const shouldAddQS = new RegExp(QS_ENDPOINTS.join('|')).test(endpoint);
            if (request.method === 'GET' && shouldAddQS && !!surfaceId) {
                return next.handle(request.clone({
                    url: request.url,
                    setParams: {
                        surfaceId: `${surfaceId}`
                    }
                }));
            }
            const shouldAddPrefix = new RegExp(PATH_ENDPOINTS.join('|')).test(endpoint);
            if (shouldAddPrefix && !!surfaceId && !endpoint.includes('aws-accounts')) {
                return next.handle(request.clone({
                    url: helpers_1.buildServiceRequest(name, `surfaces/${surfaceId}/${endpoint}`, version)
                }));
            }
            return next.handle(request);
        }));
    }
};
SurfaceInterceptor = __decorate([
    core_1.Injectable()
], SurfaceInterceptor);
exports.SurfaceInterceptor = SurfaceInterceptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5pbnRlcmNlcHRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2ludGVyY2VwdG9ycy9zdXJmYWNlLmludGVyY2VwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBTUEsd0NBQTJDO0FBRzNDLDhDQUFpRDtBQUVqRCx1REFBcUY7QUFHckYsTUFBTSxZQUFZLEdBQUc7SUFDbkIsNEJBQTRCO0lBQzVCLGtCQUFrQjtDQUNuQixDQUFDO0FBRUYsTUFBTSxjQUFjLEdBQUc7SUFDckIsK0NBQStDO0lBQy9DLGdCQUFnQjtJQUNoQixvQkFBb0I7SUFDcEIsU0FBUztJQUNULFdBQVc7SUFDWCxvQkFBb0I7Q0FDckIsQ0FBQztBQUdGLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBRTdCLFlBQ21CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQzNDLENBQUM7SUFFTCxTQUFTLENBQUMsT0FBeUIsRUFBRSxJQUFpQjtRQUNwRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FDeEMsaUJBQUssRUFBRSxFQUNQLG9CQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDbkIsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEdBQUcsNkJBQW1CLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JFLE1BQU0sV0FBVyxHQUFHLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEUsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxXQUFXLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRTtnQkFDMUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBQy9CLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRztvQkFDaEIsU0FBUyxFQUFFO3dCQUNULFNBQVMsRUFBRSxHQUFHLFNBQVMsRUFBRTtxQkFDMUI7aUJBQ0YsQ0FBQyxDQUFDLENBQUM7YUFDTDtZQUNELE1BQU0sZUFBZSxHQUFHLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUUsSUFBSSxlQUFlLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7Z0JBQ3hFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO29CQUMvQixHQUFHLEVBQUUsNkJBQW1CLENBQUMsSUFBSSxFQUFFLFlBQVksU0FBUyxJQUFJLFFBQVEsRUFBRSxFQUFFLE9BQU8sQ0FBQztpQkFDN0UsQ0FBQyxDQUFDLENBQUM7YUFDTDtZQUNELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUE5Qlksa0JBQWtCO0lBRDlCLGlCQUFVLEVBQUU7R0FDQSxrQkFBa0IsQ0E4QjlCO0FBOUJZLGdEQUFrQiJ9