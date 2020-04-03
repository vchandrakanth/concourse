"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("@concourse/core/operators");
const rxjs_1 = require("rxjs");
const operators_2 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let InOwningGroupDirective = class InOwningGroupDirective {
    constructor(vcr, tpl, groupFacade, surfaceFacade, authFacade) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.groupFacade = groupFacade;
        this.surfaceFacade = surfaceFacade;
        this.authFacade = authFacade;
        this.groupId$ = new rxjs_1.BehaviorSubject(undefined);
        this.requiredResponsibilities$ = new rxjs_1.BehaviorSubject(undefined);
        this.groupsList$ = this.groupFacade.listWithRelated$;
        this.selectedSurfaceId$ = this.surfaceFacade.selectedId$;
        this.userId$ = this.authFacade.userId$;
    }
    set inOwningGroup(value) {
        this.requiredResponsibilities$.next(value.responsibility);
        this.groupId$.next(value.groupId);
    }
    ngOnInit() {
        rxjs_1.combineLatest(this.requiredResponsibilities$, this.selectedSurfaceId$, this.userId$, this.groupId$, this.groupsList$).pipe(operators_1.untilDestroy(this), operators_2.map(([requiredResponsibilities, surfaceId, userId, groupId, groups]) => {
            if (helpers_1.Util.isNullOrUndefined(groupId)) {
                // this provides backwards compatibility
                return true;
            }
            const group = (helpers_1.Util.isArray(groups) ? groups : []).find(g => g.id === groupId);
            if (helpers_1.Util.isUndefined(group)) {
                return false;
            }
            if (!group.hasUser(userId)) {
                return false;
            }
            return group.hasPermission(requiredResponsibilities, surfaceId);
        }), operators_2.distinctUntilChanged()).subscribe(hasPermission => {
            this.vcr.clear();
            if (hasPermission) {
                this.vcr.createEmbeddedView(this.tpl);
            }
        });
    }
    ngOnDestroy() {
        // stub for untilDestroy
    }
};
__decorate([
    core_1.Input()
], InOwningGroupDirective.prototype, "inOwningGroup", null);
InOwningGroupDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[inOwningGroup]'
    })
], InOwningGroupDirective);
exports.InOwningGroupDirective = InOwningGroupDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW4tb3duaW5nLWdyb3VwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9pbi1vd25pbmctZ3JvdXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBT3VCO0FBRXZCLHlEQUF5RDtBQUN6RCwrQkFBc0Q7QUFDdEQsOENBQTJEO0FBRTNELHVEQUFpRDtBQVlqRCxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUFzQjtJQVlqQyxZQUNtQixHQUFxQixFQUNyQixHQUFxQixFQUNyQixXQUF3QixFQUN4QixhQUE0QixFQUM1QixVQUFzQjtRQUp0QixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixRQUFHLEdBQUgsR0FBRyxDQUFrQjtRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBWHpDLGFBQVEsR0FBRyxJQUFJLHNCQUFlLENBQVMsU0FBUyxDQUFDLENBQUM7UUFDbEQsOEJBQXlCLEdBQUcsSUFBSSxzQkFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDO1FBQ25FLGdCQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNoRCx1QkFBa0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUNwRCxZQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7SUFROUIsQ0FBQztJQWpCSSxJQUFJLGFBQWEsQ0FBQyxLQUFvQjtRQUM3QyxJQUFJLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQWdCRCxRQUFRO1FBQ04sb0JBQWEsQ0FDWCxJQUFJLENBQUMseUJBQXlCLEVBQzlCLElBQUksQ0FBQyxrQkFBa0IsRUFDdkIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxXQUFXLENBQ2pCLENBQUMsSUFBSSxDQUNKLHdCQUFZLENBQUMsSUFBSSxDQUFDLEVBQ2xCLGVBQUcsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUNyRSxJQUFJLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDbkMsd0NBQXdDO2dCQUN4QyxPQUFPLElBQUksQ0FBQzthQUNiO1lBQ0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssT0FBTyxDQUFDLENBQUM7WUFDL0UsSUFBSSxjQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUMzQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFDRCxPQUFPLEtBQUssQ0FBQyxhQUFhLENBQUMsd0JBQXdCLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLEVBQ0YsZ0NBQW9CLEVBQUUsQ0FDdkIsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixJQUFJLGFBQWEsRUFBRTtnQkFDakIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1Qsd0JBQXdCO0lBQzFCLENBQUM7Q0FFRixDQUFBO0FBdkRVO0lBQVIsWUFBSyxFQUFFOzJEQUdQO0FBSlUsc0JBQXNCO0lBSmxDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLGlCQUFpQjtLQUM1QixDQUFDO0dBQ1csc0JBQXNCLENBd0RsQztBQXhEWSx3REFBc0IifQ==