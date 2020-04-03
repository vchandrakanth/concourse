"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// this is the ADHOC environment file.
// Do not enable feature flags here. Instead enable them in the Java Side
// the Frontend can still have the following in its HTML  *featureFlag="'FE_ANALYTICS'" to enable a flag
// flags will be determined visible by the Java Side
// If it's anything but your local machine It's java
exports.environment = {
    production: false,
    apiUseHttps: true,
    apiEnvironment: 'adhoc',
    apiDomain: 'concourse.company',
    apiPathPrefix: true,
    enableActivityTracking: true,
    preloadModules: true,
    featureFlags: []
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuYWRob2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9lbnZpcm9ubWVudHMvZW52aXJvbm1lbnQuYWRob2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0M7QUFDdEMseUVBQXlFO0FBQ3pFLHdHQUF3RztBQUN4RyxvREFBb0Q7QUFDcEQsb0RBQW9EO0FBQ3ZDLFFBQUEsV0FBVyxHQUFHO0lBQ3pCLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGNBQWMsRUFBRSxPQUFPO0lBQ3ZCLFNBQVMsRUFBRSxtQkFBbUI7SUFDOUIsYUFBYSxFQUFFLElBQUk7SUFDbkIsc0JBQXNCLEVBQUUsSUFBSTtJQUM1QixjQUFjLEVBQUUsSUFBSTtJQUNwQixZQUFZLEVBQUUsRUFBRTtDQUNqQixDQUFDIn0=