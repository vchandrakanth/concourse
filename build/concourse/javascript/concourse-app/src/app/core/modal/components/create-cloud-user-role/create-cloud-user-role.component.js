"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const models_1 = require("@concourse/core/models");
const helpers_1 = require("@concourse/shared/helpers");
let CreateCloudUserRoleComponent = class CreateCloudUserRoleComponent {
    constructor(fb, catalogFacade, cloudRoleFacade) {
        this.fb = fb;
        this.catalogFacade = catalogFacade;
        this.cloudRoleFacade = cloudRoleFacade;
        this.awsActions$ = this.catalogFacade.awsActions$;
        this.azureActions$ = this.catalogFacade.azureActions$;
        this.form = this.fb.group({
            generalInfo: this.fb.group({
                aws: [undefined, [helpers_1.cloudProviderValidator]],
                azure: [undefined, [helpers_1.cloudProviderValidator]]
            }),
            awsCloudActions: this.fb.group({
                value: [undefined]
            }),
            awsCloudNonActions: this.fb.group({
                value: [undefined]
            }),
            azureCloudActions: this.fb.group({
                value: [undefined]
            }),
            azureCloudNonActions: this.fb.group({
                value: [undefined]
            }),
            review: this.fb.group({})
        });
        this.activatedProviders = new Set();
        this.icons = { faTimes: free_solid_svg_icons_1.faTimes, faEdit: free_solid_svg_icons_1.faEdit };
    }
    ngOnInit() {
        this.activatedProviders.clear();
    }
    selectCloudProvider(event) {
        const cloudProvider = event.target.value;
        const checked = event.target.checked;
        if (checked) {
            this.activatedProviders.add(cloudProvider);
        }
        else {
            this.activatedProviders.delete(cloudProvider);
        }
    }
    save() {
        if (this.form.valid) {
            const { generalInfo: { name, description, status, versionBump }, awsCloudActions, awsCloudNonActions, azureCloudActions, azureCloudNonActions } = this.form.value;
            const cloudRole = {
                name,
                description,
                status,
                awsActions: helpers_1.Util.isArray(awsCloudActions.value) ?
                    awsCloudActions.value.map(o => new models_1.AwsOperation().deserialize(o)) : [],
                awsNonActions: helpers_1.Util.isArray(awsCloudNonActions.value) ?
                    awsCloudNonActions.value.map(o => new models_1.AwsOperation().deserialize(o)) : [],
                azureActions: helpers_1.Util.isArray(azureCloudActions.value) ?
                    azureCloudActions.value.map(o => new models_1.AzureOperation().deserialize(o)) : [],
                azureNonActions: helpers_1.Util.isArray(azureCloudNonActions.value) ?
                    azureCloudNonActions.value.map(o => new models_1.AzureOperation().deserialize(o)) : []
            };
            this.cloudRoleFacade.create(cloudRole, status === 'PUBLISHED' ? versionBump : '');
        }
    }
};
CreateCloudUserRoleComponent = __decorate([
    core_1.Component({
        selector: 'app-create-cloud-user-role',
        templateUrl: './create-cloud-user-role.component.html',
        styleUrls: ['./create-cloud-user-role.component.scss']
    })
], CreateCloudUserRoleComponent);
exports.CreateCloudUserRoleComponent = CreateCloudUserRoleComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNsb3VkLXVzZXItcm9sZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9tb2RhbC9jb21wb25lbnRzL2NyZWF0ZS1jbG91ZC11c2VyLXJvbGUvY3JlYXRlLWNsb3VkLXVzZXItcm9sZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFFbEQsNEVBQW9FO0FBRXBFLG1EQUFpRjtBQUNqRix1REFBeUU7QUFRekUsSUFBYSw0QkFBNEIsR0FBekMsTUFBYSw0QkFBNEI7SUEwQnZDLFlBQ21CLEVBQWUsRUFDZixhQUFtQyxFQUNuQyxlQUFnQztRQUZoQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2Ysa0JBQWEsR0FBYixhQUFhLENBQXNCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTVCbkQsZ0JBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1FBRWpELFNBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNuQixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pCLEdBQUcsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdDQUFzQixDQUFDLENBQUM7Z0JBQzFDLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLGdDQUFzQixDQUFDLENBQUM7YUFDN0MsQ0FBQztZQUNGLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQztnQkFDN0IsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDO2FBQ25CLENBQUM7WUFDRixrQkFBa0IsRUFBRSxJQUFJLENB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