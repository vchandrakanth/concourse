"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Password should meet the following conditions:
 * - at least one lower case character,
 * - at least one upper case character,
 * - at least one digit,
 * - at least one special character: !, @, #, $, %, ^, &, *.
 */
exports.PASSWORD_PATTERN = '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,20}$';
exports.PASSWORD_PATTERN_VALIDATION_MSG = 'Password must contain one upper case letter, one lower case letter, '
    + 'one number, and one of these special characters:!, @, #, $, %, ^, &, *.';
exports.PASSWORD_MIN_LENGTH_VALIDATION_MSG = 'Password must be at least 6 characters.';
exports.PASSWORD_MAX_LENGTH_VALIDATION_MSG = 'Password must be less than 20 characters.';
exports.ALIAS_PATTERN = '^([a-zA-Z0-9])([a-zA-Z0-9-_])+$';
exports.ALIAS_VALIDATION_MSG = "Alias Should be alphanumeric and only '-' and '_' special characters are allowed.";
/** Validator to make sure the new password and confirm password are the same. */
function repeatPasswordValidator(control) {
    if (!!control.parent) {
        const newPassword = control.parent.get('newPassword') ? control.parent.get('newPassword').value :
            control.parent.get('password').value;
        const newPasswordConfirm = control.parent.get('newPasswordConfirm') ? control.parent.get('newPasswordConfirm').value :
            control.parent.get('confirmPassword').value;
        return (newPassword === newPasswordConfirm) ? undefined :
            { passwordsNotEqual: true };
    }
    return undefined;
}
exports.repeatPasswordValidator = repeatPasswordValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL3Bhc3N3b3JkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBOzs7Ozs7R0FNRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsNEVBQTRFLENBQUM7QUFDaEcsUUFBQSwrQkFBK0IsR0FBRyxzRUFBc0U7TUFDakgseUVBQXlFLENBQUM7QUFDakUsUUFBQSxrQ0FBa0MsR0FBRyx5Q0FBeUMsQ0FBQztBQUMvRSxRQUFBLGtDQUFrQyxHQUFHLDJDQUEyQyxDQUFDO0FBQ2pGLFFBQUEsYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0FBQ2xELFFBQUEsb0JBQW9CLEdBQUcsbUZBQW1GLENBQUM7QUFDeEgsaUZBQWlGO0FBQ2pGLFNBQWdCLHVCQUF1QixDQUFDLE9BQW9CO0lBQzFELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9GLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN2QyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEgsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDOUMsT0FBTyxDQUFDLFdBQVcsS0FBSyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDO0tBQy9CO0lBQ0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVZELDBEQVVDIn0=