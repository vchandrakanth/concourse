"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const store_1 = require("@ngrx/store");
const helpers_1 = require("@concourse/shared/helpers");
const code_preview_modal_component_1 = require("../components/code-preview-modal/code-preview-modal.component");
const confirm_delete_modal_component_1 = require("../components/confirm-delete-modal/confirm-delete-modal.component");
const confirm_modal_component_1 = require("../components/confirm-modal/confirm-modal.component");
const modal_actions_1 = require("./modal.actions");
const query = require("./modal.selectors");
let ModalStoreFacade = class ModalStoreFacade {
    constructor(store) {
        this.store = store;
        this.modals$ = this.store.pipe(store_1.select(query.getModals));
        this.activeModal$ = this.store.pipe(store_1.select(query.getActiveModal));
    }
    openModal(payload) {
        this.store.dispatch(new modal_actions_1.OpenModal(Object.assign(Object.assign({}, payload), { options: Object.assign(Object.assign({}, helpers_1.MODAL_DEFAULT_CONFIG), payload.options) })));
    }
    closeModal() {
        this.store.dispatch(new modal_actions_1.CloseModal());
    }
    confirmModal({ confirmBody, confirmTitle, triggerConfirm }) {
        this.openModal({
            id: `confirm-${Date.now()}-modal`,
            component: confirm_modal_component_1.ConfirmModalComponent,
            options: {
                initialState: { confirmBody, confirmTitle, triggerConfirm }
            }
        });
    }
    confirmDeleteModal(entityType, entityName, triggerDelete, actionDescriber) {
        this.openModal({
            id: `delete-${entityType}-modal`,
            component: confirm_delete_modal_component_1.ConfirmDeleteModalComponent,
            options: { initialState: { entityType, entityName, triggerDelete, actionDescriber } }
        });
    }
    templatePreviewModal(cloudFormationTemplate, fileName = '', templateType = 'json') {
        this.openModal({
            id: 'template-modal',
            component: code_preview_modal_component_1.CodePreviewModalComponent,
            options: {
                class: 'modal-xl',
                initialState: {
                    codeString: cloudFormationTemplate,
                    title: 'Cloud Formation Template',
                    fileName,
                    fileType: templateType
                }
            }
        });
    }
};
ModalStoreFacade = __decorate([
    core_1.Injectable()
], ModalStoreFacade);
exports.ModalStoreFacade = ModalStoreFacade;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuZmFjYWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvc3RhdGUvbW9kYWwuZmFjYWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsd0NBQTJDO0FBQzNDLHVDQUE0QztBQUU1Qyx1REFBaUU7QUFDakUsZ0hBQTBHO0FBQzFHLHNIQUFnSDtBQUNoSCxpR0FBNEY7QUFDNUYsbURBQXNFO0FBRXRFLDJDQUEyQztBQUczQyxJQUFhLGdCQUFnQixHQUE3QixNQUFhLGdCQUFnQjtJQUkzQixZQUNtQixLQUFtQjtRQUFuQixVQUFLLEdBQUwsS0FBSyxDQUFjO1FBSnRDLFlBQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsaUJBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFJekQsQ0FBQztJQUVMLFNBQVMsQ0FBQyxPQUFxQjtRQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLHlCQUFTLGlDQUM1QixPQUFPLEtBQ1YsT0FBTyxrQ0FDRiw4QkFBb0IsR0FDcEIsT0FBTyxDQUFDLE9BQU8sS0FFcEIsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVELFVBQVU7UUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLDBCQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBd0U7UUFDOUgsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNiLEVBQUUsRUFBRSxXQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsUUFBUTtZQUNqQyxTQUFTLEVBQUUsK0NBQXFCO1lBQ2hDLE9BQU8sRUFBRTtnQkFDUCxZQUFZLEVBQUUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRTthQUM1RDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxVQUFrQixFQUFFLFVBQWtCLEVBQUUsYUFBa0IsRUFBRSxlQUF3QjtRQUNyRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2IsRUFBRSxFQUFFLFVBQVUsVUFBVSxRQUFRO1lBQ2hDLFNBQVMsRUFBRSw0REFBMkI7WUFDdEMsT0FBTyxFQUFFLEVBQUUsWUFBWSxFQUFFLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLEVBQUU7U0FDdEYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLHNCQUE4QixFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsWUFBWSxHQUFHLE1BQU07UUFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUNiLEVBQUUsRUFBRSxnQkFBZ0I7WUFDcEIsU0FBUyxFQUFFLHdEQUF5QjtZQUNwQyxPQUFPLEVBQUU7Z0JBQ1AsS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLFlBQVksRUFBRTtvQkFDWixVQUFVLEVBQUUsc0JBQXNCO29CQUNsQyxLQUFLLEVBQUUsMEJBQTBCO29CQUNqQyxRQUFRO29CQUNSLFFBQVEsRUFBRSxZQUFZO2lCQUN2QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUVGLENBQUE7QUF4RFksZ0JBQWdCO0lBRDVCLGlCQUFVLEVBQUU7R0FDQSxnQkFBZ0IsQ0F3RDVCO0FBeERZLDRDQUFnQiJ9