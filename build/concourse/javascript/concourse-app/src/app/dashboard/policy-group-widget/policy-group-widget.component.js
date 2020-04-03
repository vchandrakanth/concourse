"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCog_1 = require("@fortawesome/free-solid-svg-icons/faCog");
let PolicyGroupWidgetComponent = class PolicyGroupWidgetComponent {
    constructor(policyGroupFacade) {
        this.policyGroupFacade = policyGroupFacade;
        this.icons = { faCog: faCog_1.faCog };
        this.policyGroupsList$ = this.policyGroupFacade.list$;
        this.myScopePoliciesByStatus$ = this.policyGroupFacade.myScopePoliciesByStatus$;
        this.allSurfaceLayerPoliciesByStatus$ = this.policyGroupFacade.allSurfaceLayerPoliciesByStatus$;
    }
};
PolicyGroupWidgetComponent = __decorate([
    core_1.Component({
        selector: 'app-policy-group-widget',
        templateUrl: './policy-group-widget.component.html',
        styleUrls: ['./policy-group-widget.component.scss']
    })
], PolicyGroupWidgetComponent);
exports.PolicyGroupWidgetComponent = PolicyGroupWidgetComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9saWN5LWdyb3VwLXdpZGdldC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvZGFzaGJvYXJkL3BvbGljeS1ncm91cC13aWRnZXQvcG9saWN5LWdyb3VwLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsbUVBQWdFO0FBU2hFLElBQWEsMEJBQTBCLEdBQXZDLE1BQWEsMEJBQTBCO0lBT3JDLFlBQTZCLGlCQUFvQztRQUFwQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBTmpFLFVBQUssR0FBRyxFQUFFLEtBQUssRUFBTCxhQUFLLEVBQUUsQ0FBQztRQUVsQixzQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQ2pELDZCQUF3QixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyx3QkFBd0IsQ0FBQztRQUMzRSxxQ0FBZ0MsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0NBQWdDLENBQUM7SUFFdEIsQ0FBQztDQUN2RSxDQUFBO0FBUlksMEJBQTBCO0lBTHRDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUseUJBQXlCO1FBQ25DLFdBQVcsRUFBRSxzQ0FBc0M7UUFDbkQsU0FBUyxFQUFFLENBQUMsc0NBQXNDLENBQUM7S0FDcEQsQ0FBQztHQUNXLDBCQUEwQixDQVF0QztBQVJZLGdFQUEwQiJ9