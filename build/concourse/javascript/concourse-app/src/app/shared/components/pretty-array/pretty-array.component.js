"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let PrettyArrayComponent = class PrettyArrayComponent {
    ngOnChanges() {
        const data = this.data;
        if (data) {
            this.pretty = data;
            this.prettyArray = data[1];
        }
    }
};
__decorate([
    core_1.Input()
], PrettyArrayComponent.prototype, "data", void 0);
__decorate([
    core_1.Input()
], PrettyArrayComponent.prototype, "split", void 0);
PrettyArrayComponent = __decorate([
    core_1.Component({
        selector: 'app-pretty-array',
        templateUrl: './pretty-array.component.html',
        styleUrls: ['./pretty-array.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], PrettyArrayComponent);
exports.PrettyArrayComponent = PrettyArrayComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldHR5LWFycmF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9wcmV0dHktYXJyYXkvcHJldHR5LWFycmF5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFxRjtBQVFyRixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQU8vQixXQUFXO1FBQ1QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzVCO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFiVTtJQUFSLFlBQUssRUFBRTtrREFBYztBQUNiO0lBQVIsWUFBSyxFQUFFO21EQUFlO0FBSFosb0JBQW9CO0lBTmhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLFdBQVcsRUFBRSwrQkFBK0I7UUFDNUMsU0FBUyxFQUFFLENBQUMsK0JBQStCLENBQUM7UUFDNUMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLG9CQUFvQixDQWVoQztBQWZZLG9EQUFvQiJ9