"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const operators_1 = require("rxjs/operators");
let InsightsComponent = class InsightsComponent {
    constructor(sanitizer, instDataFacade) {
        this.sanitizer = sanitizer;
        this.instDataFacade = instDataFacade;
        this.insights$ = this.instDataFacade.selected$.pipe(operators_1.filter(selected => !!selected), operators_1.map(selected => (Object.assign(Object.assign({}, selected), { listValues: selected.listValues.map(lv => this.sanitizer.bypassSecurityTrustResourceUrl(lv)) }))));
    }
};
InsightsComponent = __decorate([
    core_1.Component({
        selector: 'app-insights',
        templateUrl: './insights.component.html',
        styleUrls: ['./insights.component.scss']
    })
], InsightsComponent);
exports.InsightsComponent = InsightsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2luc2lnaHRzL2luc2lnaHRzL2luc2lnaHRzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHdDQUEwQztBQUUxQyw4Q0FBNkM7QUFTN0MsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFTNUIsWUFDbUIsU0FBdUIsRUFDdkIsY0FBcUM7UUFEckMsY0FBUyxHQUFULFNBQVMsQ0FBYztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFWeEQsY0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDNUMsa0JBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFDOUIsZUFBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsaUNBQ1gsUUFBUSxLQUNYLFVBQVUsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsRUFBRSxDQUFDLENBQUMsSUFDNUYsQ0FBQyxDQUNKLENBQUM7SUFLRSxDQUFDO0NBRU4sQ0FBQTtBQWRZLGlCQUFpQjtJQUw3QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtRQUN4QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztLQUN6QyxDQUFDO0dBQ1csaUJBQWlCLENBYzdCO0FBZFksOENBQWlCIn0=