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
const DEFAULT_VISIBLE_COUNT = 4;
let ListCardComponent = class ListCardComponent {
    constructor() {
        this.itemsVisible = DEFAULT_VISIBLE_COUNT;
        this._data = [];
    }
    set cardListData(data) {
        if (helpers_1.Util.isUndefined(data)) {
            this._data = [];
        }
        else {
            helpers_1.Util.isArray(data) ? this._data = data : this._data = [data];
        }
    }
    get cardListData() {
        return this._data;
    }
    get listHasItems() {
        return this.listCount > 0;
    }
    get listCount() {
        return this._data.length;
    }
    set items(items) {
        this.itemsVisible = items;
    }
    get allVisible() {
        return this.itemsVisible === 0;
    }
    get buttonText() {
        const title = this.cardTitle ? this.cardTitle.toLocaleLowerCase() : '';
        if (this.allVisible) {
            return `View fewer ${title}`;
        }
        return `View ${this.listCount - DEFAULT_VISIBLE_COUNT} more ${title}`;
    }
    toggleView() {
        this.itemsVisible = this.allVisible ? DEFAULT_VISIBLE_COUNT : 0;
    }
};
__decorate([
    core_1.Input()
], ListCardComponent.prototype, "cardListData", null);
__decorate([
    core_1.Input()
], ListCardComponent.prototype, "cardTitle", void 0);
__decorate([
    core_1.Input()
], ListCardComponent.prototype, "iconText", void 0);
__decorate([
    core_1.ContentChild('listItemTemplate')
], ListCardComponent.prototype, "listItemTemplate", void 0);
__decorate([
    core_1.ContentChild('itemAppendTemplate')
], ListCardComponent.prototype, "itemAppendTemplate", void 0);
ListCardComponent = __decorate([
    core_1.Component({
        selector: 'app-list-card',
        templateUrl: './list-cards.component.html',
        styleUrls: ['./list-cards.component.scss']
    })
], ListCardComponent);
exports.ListCardComponent = ListCardComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1jYXJkcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbGlzdC1jYXJkcy9saXN0LWNhcmRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQU11QjtBQUV2Qix1REFBaUQ7QUFFakQsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQUM7QUFPaEMsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFBOUI7UUFxQkUsaUJBQVksR0FBRyxxQkFBcUIsQ0FBQztRQUM3QixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBcUJyQixDQUFDO0lBMUNVLElBQUksWUFBWSxDQUFDLElBQUk7UUFDNUIsSUFBSSxjQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1NBQ2pCO2FBQU07WUFDTCxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQztJQUNELElBQUksWUFBWTtRQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBUUQsSUFBSSxLQUFLLENBQUMsS0FBYTtRQUNyQixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLE9BQU8sY0FBYyxLQUFLLEVBQUUsQ0FBQztTQUM5QjtRQUNELE9BQU8sUUFBUSxJQUFJLENBQUMsU0FBUyxHQUFHLHFCQUFxQixTQUFTLEtBQUssRUFBRSxDQUFDO0lBQ3hFLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7Q0FDRixDQUFBO0FBMUNVO0lBQVIsWUFBSyxFQUFFO3FEQU1QO0FBVVE7SUFBUixZQUFLLEVBQUU7b0RBQW1CO0FBQ2xCO0lBQVIsWUFBSyxFQUFFO21EQUFrQjtBQUNRO0lBQWpDLG1CQUFZLENBQUMsa0JBQWtCLENBQUM7MkRBQTJDO0FBQ3hDO0lBQW5DLG1CQUFZLENBQUMsb0JBQW9CLENBQUM7NkRBQTZDO0FBcEJyRSxpQkFBaUI7SUFMN0IsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxlQUFlO1FBQ3pCLFdBQVcsRUFBRSw2QkFBNkI7UUFDMUMsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7S0FDM0MsQ0FBQztHQUNXLGlCQUFpQixDQTJDN0I7QUEzQ1ksOENBQWlCIn0=