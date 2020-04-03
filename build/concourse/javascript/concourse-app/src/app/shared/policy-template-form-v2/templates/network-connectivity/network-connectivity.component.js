"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const faMinus_1 = require("@fortawesome/free-solid-svg-icons/faMinus");
const faPlus_1 = require("@fortawesome/free-solid-svg-icons/faPlus");
let NetworkConnectivityComponent = class NetworkConnectivityComponent {
    constructor(fb, ptfComponent, surfaceLayerFacade) {
        this.fb = fb;
        this.ptfComponent = ptfComponent;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.form = this.fb.array([
            this.createNewGroup()
        ]);
        this.icons = { faPlus: faPlus_1.faPlus, faMinus: faMinus_1.faMinus };
        this.surfaceLayers$ = this.surfaceLayerFacade.listWithChildrenBySurface$;
    }
    ngOnInit() {
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
    createNewGroup() {
        return this.fb.group({
            30009: [undefined, forms_1.Validators.required],
            30010: [undefined, forms_1.Validators.required] // Connection Specification
        });
    }
    addNewGroup() {
        this.form.push(this.createNewGroup());
    }
    removeGroup(index) {
        this.form.removeAt(index);
    }
};
NetworkConnectivityComponent = __decorate([
    core_1.Component({
        selector: 'app-network-connectivity',
        templateUrl: './network-connectivity.component.html',
        styleUrls: ['./network-connectivity.component.scss']
    })
], NetworkConnectivityComponent);
exports.NetworkConnectivityComponent = NetworkConnectivityComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay1jb25uZWN0aXZpdHkuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9wb2xpY3ktdGVtcGxhdGUtZm9ybS12Mi90ZW1wbGF0ZXMvbmV0d29yay1jb25uZWN0aXZpdHkvbmV0d29yay1jb25uZWN0aXZpdHkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWtEO0FBQ2xELDBDQUFvRTtBQUNwRSx1RUFBb0U7QUFDcEUscUVBQWtFO0FBV2xFLElBQWEsNEJBQTRCLEdBQXpDLE1BQWEsNEJBQTRCO0lBU3ZDLFlBQ21CLEVBQWUsRUFDZixZQUF5QyxFQUN6QyxrQkFBc0M7UUFGdEMsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNmLGlCQUFZLEdBQVosWUFBWSxDQUE2QjtRQUN6Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBVnpELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFO1NBQ3RCLENBQUMsQ0FBQztRQUNNLFVBQUssR0FBRyxFQUFFLE1BQU0sRUFBTixlQUFNLEVBQUUsT0FBTyxFQUFQLGlCQUFPLEVBQUUsQ0FBQztRQUVyQyxtQkFBYyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQywwQkFBMEIsQ0FBQztJQU1oRSxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxjQUFjO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUM7WUFDdkMsS0FBSyxFQUFFLENBQUMsU0FBUyxFQUFFLGtCQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsMkJBQTJCO1NBQ3BFLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFhO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7Q0FFRixDQUFBO0FBbENZLDRCQUE0QjtJQUx4QyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLDBCQUEwQjtRQUNwQyxXQUFXLEVBQUUsdUNBQXVDO1FBQ3BELFNBQVMsRUFBRSxDQUFDLHVDQUF1QyxDQUFDO0tBQ3JELENBQUM7R0FDVyw0QkFBNEIsQ0FrQ3hDO0FBbENZLG9FQUE0QiJ9