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
const selectors_1 = require("@concourse/store/selectors");
const baseline_asset_actions_1 = require("./baseline-asset.actions");
const query = require("./baseline-asset.selectors");
let BaselineAssetFacade = class BaselineAssetFacade {
    constructor(store) {
        this.store = store;
        this.list$ = this.store.pipe(store_1.select(query.getAll));
        this.selected$ = this.store.pipe(store_1.select(selectors_1.getSelectedBaselineAssetWithRelated));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isLoading$ = this.store.pipe(store_1.select(query.getIsLoading));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    getBaselineAssets() {
        this.store.dispatch(new baseline_asset_actions_1.LoadBaselineAssets());
    }
    createBaselineAsset(form, versionBump) {
        this.store.dispatch(new baseline_asset_actions_1.CreateBaselineAsset({ form, versionBump }));
    }
    delete(id) {
        this.store.dispatch(new baseline_asset_actions_1.DeleteBaselineAsset(id));
    }
    update(id, baseline, versionBump) {
        this.store.dispatch(new baseline_asset_actions_1.UpdateBaselineAsset({ id, baseline, versionBump }));
    }
    updateAzure(id, baseline) {
        this.store.dispatch(new baseline_asset_actions_1.UpdateBaselineAzure({ id, baseline }));
    }
    updateAws(id, baseline) {
        this.store.dispatch(new baseline_asset_actions_1.UpdateBaselineAws({ id, baseline }));
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new baseline_asset_actions_1.LoadBaselineAssetsByPagination({ page: page.toString(), size: size.toString() }));
    }
};
BaselineAssetFacade = __decorate([
    core_1.Injectable()
], BaselineAssetFacade);
exports.BaselineAssetFacade = BaselineAssetFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L3N0YXRlL2Jhc2VsaW5lLWFzc2V0LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFHNUMsMERBQWlGO0FBQ2pGLHFFQUlrQztBQUVsQyxvREFBb0Q7QUFHcEQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFNOUIsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQU50QyxVQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQzlDLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsK0NBQW1DLENBQUMsQ0FBQyxDQUFDO1FBQ3pFLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUN6RCxpQkFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGNBQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUd0RCxDQUFDO0lBRUwsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwyQ0FBa0IsRUFBRSxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELG1CQUFtQixDQUFDLElBQUksRUFBRSxXQUFXO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNENBQW1CLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBVTtRQUNmLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNENBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUF1QixFQUFFLFdBQVc7UUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSw0Q0FBbUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQXVCO1FBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksNENBQW1CLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxTQUFTLENBQUMsRUFBRSxFQUFFLFFBQXVCO1FBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksMENBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsSUFBWTtRQUN6QyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHVEQUE4QixDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzVHLENBQUM7Q0FFRixDQUFBO0FBdENZLG1CQUFtQjtJQUQvQixpQkFBVSxFQUFFO0dBQ0EsbUJBQW1CLENBc0MvQjtBQXRDWSxrREFBbUIifQ==