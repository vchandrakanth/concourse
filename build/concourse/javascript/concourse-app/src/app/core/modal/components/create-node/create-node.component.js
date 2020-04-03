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
const faTimes_1 = require("@fortawesome/free-solid-svg-icons/faTimes");
let CreateNodeComponent = class CreateNodeComponent {
    constructor(fb, surfaceLayerFacade) {
        this.fb = fb;
        this.surfaceLayerFacade = surfaceLayerFacade;
        this.form = this.fb.group({
            name: this.fb.control('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            description: this.fb.control('', [forms_1.Validators.required, forms_1.Validators.minLength(3)]),
            parent: this.fb.control('', [forms_1.Validators.required])
        });
        this.icons = { faTimes: faTimes_1.faTimes };
    }
    get formData() {
        return this.form.value;
    }
    ngOnInit() {
        if (!!this.surfaceLayer) {
            this.form.patchValue({ parent: this.surfaceLayer.id });
        }
    }
    submit() {
        this.surfaceLayerFacade.create(this.formData);
    }
};
CreateNodeComponent = __decorate([
    core_1.Component({
        selector: 'app-create-node',
        templateUrl: './create-node.component.html',
        styleUrls: ['./create-node.component.scss']
    })
], CreateNodeComponent);
exports.CreateNodeComponent = CreateNodeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvY29tcG9uZW50cy9jcmVhdGUtbm9kZS9jcmVhdGUtbm9kZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx3Q0FBa0Q7QUFDbEQsMENBQXlEO0FBQ3pELHVFQUFvRTtBQVVwRSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQWE5QixZQUNVLEVBQWUsRUFDTixrQkFBc0M7UUFEL0MsT0FBRSxHQUFGLEVBQUUsQ0FBYTtRQUNOLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFiekQsU0FBSSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO1lBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ25ELENBQUMsQ0FBQztRQUNNLFVBQUssR0FBRyxFQUFFLE9BQU8sRUFBUCxpQkFBTyxFQUFFLENBQUM7SUFTekIsQ0FBQztJQVBMLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQU9ELFFBQVE7UUFDTixJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN4RDtJQUNILENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQUE7QUEzQlksbUJBQW1CO0lBTC9CLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsaUJBQWlCO1FBQzNCLFdBQVcsRUFBRSw4QkFBOEI7UUFDM0MsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7S0FDNUMsQ0FBQztHQUNXLG1CQUFtQixDQTJCL0I7QUEzQlksa0RBQW1CIn0=