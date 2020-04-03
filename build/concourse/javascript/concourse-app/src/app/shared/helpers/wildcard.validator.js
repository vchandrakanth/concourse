"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WildcardValidators {
    static awsOperationValidator() {
        return (control) => {
            if (!control.value) {
                return false;
            }
            const test = control.value.match(/(\*+?)|(\:+?)/g);
            return test && test.length !== new Set(test).size ? { notUnique: true } : undefined;
        };
    }
    static azureOperationValidator() {
        return (control) => {
            if (!control.value) {
                return false;
            }
            const test = control.value.match(/(\*+?)/g);
            return test && test.length !== new Set(test).size ? { notUnique: true } : undefined;
        };
    }
}
exports.WildcardValidators = WildcardValidators;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lsZGNhcmQudmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3NoYXJlZC9oZWxwZXJzL3dpbGRjYXJkLnZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQWEsa0JBQWtCO0lBQzdCLE1BQU0sQ0FBQyxxQkFBcUI7UUFDMUIsT0FBTyxDQUFDLE9BQW9CLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFBRSxPQUFPLEtBQUssQ0FBQzthQUFFO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDbkQsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDdEYsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUNELE1BQU0sQ0FBQyx1QkFBdUI7UUFDNUIsT0FBTyxDQUFDLE9BQW9CLEVBQUUsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtnQkFBRSxPQUFPLEtBQUssQ0FBQzthQUFFO1lBQ3JDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzVDLE9BQU8sSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3RGLENBQUMsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWZELGdEQWVDIn0=