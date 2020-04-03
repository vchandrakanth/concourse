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
const common_1 = require("@angular/common");
let StatsComponent = class StatsComponent {
    constructor(datePipe, analyticsFacade) {
        this.datePipe = datePipe;
        this.analyticsFacade = analyticsFacade;
        this.approvalStats$ = this.analyticsFacade.approvalStats$;
        this.policyViolationStats$ = this.analyticsFacade.policyViolationStats$;
        this.breakdownStats$ = this.analyticsFacade.statsBreakdown$;
        this.viewFilters = false;
        this.types = [
            {
                name: 'CREATED',
                value: 'created'
            },
            {
                name: 'APPROVED',
                value: 'approved'
            },
            {
                name: 'CANCELLED',
                value: 'cancelled'
            }
        ];
        this.customColors = [
            { name: 'totals', value: '#5AA454' },
            { name: 'CREATE', value: '#C7B42C' },
            { name: 'UPDATE', value: '#5AA454' },
            { name: 'DELETE', value: '#A10A28' },
            { name: 'Created Approvals', value: '#C7B42C' },
            { name: 'Approved Approvals', value: '#5AA454' },
            { name: 'Cancelled Approvals', value: '#A10A28' },
            { name: 'Created Policy Violations', value: '#C7B42C' },
            { name: 'Cancelled Policy Violations', value: '#A10A28' },
            { name: 'PUBLISH', value: '#0000FF' },
            { name: 'MODEL', value: '#2EFEC8' },
            { name: 'DEPLOYMENT', value: '#B40431' },
            { name: 'CLOUD_ROLE', value: '#01DF01' },
            { name: 'POLICY_GROUP', value: '#0B3B39' },
            { name: 'AWS_ACCOUNT', value: '#D358F7' },
            { name: 'AZURE_SUBSCRIPTION', value: '#610B38' }
        ];
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C']
        };
        this.dateFormatter = (v) => this.datePipe.transform(v, 'mediumDate');
    }
    ngOnInit() {
        this.statsFilterForm = new forms_1.FormGroup({});
    }
    updateControls(form) {
        Object.values(form.controls).forEach(control => {
            if (control instanceof forms_1.FormGroup) {
                this.updateControls(control);
            }
            control.markAsDirty();
            control.updateValueAndValidity();
        });
    }
    submit() {
        this.updateControls(this.statsFilterForm);
        const { value: { statsFilterForm } } = this.statsFilterForm;
        this.analyticsFacade.loadStatsByType(statsFilterForm);
    }
};
StatsComponent = __decorate([
    core_1.Component({
        selector: 'app-stats',
        templateUrl: './stats.component.html',
        styleUrls: ['./stats.component.scss'],
        providers: [common_1.DatePipe]
    })
], StatsComponent);
exports.StatsComponent = StatsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9zdGF0cy9zdGF0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQTJDO0FBRTNDLDRDQUEyQztBQVMzQyxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO0lBOEN6QixZQUNtQixRQUFrQixFQUNsQixlQUFnQztRQURoQyxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTlDbkQsbUJBQWMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQztRQUNyRCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLHFCQUFxQixDQUFDO1FBQ25FLG9CQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLENBQUM7UUFFdkQsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFFcEIsVUFBSyxHQUFVO1lBQ2I7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7YUFDakI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLFVBQVU7YUFDbEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsV0FBVztnQkFDakIsS0FBSyxFQUFFLFdBQVc7YUFDbkI7U0FDRixDQUFDO1FBRUYsaUJBQVksR0FBRztZQUNiLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ3BDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ3BDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1lBQ3BDLEVBQUUsSUFB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