"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modal_actions_1 = require("./modal.actions");
const modal_reducer_1 = require("./modal.reducer");
describe('Modal Reducer', () => {
    describe('unknown action', () => {
        it('should return the initial state', () => {
            const action = {};
            const result = modal_reducer_1.reducer(modal_reducer_1.initialState, action);
            expect(result).toBe(modal_reducer_1.initialState);
        });
    });
    describe('OpenModalSuccess', () => {
        const action = new modal_actions_1.OpenModalSuccess({
            modalRef: {},
            id: 'test-modal-id'
        });
        const result = modal_reducer_1.reducer(modal_reducer_1.initialState, action);
        it('should set activeModal to payload ID', () => {
            expect(result.activeModal).toBe('test-modal-id');
        });
        it('should add modalRef to modals map', () => {
            expect(Object.keys(result.modals).length).toBe(1);
            expect(result.modals['test-modal-id']).toBeTruthy();
        });
    });
    describe('CloseModalSuccess', () => {
        const action = new modal_actions_1.CloseModalSuccess('test-modal-id');
        const result = modal_reducer_1.reducer(Object.assign(Object.assign({}, modal_reducer_1.initialState), { activeModal: 'test-modal-id', modals: {
                'another-test-modal': {},
                'test-modal-id': {}
            } }), action);
        it('should bump activeModal to next modal in modals map', () => {
            expect(result.activeModal).toBe('another-test-modal');
        });
        it('should remove modal from modal map', () => {
            expect(Object.keys(result.modals).length).toBe(1);
            expect(result.modals['test-modal-id']).toBeFalsy();
            expect(result.modals['another-test-modal']).toBeTruthy();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwucmVkdWNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2NvcmUvbW9kYWwvc3RhdGUvbW9kYWwucmVkdWNlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXNFO0FBQ3RFLG1EQUF3RDtBQUV4RCxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUU3QixRQUFRLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxFQUFFO1FBQzlCLEVBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLEVBQUU7WUFDekMsTUFBTSxNQUFNLEdBQUcsRUFBUyxDQUFDO1lBRXpCLE1BQU0sTUFBTSxHQUFHLHVCQUFPLENBQUMsNEJBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUU3QyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUFZLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRTtRQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGdDQUFnQixDQUFDO1lBQ2xDLFFBQVEsRUFBRSxFQUFFO1lBQ1osRUFBRSxFQUFFLGVBQWU7U0FDcEIsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsdUJBQU8sQ0FBQyw0QkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFHLEVBQUU7WUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLG1CQUFtQixFQUFFLEdBQUcsRUFBRTtRQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFJLGlDQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sTUFBTSxHQUFHLHVCQUFPLGlDQUNqQiw0QkFBWSxLQUNmLFdBQVcsRUFBRSxlQUFlLEVBQzVCLE1BQU0sRUFBRTtnQkFDTixvQkFBb0IsRUFBRSxFQUFFO2dCQUN4QixlQUFlLEVBQUUsRUFBRTthQUNwQixLQUNBLE1BQU0sQ0FBQyxDQUFDO1FBRVgsRUFBRSxDQUFDLHFEQUFxRCxFQUFFLEdBQUcsRUFBRTtZQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRTtZQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9