"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
const password_validator_1 = require("./password.validator");
describe('Password validation for new password and confirm password', () => {
    const control = new forms_1.FormControl();
    it('should fail with passwords that are not equal', () => {
        control.setParent(new forms_1.FormGroup({
            newPassword: new forms_1.FormControl('password1'),
            newPasswordConfirm: new forms_1.FormControl('password2')
        }));
        expect(password_validator_1.repeatPasswordValidator(control)).not.toBe(undefined);
    });
    it('should pass with two identical passwords', () => {
        control.setParent(new forms_1.FormGroup({
            newPassword: new forms_1.FormControl('password1'),
            newPasswordConfirm: new forms_1.FormControl('password1')
        }));
        expect(password_validator_1.repeatPasswordValidator(control)).toBe(undefined);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQudmFsaWRhdG9yLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvcGFzc3dvcmQudmFsaWRhdG9yLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwwQ0FBd0Q7QUFFeEQsNkRBQStEO0FBRS9ELFFBQVEsQ0FBQywyREFBMkQsRUFBRSxHQUFHLEVBQUU7SUFDekUsTUFBTSxPQUFPLEdBQUcsSUFBSSxtQkFBVyxFQUFFLENBQUM7SUFFbEMsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUN2RCxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQVMsQ0FBQztZQUM5QixXQUFXLEVBQUUsSUFBSSxtQkFBVyxDQUFDLFdBQVcsQ0FBQztZQUN6QyxrQkFBa0IsRUFBRSxJQUFJLG1CQUFXLENBQUMsV0FBVyxDQUFDO1NBQ2pELENBQUMsQ0FBQyxDQUFDO1FBQ0osTUFBTSxDQUFDLDRDQUF1QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQywwQ0FBMEMsRUFBRSxHQUFHLEVBQUU7UUFDbEQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLGlCQUFTLENBQUM7WUFDOUIsV0FBVyxFQUFFLElBQUksbUJBQVcsQ0FBQyxXQUFXLENBQUM7WUFDekMsa0JBQWtCLEVBQUUsSUFBSSxtQkFBVyxDQUFDLFdBQVcsQ0FBQztTQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyw0Q0FBdUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=