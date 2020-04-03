"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let NgAutoSelectDirective = class NgAutoSelectDirective {
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.multiple = false;
        this.items = [];
        this.autoSelect = true;
    }
    ngOnInit() {
        if (this.autoSelect) {
            const { control } = this.ngControl;
            if (this.items && this.items.length === 1) {
                const [item] = this.items;
                let value = !!this.bindValue ? item[this.bindValue] : item;
                if (this.multiple) {
                    value = [value];
                }
                control.patchValue(value);
            }
        }
    }
};
__decorate([
    core_1.Input()
], NgAutoSelectDirective.prototype, "bindValue", void 0);
__decorate([
    core_1.Input()
], NgAutoSelectDirective.prototype, "multiple", void 0);
__decorate([
    core_1.Input()
], NgAutoSelectDirective.prototype, "items", void 0);
__decorate([
    core_1.Input()
], NgAutoSelectDirective.prototype, "autoSelect", void 0);
NgAutoSelectDirective = __decorate([
    core_1.Directive({
        // tslint:disable-next-line:directive-selector
        selector: 'ng-select'
    }),
    __param(0, core_1.Self())
], NgAutoSelectDirective);
exports.NgAutoSelectDirective = NgAutoSelectDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctYXV0by1zZWxlY3QuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9kaXJlY3RpdmVzL25nLWF1dG8tc2VsZWN0LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHdDQUErRDtBQU8vRCxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFxQjtJQU1oQyxZQUMyQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBTHRDLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUNYLGVBQVUsR0FBRyxJQUFJLENBQUM7SUFJdkIsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbkMsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzNELElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDakIsS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2pCO2dCQUNELE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7U0FDRjtJQUNILENBQUM7Q0FFRixDQUFBO0FBdkJVO0lBQVIsWUFBSyxFQUFFO3dEQUFtQjtBQUNsQjtJQUFSLFlBQUssRUFBRTt1REFBa0I7QUFDakI7SUFBUixZQUFLLEVBQUU7b0RBQVk7QUFDWDtJQUFSLFlBQUssRUFBRTt5REFBbUI7QUFKaEIscUJBQXFCO0lBSmpDLGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLFdBQVc7S0FDdEIsQ0FBQztJQVFHLFdBQUEsV0FBSSxFQUFFLENBQUE7R0FQRSxxQkFBcUIsQ0F3QmpDO0FBeEJZLHNEQUFxQiJ9