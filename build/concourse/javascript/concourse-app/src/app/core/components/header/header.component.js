"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faCaretDown_1 = require("@fortawesome/free-solid-svg-icons/faCaretDown");
let HeaderComponent = class HeaderComponent {
    constructor(authFacade) {
        this.authFacade = authFacade;
        this.user$ = this.authFacade.user$;
        this.isAuthenticated$ = this.authFacade.isAuthenticated$;
        this.icons = { faCaretDown: faCaretDown_1.faCaretDown };
    }
    logout(user) {
        if (user.isSAML) {
            this.authFacade.samlLogout();
        }
        else {
            this.authFacade.logout();
        }
    }
};
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.scss']
    })
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsK0VBQTRFO0FBVTVFLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFLMUIsWUFDbUIsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUx6QyxVQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDOUIscUJBQWdCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUMzQyxVQUFLLEdBQUcsRUFBRSxXQUFXLEVBQVgseUJBQVcsRUFBRSxDQUFDO0lBSTdCLENBQUM7SUFFTCxNQUFNLENBQUMsSUFBVTtRQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7U0FDOUI7YUFBTTtZQUNMLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDMUI7SUFDSCxDQUFDO0NBRUYsQ0FBQTtBQWpCWSxlQUFlO0lBTDNCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsWUFBWTtRQUN0QixXQUFXLEVBQUUseUJBQXlCO1FBQ3RDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO0tBQ3ZDLENBQUM7R0FDVyxlQUFlLENBaUIzQjtBQWpCWSwwQ0FBZSJ9