"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDataColored = [
    { code: 'AU1', name: 'Australia East', value: '', type: 'azure', status: 'available' },
    { code: 'AU2', name: 'Australia Southeast', value: '', type: 'azure', status: 'available' },
    { code: 'AU3', name: 'Australia Central', value: '', type: 'azure', status: 'available' },
    { code: 'AU32', name: 'Australia Central 2', value: '', type: 'azure', status: 'available' },
    { code: 'AUAWS1', name: 'Asia Pacific (Sydney)', value: '', type: 'AWS', status: 'available' },
    { code: 'BHAWS1', name: 'Middle East (Bahrain)', value: '', type: 'AWS', status: 'available' },
    { code: 'BR1', name: 'Brazil South', value: '', type: 'azure', status: 'available' },
    { code: 'BRAWS1', name: 'South America (Sao Paulo)', value: '', type: 'AWS', status: 'available' },
    { code: 'CA1', name: 'Canada Central', value: '', type: 'azure', status: 'available' },
    { code: 'CA2', name: 'Canada East', value: '', type: 'azure', status: 'available' },
    { code: 'CAAWS1', name: 'Canada (Central)', value: '', type: 'AWS', status: 'available' },
    { code: 'CN1', name: 'East Asia', value: '', type: 'azure', status: 'available' },
    { code: 'CN2', name: 'China East', value: '', type: 'azure', status: 'available' },
    { code: 'CN3', name: 'China North', value: '', type: 'azure', status: 'available' },
    { code: 'CNAWS1', name: 'Asia Pacific (Hong Kong)', value: '', type: 'AWS', status: 'available' },
    { code: 'CNAWS2', name: 'China (Beijing)', value: '', type: 'AWS', status: 'available' },
    { code: 'CNAWS3', name: 'China (Ningxia)', value: '', type: 'AWS', status: 'available' },
    { code: 'FR1', name: 'France Central', value: '', type: 'azure', status: 'available' },
    { code: 'FR2', name: 'France South', value: '', type: 'azure', status: 'available' },
    { code: 'FRAWS1', name: 'Europe (Paris)', value: '', type: 'AWS', status: 'available' },
    { code: 'DE1', name: 'Germany North', value: '', type: 'azure', status: 'available' },
    { code: 'DE2', name: 'Germany West Central', value: '', type: 'azure', status: 'available' },
    { code: 'DE3', name: 'Germany Central', value: '', type: 'azure', status: 'available' },
    { code: 'DE4', name: 'Germany Northeast', value: '', type: 'azure', status: 'available' },
    { code: 'DEAWS1', name: 'Europe (Frankfurt)', value: '', type: 'AWS', status: 'available' },
    { code: 'IN1', name: 'South India', value: '', type: 'azure', status: 'available' },
    { code: 'IN2', name: 'Central India', value: '', type: 'azure', status: 'available' },
    { code: 'IN3', name: 'West India', value: '', type: 'azure', status: 'available' },
    { code: 'INAWS1', name: 'Asia Pacific (Mumbai)', value: '', type: 'AWS', status: 'available' },
    { code: 'IE', name: 'North Europe', value: '', type: 'azure', status: 'available' },
    { code: 'IEAWS1', name: 'Europe (Ireland)', value: '', type: 'AWS', status: 'available' },
    { code: 'IL', name: 'Israel Central', value: '', type: 'azure', status: 'announced' },
    { code: 'JP', name: 'Japan West', value: '', type: 'azure', status: 'available' },
    { code: 'JP1', name: 'Japan East', value: '', type: 'azure', status: 'available' },
    { code: 'JPAWS1', name: 'Asia Pacific (Osaka-Local)', value: '', type: 'AWS', status: 'available' },
    { code: 'JPAWS2', name: 'Asia Pacific (Tokyo)', value: '', type: 'AWS', status: 'available' },
    { code: 'KR1', name: 'Korea Central', value: '', type: 'azure', status: 'available' },
    { code: 'KR2', name: 'Korea South', value: '', type: 'azure', status: 'available' },
    { code: 'KRAWS1', name: 'Asia Pacific (Seoul)', value: '', type: 'AWS', status: 'available' },
    { code: 'MX', name: 'Mexico Central', value: '', type: 'azure', status: 'announced' },
    { code: 'NL', name: 'West Europe', value: '', type: 'azure', status: 'available' },
    { code: 'NO1', name: 'Norway West', value: '', type: 'azure', status: 'available' },
    { code: 'NO2', name: 'Norway East', value: '', type: 'azure', status: 'available' },
    { code: 'QA', name: 'Qatar Central', value: '', type: 'azure', status: 'announced' },
    { code: 'SG1', name: 'Southeast Asia', value: '', type: 'azure', status: 'available' },
    { code: 'SGAWS1', name: 'Asia Pacific (Singapore)', value: '', type: 'AWS', status: 'available' },
    { code: 'ZA1', name: 'South Africa North', value: '', type: 'azure', status: 'available' },
    { code: 'ZA2', name: 'South Africa West', value: '', type: 'azure', status: 'available' },
    { code: 'ES', name: 'Spain Central', value: '', type: 'azure', status: 'announced' },
    { code: 'SEAWS1', name: 'Europe (Stockholm)', value: '', type: 'AWS', status: 'available' },
    { code: 'CH1', name: 'Switzerland North', value: '', type: 'azure', status: 'available' },
    { code: 'CH2', name: 'Switzerland West', value: '', type: 'azure', status: 'available' },
    { code: 'AE1', name: 'UAE Central', value: '', type: 'azure', status: 'available' },
    { code: 'AE2', name: 'UAE North', value: '', type: 'azure', status: 'available' },
    { code: 'GB1', name: 'UK South', value: '', type: 'azure', status: 'available' },
    { code: 'GB2', name: 'UK West', value: '', type: 'azure', status: 'available' },
    { code: 'GBAWS1', name: 'Europe (London)', value: '', type: 'AWS', status: 'available' },
    { code: 'US1', name: 'Central US', value: '', type: 'azure', status: 'available' },
    { code: 'US2', name: 'East US', value: '', type: 'azure', status: 'available' },
    { code: 'US22', name: 'East US 2', value: '', type: 'azure', status: 'available' },
    { code: 'US3', name: 'West US', value: '', type: 'azure', status: 'available' },
    { code: 'US4', name: 'North Central US', value: '', type: 'azure', status: 'available' },
    { code: 'US5', name: 'South Central US', value: '', type: 'azure', status: 'available' },
    { code: 'US6', name: 'West Central US', value: '', type: 'azure', status: 'available' },
    { code: 'US62', name: 'West US 2', value: '', type: 'azure', status: 'available' },
    { code: 'US07', name: 'US Sec East (undisclosed location)', value: '', type: 'azure', status: 'available' },
    { code: 'US08', name: 'US Sec West (undisclosed location)', value: '', type: 'azure', status: 'available' },
    { code: 'US09', name: 'US Gov Virginia', value: '', type: 'azure', status: 'available' },
    { code: 'US010', name: 'US Gov Iowa', value: '', type: 'azure', status: 'available' },
    { code: 'US011', name: 'US Gov Arizona', value: '', type: 'azure', status: 'available' },
    { code: 'US012', name: 'US Gov Texas', value: '', type: 'azure', status: 'available' },
    { code: 'US013', name: 'US DoD East', value: '', type: 'azure', status: 'available' },
    { code: 'US014', name: 'US DoD Central', value: '', type: 'azure', status: 'available' },
    { code: 'USAWS1', name: 'US East (Ohio)', value: '', type: 'AWS', status: 'available' },
    { code: 'USAWS2', name: 'US East (N. Virginia)', value: '', type: 'AWS', status: 'available' },
    { code: 'USAWS3', name: 'US West (N. California)', value: '', type: 'AWS', status: 'available' },
    { code: 'USAWS4', name: 'US West (Oregon)', value: '', type: 'AWS', status: 'available' },
    { code: 'USAWS5', name: 'AWS GovCloud (US-East)', value: '', type: 'AWS', status: 'available' },
    { code: 'USAWS6', name: 'AWS GovCloud (US-West)', value: '', type: 'AWS', status: 'available' }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLWRhdGEuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL2Rhc2hib2FyZC9kYXNoYm9hcmQtd2l0aC13aWRnZXRzL21hcC1jaGFydC9tb2NrLWRhdGEvbWFwLWRhdGEuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQWEsUUFBQSxjQUFjLEdBQUc7SUFFMUIsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQztJQUNyRixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDO0lBQzFGLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUM7SUFDeEYsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBQztJQUMzRixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDO0lBQzdGLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxJ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