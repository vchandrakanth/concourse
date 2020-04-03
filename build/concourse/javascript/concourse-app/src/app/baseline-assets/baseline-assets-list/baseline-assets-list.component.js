"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const modal_1 = require("@concourse/core/modal");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
let BaselineAssetsListComponent = class BaselineAssetsListComponent {
    constructor(modalFacade, baselineAssetFacade) {
        this.modalFacade = modalFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.icons = { faPlus: faPlus_1.faPlus };
        this.list$ = this.baselineAssetFacade.list$;
        this.selected$ = this.baselineAssetFacade.selected$;
        this.isLoaded$ = this.baselineAssetFacade.isLoaded$;
        this.hasNextLink$ = this.baselineAssetFacade.hasNextLink$;
        this.page = 0;
    }
    createBaselineAsset() {
        this.modalFacade.openModal({ component: modal_1.CreateBaselineAssetComponent, id: 'baseline-form' });
    }
    onScrollEnd(hasNextLink, isLoaded) {
        if (hasNextLink && isLoaded) {
            this.page++;
            this.baselineAssetFacade.getPaginatedList(this.page, 200);
        }
    }
};
BaselineAssetsListComponent = __decorate([
    core_1.Component({
        selector: 'app-baseline-assets-list',
        templateUrl: './baseline-assets-list.component.html',
        styleUrls: ['./baseline-assets-list.component.scss']
    })
], BaselineAssetsListComponent);
exports.BaselineAssetsListComponent = BaselineAssetsListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Jhc2VsaW5lLWFzc2V0cy9iYXNlbGluZS1hc3NldHMtbGlzdC9iYXNlbGluZS1hc3NldHMtbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsaURBQXVGO0FBRXZGLHFFQUFrRTtBQU9sRSxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUEyQjtJQVF0QyxZQUNtQixXQUE2QixFQUM3QixtQkFBd0M7UUFEeEMsZ0JBQVcsR0FBWCxXQUFXLENBQWtCO1FBQzdCLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFUbEQsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxDQUFDO1FBRTVCLFVBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDO1FBQ3ZDLGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQy9DLGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDO1FBQy9DLGlCQUFZLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksQ0FBQztRQUNyRCxTQUFJLEdBQUcsQ0FBQyxDQUFDO0lBSUwsQ0FBQztJQUVMLG1CQUFtQjtRQUNqQixJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxvQ0FBNEIsRUFBRSxFQUFFLEVBQUUsZUFBZSxFQUFFLENBQUMsQ0FBQztJQUMvRixDQUFDO0lBRUQsV0FBVyxDQUFDLFdBQW9CLEVBQUUsUUFBaUI7UUFDakQsSUFBSSxXQUFXLElBQUksUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2QlksMkJBQTJCO0lBTHZDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFdBQVcsRUFBRSx1Q0FBdUM7UUFDcEQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7S0FDckQsQ0FBQztHQUNXLDJCQUEyQixDQXVCdkM7QUF2Qlksa0VBQTJCIn0=