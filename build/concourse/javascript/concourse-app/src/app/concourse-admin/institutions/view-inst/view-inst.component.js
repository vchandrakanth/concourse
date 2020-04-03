"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ViewInstComponent = class ViewInstComponent {
    constructor(instFacade) {
        this.instFacade = instFacade;
        this.institution$ = this.instFacade.selected$;
    }
    ngOnInit() {
        //
    }
};
ViewInstComponent = __decorate([
    core_1.Component({
        selector: 'app-view-inst',
        templateUrl: './view-inst.component.html',
        styleUrls: ['./view-inst.component.scss']
    })
], ViewInstComponent);
exports.ViewInstComponent = ViewInstComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1pbnN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb25jb3Vyc2UtYWRtaW4vaW5zdGl0dXRpb25zL3ZpZXctaW5zdC92aWV3LWluc3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBU2xELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRzVCLFlBQ21CLFVBQTZCO1FBQTdCLGVBQVUsR0FBVixVQUFVLENBQW1CO1FBSGhELGlCQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7SUFJckMsQ0FBQztJQUVMLFFBQVE7UUFDTixFQUFFO0lBQ0osQ0FBQztDQUVGLENBQUE7QUFYWSxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7S0FDMUMsQ0FBQztHQUNXLGlCQUFpQixDQVc3QjtBQVhZLDhDQUFpQiJ9