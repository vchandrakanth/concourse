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
let RoleGuard = class RoleGuard {
    constructor(userFacade, router) {
        this.userFacade = userFacade;
        this.router = router;
        this.loggedInUserWithRelated$ = this.userFacade.authenticatedUser$;
    }
    canActivate(next) {
        return this.loggedInUserWithRelated$.pipe(operators_1.filter(user => !helpers_1.Util.isUndefined(user)), operators_1.map(user => {
            const responsibilities = user.groups.reduce((acc, group) => [...acc, ...group.permissionsList], []);
            return helpers_1.checkResponsibility(responsibilities, next.data.roles);
        }), operators_1.take(1), operators_1.tap(hasResponsibility => {
            if (!hasResponsibility) {
                this.router.navigateByUrl('/dashboard');
            }
        }));
    }
};
RoleGuard = __decorate([
    core_1.Injectable()
], RoleGuard);
exports.RoleGuard = RoleGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2d1YXJkcy9yb2xlLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBSTNDLDhDQUF3RDtBQUV4RCx1REFBc0U7QUFHdEUsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUdwQixZQUNtQixVQUFzQixFQUN0QixNQUFjO1FBRGQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBSmpDLDZCQUF3QixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUM7SUFLMUQsQ0FBQztJQUVMLFdBQVcsQ0FBQyxJQUE0QjtRQUN0QyxPQUFPLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQ3ZDLGtCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDdkMsZUFBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ1QsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUN6RCxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUNoQyxFQUFjLENBQ2pCLENBQUM7WUFDRixPQUFPLDZCQUFtQixDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLEVBQ0YsZ0JBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxlQUFHLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUN0QixJQUFJLENBQUMsaUJBQWlCLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3pDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Q0FDRixDQUFBO0FBMUJZLFNBQVM7SUFEckIsaUJBQVUsRUFBRTtHQUNBLFNBQVMsQ0EwQnJCO0FBMUJZLDhCQUFTIn0=