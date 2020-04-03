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
let ColorBadgeComponent = class ColorBadgeComponent {
    constructor() {
        this.green = ['LOW', 'CREATED', 'APPROVED', 'UPDATE_COMPLETE', 'PUBLISHED', 'ACTIVE', 'SELF MANAGED', 'CONNECTED', 'VALID'];
        this.red = ['HIGH', 'REJECTED', 'CANCELLED', 'DRIFTED'];
        this.yellow = ['MEDIUM', 'IN_EXECUTION', 'IN_EXCEPTION', 'UPDATED', 'DRAFT', 'PENDING', 'DISCOVERED'];
        this.blue = ['UNSPECIFIED'];
        this._text = '';
        this.colorOverride = false;
    }
    set text(str) {
        if (!helpers_1.Util.isNullOrUndefined(str)) {
            this._text = str.toString()
                .replace(/_/g, ' ')
                .toUpperCase();
        }
    }
    get text() {
        return this._text;
    }
    set color(color) {
        this._color = color;
        this.colorOverride = true;
    }
    get color() {
        return this._color;
    }
    ngOnChanges() {
        if (!this.colorOverride) {
            this.colorText(this.text);
        }
    }
    colorText(text) {
        if (this.green.includes(this.text) || this.text.includes('COMPLETE')) {
            this._color = 'success';
        }
        else if (this.red.includes(this.text) || this.text.includes('FAIL')) {
            this._color = 'danger';
        }
        else if (this.yellow.includes(this.text) || this.text.includes('ISSUE')) {
            this._color = 'warning';
        }
        else if (this.blue.includes(this.text) || this.text.includes('PROGRESS')) {
            this._color = 'info';
        }
        else {
            this._color = 'secondary';
        }
    }
};
__decorate([
    core_1.Input()
], ColorBadgeComponent.prototype, "text", null);
__decorate([
    core_1.Input()
], ColorBadgeComponent.prototype, "color", null);
ColorBadgeComponent = __decorate([
    core_1.Component({
        selector: 'app-color-badge',
        templateUrl: './color-badge.component.html',
        styleUrls: ['./color-badge.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], ColorBadgeComponent);
exports.ColorBadgeComponent = ColorBadgeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItYmFkZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2NvbG9yLWJhZGdlL2NvbG9yLWJhZGdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUFxRjtBQUNyRix1REFBaUQ7QUFRakQsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFBaEM7UUFvQkUsVUFBSyxHQUFHLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZILFFBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELFdBQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2pHLFNBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRWYsVUFBSyxHQUFHLEVBQUUsQ0FBQztRQUVYLGtCQUFhLEdBQUcsS0FBSyxDQUFDO0lBc0JoQyxDQUFDO0lBaERVLElBQUksSUFBSSxDQUFDLEdBQVc7UUFDM0IsSUFBSSxDQUFDLGNBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUU7aUJBQ3hCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDO2lCQUNsQixXQUFXLEVBQUUsQ0FBQztTQUNsQjtJQUNILENBQUM7SUFDRCxJQUFJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUVRLElBQUksS0FBSyxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7SUFDNUIsQ0FBQztJQUNELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBV0QsV0FBVztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxJQUFzQjtRQUM5QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3JFLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDO1NBQ3hCO2FBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7U0FDekI7YUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUMxRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7U0FDM0I7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQWhEVTtJQUFSLFlBQUssRUFBRTsrQ0FNUDtBQUtRO0lBQVIsWUFBSyxFQUFFO2dEQUdQO0FBZlUsbUJBQW1CO0lBTi9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7UUFDM0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07S0FDaEQsQ0FBQztHQUNXLG1CQUFtQixDQWlEL0I7QUFqRFksa0RBQW1CIn0=