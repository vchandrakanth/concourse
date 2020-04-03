"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faBoxOpen_1 = require("@fortawesome/free-solid-svg-icons/faBoxOpen");
let NullStateComponent = class NullStateComponent {
    constructor() {
        this.entityName = 'Entities';
        this.icons = { faBoxOpen: faBoxOpen_1.faBoxOpen };
    }
};
__decorate([
    core_1.Input()
], NullStateComponent.prototype, "entityName", void 0);
__decorate([
    core_1.Input()
], NullStateComponent.prototype, "icon", void 0);
NullStateComponent = __decorate([
    core_1.Component({
        selector: 'app-null-state',
        template: `
    <fa-icon [icon]="icon || icons.faBoxOpen" size="3x"></fa-icon>
    <div class="h5 m-1">No {{ entityName }} Found.</div>
  `,
        styleUrls: ['./null-state.component.scss']
    })
], NullStateComponent);
exports.NullStateComponent = NullStateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVsbC1zdGF0ZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbnVsbC1zdGF0ZS9udWxsLXN0YXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFpRDtBQUNqRCwyRUFBd0U7QUFVeEUsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFBL0I7UUFDVyxlQUFVLEdBQUcsVUFBVSxDQUFDO1FBRXhCLFVBQUssR0FBRyxFQUFFLFNBQVMsRUFBVCxxQkFBUyxFQUFFLENBQUM7SUFDakMsQ0FBQztDQUFBLENBQUE7QUFIVTtJQUFSLFlBQUssRUFBRTtzREFBeUI7QUFDeEI7SUFBUixZQUFLLEVBQUU7Z0RBQVc7QUFGUixrQkFBa0I7SUFSOUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsUUFBUSxFQUFFOzs7R0FHVDtRQUNELFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQzNDLENBQUM7R0FDVyxrQkFBa0IsQ0FJOUI7QUFKWSxnREFBa0IifQ==