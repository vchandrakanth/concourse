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
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
// tslint:disable-next-line:no-forward-ref
exports._componentFactory = core_1.forwardRef(() => CloudRoleOperationSelectorComponent);
let CloudRoleOperationSelectorComponent = class CloudRoleOperationSelectorComponent {
    constructor(fb) {
        this.fb = fb;
        this.inputParams = this.prepareDataByProviderType();
        this.viewWildCardActions = true;
        this.icons = { faPlus: faPlus_1.faPlus, faMinus: faMinus_1.faMinus };
        this.isDisabled = false;
        this.selectedOperations = new Map();
        this.selectedWithWildcard = new Set();
        this.propagateChange = (_) => { };
    }
    get selectedOperationsList() {
        return Array.from(this.selectedOperations.values());
    }
    get value() {
        return this.selectedOperationsList.map(o => (Object.assign({}, o)));
    }
    ngOnInit() {
        this.selectedOperations.clear();
        this.selectedWithWildcard.clear();
        this.inputParams = this.prepareDataByProviderType();
        this.actionSearchForm = this.fb.group({
            search: ['', this.inputParams.validator || []]
        });
        this.matchedWildcardActions$ = this.actionSearchForm.get('search').valueChanges.pipe(operators_1.filter(_ => this.actionSearchForm.get('search').valid), operators_1.debounceTime(300), operators_1.map((term) => term.toLowerCase()), operators_1.map(searchTerm => this.options.filter(a => a.hasWildcard(searchTerm))), operators_1.startWith([]));
    }
    writeValue(cro) {
        if (!helpers_1.Util.isNullOrUndefined(cro) && helpers_1.Util.isArray(cro)) {
            cro.forEach(o => {
                this.selectedOperations.set(o.operation, o);
                // this.updateSelectedWithWildcardCache(o);
            });
        }
    }
    setDisabledState(isDisabled) {
        this.isDisabled = isDisabled;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    updateSelectedWithWildcardCache(cro) {
        // TODO(Andrew): Find a better way to do this, not used for now.
        if (cro.wildcarded) {
            this.options.filter(o => o.hasWildcard(cro.operation)).forEach(cr => {
                this.selectedWithWildcard.add(cr.action);
            });
        }
        else {
            if (this.selectedWithWildcard.has(cro.operation)) {
                this.selectedWithWildcard.delete(cro.operation);
            }
            else {
                this.selectedWithWildcard.add(cro.operation);
            }
        }
    }
    getWildcardMatches(wildCard) {
        return this.options.filter(a => a.hasWildcard(wildCard));
    }
    prepareDataByProviderType() {
        if (this.type === 'AZ') {
            return {
                validator: [forms_1.Validators.pattern('^[a-zA-Z0-9/*\.]*$'), helpers_1.WildcardValidators.azureOperationValidator()],
                validatorText: 'Wildcard name can contain only one "*"',
                placeholder: '<provider>/<resource_type>/<access_level>'
            };
        }
        if (this.type === 'AWS') {
            return {
                validator: [forms_1.Validators.pattern(/^[a-zA-Z0-9]+:[a-zA-Z0-9]+[*]{0,1}$/)],
                validatorText: 'Wildcard name must be <alphanumeric>:<alphanumeric> and "*" (optional)',
                placeholder: '<product_code>:<action>'
            };
        }
    }
    addWildcard() {
        const wildcard = this.actionSearchForm.value.search;
        this.addOperation(wildcard);
        this.actionSearchForm.reset();
    }
    addOperation(operation) {
        if (!this.isDisabled) {
            const data = {
                operation,
                wildcarded: operation.includes('*')
            };
            if (!this.selectedOperations.has(operation)) {
                this.selectedOperations.set(operation, data);
                // this.updateSelectedWithWildcardCache(this.selectedOperations.get(operation));
                this.propagateChange(this.value);
            }
        }
    }
    removeOperation(operation) {
        if (!this.isDisabled) {
            if (this.selectedOperations.has(operation)) {
                // this.updateSelectedWithWildcardCache(this.selectedOperations.get(operation));
                this.selectedOperations.delete(operation);
                this.propagateChange(this.value);
            }
        }
    }
};
__decorate([
    core_1.Input()
], CloudRoleOperationSelectorComponent.prototype, "options", void 0);
__decorate([
    core_1.Input()
], CloudRoleOperationSelectorComponent.prototype, "type", void 0);
CloudRoleOperationSelectorComponent = __decorate([
    core_1.Component({
        selector: 'app-cloud-role-operation-selector',
        templateUrl: './cloud-role-operation-selector.component.html',
        styleUrls: ['./cloud-role-operation-selector.component.scss'],
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: exports._componentFactory,
                multi: true
            }
        ]
    })
], CloudRoleOperationSelectorComponent);
exports.CloudRoleOperationSelectorComponent = CloudRoleOperationSelectorComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvdWQtcm9sZS1vcGVyYXRpb24tc2VsZWN0b3IuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9mb3JtLWNvbXBvbmVudHMvY2xvdWQtcm9sZS1vcGVyYXRpb24tc2VsZWN0b3IvY2xvdWQtcm9sZS1vcGVyYXRpb24tc2VsZWN0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQXFFO0FBQ3JFLDBDQUE2RztBQUM3Ryx1RUFBb0U7QUFDcEUscUVBQWtFO0FBR2xFLDhDQUFzRTtBQUd0RSx1REFBcUU7QUFFckUsMENBQTBDO0FBQzdCLFFBQUEsaUJBQWlCLEdBQUcsaUJBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBY3ZGLElBQWEsbUNBQW1DLEdBQWhELE1BQWEsbUNBQW1DO0lBd0I5QyxZQUNtQixFQUFlO1FBQWYsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQXJCbEMsZ0JBQVcsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUUvQyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFZbEIsVUFBSyxHQUFHLEVBQUUsTUFBTSxFQUFOLGVBQU0sRUFBRSxPQUFPLEVBQVAsaUJBQU8sRUFBRSxDQUFDO1FBQ3JDLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDWCx1QkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBdUMsQ0FBQztRQUNwRSx5QkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ2pELG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUk5QixDQUFDO0lBaEJMLElBQUksc0JBQXNCO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsbUJBQU0sQ0FBQyxFQUFHLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBWUQsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztRQUNwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDcEMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQztTQUMvQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUNsRixrQkFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFDdEQsd0JBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsZUFBRyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsRUFDekMsZUFBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFDdEUscUJBQVMsQ0FBQyxFQUFFLENBQUMsQ0FDZCxDQUFDO0lBQ0osQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUF5QjtRQUNsQyxJQUFJLENBQUMsY0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLGNBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDckQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDZCxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLDJDQUEyQztZQUM3QyxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQW1CO1FBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2pCLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxpQkFBaUIsS0FBVyxDQUFDO0lBRTdCLCtCQUErQixDQUFDLEdBQWdDO1FBQzlELGdFQUFnRTtRQUNoRSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDbEUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0MsQ0FBQyxDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDakQ7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUM7U0FDRjtJQUNILENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxRQUFnQjtRQUNqQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCx5QkFBeUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLElBQUksRUFBRTtZQUN0QixPQUFPO2dCQUNMLFNBQVMsRUFBRSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsNEJBQWtCLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztnQkFDbkcsYUFBYSxFQUFFLHdDQUF3QztnQkFDdkQsV0FBVyxFQUFFLDJDQUEyQzthQUN6RCxDQUFDO1NBQ0g7UUFDRCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1lBQ3ZCLE9BQU87Z0JBQ0wsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxPQUFPLENBQUMscUNBQXFDLENBQUMsQ0FBQztnQkFDdEUsYUFBYSxFQUFFLHdFQUF3RTtnQkFDdkYsV0FBVyxFQUFFLHlCQUF5QjthQUN2QyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3BELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUI7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDcEIsTUFBTSxJQUFJLEdBQWdDO2dCQUN4QyxTQUFTO2dCQUNULFVBQVUsRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzthQUNwQyxDQUFDO1lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxnRkFBZ0Y7Z0JBQ2hGLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2xDO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZUFBZSxDQUFDLFNBQWlCO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDMUMsZ0ZBQWdGO2dCQUNoRixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztTQUNGO0lBQ0gsQ0FBQztDQUVGLENBQUE7QUFoSVU7SUFBUixZQUFLLEVBQUU7b0VBQWdCO0FBQ2Y7SUFBUixZQUFLLEVBQUU7aUVBQXlCO0FBRnRCLG1DQUFtQztJQVovQyxnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1DQUFtQztRQUM3QyxXQUFXLEVBQUUsZ0RBQWdEO1FBQzdELFNBQVMsRUFBRSxDQUFDLGdEQUFnRCxDQUFDO1FBQzdELFNBQVMsRUFBRTtZQUNUO2dCQUNFLE9BQU8sRUFBRSx5QkFBaUI7Z0JBQzFCLFdBQVcsRUFBRSx5QkFBaUI7Z0JBQzlCLEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRjtLQUNGLENBQUM7R0FDVyxtQ0FBbUMsQ0FpSS9DO0FBaklZLGtGQUFtQyJ9