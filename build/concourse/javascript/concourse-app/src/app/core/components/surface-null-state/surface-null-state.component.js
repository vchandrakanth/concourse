"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let SurfaceNullStateComponent = class SurfaceNullStateComponent {
    constructor(authFacade) {
        this.authFacade = authFacade;
        this.isAuthenticated$ = this.authFacade.isAuthenticated$;
        this.userHasPermissions$ = this.authFacade.userHasPermissions$;
    }
};
SurfaceNullStateComponent = __decorate([
    core_1.Component({
        selector: 'app-surface-null-state',
        template: `
  <div *ngIf="isAuthenticated$ | async">
    <ng-container *ngLet="(userHasPermissions$ | async); let hasPermission">
      <div class="warning-container" *ngIf="!!!hasPermission">
        <strong class="text-warning-dark"><dfn><abbr
                title="Your User does not have permissions assigned yet. Your User needs to be assigned to a Group that has access to at least 1 Surface in order to use the application">You Do Not Have Write Access</abbr></dfn></strong>
      </div>
    </ng-container>
  </div>
  `,
        styles: [`
  :host {
    margin: 0 1em;
  }

  `]
    })
], SurfaceNullStateComponent);
exports.SurfaceNullStateComponent = SurfaceNullStateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1udWxsLXN0YXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvbXBvbmVudHMvc3VyZmFjZS1udWxsLXN0YXRlL3N1cmZhY2UtbnVsbC1zdGF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUF1QjFDLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBS3BDLFlBQ1MsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUovQixxQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDO1FBQ3BELHdCQUFtQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUM7SUFJdEQsQ0FBQztDQUVOLENBQUE7QUFUWSx5QkFBeUI7SUFuQnJDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsd0JBQXdCO1FBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7UUFDRCxNQUFNLEVBQUUsQ0FBQzs7Ozs7R0FLUixDQUFDO0tBQ0gsQ0FBQztHQUNXLHlCQUF5QixDQVNyQztBQVRZLDhEQUF5QiJ9