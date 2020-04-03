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
const basic_modal_1 = require("../basic-modal");
let AssociateSurfaceLayersComponent = class AssociateSurfaceLayersComponent extends basic_modal_1.BasicModal {
    constructor(awsAccountFacade, fb, surfaceLayerFacade, surfaceFacade) {
        super();
        this.awsAccountFacade = awsAccountFacade;
        this.fb = fb;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.surfaceFacade = surfaceFacade;
        this.form = this.fb.group({
            account: [undefined, [forms_1.Validators.required]]
        });
        this.selectedSurfaceLayer$ = this.surfaceLayerFacade.selectedWithRelated$;
        this.selectedSurface$ = this.surfaceFacade.selectedWithRelated$;
    }
    onSubmit(surfaceLayer) {
        const { account } = this.form.value;
        const { id, surfaceId } = surfaceLayer;
        this.awsAccountFacade.enableSurfaceLayer(surfaceId, id, account);
    }
};
AssociateSurfaceLayersComponent = __decorate([
    core_1.Component({
        selector: 'app-associate-surface-layers',
        templateUrl: './associate-surface-layers.component.html',
        styleUrls: ['./associate-surface-layers.component.scss']
    })
], AssociateSurfaceLayersComponent);
exports.AssociateSurfaceLayersComponent = AssociateSurfaceLayersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NpYXRlLXN1cmZhY2UtbGF5ZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGFsL2NvbXBvbmVudHMvYXNzb2NpYXRlLXN1cmZhY2UtbGF5ZXJzL2Fzc29jaWF0ZS1zdXJmYWNlLWxheWVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBMEM7QUFDMUMsMENBQXlEO0FBR3pELGdEQUE0QztBQU81QyxJQUFhLCtCQUErQixHQUE1QyxNQUFhLCtCQUFnQyxTQUFRLHdCQUFVO0lBTzdELFlBQ21CLGdCQUFrQyxFQUNsQyxFQUFlLEVBQ2Ysa0JBQXNDLEVBQ3RDLGFBQTRCO1FBRzdDLEtBQUssRUFBRSxDQUFDO1FBTlMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQVYvQyxTQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDbkIsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM1QyxDQUFDLENBQUM7UUFDSCwwQkFBcUIsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsb0JBQW9CLENBQUM7UUFDckUscUJBQWdCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztJQVczRCxDQUFDO0lBRUQsUUFBUSxDQUFDLFlBQTBCO1FBQ2pDLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQyxNQUFNLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxHQUFHLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0NBRUYsQ0FBQTtBQXhCWSwrQkFBK0I7SUFMM0MsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSw4QkFBOEI7UUFDeEMsV0FBVyxFQUFFLDJDQUEyQztRQUN4RCxTQUFTLEVBQUUsQ0FBQywyQ0FBMkMsQ0FBQztLQUN6RCxDQUFDO0dBQ1csK0JBQStCLENBd0IzQztBQXhCWSwwRUFBK0IifQ==