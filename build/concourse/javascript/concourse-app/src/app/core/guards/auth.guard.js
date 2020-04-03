"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const operators_1 = require("rxjs/operators");
let AuthGuard = class AuthGuard {
    constructor(authFacade, router) {
        this.authFacade = authFacade;
        this.router = router;
    }
    canActivate() {
        return this.authFacade.isAuthenticated$.pipe(operators_1.tap(isAuth => {
            if (!isAuth) {
                // TODO: update RouterGo to support named router-outlets
                this.router.navigateByUrl('user/(sidebar:log-in)');
            }
            else {
                this.router.events.subscribe((event) => {
                    if (event instanceof router_1.NavigationEnd) {
                        if (event.url === '/user/(sidebar:log-in)') {
                            this.router.navigateByUrl('/');
                        }
                    }
                });
            }
        }));
    }
};
AuthGuard = __decorate([
    core_1.Injectable()
], AuthGuard);
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2d1YXJkcy9hdXRoLmd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLDRDQUE0RTtBQUc1RSw4Q0FBcUM7QUFLckMsSUFBYSxTQUFTLEdBQXRCLE1BQWEsU0FBUztJQUVwQixZQUNtQixVQUFzQixFQUN0QixNQUFjO1FBRGQsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQzdCLENBQUM7SUFFTCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FDMUMsZUFBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ1gsSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDWCx3REFBd0Q7Z0JBQ3hELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7YUFDcEQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7b0JBQzVDLElBQUksS0FBSyxZQUFZLHNCQUFhLEVBQUU7d0JBQ2xDLElBQUksS0FBSyxDQUFDLEdBQUcsS0FBSyx3QkFBd0IsRUFBRTs0QkFDMUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7eUJBQ2hDO3FCQUNGO2dCQUNILENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUE7QUF6QlksU0FBUztJQURyQixpQkFBVSxFQUFFO0dBQ0EsU0FBUyxDQXlCckI7QUF6QlksOEJBQVMifQ==