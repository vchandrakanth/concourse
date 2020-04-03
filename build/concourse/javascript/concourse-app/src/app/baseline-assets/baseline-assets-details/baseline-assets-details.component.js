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
const edit_baseline_asset_component_1 = require("@concourse/core/modal/components/edit-baseline-asset/edit-baseline-asset.component");
const faEdit_1 = require("@fortawesome/free-solid-svg-icons/faEdit");
const faPlusCircle_1 = require("@fortawesome/free-solid-svg-icons/faPlusCircle");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const faUpload_1 = require("@fortawesome/free-solid-svg-icons/faUpload");
let BaselineAssetsDetailsComponent = class BaselineAssetsDetailsComponent {
    constructor(modalFacade, baselineAssetFacade) {
        this.modalFacade = modalFacade;
        this.baselineAssetFacade = baselineAssetFacade;
        this.icons = { faEdit: faEdit_1.faEdit, faUpload: faUpload_1.faUpload, faPlusCircle: faPlusCircle_1.faPlusCircle, faTrashAlt: faTrashAlt_1.faTrashAlt };
        // TODO: create pie charts
        this.selected$ = this.baselineAssetFacade.selected$.pipe(
        // tap(x => this.formatContentPie(x)),
        // tap(x => this.formatStatsPie(x)),
        );
        this.isLoaded$ = this.baselineAssetFacade.isLoaded$;
        this.toggles = [];
        this.view = [700, 400];
        // options
        this.gradient = true;
        this.showLegend = true;
        this.showLabels = false;
        this.isDoughnut = false;
        this.legendPosition = 'below';
    }
    ngAfterViewInit() {
        this.contentColumns = [
            { prop: 'name', name: 'Name' },
            { prop: 'account', name: 'Account' },
            { prop: 'resourceGroup', name: 'Resource Group' },
            { prop: 'resourceType', name: 'Resource Type' },
            { prop: 'resourceTags', name: 'Resource Tags', cellTemplate: this.resourceTagsTpl },
            { prop: 'subscription', name: 'Subscription' }
        ];
        this.statsColumns = [
            { prop: 'accounts', name: 'Accounts' },
            { name: 'Resource Type', prop: 'resourceType' },
            { name: 'Instance Count', prop: 'instanceCount' },
            { name: 'Provider', prop: 'provider' },
            { name: 'Resource Group Count', prop: 'resourceGroups', cellTemplate: this.resourceGroupsTpl },
            { name: 'Regions', prop: 'regions' },
            { name: 'Subscriptions', prop: 'subscriptions' }
        ];
    }
    delete(baselineAsset) {
        this.modalFacade.confirmDeleteModal('Baseline Asset', baselineAsset.name, () => this.baselineAssetFacade.delete(baselineAsset.id));
    }
    edit(baseline) {
        this.modalFacade.openModal({
            component: edit_baseline_asset_component_1.EditBaselineAssetComponent,
            id: 'edit-baseline-asset',
            options: {
                initialState: { baseline }
            }
        });
    }
    editAzure(baseline) {
        this.modalFacade.openModal({
            component: modal_1.EditBaselineAssetAzureComponent,
            id: 'edit-baseline-asset-azure',
            options: {
                initialState: { baseline },
                class: 'modal-xl'
            }
        });
    }
    editAWS(baseline) {
        this.modalFacade.openModal({
            component: modal_1.EditBaselineAssetAwsComponent,
            id: 'edit-baseline-asset-aws',
            options: {
                initialState: { baseline },
                class: 'modal-xl'
            }
        });
    }
    toggleContainer(target) {
        if (this.toggles.includes(target)) {
            this.toggles.slice(this.toggles.indexOf(target), 1);
        }
        else {
            this.toggles.push(target);
        }
    }
    toggleCheck(target) {
        return this.toggles.includes(target);
    }
    formatContentPie(data) {
    }
    formatStatsPie(data) {
        if (data && data.stats.length) {
            const formatted = [];
            for (const d of data.stats) {
                const obj = {
                    name: d.resourceType,
                    value: d.instanceCount,
                    extra: {
                        object: d,
                        code: d.subscriptions
                    }
                };
                formatted.push(obj);
            }
            this.statsPie = formatted;
        }
    }
    onSelect(data) {
    }
};
__decorate([
    core_1.ViewChild('resourceTagsTpl')
], BaselineAssetsDetailsComponent.prototype, "resourceTagsTpl", void 0);
__decorate([
    core_1.ViewChild('resourceGroupsTpl')
], BaselineAssetsDetailsComponent.prototype, "resourceGroupsTpl", void 0);
__decorate([
    core_1.ViewChild('tabs')
], BaselineAssetsDetailsComponent.prototype, "tabs", void 0);
BaselineAssetsDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-baseline-assets-details',
        templateUrl: './baseline-assets-details.component.html',
        styleUrls: ['./baseline-assets-details.component.scss']
    })
], BaselineAssetsDetailsComponent);
exports.BaselineAssetsDetailsComponent = BaselineAssetsDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZWxpbmUtYXNzZXRzLWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Jhc2VsaW5lLWFzc2V0cy9iYXNlbGluZS1hc3NldHMtZGV0YWlscy9iYXNlbGluZS1hc3NldHMtZGV0YWlscy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBaUY7QUFDakYsaURBQXlIO0FBQ3pILHNJQUFnSTtBQUdoSSxxRUFBa0U7QUFDbEUsaUZBQThFO0FBQzlFLDZFQUEwRTtBQUMxRSx5RUFBc0U7QUFPdEUsSUFBYSw4QkFBOEIsR0FBM0MsTUFBYSw4QkFBOEI7SUFnQ3pDLFlBQ1UsV0FBNkIsRUFDN0IsbUJBQXdDO1FBRHhDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQUM3Qix3QkFBbUIsR0FBbkIsbUJBQW1CLENBQXFCO1FBakN6QyxVQUFLLEdBQUcsRUFBRSxNQUFNLEVBQU4sZUFBTSxFQUFFLFFBQVEsRUFBUixtQkFBUSxFQUFFLFlBQVksRUFBWiwyQkFBWSxFQUFFLFVBQVUsRUFBVix1QkFBVSxFQUFFLENBQUM7UUFNaEUsMEJBQTBCO1FBQzFCLGNBQVMsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLElBQUk7UUFDakQsc0NBQXNDO1FBQ3RDLG9DQUFvQztTQUNyQyxDQUFDO1FBQ0YsY0FBUyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7UUFJL0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQU9iLFNBQUksR0FBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QixVQUFVO1FBQ1YsYUFBUSxHQUFHLElBQUksQ0FBQztRQUNoQixlQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7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