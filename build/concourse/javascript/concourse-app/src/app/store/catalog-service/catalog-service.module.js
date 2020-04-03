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
const catalog_service_1 = require("./services/catalog.service");
const catalog_service_effects_1 = require("./state/catalog-service.effects");
const catalog_service_facade_1 = require("./state/catalog-service.facade");
const fromCatalogService = require("./state/catalog-service.reducer");
let CatalogServiceModule = class CatalogServiceModule {
};
CatalogServiceModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Catalog, fromCatalogService.reducer),
            effects_1.EffectsModule.forFeature([catalog_service_effects_1.CatalogServiceEffects])
        ],
        providers: [catalog_service_1.CatalogService, catalog_service_facade_1.CatalogServiceFacade]
    })
], CatalogServiceModule);
exports.CatalogServiceModule = CatalogServiceModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zdG9yZS9jYXRhbG9nLXNlcnZpY2UvY2F0YWxvZy1zZXJ2aWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxnRUFBNEQ7QUFDNUQsNkVBQXdFO0FBQ3hFLDJFQUFzRTtBQUN0RSxzRUFBc0U7QUFTdEUsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7Q0FBSSxDQUFBO0FBQXhCLG9CQUFvQjtJQVBoQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUM7WUFDdEUsdUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQywrQ0FBcUIsQ0FBQyxDQUFDO1NBQ2xEO1FBQ0QsU0FBUyxFQUFFLENBQUMsZ0NBQWMsRUFBRSw2Q0FBb0IsQ0FBQztLQUNsRCxDQUFDO0dBQ1csb0JBQW9CLENBQUk7QUFBeEIsb0RBQW9CIn0=