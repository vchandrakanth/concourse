"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let DiscoveredDeploymentDetailsComponent = class DiscoveredDeploymentDetailsComponent {
    constructor(discoveredDeploymentFacade, modalFacade) {
        this.discoveredDeploymentFacade = discoveredDeploymentFacade;
        this.modalFacade = modalFacade;
        this.isLoaded$ = this.discoveredDeploymentFacade.isLoaded$;
        this.discoveredDeployment$ = this.discoveredDeploymentFacade.discoveredDeployment$;
        this.discoveredDeploymentResources$ = this.discoveredDeploymentFacade.discoveredDeploymentResources$;
        this.selectedResource$ = this.discoveredDeploymentFacade.selectedResource$;
    }
    showTemplate(cloudFormationTemplate, fileName) {
        this.modalFacade.templatePreviewModal(cloudFormationTemplate, fileName);
    }
    onSelectAuditHistory(audit) {
        this.discoveredDeploymentFacade.selectResource(audit);
    }
};
DiscoveredDeploymentDetailsComponent = __decorate([
    core_1.Component({
        selector: 'app-details-view',
        templateUrl: './discovered-deployment-details.component.html',
        styleUrls: ['./discovered-deployment-details.component.scss']
    })
], DiscoveredDeploymentDetailsComponent);
exports.DiscoveredDeploymentDetailsComponent = DiscoveredDeploymentDetailsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY292ZXJlZC1kZXBsb3ltZW50LWRldGFpbHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3dvcmtmbG93cy9kaXNjb3ZlcmVkLWRlcGxveW1lbnQvZGlzY292ZXJlZC1kZXBsb3ltZW50LWRldGFpbHMvZGlzY292ZXJlZC1kZXBsb3ltZW50LWRldGFpbHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTBDO0FBUTFDLElBQWEsb0NBQW9DLEdBQWpELE1BQWEsb0NBQW9DO0lBTS9DLFlBQ21CLDBCQUFzRCxFQUN0RCxXQUE2QjtRQUQ3QiwrQkFBMEIsR0FBMUIsMEJBQTBCLENBQTRCO1FBQ3RELGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQVBoRCxjQUFTLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFNBQVMsQ0FBQztRQUN0RCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLENBQUMscUJBQXFCLENBQUM7UUFDOUUsbUNBQThCLEdBQUcsSUFBSSxDQUFDLDBCQUEwQixDQUFDLDhCQUE4QixDQUFDO1FBQ2hHLHNCQUFpQixHQUFHLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxpQkFBaUIsQ0FBQztJQUtsRSxDQUFDO0lBRUwsWUFBWSxDQUFDLHNCQUE4QixFQUFFLFFBQWlCO1FBQzVELElBQUksQ0FBQyxXQUFXLENBQUMsb0JBQW9CLENBQUMsc0JBQXNCLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQUs7UUFDeEIsSUFBSSxDQUFDLDBCQUEwQixDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0NBRUYsQ0FBQTtBQW5CWSxvQ0FBb0M7SUFMaEQsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsV0FBVyxFQUFFLGdEQUFnRDtRQUM3RCxTQUFTLEVBQUUsQ0FBQyxnREFBZ0QsQ0FBQztLQUM5RCxDQUFDO0dBQ1csb0NBQW9DLENBbUJoRDtBQW5CWSxvRkFBb0MifQ==