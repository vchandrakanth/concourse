"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@ngrx/effects");
const operators_1 = require("rxjs/operators");
const helpers_1 = require("@concourse/shared/helpers");
const modal_actions_1 = require("../modal/state/modal.actions");
exports.ofModal = (modalComponent) => (source) => source.pipe(effects_1.ofType(modal_actions_1.ModalActionTypes.OpenModal), operators_1.map((action) => action.payload), operators_1.filter(payload => helpers_1.Util.isArray(modalComponent) ? modalComponent.includes(payload.component) : payload.component === modalComponent));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2YtbW9kYWwub3BlcmF0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvY29yZS9vcGVyYXRvcnMvb2YtbW9kYWwub3BlcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwyQ0FBdUM7QUFJdkMsOENBQTZDO0FBRTdDLHVEQUFpRDtBQUNqRCxnRUFBeUY7QUFFNUUsUUFBQSxPQUFPLEdBQUcsQ0FDckIsY0FBdUMsRUFDQyxFQUFFLENBQzFDLENBQUMsTUFBMEIsRUFBNEIsRUFBRSxDQUN2RCxNQUFNLENBQUMsSUFBSSxDQUNULGdCQUFNLENBQUMsZ0NBQWdCLENBQUMsU0FBUyxDQUFDLEVBQ2xDLGVBQUcsQ0FBQyxDQUFDLE1BQWlCLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFDMUMsa0JBQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLGNBQWMsQ0FBQyxDQUNwSSxDQUFDIn0=