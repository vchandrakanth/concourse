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
let DetailsCardComponent = class DetailsCardComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.columns = 2;
    }
    set cardContent(content) {
        this._cardContent = content.map(c => (Object.assign(Object.assign({}, c), { optional: !helpers_1.Util.isUndefined(c.optional) ? c.optional : false })));
    }
    get cardContent() {
        return this._cardContent;
    }
    get style() {
        return this.sanitizer.bypassSecurityTrustStyle(`--columnCount: ${this.columns}`);
    }
    extractProperty(map) {
        const keys = map.split('.');
        const head = keys.shift();
        return keys.reduce((prop, key) => typeof prop !== 'undefined' && typeof prop[key] !== 'undefined' ? prop[key] : undefined, this.cardData[head || '']);
    }
    get showVersion() {
        if (this.cardData) {
            return !helpers_1.Util.isNullOrUndefined(this.cardData.majorVersion) && !helpers_1.Util.isNullOrUndefined(this.cardData.minorVersion);
        }
        return false;
    }
    routerLink(item) {
        return item.routerLink.map(rl => {
            if (!rl.includes('/')) {
                return this.extractProperty(rl);
            }
            return rl;
        });
    }
    hasProp(o, name) {
        return o.hasOwnProperty(name);
    }
};
__decorate([
    core_1.Input()
], DetailsCardComponent.prototype, "cardContent", null);
__decorate([
    core_1.Input()
], DetailsCardComponent.prototype, "onlyShowContent", void 0);
__decorate([
    core_1.Input()
], DetailsCardComponent.prototype, "cardData", void 0);
__decorate([
    core_1.Input()
], DetailsCardComponent.prototype, "columns", void 0);
__decorate([
    core_1.HostBinding('style')
], DetailsCardComponent.prototype, "style", null);
DetailsCardComponent = __decorate([
    core_1.Component({
        selector: 'app-details-card',
        templateUrl: './details-card.component.html',
        styleUrls: ['./details-card.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], DetailsCardComponent);
exports.DetailsCardComponent = DetailsCardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlscy1jYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9kZXRhaWxzLWNhcmQvZGV0YWlscy1jYXJkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUF1RjtBQUl2Rix1REFBaUQ7QUFRakQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7SUFxQi9CLFlBQ21CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFWakMsWUFBTyxHQUFHLENBQUMsQ0FBQztJQVdqQixDQUFDO0lBdEJJLElBQUksV0FBVyxDQUFDLE9BQTZCO1FBQ3BELElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlDQUNoQyxDQUFDLEtBQ0osUUFBUSxFQUFFLENBQUMsY0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFDNUQsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUNELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBSXFCLElBQUksS0FBSztRQUM3QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQzVDLGtCQUFrQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQ2pDLENBQUM7SUFDSixDQUFDO0lBUUQsZUFBZSxDQUFDLEdBQVc7UUFDekIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFMUIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEdBQVcsRUFBRSxFQUFFLENBQzVDLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUNuSCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksV0FBVztRQUNiLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNqQixPQUFPLENBQUMsY0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxjQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNuSDtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFVBQVUsQ0FBQyxJQUF3QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQzlCLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNyQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDakM7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE9BQU8sQ0FBQyxDQUFDLEVBQUUsSUFBSTtRQUNiLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0YsQ0FBQTtBQXBEVTtJQUFSLFlBQUssRUFBRTt1REFLUDtBQUlRO0lBQVIsWUFBSyxFQUFFOzZEQUF3QjtBQUN2QjtJQUFSLFlBQUssRUFBRTtzREFBZTtBQUNkO0lBQVIsWUFBSyxFQUFFO3FEQUFhO0FBQ0M7SUFBckIsa0JBQVcsQ0FBQyxPQUFPLENBQUM7aURBSXBCO0FBakJVLG9CQUFvQjtJQU5oQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGtCQUFrQjtRQUM1QixXQUFXLEVBQUUsK0JBQStCO1FBQzVDLFNBQVMsRUFBRSxDQUFDLCtCQUErQixDQUFDO1FBQzVDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxvQkFBb0IsQ0FxRGhDO0FBckRZLG9EQUFvQiJ9