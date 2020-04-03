"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
const faTrashAlt_1 = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
let CreateInstitutionDataComponent = class CreateInstitutionDataComponent {
    constructor(catalogFacade, instDataFacade) {
        this.catalogFacade = catalogFacade;
        this.instDataFacade = instDataFacade;
        this.institutionDatas$ = this.catalogFacade.institutionDatasList$;
        this.isLoaded$ = this.catalogFacade.isLoaded$;
        this.options$ = this.catalogFacade.institutionDatasList$.pipe(operators_1.filter(data => helpers_1.Util.isArray(data)), operators_1.map(list => list.filter(item => item.institutionDataDomains.includes(this.dataDomain))), operators_1.withLatestFrom(this.instDataFacade.list$), operators_1.map(([allList, createdList]) => helpers_1.difference(allList, createdList, (a, b) => a.name === b.name)));
        this.icons = { faTimes: faTimes_1.faTimes, faTrashAlt: faTrashAlt_1.faTrashAlt };
    }
    get dataDomainText() {
        if (!helpers_1.Util.isUndefined(this.dataDomain)) {
            return this.dataDomain.replace(/_/g, ' ');
        }
    }
};
CreateInstitutionDataComponent = __decorate([
    core_1.Component({
        selector: 'app-create-institution-data',
        templateUrl: './create-institution-data.component.html',
        styleUrls: ['./create-institution-data.component.scss']
    })
], CreateInstitutionDataComponent);
exports.CreateInstitutionDataComponent = CreateInstitutionDataComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWluc3RpdHV0aW9uLWRhdGEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtaW5zdGl0dXRpb24tZGF0YS9jcmVhdGUtaW5zdGl0dXRpb24tZGF0YS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsdUVBQW9FO0FBQ3BFLDZFQUEwRTtBQUUxRSw4Q0FBNkQ7QUFHN0QsdURBQTZEO0FBUTdELElBQWEsOEJBQThCLEdBQTNDLE1BQWEsOEJBQThCO0lBb0J6QyxZQUNtQixhQUFtQyxFQUNuQyxjQUFxQztRQURyQyxrQkFBYSxHQUFiLGFBQWEsQ0FBc0I7UUFDbkMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBckJ4RCxzQkFBaUIsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDO1FBQzdELGNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztRQUN6QyxhQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQ3RELGtCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2xDLGVBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQ3ZGLDBCQUFjLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsRUFDekMsZUFBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLG9CQUFVLENBQUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQy9GLENBQUM7UUFVTyxVQUFLLEdBQUcsRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxVQUFVLEVBQVYsdUJBQVUsRUFBRSxDQUFDO0lBS3JDLENBQUM7SUFWTCxJQUFJLGNBQWM7UUFDaEIsSUFBSSxDQUFDLGNBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RDLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzNDO0lBQ0gsQ0FBQztDQVFGLENBQUE7QUF6QlksOEJBQThCO0lBTDFDLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsNkJBQTZCO1FBQ3ZDLFdBQVcsRUFBRSwwQ0FBMEM7UUFDdkQsU0FBUyxFQUFFLENBQUMsMENBQTBDLENBQUM7S0FDeEQsQ0FBQztHQUNXLDhCQUE4QixDQXlCMUM7QUF6Qlksd0VBQThCIn0=