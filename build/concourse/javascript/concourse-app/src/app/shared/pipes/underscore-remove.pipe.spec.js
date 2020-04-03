"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const underscore_remove_pipe_1 = require("./underscore-remove.pipe");
describe('UnderscoreRemovePipe', () => {
    let pipe;
    beforeEach(() => {
        pipe = new underscore_remove_pipe_1.UnderscoreRemovePipe();
    });
    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });
    it('should return with spaces were underscores were', () => {
        const value = 'STRING_WITH_UNDERSCORES';
        expect(pipe.transform(value)).toBe('STRING WITH UNDERSCORES');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5kZXJzY29yZS1yZW1vdmUucGlwZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9waXBlcy91bmRlcnNjb3JlLXJlbW92ZS5waXBlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxRUFBZ0U7QUFFaEUsUUFBUSxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRTtJQUNwQyxJQUFJLElBQTBCLENBQUM7SUFDL0IsVUFBVSxDQUFDLEdBQUcsRUFBRTtRQUNkLElBQUksR0FBRyxJQUFJLDZDQUFvQixFQUFFLENBQUM7SUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM1QixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxpREFBaUQsRUFBRSxHQUFHLEVBQUU7UUFDekQsTUFBTSxLQUFLLEdBQUcseUJBQXlCLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUNoRSxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=