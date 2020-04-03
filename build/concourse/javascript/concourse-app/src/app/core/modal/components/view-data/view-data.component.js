"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const helpers_1 = require("@concourse/shared/helpers");
const basic_modal_1 = require("../basic-modal");
let ViewDataComponent = class ViewDataComponent extends basic_modal_1.BasicModal {
    constructor(router, modalFacade) {
        super();
        this.router = router;
        this.modalFacade = modalFacade;
    }
    ngOnInit() {
        this.formatData(this.data);
    }
    formatData(d) {
        const type = helpers_1.Util.isArray(d);
        if (helpers_1.Util.isArray(d)) {
        }
    }
    onClick(d) {
        const str = this.getRoute(d);
        this.router.navigate([str]);
        this.modalFacade.closeModal();
    }
    hasRoute() {
        return !!this.routingString;
    }
    getRoute(d) {
        return `${this.routingString}/${d}`;
    }
};
ViewDataComponent = __decorate([
    core_1.Component({
        selector: 'app-view-data',
        templateUrl: './view-data.component.html',
        styleUrls: ['./view-data.component.scss']
    })
], ViewDataComponent);
exports.ViewDataComponent = ViewDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1kYXRhLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvdmlldy1kYXRhL3ZpZXctZGF0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFHbEQsdURBQWlEO0FBRWpELGdEQUE0QztBQU81QyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHdCQUFVO0lBSS9DLFlBQ1UsTUFBYyxFQUNkLFdBQTZCO1FBRXJDLEtBQUssRUFBRSxDQUFDO1FBSEEsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtJQUd2QyxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxVQUFVLENBQUMsQ0FBQztRQUNWLE1BQU0sSUFBSSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1NBRXBCO0lBQ0gsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFDO1FBQ1AsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUVoQyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQUVELFFBQVEsQ0FBQyxDQUFDO1FBQ1IsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDdEMsQ0FBQztDQUVGLENBQUE7QUFyQ1ksaUJBQWlCO0lBTDdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsZUFBZTtRQUN6QixXQUFXLEVBQUUsNEJBQTRCO1FBQ3pDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO0tBQzFDLENBQUM7R0FDVyxpQkFBaUIsQ0FxQzdCO0FBckNZLDhDQUFpQiJ9