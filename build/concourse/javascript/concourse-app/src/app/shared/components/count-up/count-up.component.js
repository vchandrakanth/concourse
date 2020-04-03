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
const faSpinner_1 = require("@fortawesome/free-solid-svg-icons/faSpinner");
let CountUpComponent = class CountUpComponent {
    constructor() {
        this.icons = { faSpinner: faSpinner_1.faSpinner };
    }
    ngOnInit() {
        // tslint:disable-next-line:prefer-conditional-expression
        if (helpers_1.Util.isArray(this.count)) {
            this.formatted = this.count.length;
        }
        else {
            this.formatted = this.count;
        }
    }
};
__decorate([
    core_1.Input()
], CountUpComponent.prototype, "count", void 0);
CountUpComponent = __decorate([
    core_1.Component({
        selector: 'app-count-up',
        templateUrl: './count-up.component.html',
        styleUrls: ['./count-up.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], CountUpComponent);
exports.CountUpComponent = CountUpComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnQtdXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvdW50LXVwL2NvdW50LXVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFrRjtBQUNsRix1REFBaUQ7QUFDakQsMkVBQXdFO0FBUXhFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBQTdCO1FBQ1csVUFBSyxHQUFHLEVBQUUsU0FBUyxFQUFULHFCQUFTLEVBQUUsQ0FBQztJQWNqQyxDQUFDO0lBVEMsUUFBUTtRQUNOLHlEQUF5RDtRQUN6RCxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7U0FDcEM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUM3QjtJQUNILENBQUM7Q0FFRixDQUFBO0FBWlU7SUFBUixZQUFLLEVBQUU7K0NBQU87QUFISixnQkFBZ0I7SUFONUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxjQUFjO1FBQ3hCLFdBQVcsRUFBRSwyQkFBMkI7UUFDeEMsU0FBUyxFQUFFLENBQUMsMkJBQTJCLENBQUM7UUFDeEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLGdCQUFnQixDQWU1QjtBQWZZLDRDQUFnQiJ9