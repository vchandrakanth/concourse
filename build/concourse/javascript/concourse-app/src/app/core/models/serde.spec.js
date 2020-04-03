"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const serde_1 = require("./serde");
class ExcludeTestModel extends serde_1.Serde {
}
__decorate([
    serde_1.Exclude()
], ExcludeTestModel.prototype, "frontendField", void 0);
class PluckArrayTestModel extends serde_1.Serde {
}
__decorate([
    serde_1.Pluck(['id'])
], PluckArrayTestModel.prototype, "nestedProperties", void 0);
class PluckArrayTestTwoModel extends serde_1.Serde {
}
__decorate([
    serde_1.Pluck('id')
], PluckArrayTestTwoModel.prototype, "nestedProperties", void 0);
class PluckObjectTestModel extends serde_1.Serde {
}
__decorate([
    serde_1.Pluck(['id'])
], PluckObjectTestModel.prototype, "nestedProperty", void 0);
class PluckObjectTestTwoModel extends serde_1.Serde {
}
__decorate([
    serde_1.Pluck('id')
], PluckObjectTestTwoModel.prototype, "nestedProperty", void 0);
describe('Serde', () => {
    describe('@Exclude() decorator tests', () => {
        it('should remove properties marked during serialize', () => {
            const testModel = new ExcludeTestModel().deserialize({
                name: 'test model',
                description: 'this is a test model',
                frontendField: 'test field'
            });
            const serializedModel = testModel.serialize();
            expect(serializedModel).toEqual({ name: 'test model', description: 'this is a test model' });
        });
    });
    describe('@Pluck() decorator tests', () => {
        it('should pluck \'id\' (property: T[]) from marked property during serialize', () => {
            const testModel = new PluckArrayTestModel().deserialize({
                name: 'test model',
                nestedProperties: [
                    { id: 1, name: 'one' },
                    { id: 2, name: 'two' }
                ]
            });
            const serializedModel = testModel.serialize();
            expect(serializedModel).toEqual({ name: 'test model', nestedProperties: [{ id: 1 }, { id: 2 }] });
        });
        it('should pluck \'ids\' (property: number[]) from marked property during serialize', () => {
            const testModel = new PluckArrayTestTwoModel().deserialize({
                name: 'test model',
                nestedProperties: [
                    { id: 1, name: 'one' },
                    { id: 2, name: 'two' }
                ]
            });
            const serializedModel = testModel.serialize();
            expect(serializedModel).toEqual({ name: 'test model', nestedProperties: [1, 2] });
        });
        it('should pluck \'id\' (property: {k: v}) from marked property during serialize', () => {
            const testModel = new PluckObjectTestModel().deserialize({
                name: 'test model',
                nestedProperty: { id: 2, name: 'two' }
            });
            const serializedModel = testModel.serialize();
            expect(serializedModel).toEqual({ name: 'test model', nestedProperty: { id: 2 } });
        });
        it('should pluck \'id\' property: value from marked property during serialize', () => {
            const testModel = new PluckObjectTestTwoModel().deserialize({
                name: 'test model',
                nestedProperty: { id: 2, name: 'two' }
            });
            const serializedModel = testModel.serialize();
            expect(serializedModel).toEqual({ name: 'test model', nestedProperty: 2 });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyZGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL21vZGVscy9zZXJkZS5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsbUNBQWdEO0FBRWhELE1BQU0sZ0JBQWlCLFNBQVEsYUFBdUI7Q0FJckQ7QUFEWTtJQUFWLGVBQU8sRUFBRTt1REFBdUI7QUFHbkMsTUFBTSxtQkFBb0IsU0FBUSxhQUEwQjtDQUczRDtBQURnQjtJQUFkLGFBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDOzZEQUFrRDtBQUdsRSxNQUFNLHNCQUF1QixTQUFRLGFBQTZCO0NBR2pFO0FBRGM7SUFBWixhQUFLLENBQUMsSUFBSSxDQUFDO2dFQUFrRDtBQUdoRSxNQUFNLG9CQUFxQixTQUFRLGFBQTJCO0NBRzdEO0FBRGdCO0lBQWQsYUFBSyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7NERBQThDO0FBRzlELE1BQU0sdUJBQXdCLFNBQVEsYUFBOEI7Q0FHbkU7QUFEYztJQUFaLGFBQUssQ0FBQyxJQUFJLENBQUM7K0RBQThDO0FBRzVELFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO0lBRXJCLFFBQVEsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUU7UUFDMUMsRUFBRSxDQUFDLGtEQUFrRCxFQUFFLEdBQUcsRUFBRTtZQUMxRCxNQUFNLFNBQVMsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUNuRCxJQUFJLEVBQUUsWUFBWTtnQkFDbEIsV0FBVyxFQUFFLHNCQUFzQjtnQkFDbkMsYUFBYSxFQUFFLFlBQVk7YUFDNUIsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxP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