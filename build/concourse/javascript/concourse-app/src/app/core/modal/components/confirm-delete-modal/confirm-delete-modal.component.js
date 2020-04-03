"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let ConfirmDeleteModalComponent = class ConfirmDeleteModalComponent {
    constructor() {
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    confirmDelete(event) {
        event.preventDefault();
        this.triggerDelete();
    }
};
ConfirmDeleteModalComponent = __decorate([
    core_1.Component({
        selector: 'app-confirm-delete-modal',
        templateUrl: './confirm-delete-modal.component.html',
        styleUrls: ['./confirm-delete-modal.component.scss']
    })
], ConfirmDeleteModalComponent);
exports.ConfirmDeleteModalComponent = ConfirmDeleteModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1kZWxldGUtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jb25maXJtLWRlbGV0ZS1tb2RhbC9jb25maXJtLWRlbGV0ZS1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsdUVBQW9FO0FBT3BFLElBQWEsMkJBQTJCLEdBQXhDLE1BQWEsMkJBQTJCO0lBQXhDO1FBS1csVUFBSyxHQUFHLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztJQUsvQixDQUFDO0lBSkMsYUFBYSxDQUFDLEtBQVk7UUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDO0NBQ0YsQ0FBQTtBQVZZLDJCQUEyQjtJQUx2QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO0tBQ3JELENBQUM7R0FDVywyQkFBMkIsQ0FVdkM7QUFWWSxrRUFBMkIifQ==