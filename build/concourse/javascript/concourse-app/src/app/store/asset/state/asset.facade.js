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
const operators_1 = require("rxjs/operators");
const selectors_1 = require("@concourse/store/selectors");
const asset_actions_1 = require("./asset.actions");
const query = require("./asset.selectors");
let AssetFacade = class AssetFacade {
    constructor(store) {
        this.store = store;
        this.assetList$ = this.store.pipe(store_1.select(selectors_1.getAssetsWithRelated));
        this.assetListByLineageId$ = this.store.pipe(store_1.select(query.getAssetsByLineageId));
        this.asset$ = this.store.pipe(store_1.select(selectors_1.getSelectedAssetWithRelated));
        this.cftResources$ = this.store.pipe(store_1.select(query.getCFTResources), operators_1.filter(resources => typeof resources !== 'undefined'));
        this.selectableOwningGroups$ = this.store.pipe(store_1.select(selectors_1.getSelectedOwningGroups, { permission: 'MANAGE_MODELS' }));
        this.isLoaded$ = this.store.pipe(store_1.select(query.getIsLoaded));
        this.isUpdating$ = this.store.pipe(store_1.select(query.getIsUpdating));
        this.formPending$ = this.store.pipe(store_1.select(query.getFormPending));
        this.hasNextLink$ = this.store.pipe(store_1.select(query.hasNextLink));
    }
    search(searchText) {
        this.store.dispatch(new asset_actions_1.SearchAssets(searchText));
    }
    resetSearch() {
        this.store.dispatch(new asset_actions_1.ResetAssetsSearchResults());
    }
    getAssets() {
        this.store.dispatch(new asset_actions_1.LoadAssets());
    }
    getAsset(type, id) {
        this.store.dispatch(new asset_actions_1.LoadAsset({ type, id }));
    }
    createEnclaveModel(enclaveModel, versionBump) {
        this.store.dispatch(new asset_actions_1.CreateEnclaveModel({ enclaveModel, versionBump }));
    }
    resolveCFTResource(enclaveModel) {
        this.store.dispatch(new asset_actions_1.ResolveCFTResource(enclaveModel));
    }
    updateEnclaveModel(enclaveModel, versionBump) {
        this.store.dispatch(new asset_actions_1.UpdateEnclaveModel({ enclaveModel, versionBump }));
    }
    deleteEnclaveModel(id) {
        this.store.dispatch(new asset_actions_1.DeleteEnclaveModel(id));
    }
    getPaginatedList(page, size) {
        this.store.dispatch(new asset_actions_1.LoadAssetsByPagination({ includeTemplates: false, page: page.toString(), size: size.toString() }));
    }
};
AssetFacade = __decorate([
    core_1.Injectable()
], AssetFacade);
exports.AssetFacade = AssetFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Fzc2V0L3N0YXRlL2Fzc2V0LmZhY2FkZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBLHdDQUEyQztBQUMzQyx1Q0FBNEM7QUFFNUMsOENBQXdDO0FBR3hDLDBEQUF3SDtBQUN4SCxtREFVeUI7QUFFekIsMkNBQTJDO0FBRzNDLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7SUFjdEIsWUFDbUIsS0FBbUI7UUFBbkIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQWR0QyxlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLGdDQUFvQixDQUFDLENBQUMsQ0FBQztRQUMzRCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztRQUM1RSxXQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBTSxDQUFDLHVDQUEyQixDQUFDLENBQUMsQ0FBQztRQUM5RCxrQkFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUM3QixjQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUM3QixrQkFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsT0FBTyxTQUFTLEtBQUssV0FBVyxDQUFDLENBQ3RELENBQUM7UUFDRiw0QkFBdUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsbUNBQXVCLEVBQUUsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzVHLGNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDdkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDM0QsaUJBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDN0QsaUJBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFJdEQsQ0FBQztJQUVMLE1BQU0sQ0FBQyxVQUFrQjtRQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDRCQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksd0NBQXdCLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSwwQkFBVSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUSxDQUFDLElBQWUsRUFBRSxFQUFVO1FBQ2xDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUkseUJBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGtCQUFrQixDQUFDLFlBQThCLEVBQUUsV0FBbUI7UUFDcEUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxrQ0FBa0IsQ0FBQyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDN0UsQ0FBQztJQUVELGtCQUFrQixDQUFDLFlBQThCO1FBQy9DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksa0NBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsa0JBQWtCLENBQUMsWUFBOEIsRUFBRSxXQUFtQjtRQUNwRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtDQUFrQixDQUFDLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsa0JBQWtCLENBQUMsRUFBVTtRQUMzQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLGtDQUFrQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQVksRUFBRSxJQUFZO1FBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksc0NBQXNCLENBQUMsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzdILENBQUM7Q0FDRixDQUFBO0FBckRZLFdBQVc7SUFEdkIsaUJBQVUsRUFBRTtHQUNBLFdBQVcsQ0FxRHZCO0FBckRZLGtDQUFXIn0=