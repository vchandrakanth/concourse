"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const concourse_admin_module_1 = require("../concourse-admin/concourse-admin.module");
const core_module_1 = require("./core.module");
describe('CoreModule', () => {
    let coreModule;
    it('should create an instance', () => {
        coreModule = new core_module_1.CoreModule(undefined);
        expect(coreModule).toBeTruthy();
    });
    it('should fail to create an instance if not imported from AppModule', () => {
        const concourseAdminModule = new concourse_admin_module_1.ConcourseAdminModule();
        expect(() => {
            coreModule = new core_module_1.CoreModule(concourseAdminModule);
        }).toThrow(new Error('CoreModule is already loaded. Import it in the AppModule only'));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5tb2R1bGUuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9jb3JlL2NvcmUubW9kdWxlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzRkFBaUY7QUFDakYsK0NBQTJDO0FBRTNDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzFCLElBQUksVUFBc0IsQ0FBQztJQUUzQixFQUFFLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFO1FBQ25DLFVBQVUsR0FBRyxJQUFJLHdCQUFVLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2xDLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLEdBQUcsRUFBRTtRQUMxRSxNQUFNLG9CQUFvQixHQUFHLElBQUksNkNBQW9CLEVBQUUsQ0FBQztRQUN4RCxNQUFNLENBQUMsR0FBRyxFQUFFO1lBQ1YsVUFBVSxHQUFHLElBQUksd0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQywrREFBK0QsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9