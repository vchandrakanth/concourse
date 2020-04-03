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
const operators_1 = require("rxjs/operators");
let ExternalNetworkWhitelistInStacksComponent = class ExternalNetworkWhitelistInStacksComponent {
    constructor(fb, institutionDataFacade, ptfComponent) {
        this.fb = fb;
        this.institutionDataFacade = institutionDataFacade;
        this.ptfComponent = ptfComponent;
        this.form = this.fb.group({
            30022: ['BIDIRECTIONAL', forms_1.Validators.required],
            30011: [undefined, forms_1.Validators.required] // cidrBlocks.
        });
        this.cidrBlocks$ = this.institutionDataFacade.cidrs$.pipe(operators_1.filter(selected => !!selected), operators_1.map(blocks => Object.entries(blocks.multiMapValues).map(([label, value]) => ({ label, value: value.join(',') }))));
    }
    ngOnInit() {
        this.institutionDataFacade.get({ dataDomain: 'INSTITUTION' }, 'network-whitelists');
        this.ptfComponent.addAndPopulateTemplate(this.policyTemplate.id, this.form);
    }
    ngAfterViewInit() {
        // to populate value on update
        if (this.form.get('30011').value instanceof Array) {
            const value = this.form.get('30011').value;
            this.form.controls['30011'].patchValue(value.join(','));
        }
    }
};
ExternalNetworkWhitelistInStacksComponent = __decorate([
    core_1.Component({
        selector: 'app-external-network-whitelist-in-stacks',
        templateUrl: './external-network-whitelist-in-stacks.component.html',
        styleUrls: ['./external-network-whitelist-in-stacks.component.scss']
    })
], ExternalNetworkWhitelistInStacksComponent);
exports.ExternalNetworkWhitelistInStacksComponent = ExternalNetworkWhitelistInStacksComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJuYWwtbmV0d29yay13aGl0ZWxpc3QtaW4tc3RhY2tzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvcG9saWN5LXRlbXBsYXRlLWZvcm0tdjIvdGVtcGxhdGVzL2V4dGVybmFsLW5ldHdvcmstd2hpdGVsaXN0LWluLXN0YWNrcy9leHRlcm5hbC1uZXR3b3JrLXdoaXRlbGlzdC1pbi1zdGFja3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQWlFO0FBQ2pFLDBDQUF5RDtBQUN6RCw4Q0FBa0Q7QUFXbEQsSUFBYSx5Q0FBeUMsR0FBdEQsTUFBYSx5Q0FBeUM7SUFZcEQsWUFDbUIsRUFBZSxFQUNmLHFCQUE0QyxFQUM1QyxZQUF5QztRQUZ6QyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUF1QjtRQUM1QyxpQkFBWSxHQUFaLFlBQVksQ0FBNkI7UUFiNUQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLEtBQUssRUFBRSxDQUFDLGVBQWUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQztZQUM3QyxLQUFLLEVBQUUsQ0FBQyxTQUFTLEVBQUUsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjO1NBQ3ZELENBQUMsQ0FBQztRQUVILGdCQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2xELGtCQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQzlCLGVBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQ2xILENBQUM7SUFNRSxDQUFDO0lBRUwsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUUsYUFBYSxFQUFFLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUNwRixJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQsZUFBZTtRQUNiLDhCQUE4QjtRQUM5QixJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssWUFBWSxLQUFLLEVBQUU7WUFDakQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFBO1lBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDeEQ7SUFDSCxDQUFDO0NBQ0YsQ0FBQTtBQTlCWSx5Q0FBeUM7SUFMckQsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSwwQ0FBMEM7UUFDcEQsV0FBVyxFQUFFLHVEQUF1RDtRQUNwRSxTQUFTLEVBQUUsQ0FBQyx1REFBdUQsQ0FBQztLQUNyRSxDQUFDO0dBQ1cseUNBQXlDLENBOEJyRDtBQTlCWSw4RkFBeUMifQ==