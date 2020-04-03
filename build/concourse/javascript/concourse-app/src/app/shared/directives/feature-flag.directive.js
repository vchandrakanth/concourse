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
const operators_2 = require("rxjs/operators");
const helpers_1 = require("../helpers");
let FeatureFlagDirective = class FeatureFlagDirective {
    constructor(vcr, tpl, featureFlagFacade) {
        this.vcr = vcr;
        this.tpl = tpl;
        this.featureFlagFacade = featureFlagFacade;
        this.featureList$ = this.featureFlagFacade.combinedFeatures$;
    }
    set featureFlag(options) {
        if (!helpers_1.Util.isUndefined(options) && (!helpers_1.Util.isString(options) && helpers_1.Util.isUndefined(options.flag))) {
            throw new Error('must specify feature');
        }
        if (helpers_1.Util.isString(options)) {
            this._options = {
                show: true,
                flag: options
            };
        }
        else {
            this._options = Object.assign({ show: true }, options);
        }
    }
    get flag() {
        return this._options.flag;
    }
    get has() {
        return this._options.show;
    }
    ngOnInit() {
        this.vcr.clear();
        this.featureList$.pipe(operators_2.filter(features => features.includes(this.flag)), operators_2.map(features => features.length !== 0), operators_2.distinctUntilChanged(), operators_1.untilDestroy(this)).subscribe(hasFeature => {
            this.vcr.clear();
            if (this.has && hasFeature) {
                this.vcr.createEmbeddedView(this.tpl);
            }
        });
    }
    ngOnDestroy() {
        // for untilDestroy
    }
};
__decorate([
    core_1.Input()
], FeatureFlagDirective.prototype, "featureFlag", null);
FeatureFlagDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: '[featureFlag]'
    })
], FeatureFlagDirective);
exports.FeatureFlagDirective = FeatureFlagDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmVhdHVyZS1mbGFnLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvZGlyZWN0aXZlcy9mZWF0dXJlLWZsYWcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBT3VCO0FBRXZCLHlEQUF5RDtBQUN6RCw4Q0FBbUU7QUFHbkUsd0NBQWtDO0FBV2xDLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBMkIvQixZQUNtQixHQUFxQixFQUNyQixHQUFxQixFQUM5QixpQkFBb0M7UUFGM0IsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDckIsUUFBRyxHQUFILEdBQUcsQ0FBa0I7UUFDOUIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQVA5QyxpQkFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQztJQVFwRCxDQUFDO0lBOUJJLElBQUksV0FBVyxDQUFDLE9BQW9DO1FBQzNELElBQUksQ0FBQyxjQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGNBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDN0YsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ2QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87YUFDZCxDQUFDO1NBQ0g7YUFBTTtZQUNMLElBQUksQ0FBQyxRQUFRLG1CQUNYLElBQUksRUFBRSxJQUFJLElBQ1AsT0FBTyxDQUNYLENBQUM7U0FDSDtJQUNILENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLEdBQUc7UUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO0lBQzVCLENBQUM7SUFXRCxRQUFRO1FBQ04sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FDcEIsa0JBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2hELGVBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQ3RDLGdDQUFvQixFQUFFLEVBQ3RCLHdCQUFZLENBQUMsSUFBSSxDQUFDLENBQ25CLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLFVBQVUsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsbUJBQW1CO0lBQ3JCLENBQUM7Q0FFRixDQUFBO0FBbkRVO0lBQVIsWUFBSyxFQUFFO3VEQWVQO0FBaEJVLG9CQUFvQjtJQUpoQyxnQkFBUyxDQUFDO1FBQ1QsOENBQThDO1FBQzlDLFFBQVEsRUFBRSxlQUFlO0tBQzFCLENBQUM7R0FDVyxvQkFBb0IsQ0FvRGhDO0FBcERZLG9EQUFvQiJ9