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
const surface_service_1 = require("./services/surface.service");
const surface_effects_1 = require("./state/surface.effects");
const surface_facade_1 = require("./state/surface.facade");
const fromSurface = require("./state/surface.reducer");
let SurfaceStoreModule = class SurfaceStoreModule {
};
SurfaceStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.Surface, fromSurface.reducer),
            effects_1.EffectsModule.forFeature([surface_effects_1.SurfaceEffects])
        ],
        providers: [surface_service_1.SurfaceService, surface_facade_1.SurfaceFacade]
    })
], SurfaceStoreModule);
exports.SurfaceStoreModule = SurfaceStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc3VyZmFjZS9zdXJmYWNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCxnRUFBNEQ7QUFDNUQsNkRBQXlEO0FBQ3pELDJEQUF1RDtBQUN2RCx1REFBdUQ7QUFTdkQsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7Q0FBSSxDQUFBO0FBQXRCLGtCQUFrQjtJQVA5QixlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQy9ELHVCQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsZ0NBQWMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsU0FBUyxFQUFFLENBQUMsZ0NBQWMsRUFBRSw4QkFBYSxDQUFDO0tBQzNDLENBQUM7R0FDVyxrQkFBa0IsQ0FBSTtBQUF0QixnREFBa0IifQ==