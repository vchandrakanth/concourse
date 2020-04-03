"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const effects_1 = require("@ngrx/effects");
const router_store_1 = require("@ngrx/router-store");
const operators_1 = require("rxjs/operators");
const operators_2 = require("../operators");
const router_actions_1 = require("./router.actions");
let RouteEffects = class RouteEffects {
    constructor(actions$, router, location, store) {
        this.actions$ = actions$;
        this.router = router;
        this.location = location;
        this.store = store;
        this.navigate$ = this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Go), operators_1.map((action) => action.payload), operators_1.tap(({ path, queryParams, extras }) => this.router.navigate(path, Object.assign({ queryParams }, extras))));
        this.navigateBack$ = this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Back), operators_1.tap(() => this.location.back()));
        this.navigateForward$ = this.actions$.pipe(effects_1.ofType(router_actions_1.RouterActionTypes.Forward), operators_1.tap(() => this.location.forward()));
        this.listenToRouter();
    }
    listenToRouter() {
        this.actions$.pipe(effects_1.ofType(router_store_1.ROUTER_NAVIGATION), operators_1.map((action) => action.payload), operators_2.routeParams()).subscribe((data) => {
            this.store.dispatch(new router_actions_1.RouterChange({
                params: Object.assign({}, data.params),
                path: data.path,
                queryParams: Object.assign({}, data.queryParams),
                parentRoute: data.parentRoute
            }));
        });
    }
};
__decorate([
    effects_1.Effect({ dispatch: false })
], RouteEffects.prototype, "navigate$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false })
], RouteEffects.prototype, "navigateBack$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false })
], RouteEffects.prototype, "navigateForward$", void 0);
RouteEffects = __decorate([
    core_1.Injectable()
], RouteEffects);
exports.RouteEffects = RouteEffects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmVmZmVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9yb3V0ZXIvcm91dGVyLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFDQSx3Q0FBMkM7QUFFM0MsMkNBQXdEO0FBQ3hELHFEQUErRTtBQUkvRSw4Q0FBMEM7QUFDMUMsNENBQTJDO0FBRTNDLHFEQUE2RTtBQUc3RSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBb0J2QixZQUNtQixRQUFpQixFQUNqQixNQUFjLEVBQ2QsUUFBa0IsRUFDbEIsS0FBa0I7UUFIbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixVQUFLLEdBQUwsS0FBSyxDQUFhO1FBdEJSLGNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDekQsZ0JBQU0sQ0FBQyxrQ0FBaUIsQ0FBQyxFQUFFLENBQUMsRUFDNUIsZUFBRyxDQUFDLENBQUMsTUFBZ0IsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUN6QyxlQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtCQUFJLFdBQVcsSUFBSyxNQUFNLEVBQUcsQ0FDdkQsQ0FDRixDQUFDO1FBRTJCLGtCQUFhLEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUNqRixnQkFBTSxDQUFDLGtDQUFpQixDQUFDLElBQUksQ0FBQyxFQUM5QixlQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUNoQyxDQUFDO1FBRTJCLHFCQUFnQixHQUF1QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDcEYsZ0JBQU0sQ0FBQyxrQ0FBaUIsQ0FBQyxPQUFPLENBQUMsRUFDakMsZUFBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FDbkMsQ0FBQztRQVFBLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FDaEIsZ0JBQU0sQ0FBQyxnQ0FBaUIsQ0FBQyxFQUN6QixlQUFHLENBQUMsQ0FBQyxNQUE4QixFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQ3ZELHVCQUFXLEVBQUUsQ0FDZCxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUNqQixJQUFJLDZCQUFZLENBQUM7Z0JBQ2YsTUFBTSxvQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFFO2dCQUMxQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsV0FBVyxvQkFBTSxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNsQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7YUFDOUIsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFBO0FBM0M4QjtJQUE1QixnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDOytDQU0xQjtBQUUyQjtJQUE1QixnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO21EQUcxQjtBQUUyQjtJQUE1QixnQkFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxDQUFDO3NEQUcxQjtBQWxCUyxZQUFZO0lBRHhCLGlCQUFVLEVBQUU7R0FDQSxZQUFZLENBNkN4QjtBQTdDWSxvQ0FBWSJ9