"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const role_actions_1 = require("./role.actions");
const query = require("./role.selectors");
let RoleFacade = class RoleFacade {
    constructor(store) {
        this.store = store;
        this.rolesList$ = this.store.pipe(store_1.select(query.getAll));
        this.selectedRoleResponsibilities$ = this.store.pipe(store_1.select(query.getSelected));
        this.responsibilityById$ = this.store.pipe(store_1.select(query.getResponsibilityById));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
    }
    getRoleResponsibilities(id) {
        this.store.dispatch(new role_actions_1.LoadRoleResponsibilities(id));
    }
};
RoleFacade = __decorate([
    core_1.Injectable()
], RoleFacade);
exports.RoleFacade = RoleFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sZS5mYWNhZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvcm9sZS9zdGF0ZS9yb2xlLmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsaURBQTBEO0FBRTFELDBDQUEwQztBQUcxQyxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBTXJCLFlBQ21CLEtBQW1CO1FBQW5CLFVBQUssR0FBTCxLQUFLLENBQWM7UUFOdEMsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNuRCxrQ0FBNkIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDM0Usd0JBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUM7UUFDM0UsY0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUluRCxDQUFDO0lBRUwsdUJBQXVCLENBQUMsRUFBVTtRQUNoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHVDQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDeEQsQ0FBQztDQUNGLENBQUE7QUFiWSxVQUFVO0lBRHRCLGlCQUFVLEVBQUU7R0FDQSxVQUFVLENBYXRCO0FBYlksZ0NBQVUifQ==