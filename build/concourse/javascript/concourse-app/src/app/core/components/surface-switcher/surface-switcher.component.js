"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let SurfaceSwitcherComponent = class SurfaceSwitcherComponent {
    constructor(surfaceFacade) {
        this.surfaceFacade = surfaceFacade;
        this.surfaces$ = this.surfaceFacade.list$;
        this.selectedId$ = this.surfaceFacade.selectedId$;
    }
    ngOnInit() {
        this.surfaceFacade.getAll();
    }
    selectSurface(id) {
        this.surfaceFacade.getById(+id);
    }
    trackItems(_index, surface) {
        return surface.id;
    }
};
SurfaceSwitcherComponent = __decorate([
    core_1.Component({
        selector: 'app-surface-switcher',
        templateUrl: './surface-switcher.component.html',
        styleUrls: ['./surface-switcher.component.scss']
    })
], SurfaceSwitcherComponent);
exports.SurfaceSwitcherComponent = SurfaceSwitcherComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VyZmFjZS1zd2l0Y2hlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9jb21wb25lbnRzL3N1cmZhY2Utc3dpdGNoZXIvc3VyZmFjZS1zd2l0Y2hlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFVbEQsSUFBYSx3QkFBd0IsR0FBckMsTUFBYSx3QkFBd0I7SUFJbkMsWUFDbUIsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFKL0MsY0FBUyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQ3JDLGdCQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7SUFJekMsQ0FBQztJQUVMLFFBQVE7UUFDTixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxhQUFhLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWdCO1FBQ3pDLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBRUYsQ0FBQTtBQXBCWSx3QkFBd0I7SUFMcEMsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsV0FBVyxFQUFFLG1DQUFtQztRQUNoRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztLQUNqRCxDQUFDO0dBQ1csd0JBQXdCLENBb0JwQztBQXBCWSw0REFBd0IifQ==