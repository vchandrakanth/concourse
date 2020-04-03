"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCircle_1 = require("@fortawesome/free-regular-svg-icons/faCircle");
const env_1 = require("@concourse/env");
let CircleTextIconComponent = class CircleTextIconComponent {
    constructor() {
        this.icon = { faCircle: faCircle_1.faCircle };
    }
    ngOnInit() {
        if (!!this.iconText) {
            switch (this.iconText.length) {
                case 1:
                    this.fontSize = 14;
                    break;
                case 2:
                    this.fontSize = 11;
                    break;
                case 3:
                    this.fontSize = 9;
                    break;
                default:
                    if (!env_1.environment.production) {
                        throw new Error(`The string ${this.iconText} is too long for the app-list-text-icon-component`);
                    }
            }
        }
    }
};
__decorate([
    core_1.Input()
], CircleTextIconComponent.prototype, "iconText", void 0);
CircleTextIconComponent = __decorate([
    core_1.Component({
        selector: 'app-circle-text-icon',
        templateUrl: './circle-text-icon.component.html',
        styleUrls: ['./circle-text-icon.component.scss']
    })
], CircleTextIconComponent);
exports.CircleTextIconComponent = CircleTextIconComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLXRleHQtaWNvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY2lyY2xlLXRleHQtaWNvbi9jaXJjbGUtdGV4dC1pY29uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF5RDtBQUN6RCwyRUFBd0U7QUFFeEUsd0NBQTZDO0FBTzdDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0lBQXBDO1FBR0UsU0FBSSxHQUFHLEVBQUUsUUFBUSxFQUFSLG1CQUFRLEVBQUUsQ0FBQztJQXdCdEIsQ0FBQztJQXRCQyxRQUFRO1FBQ04sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNuQixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUM1QixLQUFLLENBQUM7b0JBQ0osSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7b0JBQ25CLE1BQU07Z0JBQ1IsS0FBSyxDQUFDO29CQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO29CQUNuQixNQUFNO2dCQUNSLEtBQUssQ0FBQztvQkFDSixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsTUFBTTtnQkFDUjtvQkFDRSxJQUFJLENBQUMsaUJBQVcsQ0FBQyxVQUFVLEVBQUU7d0JBQzNCLE1BQU0sSUFBSSxLQUFLLENBQ2IsY0FBYyxJQUFJLENBQUMsUUFBUSxtREFBbUQsQ0FDL0UsQ0FBQztxQkFDSDthQUNKO1NBQ0Y7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQTFCVTtJQUFSLFlBQUssRUFBRTt5REFBa0I7QUFEZix1QkFBdUI7SUFMbkMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztLQUNqRCxDQUFDO0dBQ1csdUJBQXVCLENBMkJuQztBQTNCWSwwREFBdUIifQ==