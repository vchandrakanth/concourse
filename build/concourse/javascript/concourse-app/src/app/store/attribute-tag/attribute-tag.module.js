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
const attribute_tag_service_1 = require("./services/attribute-tag.service");
const attribute_tag_effects_1 = require("./state/attribute-tag.effects");
const attribute_tag_facade_1 = require("./state/attribute-tag.facade");
const fromAttributeTags = require("./state/attribute-tag.reducer");
let AttributeTagStoreModule = class AttributeTagStoreModule {
};
AttributeTagStoreModule = __decorate([
    core_1.NgModule({
        imports: [
            store_1.StoreModule.forFeature(enums_1.StoreNames.AttributeTag, fromAttributeTags.reducer),
            effects_1.EffectsModule.forFeature([attribute_tag_effects_1.AttributeTagEffects])
        ],
        providers: [attribute_tag_service_1.AttributeTagService, attribute_tag_facade_1.AttributeTagFacade]
    })
], AttributeTagStoreModule);
exports.AttributeTagStoreModule = AttributeTagStoreModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0cmlidXRlLXRhZy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvYXR0cmlidXRlLXRhZy9hdHRyaWJ1dGUtdGFnLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5QztBQUN6QywyQ0FBOEM7QUFDOUMsdUNBQTBDO0FBRTFDLG1EQUFxRDtBQUNyRCw0RUFBdUU7QUFDdkUseUVBQW9FO0FBQ3BFLHVFQUFrRTtBQUNsRSxtRUFBbUU7QUFTbkUsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7Q0FBSSxDQUFBO0FBQTNCLHVCQUF1QjtJQVBuQyxlQUFRLENBQUM7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBVyxDQUFDLFVBQVUsQ0FBQyxrQkFBVSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDMUUsdUJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQywyQ0FBbUIsQ0FBQyxDQUFDO1NBQ2hEO1FBQ0QsU0FBUyxFQUFFLENBQUMsMkNBQW1CLEVBQUUseUNBQWtCLENBQUM7S0FDckQsQ0FBQztHQUNXLHVCQUF1QixDQUFJO0FBQTNCLDBEQUF1QiJ9