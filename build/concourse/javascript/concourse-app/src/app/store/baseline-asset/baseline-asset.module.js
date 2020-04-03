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
const store_1 = require("@ngrx/store");
const enums_1 = require("@concourse/shared/enums");
const baseline_asset_service_1 = require("./services/baseline-asset.service");
const baseline_asset_effects_1 = require("./state/baseline-asset.effects");
const baseline_asset_facade_1 = require("./state/baseline-asset.facade");
const fromAssets = require("./state/baseline-asset.reducer");
let BaselineAssetsStoreModule = class BaselineAssetsStoreModule {
};
BaselineAssetsStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.BaselineAsset, fromAssets.reducer),
            effects_1.EffectsModule.forFeature([baseline_asset_effects_1.BaselineAssetEffects])
        ],
        providers: [baseline_asset_service_1.BaselineAssetService, baseline_asset_facade_1.BaselineAssetFacade]
    })
], BaselineAssetsStoreModule);
exports.BaselineAssetsStoreModule = BaselineAssetsStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Jhc2VsaW5lLWFzc2V0L2Jhc2VsaW5lLWFzc2V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw4RUFBeUU7QUFDekUsMkVBQXNFO0FBQ3RFLHlFQUFvRTtBQUNwRSw2REFBNkQ7QUFVN0QsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBeUI7Q0FBSSxDQUFBO0FBQTdCLHlCQUF5QjtJQVJyQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQ3BFLHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsNkNBQW9CLENBQUMsQ0FBQztTQUNqRDtRQUNELFNBQVMsRUFBRSxDQUFDLDZDQUFvQixFQUFFLDJDQUFtQixDQUFDO0tBQ3ZELENBQUM7R0FFVyx5QkFBeUIsQ0FBSTtBQUE3Qiw4REFBeUIifQ==