"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const enums_1 = require("@concourse/shared/enums");
const predicate_replacement_common_1 = require("./../predicate-replacement.common");
let PredicateReplacementDefaultComponent = class PredicateReplacementDefaultComponent {
    set policyTemplate(policyTemplate) {
        if (!!policyTemplate && !!policyTemplate.attributes && !!policyTemplate.predicate) {
            const attributeTypeMap = new Map([...policyTemplate.attributes.map(a => ([a.name, a.type]))]);
            this._predicate = predicate_replacement_common_1.PredicateReplacement.matchByRegex(policyTemplate.predicate).reduce((str, matchedString) => str.replace(`{${matchedString}}`, `<b>${enums_1.policyPredicateDefaults[attributeTypeMap.get(matchedString)]}</b>`), policyTemplate.predicate);
            if (policyTemplate.name === 'Invariant Definition Policy') {
                this._predicate = 'Only <b>All Of</b>, <b>None Of</b>, or <b>Some of</b> the values defined for the <b>Cloud Resource</b> are allowed in associated models';
            }
        }
        else {
            this._predicate = '';
        }
    }
    get predicate() {
        return this._predicate;
    }
};
__decorate([
    core_1.Input()
], PredicateReplacementDefaultComponent.prototype, "policyTemplate", null);
PredicateReplacementDefaultComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'predicate-replacement-default',
        template: '<div [innerHTML]="predicate"></div>',
        styles: [':host() { display: block; }']
    })
], PredicateReplacementDefaultComponent);
exports.PredicateReplacementDefaultComponent = PredicateReplacementDefaultComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLXJlcGxhY2VtZW50LWRlZmF1bHQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL3ByZWRpY2F0ZS1yZXBsYWNlbWVudC9wcmVkaWNhdGUtcmVwbGFjZW1lbnQtZGVmYXVsdC9wcmVkaWNhdGUtcmVwbGFjZW1lbnQtZGVmYXVsdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBaUQ7QUFHakQsbURBQWtFO0FBQ2xFLG9GQUF5RTtBQVF6RSxJQUFhLG9DQUFvQyxHQUFqRCxNQUFhLG9DQUFvQztJQUN0QyxJQUFJLGNBQWMsQ0FBQyxjQUE4QjtRQUN4RCxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUU7WUFDakYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLEdBQUcsQ0FBd0IsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVEsQ0FBQyxDQUFDLENBQUM7WUFDNUgsSUFBSSxDQUFDLFVBQVUsR0FBRyxtREFBb0IsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUMxRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksYUFBYSxHQUFHLEVBQUUsTUFBTSwrQkFBdUIsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQ3pHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU5QixJQUFJLGNBQWMsQ0FBQyxJQUFJLEtBQUssNkJBQTZCLEVBQUU7Z0JBQ3pELElBQUksQ0FBQyxVQUFVLEdBQUcseUlBQXlJLENBQUM7YUFDN0o7U0FFRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDO0lBRUQsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7Q0FHRixDQUFBO0FBckJVO0lBQVIsWUFBSyxFQUFFOzBFQWNQO0FBZlUsb0NBQW9DO0lBTmhELGdCQUFTLENBQUM7UUFDVCw4Q0FBOEM7UUFDOUMsUUFBUSxFQUFFLCtCQUErQjtRQUN6QyxRQUFRLEVBQUUscUNBQXFDO1FBQy9DLE1BQU0sRUFBRSxDQUFDLDZCQUE2QixDQUFDO0tBQ3hDLENBQUM7R0FDVyxvQ0FBb0MsQ0FzQmhEO0FBdEJZLG9GQUFvQyJ9