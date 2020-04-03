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
const asset_service_1 = require("./services/asset.service");
const asset_effects_1 = require("./state/asset.effects");
const asset_facade_1 = require("./state/asset.facade");
const fromAssets = require("./state/asset.reducer");
let AssetsStoreModule = class AssetsStoreModule {
};
AssetsStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Asset, fromAssets.reducer),
            effects_1.EffectsModule.forFeature([asset_effects_1.AssetEffects])
        ],
        providers: [asset_service_1.AssetService, asset_facade_1.AssetFacade]
    })
], AssetsStoreModule);
exports.AssetsStoreModule = AssetsStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw0REFBd0Q7QUFDeEQseURBQXFEO0FBQ3JELHVEQUFtRDtBQUNuRCxvREFBb0Q7QUFVcEQsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7Q0FBSSxDQUFBO0FBQXJCLGlCQUFpQjtJQVI3QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDO1lBQzVELHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsNEJBQVksQ0FBQyxDQUFDO1NBQ3pDO1FBQ0QsU0FBUyxFQUFFLENBQUMsNEJBQVksRUFBRSwwQkFBVyxDQUFDO0tBQ3ZDLENBQUM7R0FFVyxpQkFBaUIsQ0FBSTtBQUFyQiw4Q0FBaUIifQ==