"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faSpinner_1 = require("@fortawesome/free-solid-svg-icons/faSpinner");
let SpinnerComponent = class SpinnerComponent {
    constructor() {
        this.icons = { faSpinner: faSpinner_1.faSpinner };
    }
};
SpinnerComponent = __decorate([
    core_1.Component({
        selector: 'app-spinner',
        templateUrl: './spinner.component.html',
        styleUrls: ['./spinner.component.scss']
    })
], SpinnerComponent);
exports.SpinnerComponent = SpinnerComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvc3Bpbm5lci9zcGlubmVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUMxQywyRUFBd0U7QUFPeEUsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBZ0I7SUFBN0I7UUFFVyxVQUFLLEdBQUcsRUFBRSxTQUFTLEVBQVQscUJBQVMsRUFBRSxDQUFDO0lBRWpDLENBQUM7Q0FBQSxDQUFBO0FBSlksZ0JBQWdCO0lBTDVCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO0tBQ3hDLENBQUM7R0FDVyxnQkFBZ0IsQ0FJNUI7QUFKWSw0Q0FBZ0IifQ==