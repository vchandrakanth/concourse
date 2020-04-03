"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
function atLeastOneValidator(control) {
    if (!!control.parent) {
        const controls = control.parent.controls;
        if (controls) {
            const result = Object.keys(controls).findIndex(key => (controls[key].value.trim() !== '' && !util_1.Util.isNullOrUndefined(controls[key].value)));
            if (result === -1) {
                return {
                    atLeastOneRequired: true
                };
            }
        }
    }
}
exports.atLeastOneValidator = atLeastOneValidator;
function cloudProviderValidator(control) {
    if (!!control.parent) {
        const { aws, azure } = control.parent.controls;
        if ((util_1.Util.isNullOrUndefined(aws.value) || aws.value === false) && (util_1.Util.isNullOrUndefined(azure.value) || azure.value === false)) {
            return { providerRequired: true };
        }
    }
}
exports.cloudProviderValidator = cloudProviderValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRsZWFzdC1vbmUudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL2F0bGVhc3Qtb25lLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLGlDQUE4QjtBQUU5QixTQUFnQixtQkFBbUIsQ0FBQyxPQUFvQjtJQUN0RCxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1FBQ3BCLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pDLElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0ksSUFBSSxNQUFNLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2pCLE9BQU87b0JBQ0wsa0JBQWtCLEVBQUUsSUFBSTtpQkFDekIsQ0FBQTthQUNGO1NBQ0Y7S0FDRjtBQUNILENBQUM7QUFaRCxrREFZQztBQUVELFNBQWdCLHNCQUFzQixDQUFDLE9BQW9CO0lBQ3pELElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7UUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQWUsQ0FBQztRQUN0RCxJQUFJLENBQUMsV0FBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2hJLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUNuQztLQUVGO0FBQ0gsQ0FBQztBQVJELHdEQVFDIn0=