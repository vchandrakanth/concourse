"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faBalanceScale_1 = require("@fortawesome/free-solid-svg-icons/faBalanceScale");
const faBook_1 = require("@fortawesome/free-solid-svg-icons/faBook");
const faBookOpen_1 = require("@fortawesome/free-solid-svg-icons/faBookOpen");
const faBuilding_1 = require("@fortawesome/free-solid-svg-icons/faBuilding");
const faChartBar_1 = require("@fortawesome/free-solid-svg-icons/faChartBar");
const faChartLine_1 = require("@fortawesome/free-solid-svg-icons/faChartLine");
const faChartPie_1 = require("@fortawesome/free-solid-svg-icons/faChartPie");
const faCodeBranch_1 = require("@fortawesome/free-solid-svg-icons/faCodeBranch");
const faColumns_1 = require("@fortawesome/free-solid-svg-icons/faColumns");
const faCubes_1 = require("@fortawesome/free-solid-svg-icons/faCubes");
const faDatabase_1 = require("@fortawesome/free-solid-svg-icons/faDatabase");
const faExclamationTriangle_1 = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");
const faLink_1 = require("@fortawesome/free-solid-svg-icons/faLink");
const faSearch_1 = require("@fortawesome/free-solid-svg-icons/faSearch");
const faServer_1 = require("@fortawesome/free-solid-svg-icons/faServer");
const faSitemap_1 = require("@fortawesome/free-solid-svg-icons/faSitemap");
const faTags_1 = require("@fortawesome/free-solid-svg-icons/faTags");
const faThumbsUp_1 = require("@fortawesome/free-solid-svg-icons/faThumbsUp");
const faUniversity_1 = require("@fortawesome/free-solid-svg-icons/faUniversity");
const faUserAlt_1 = require("@fortawesome/free-solid-svg-icons/faUserAlt");
const faUserLock_1 = require("@fortawesome/free-solid-svg-icons/faUserLock");
const faUsers_1 = require("@fortawesome/free-solid-svg-icons/faUsers");
const faUsersCog_1 = require("@fortawesome/free-solid-svg-icons/faUsersCog");
let SidebarComponent = class SidebarComponent {
    constructor(authFacade) {
        this.authFacade = authFacade;
        this.isAuthenticated$ = this.authFacade.isAuthenticated$;
        this.icons = {
            faBalanceScale: faBalanceScale_1.faBalanceScale,
            faBook: faBook_1.faBook,
            faBookOpen: faBookOpen_1.faBookOpen,
            faBuilding: faBuilding_1.faBuilding,
            faChartLine: faChartLine_1.faChartLine,
            faCodeBranch: faCodeBranch_1.faCodeBranch,
            faColumns: faColumns_1.faColumns,
            faDatabase: faDatabase_1.faDatabase,
            faExclamationTriangle: faExclamationTriangle_1.faExclamationTriangle,
            faLink: faLink_1.faLink,
            faSearch: faSearch_1.faSearch,
            faServer: faServer_1.faServer,
            faSitemap: faSitemap_1.faSitemap,
            faTags: faTags_1.faTags,
            faThumbsUp: faThumbsUp_1.faThumbsUp,
            faUniversity: faUniversity_1.faUniversity,
            faUserAlt: faUserAlt_1.faUserAlt,
            faUserLock: faUserLock_1.faUserLock,
            faUsers: faUsers_1.faUsers,
            faUsersCog: faUsersCog_1.faUsersCog,
            faChartBar: faChartBar_1.faChartBar,
            faChartPie: faChartPie_1.faChartPie,
            faCubes: faCubes_1.faCubes
        };
    }
};
SidebarComponent = __decorate([
    core_1.Component({
        selector: 'app-sidebar',
        templateUrl: './sidebar.component.html',
        styleUrls: ['./sidebar.component.scss']
    })
], SidebarComponent);
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lkZWJhci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9jb21wb25lbnRzL3NpZGViYXIvc2lkZWJhci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMscUZBQWtGO0FBQ2xGLHFFQUFrRTtBQUNsRSw2RUFBMEU7QUFDMUUsNkVBQTBFO0FBQzFFLDZFQUEwRTtBQUMxRSwrRUFBNEU7QUFDNUUsNkVBQTBFO0FBQzFFLGlGQUE4RTtBQUM5RSwyRUFBd0U7QUFDeEUsdUVBQW9FO0FBQ3BFLDZFQUEwRTtBQUMxRSxtR0FBZ0c7QUFDaEcscUVBQWtFO0FBQ2xFLHlFQUFzRTtBQUN0RSx5RUFBc0U7QUFDdEUsMkVBQXdFO0FBQ3hFLHFFQUFrRTtBQUNsRSw2RUFBMEU7QUFDMUUsaUZBQThFO0FBQzlFLDJFQUF3RTtBQUN4RSw2RUFBMEU7QUFDMUUsdUVBQW9FO0FBQ3BFLDZFQUEwRTtBQVMxRSxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQTRCM0IsWUFDbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQTVCekMscUJBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxVQUFLLEdBQUc7WUFDZixjQUFjLEVBQWQsK0JBQWM7WUFDZCxNQUFNLEVBQU4sZUFBTTtZQUNOLFVBQVUsRUFBVix1QkFBVTtZQUNWLFVBQVUsRUFBVix1QkFBVTtZQUNWLFdBQVcsRUFBWCx5QkFBVztZQUNYLFlBQVksRUFBWiwyQkFBWTtZQUNaLFNBQVMsRUFBVCxxQkFBUztZQUNULFVBQVUsRUFBVix1QkFBVTtZQUNWLHFCQUFxQixFQUFyQiw2Q0FBcUI7WUFDckIsTUFBTSxFQUFOLGVBQU07WUFDTixRQUFRLEVBQVIsbUJBQVE7WUFDUixRQUFRLEVBQVIsbUJBQVE7WUFDUixTQUFTLEVBQVQscUJBQVM7WUFDVCxNQUFNLEVBQU4sZUFBTTtZQUNOLFVBQVUsRUFBVix1QkFBVTtZQUNWLFlBQVksRUFBWiwyQkFBWTtZQUNaLFNBQVMsRUFBVCxxQkFBUztZQUNULFVBQVUsRUFBVix1QkFBVTtZQUNWLE9BQU8sRUFBUCxpQkFBTztZQUNQLFVBQVUsRUFBVix1QkFBVTtZQUNWLFVBQVUsRUFBVix1QkFBVTtZQUNWLFVBQVUsRUFBVix1QkFBVTtZQUNWLE9BQU8sRUFBUCxpQkFBTztTQUNSLENBQUM7SUFJRSxDQUFDO0NBRU4sQ0FBQTtBQWhDWSxnQkFBZ0I7SUFMNUIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLFdBQVcsRUFBRSwwQkFBMEI7UUFDdkMsU0FBUyxFQUFFLENBQUMsMEJBQTBCLENBQUM7S0FDeEMsQ0FBQztHQUNXLGdCQUFnQixDQWdDNUI7QUFoQ1ksNENBQWdCIn0=