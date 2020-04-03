"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const service_params_1 = require("./service-params");
describe('Service Params helper', () => {
    it('should create service string', () => {
        const serviceString = service_params_1.buildServiceRequest('auth', 'auth/token');
        expect(serviceString).toBe('{"name":"auth","endpoint":"auth/token","version":"v1"}');
    });
    it('should parse service string to service object', () => {
        const serviceString = '{"name":"auth","endpoint":"auth/token","version":"v1"}';
        const serviceObject = service_params_1.parseServiceRequest(serviceString);
        expect(serviceObject).toEqual({ name: 'auth', endpoint: 'auth/token', version: 'v1' });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1wYXJhbXMuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL2NvbmNvdXJzZS9qYXZhc2NyaXB0L2NvbmNvdXJzZS1hcHAvc3JjL2FwcC9zaGFyZWQvaGVscGVycy9zZXJ2aWNlLXBhcmFtcy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEscURBQTRFO0FBRTVFLFFBQVEsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLEVBQUU7SUFDckMsRUFBRSxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRTtRQUN0QyxNQUFNLGFBQWEsR0FBRyxvQ0FBbUIsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFaEUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO0lBQ3ZGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtDQUErQyxFQUFFLEdBQUcsRUFBRTtRQUN2RCxNQUFNLGFBQWEsR0FBRyx3REFBd0QsQ0FBQztRQUMvRSxNQUFNLGFBQWEsR0FBRyxvQ0FBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV6RCxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==