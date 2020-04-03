"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const modal_1 = require("@concourse/core/modal");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const faBalanceScale_1 = require("@fortawesome/free-solid-svg-icons/faBalanceScale");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
let DashboardMetricsComponent = class DashboardMetricsComponent {
    constructor(dashboardService, modalFacade) {
        this.dashboardService = dashboardService;
        this.modalFacade = modalFacade;
        this.icons = {
            faExclamationTriangle: free_solid_svg_icons_1.faExclamationTriangle,
            faThumbsUp: free_solid_svg_icons_1.faThumbsUp,
            faCloud: free_solid_svg_icons_1.faCloud,
            faUser: free_solid_svg_icons_1.faUser,
            faBalanceScale: faBalanceScale_1.faBalanceScale,
            faDatabase: faDatabase_1.faDatabase,
            faBook: free_solid_svg_icons_1.faBook,
            faBookOpen: free_solid_svg_icons_1.faBookOpen,
            faBuilding: free_solid_svg_icons_1.faBuilding,
            faChartLine: free_solid_svg_icons_1.faChartLine,
            faCodeBranch: free_solid_svg_icons_1.faCodeBranch,
            faColumns: free_solid_svg_icons_1.faColumns,
            faLink: free_solid_svg_icons_1.faLink,
            faSearch: free_solid_svg_icons_1.faSearch,
            faServer: free_solid_svg_icons_1.faServer,
            faSitemap: free_solid_svg_icons_1.faSitemap,
            faTags: free_solid_svg_icons_1.faTags,
            faUniversity: free_solid_svg_icons_1.faUniversity,
            faUserAlt: free_solid_svg_icons_1.faUserAlt,
            faUserLock: free_solid_svg_icons_1.faUserLock,
            faUsers: free_solid_svg_icons_1.faUsers,
            faUsersCog: free_solid_svg_icons_1.faUsersCog,
            faChartBar: free_solid_svg_icons_1.faChartBar,
            faChartPie: free_solid_svg_icons_1.faChartPie,
            faCubes: free_solid_svg_icons_1.faCubes
        };
    }
    ngOnInit() {
        this.onLoadInventory();
    }
    onViewData(d, routingString) {
        if (!d || d.length === 0) {
            return;
        }
        this.modalFacade.openModal({
            component: modal_1.ViewDataComponent,
            id: 'enclave-form',
            options: {
                initialState: {
                    data: d,
                    routingString
                }
            }
        });
    }
    onLoadInventory(e) {
        let t = '';
        if (e) {
            t = e.lookBackDate;
        }
        this.azureDataBases$ = this.dashboardService.getAzureDatabases(t);
        this.updatedPolicyGroups$ = this.dashboardService.getUpdatedPolicyGroups(t);
        this.updatedRoleAssignments$ = this.dashboardService.getUpdatedRoleAssignments(t);
        this.updatedCloudRoleAssignments$ = this.dashboardService.getUpdatedCloudRoleAssignments(t);
        this.updatedUserGroups$ = this.dashboardService.getUpdatedUserGroupsIds(t);
        this.openViolationsOnStacks$ = this.dashboardService.getOpenViolationsOnDeployedStacks(t);
        this.accountViolations$ = this.dashboardService.getOpenViolations(t);
        this.azureNetworkWatchers$ = this.dashboardService.getAzureNetworkWatchers();
        this.azureNetworkDiscoveryGroups$ = this.dashboardService.getAzurePublicIPs();
        this.azureNetworkSecurityGroups$ = this.dashboardService.getAzureNetworkSecurityGroups();
        this.azureNetworkInterfaces$ = this.dashboardService.getAzureNetworkInterfaces();
        this.azureDeploymentStatus$ = this.dashboardService.getAzureDeploymentStatus();
    }
};
DashboardMetricsComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard-metrics',
        templateUrl: './dashboard-metrics.component.html',
        styleUrls: ['./dashboard-metrics.component.scss']
    })
], DashboardMetricsComponent);
exports.DashboardMetricsComponent = DashboardMetricsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLW1ldHJpY3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQtbWV0cmljcy9kYXNoYm9hcmQtbWV0cmljcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsaURBQTRFO0FBRTVFLDRFQUF1VDtBQUN2VCxxRkFBa0Y7QUFDbEYsNkVBQTBFO0FBTzFFLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQXlCO0lBNENwQyxZQUNVLGdCQUFrQyxFQUNsQyxXQUE2QjtRQUQ3QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGdCQUFXLEdBQVgsV0FBVyxDQUFrQjtRQTVDOUIsVUFBSyxHQUFHO1lBQ2YscUJBQXFCLEVBQXJCLDRDQUFxQjtZQUNyQixVQUFVLEVBQVYsaUNBQVU7WUFDVixPQUFPLEVBQVAsOEJBQU87WUFDUCxNQUFNLEVBQU4sNkJBQU07WUFDTixjQUFjLEVBQWQsK0JBQWM7WUFDZCxVQUFVLEVBQVYsdUJBQVU7WUFDVixNQUFNLEVBQU4sNkJBQU07WUFDTixVQUFVLEVBQVYsaUNBQVU7WUFDVixVQUFVLEVBQVYsaUNBQVU7WUFDVixXQUFXLEVBQVgsa0NBQVc7WUFDWCxZQUFZLEVBQVosbUNBQVk7WUFDWixTQUFTLEVBQVQsZ0NBQVM7WUFDVCxNQUFNLEVBQU4sNkJBQU07WUFDTixRQUFRLEVBQVIsK0JBQVE7WUFDUixRQUFRLEVBQVIsK0JBQVE7WUFDUixTQUFTLEVBQVQsZ0NBQVM7WUFDVCxNQUFNLEVBQU4sNkJBQU07WUFDTixZQUFZLEVBQVosbUNBQVk7WUFDWixTQUFTLEVBQVQsZ0NBQVM7WUFDVCxVQUFVLEVBQVYsaUNBQVU7WUFDVixPQUFPLEVBQVAsOEJBQU87WUFDUCxV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