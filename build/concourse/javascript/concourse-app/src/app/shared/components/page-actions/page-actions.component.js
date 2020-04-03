"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const portal_1 = require("@angular/cdk/portal");
const core_1 = require("@angular/core");
const faSpinner_1 = require("@fortawesome/free-solid-svg-icons/faSpinner");
let PageActionsComponent = class PageActionsComponent {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.icons = { faSpinner: faSpinner_1.faSpinner };
    }
    ngAfterViewInit() {
        const container = document.querySelector('#page-actions-container');
        if (!!container) {
            // create a portalHost from a DOM element
            this.portalHost = new portal_1.DomPortalHost(container, this.componentFactoryResolver, this.appRef, this.injector);
            if (!!this.portalHost) {
                // attach portal to host
                this.portalHost.attach(this.portal);
            }
        }
    }
    ngOnDestroy() {
        if (!!this.portalHost) {
            this.portalHost.detach();
        }
    }
};
__decorate([
    core_1.ViewChild(portal_1.CdkPortal)
], PageActionsComponent.prototype, "portal", void 0);
__decorate([
    core_1.Input()
], PageActionsComponent.prototype, "isUpdating", void 0);
PageActionsComponent = __decorate([
    core_1.Component({
        selector: 'app-page-actions',
        // tslint:disable-next-line:max-inline-declarations
        template: `
  <ng-template cdk-portal>
    <ng-content></ng-content>
    <fa-icon *ngIf="isUpdating | async" [icon]="icons.faSpinner" [spin]="true"></fa-icon>
  </ng-template>
  `
    })
], PageActionsComponent);
exports.PageActionsComponent = PageActionsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1hY3Rpb25zLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9wYWdlLWFjdGlvbnMvcGFnZS1hY3Rpb25zLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLGdEQUk2QjtBQUM3Qix3Q0FTdUI7QUFDdkIsMkVBQXdFO0FBY3hFLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQW9CO0lBTS9CLFlBQ21CLHdCQUFrRCxFQUNsRCxRQUFrQixFQUNsQixNQUFzQjtRQUZ0Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFOaEMsVUFBSyxHQUFHLEVBQUUsU0FBUyxFQUFULHFCQUFTLEVBQUUsQ0FBQztJQU8zQixDQUFDO0lBRUwsZUFBZTtRQUNiLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUU7WUFDZix5Q0FBeUM7WUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLHNCQUFhLENBQ2pDLFNBQVMsRUFDVCxJQUFJLENBQUMsd0JBQXdCLEVBQzdCLElBQUksQ0FBQyxNQUFNLEVBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FDZCxDQUFDO1lBQ0YsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDckIsd0JBQXdCO2dCQUN4QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckM7U0FDRjtJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFqQ3VCO0lBQXJCLGdCQUFTLENBQUMsa0JBQVMsQ0FBQztvREFBUTtBQUNwQjtJQUFSLFlBQUssRUFBRTt3REFBaUM7QUFGOUIsb0JBQW9CO0lBVmhDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLG1EQUFtRDtRQUNuRCxRQUFRLEVBQUU7Ozs7O0dBS1Q7S0FDRixDQUFDO0dBQ1csb0JBQW9CLENBa0NoQztBQWxDWSxvREFBb0IifQ==