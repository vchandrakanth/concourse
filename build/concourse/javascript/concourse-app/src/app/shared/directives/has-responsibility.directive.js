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
let HasResponsibilityDirective = class HasResponsibilityDirective {
    constructor(vcr, tpl, authFacade, surfaceFacade, surfaceLayerFacade) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.authFacade = authFacade;
        this.surfaceFacade = surfaceFacade;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.surfaceLayerId$ = new rxjs_1.BehaviorSubject(undefined);
        this.requiredResponsibilities$ = new rxjs_1.BehaviorSubject(undefined);
        this.userPermissions$ = this.authFacade.userPermissions$;
        this.selectedSurface$ = this.surfaceFacade.selectedWithRelated$;
        this.surfaceLayerEntities$ = this.surfaceLayerFacade.entities$;
    }
    set hasResponsibility(value) {
        if (helpers_1.Util.isString(value) || helpers_1.Util.isArray(value)) {
            this.requiredResponsibilities$.next(value);
        }
        else {
            this.requiredResponsibilities$.next(value.responsibility);
            this.surfaceLayerId$.next(value.surfaceLayerId);
        }
    }
    ngOnInit() {
        rxjs_1.combineLatest(this.userPermissions$, this.selectedSurface$, this.requiredResponsibilities$, this.surfaceLayerId$, this.surfaceLayerEntities$).pipe(operators_2.filter(([userPermissions, selectedSurface]) => !helpers_1.Util.isUndefined(userPermissions) && !helpers_1.Util.isNullOrUndefined(selectedSurface)), operators_1.untilDestroy(this), operators_2.map(([userPermissions, selectedSurface, requiredResponsibilities, surfaceLayerId, surfaceLayerEntities]) => {
            if (helpers_1.Util.isUndefined(surfaceLayerId) && !helpers_1.Util.isNullOrUndefined(selectedSurface)) {
                const { id, institutionId, surfaceLayerIds } = selectedSurface;
                const permissions = [
                    ...(!helpers_1.Util.isUndefined(userPermissions.authoritiesBySurfaceId[id]) ?
                        helpers_1.flattenDeep(userPermissions.authoritiesBySurfaceId[id]) : []),
                    ...(!helpers_1.Util.isUndefined(userPermissions.authoritiesByInstitutionId[institutionId]) ?
                        helpers_1.flattenDeep(userPermissions.authoritiesByInstitutionId[institutionId]) : []),
                    ...helpers_1.flattenDeep(surfaceLayerIds.reduce((acc, slId) => {
                        const perms = userPermissions.authoritiesBySurfaceLayerId[slId];
                        if (!helpers_1.Util.isUndefined(perms) && helpers_1.Util.isArray(perms)) {
                            return [...acc, ...perms];
                        }
                        return acc;
                    }, []))
                ];
                return helpers_1.checkResponsibility(permissions, requiredResponsibilities);
            }
            if (helpers_1.Util.isUndefined(surfaceLayerEntities[surfaceLayerId])) {
                return false;
            }
            const responsibilities = userPermissions.authoritiesBySurfaceLayerId[surfaceLayerId];
            if (helpers_1.checkResponsibility(responsibilities, requiredResponsibilities)) {
                return true;
            }
            const ancestors = this.getSurfaceLayerAncestorIds(surfaceLayerId, surfaceLayerEntities);
            if (helpers_1.Util.isUndefined(ancestors) || (helpers_1.Util.isArray(ancestors) && ancestors.length === 0)) {
                return false;
            }
            return ancestors.findIndex(a => helpers_1.checkResponsibility(userPermissions.authoritiesBySurfaceLayerId[a], requiredResponsibilities)) !== -1;
        }), operators_2.distinctUntilChanged()).subscribe(hasPermission => {
            this.vcr.clear();
            if (hasPermission) {
                this.vcr.createEmbeddedView(this.tpl);
            }
        });
    }
    ngOnDestroy() {
        // for untilDestroy
    }
    getSurfaceLayerAncestorIds(surfaceLayerId, surfaceLayers) {
        let atRoot = false;
        const ancestors = [];
        let current = surfaceLayerId;
        while (!atRoot) {
            const surfaceLayer = surfaceLayers[current];
            if (!helpers_1.Util.isUndefined(surfaceLayer) && !helpers_1.Util.isUndefined(surfaceLayer.parent)) {
                ancestors.push(surfaceLayer.parent);
                current = surfaceLayer.parent;
            }
            atRoot = surfaceLayer.isRoot;
        }
        return ancestors;
    }
};
__decorate([
    core_1.Input()
], HasResponsibilityDirective.prototype, "hasResponsibility", null);
HasResponsibilityDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[hasResponsibility]'
    })
], HasResponsibilityDirective);
exports.HasResponsibilityDirective = HasResponsibilityDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzLXJlc3BvbnNpYmlsaXR5LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9oYXMtcmVzcG9uc2liaWxpdHkuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBT3VCO0FBR3ZCLHlEQUF5RDtBQUN6RCwrQkFBc0Q7QUFDdEQsOENBQW1FO0FBR25FLHVEQUFtRjtBQVluRixJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQWVyQyxZQUNtQixHQUFxQixFQUNyQixHQUFxQixFQUNyQixVQUFzQixFQUN0QixhQUE0QixFQUM1QixrQkFBc0M7UUFKdEMsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1Qix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBWHpELG9CQUFlLEdBQUcsSUFBSSxzQkFBZSxDQUFTLFNBQVMsQ0FBQyxDQUFDO1FBQ3pELDhCQUF5QixHQUFHLElBQUksc0JBQWUsQ0FBb0IsU0FBUyxDQUFDLENBQUM7UUFDOUUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNwRCxxQkFBZ0IsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQzNELDBCQUFxQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUM7SUFRdEQsQ0FBQztJQXBCSSxJQUFJLGlCQUFpQixDQUFDLEtBQWlEO1FBQzlFLElBQUksY0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FB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