"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let SecurePerimeterInStacksComponent = class SecurePerimeterInStacksComponent {
    constructor(fb, ptfComponent) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30021: ['BIDIRECTIONAL', forms_1.Validators.required],
        });
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
};
SecurePerimeterInStacksComponent = __decorate([
    core_1.Component({
        selector: 'app-secure-perimeter-in-stacks',
        templateUrl: './secure-perimeter-in-stacks.component.html',
        styleUrls: ['./secure-perimeter-in-stacks.component.scss']
    })
], SecurePerimeterInStacksComponent);
exports.SecurePerimeterInStacksComponent = SecurePerimeterInStacksComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJlLXBlcmltZXRlci1pbi1zdGFja3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi90ZW1wbGF0ZXMvc2VjdXJlLXBlcmltZXRlci1pbi1zdGFja3Mvc2VjdXJlLXBlcmltZXRlci1pbi1zdGFja3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUF5RDtBQVV6RCxJQUFhLGdDQUFnQyxHQUE3QyxNQUFhLGdDQUFnQztJQUszQyxZQUNtQixFQUFlLEVBQ2YsWUFBeUM7UUFEekMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUw1RCxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsS0FBSyxFQUFFLENBQUMsZUFBZSxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDO1NBQzlDLENBQUMsQ0FBQztJQUlDLENBQUM7SUFFTCxRQUFRO1FBQ04sSUFBSSxDQUFDLFlBQVksQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUUsQ0FBQztDQUVGLENBQUE7QUFkWSxnQ0FBZ0M7SUFMNUMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQ0FBZ0M7UUFDMUMsV0FBVyxFQUFFLDZDQUE2QztRQUMxRCxTQUFTLEVBQUUsQ0FBQyw2Q0FBNkMsQ0FBQztLQUMzRCxDQUFDO0dBQ1csZ0NBQWdDLENBYzVDO0FBZFksNEVBQWdDIn0=