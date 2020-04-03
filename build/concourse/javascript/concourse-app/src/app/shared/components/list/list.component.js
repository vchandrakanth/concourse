"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const scrolling_1 = require("@angular/cdk/scrolling");
const core_1 = require("@angular/core");
let ListComponent = class ListComponent {
    constructor() {
        this.onScrollEnd = new core_1.EventEmitter();
    }
    extractProperty(item, map) {
        if (!item || !map) {
            return;
        }
        const keys = map.split('.');
        const head = keys.shift();
        return keys.reduce((prop, key) => typeof prop !== 'undefined' && typeof prop[key] !== 'undefined' ? prop[key] : undefined, item[head || '']);
    }
    trackItems(_index, item) {
        return item.id;
    }
    trackByIdx(i) {
        return i;
    }
    buildLink(item) {
        const builtArray = [];
        for (let piece of this.linkTemplate) {
            if (!piece.includes('/')) {
                piece = item[piece];
            }
            builtArray.push(piece);
        }
        return builtArray;
    }
    buildInfo(item) {
        if (!this.info) {
            return;
        }
        const info = item[this.info];
        if (!info) {
            return;
        }
        if (Array.isArray(info)) {
            return `${item[this.info].length} ${this.info}`;
        }
        const result = info.replace(/([A-Z])/g, ' $1');
        const finalString = result.charAt(0).toUpperCase() + result.slice(1);
        return finalString;
    }
    nextPage() {
        const end = this.viewport.getRenderedRange().end;
        const total = this.viewport.getDataLength();
        if (end === total) {
            this.onScrollEnd.emit();
        }
    }
};
__decorate([
    core_1.Input()
], ListComponent.prototype, "entityNameProp", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "items", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "info", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "linkTemplate", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "groupBy", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "groupByLabel", void 0);
__decorate([
    core_1.Input()
], ListComponent.prototype, "workFlowList", void 0);
__decorate([
    core_1.Output()
], ListComponent.prototype, "onScrollEnd", void 0);
__decorate([
    core_1.ViewChild(scrolling_1.CdkVirtualScrollViewport)
], ListComponent.prototype, "viewport", void 0);
ListComponent = __decorate([
    core_1.Component({
        selector: 'app-list',
        templateUrl: './list.component.html',
        styleUrls: ['./list.component.scss'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbGlzdC9saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNEQUFrRTtBQUNsRSx3Q0FBbUg7QUFRbkgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYTtJQUExQjtRQVFxQixnQkFBVyxHQUFHLElBQUksbUJBQVksRUFBTyxDQUFDO0lBb0QzRCxDQUFDO0lBaERDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsR0FBVztRQUMvQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzlCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzFCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUM1QyxPQUFPLElBQUksS0FBSyxXQUFXLElBQUksT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUMxRyxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxNQUFjLEVBQUUsSUFBSTtRQUM3QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVELFVBQVUsQ0FBQyxDQUFDO1FBQ1YsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsU0FBUyxDQUFDLElBQUk7UUFDWixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFDdEIsS0FBSyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25DLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUN4QixLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JCO1lBQ0QsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4QjtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBSTtRQUNaLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksRUFBRTtZQUFFLE9BQU87U0FBRTtRQUN0QixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqRDtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLFdBQVcsQ0FBQztJQUVyQixDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFDakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QyxJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6QjtJQUNILENBQUM7Q0FDRixDQUFBO0FBM0RVO0lBQVIsWUFBSyxFQUFFO3FEQUF3QjtBQUN2QjtJQUFSLFlBQUssRUFBRTs0Q0FBYztBQUNiO0lBQVIsWUFBSyxFQUFFOzJDQUFjO0FBQ2I7SUFBUixZQUFLLEVBQUU7bURBQXdCO0FBQ3ZCO0lBQVIsWUFBSyxFQUFFOzhDQUFpQjtBQUNoQjtJQUFSLFlBQUssRUFBRTttREFBc0I7QUFDckI7SUFBUixZQUFLLEVBQUU7bURBQXVCO0FBQ3JCO0lBQVQsYUFBTSxFQUFFO2tEQUFnRDtBQUVwQjtJQUFwQyxnQkFBUyxDQUFDLG9DQUF3QixDQUFDOytDQUFvQztBQVY3RCxhQUFhO0lBTnpCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsVUFBVTtRQUNwQixXQUFXLEVBQUUsdUJBQXVCO1FBQ3BDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1FBQ3BDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO0tBQ2hELENBQUM7R0FDVyxhQUFhLENBNER6QjtBQTVEWSxzQ0FBYSJ9