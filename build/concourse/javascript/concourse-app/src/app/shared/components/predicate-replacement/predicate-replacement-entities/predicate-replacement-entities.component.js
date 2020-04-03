"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const predicate_replacement_common_1 = require("./../predicate-replacement.common");
let PredicateReplacementEntitiesComponent = class PredicateReplacementEntitiesComponent {
    set policy(policy) {
        this._policy = policy;
        this.attributeMap = new Map(!!policy ?
            !!policy.policyTemplate ?
                !!policy.policyTemplate.attributes ?
                    policy.policyTemplate.attributes.map(attr => ([attr.name, attr.id]))
                    : []
                : {}
            : {});
        this.attributeValueMap = new Map(!!policy ?
            !!policy.attributeValues ?
                policy.attributeValues.map(av => [av.attribute.id, av])
                : []
            : {});
        this.formPredicate();
    }
    get policy() {
        return this._policy;
    }
    formPredicate() {
        let replacementPredicate = !!this.policy ? this.policy.policyTemplate.predicate : undefined;
        if (replacementPredicate === undefined) {
            return;
        }
        predicate_replacement_common_1.PredicateReplacement.matchByRegex(this.policy.policyTemplate.predicate).forEach(attributeName => {
            const attributeValue = this.attributeValueMap.get(this.attributeMap.get(attributeName));
            if (attributeValue === undefined) {
                return;
            }
            let attributeReplacement;
            switch (attributeValue.attribute.id) {
                case 30008:
                    attributeReplacement = (attributeValue.entityValues || []).map(ev => !!ev ? ev : '');
                    break;
                case 30010:
                    const { allowed, direction, ipProtocol, portRange } = JSON.parse(attributeValue.value)[0];
                    attributeReplacement = !!portRange ?
                        `${allowed} ${direction} ${ipProtocol} connections on ${portRange.split(':').length > 1 ? `ports ${portRange.replace(':', ' : ')}` : `port ${portRange}`}` :
                        attributeReplacement = `${allowed} ${direction} ${ipProtocol} connections`;
                    break;
                case 30009:
                    attributeReplacement = attributeValue.entityValues.length !== 0 ?
                        attributeValue.entityValues.map(ev => !!ev.id ? ev.id : ev).join(',') :
                        JSON.parse(attributeValue.value).join(',');
                    break;
                // case 30012:
                //   attributeReplacement = attributeValue.entityValues.length !== 0 ?
                //     attributeValue.entityValues.map(ev => !!ev ? ev.customResource : ev) :
                //     JSON.parse(attributeValue.value);
                //   break;
                default:
                    attributeReplacement = JSON.parse(attributeValue.value);
            }
            replacementPredicate = replacementPredicate.replace(`{${attributeName}}`, `<b>${attributeReplacement}</b>`);
        });
        this.predicate = replacementPredicate.replace(/[,]/g, ', ').replace(/[_]/g, ' ');
    }
};
__decorate([
    core_1.Input()
], PredicateReplacementEntitiesComponent.prototype, "policy", null);
PredicateReplacementEntitiesComponent = __decorate([
    core_1.Component({
        // tslint:disable-next-line:component-selector
        selector: 'predicate-replacement-entities',
        template: '<div [innerHTML]="predicate"></div>',
        styles: [':host() { display: block; }']
    })
], PredicateReplacementEntitiesComponent);
exports.PredicateReplacementEntitiesComponent = PredicateReplacementEntitiesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlZGljYXRlLXJlcGxhY2VtZW50LWVudGl0aWVzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9wcmVkaWNhdGUtcmVwbGFjZW1lbnQvcHJlZGljYXRlLXJlcGxhY2VtZW50LWVudGl0aWVzL3ByZWRpY2F0ZS1yZXBsYWNlbWVudC1lbnRpdGllcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBeUQ7QUFJekQsb0ZBQXlFO0FBUXpFLElBQWEscUNBQXFDLEdBQWxELE1BQWEscUNBQXFDO0lBQ3ZDLElBQUksTUFBTSxDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFFdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FDekIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDdkIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ2xDLE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFRO29CQUMzRSxDQUFDLENBQUMsRUFBRTtnQkFDTixDQUFDLENBQUMsRUFBRTtZQUNOLENBQUMsQ0FBQyxFQUFFLENBQ1AsQ0FBQztRQUNGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FDOUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMs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