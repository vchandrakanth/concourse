"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates service string used in api-prefix.interceptor
 * @param name - Name of service to call - used as subdomain.concourse.company.
 * @param endpoint - Service call path.
 * @param version - Version of service to used. default: v1
 * @returns A stringified version of parameters passed
 */
exports.buildServiceRequest = (name, endpoint, version = 'v1') => JSON.stringify({ name, endpoint, version });
exports.parseServiceRequest = (serviceString) => JSON.parse(serviceString);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS1wYXJhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc2hhcmVkL2hlbHBlcnMvc2VydmljZS1wYXJhbXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFNQTs7Ozs7O0dBTUc7QUFDVSxRQUFBLG1CQUFtQixHQUFHLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsT0FBTyxHQUFHLElBQUksRUFBVSxFQUFFLENBQzVGLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFFakMsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLGFBQXFCLEVBQXdCLEVBQUUsQ0FDakYsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyJ9