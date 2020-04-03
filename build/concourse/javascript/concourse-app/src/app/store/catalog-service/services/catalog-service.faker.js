"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const faker = require("faker/locale/en_US");
const models_1 = require("@concourse/core/models");
/* tslint:disable */
exports.awsProducts = [
    {
        "serviceId": 901,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "RDS",
        "namespace": "AWS::RDS",
        "arnFormat": "aws",
        "description": "Amazon Relational Database Service is a distributed relational database service by AWS"
    }, {
        "serviceId": 902,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "KMS",
        "namespace": "AWS::KMS",
        "arnFormat": "aws",
        "description": "AWS Key Management Service is an Amazon Web Services product that allows administrators to create, delete and control keys that encrypt data stored in AWS databases and products"
    }, {
        "serviceId": 903,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "S3",
        "namespace": "AWS::S3",
        "arnFormat": "aws",
        "description": "Amazon Simple Storage Service is a simple storage service offered by AWS that provides object storage through a web service interface"
    }, {
        "serviceId": 904,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "RDS Aurora",
        "namespace": "AWS::RDSAurora",
        "arnFormat": "aws",
        "description": "Amazon Aurora is a MySQL and PostgreSQL compatible relational database built for the cloud"
    }, {
        "serviceId": 905,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "EFS",
        "namespace": "AWS::EFS",
        "arnFormat": "aws",
        "description": "Amazon Elastic File System provides simple, scalable file storage for use with Amazon EC2"
    }, {
        "serviceId": 906,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "IAM",
        "namespace": "AWS::IAM",
        "arnFormat": "aws",
        "description": "AWS Identity and Access Management is a directory service designed for tracking system users and providing ways of keeping track of information about how they get authenticated"
    }, {
        "serviceId": 907,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "EC2",
        "namespace": "AWS::EC2",
        "arnFormat": "aws",
        "description": "Virtual server in Amazon’s Elastic Compute Cloud for running applications on the AWS infrastructure"
    }, {
        "serviceId": 908,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "EBS",
        "namespace": "AWS::EBS",
        "arnFormat": "aws",
        "description": "Elastic Block Store provides persistent block storage volumes for use with Amazon EC2 instances in the AWS Cloud"
    }, {
        "serviceId": 909,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "VPC",
        "namespace": "AWS::VPC",
        "arnFormat": "aws",
        "description": "Virtual Private Network is a private cloud within the AWS infrastructure"
    }, {
        "serviceId": 910,
        "version": 1,
        "created": faker.date.recent(2),
        "updated": null,
        "productName": "RDS Postgres",
        "namespace": "AWS::RDSPostgres",
        "arnFormat": "aws",
        "description": "Amazon Postgres and PostgreSQL compatible relational database built for the cloud"
    }
].map(catalog => new models_1.AwsProduct().deserialize(catalog));
exports.awsRegion = [
    {
        "id": 2001,
        "region": "ap-northeast-1"
    }, {
        "id": 2002,
        "region": "ap-northeast-2"
    }, {
        "id": 2003,
        "region": "ap-south-1"
    }, {
        "id": 2004,
        "region": "ap-southeast-1"
    }, {
        "id": 2005,
        "region": "ap-southeast-2"
    }, {
        "id": 2006,
        "region": "ca-central-1"
    }, {
        "id": 2007,
        "region": "eu-central-1"
    }, {
        "id": 2008,
        "region": "eu-north-1"
    }, {
        "id": 2009,
        "region": "eu-west-1"
    }, {
        "id": 2010,
        "region": "eu-west-2"
    }, {
        "id": 2011,
        "region": "eu-west-3"
    }, {
        "id": 2012,
        "region": "sa-east-1"
    }, {
        "id": 2013,
        "region": "us-east-1"
    }, {
        "id": 2014,
        "region": "us-east-2"
    }, {
        "id": 2015,
        "region": "us-west-1"
    }, {
        "id": 2016,
        "region": "us-west-2"
    }
].map(item => new models_1.AWSRegion().deserialize(item));
exports.networkProtocols = [
    {
        "id": 1,
        "protocolName": "TCP",
        "requirePorts": true,
        "defaultsTo": null
    },
    {
        "id": 2,
        "protocolName": "UDP",
        "requirePorts": true,
        "defaultsTo": null
    },
    {
        "id": 3,
        "protocolName": "ICMP",
        "requirePorts": true,
        "defaultsTo": null
    },
    {
        "id": 4,
        "protocolName": "All Traffic",
        "requirePorts": true,
        "defaultsTo": null
    },
    {
        "id": 5,
        "protocolName": "SSH",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 22."
    },
    {
        "id": 6,
        "protocolName": "SMTP",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 25."
    },
    {
        "id": 7,
        "protocolName": "SMTPS",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 465."
    },
    {
        "id": 8,
        "protocolName": "DNS (UDP)",
        "requirePorts": false,
        "defaultsTo": "UDP connections on port 53."
    },
    {
        "id": 9,
        "protocolName": "DNS (TCP)",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 53."
    },
    {
        "id": 10,
        "protocolName": "HTTP",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 80."
    },
    {
        "id": 11,
        "protocolName": "HTTPS",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 443."
    },
    {
        "id": 12,
        "protocolName": "POP3",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 110."
    },
    {
        "id": 13,
        "protocolName": "POP3S",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 995."
    },
    {
        "id": 14,
        "protocolName": "LDAP",
        "requirePorts": false,
        "defaultsTo": "TCP and UDP connections on port 389."
    },
    {
        "id": 15,
        "protocolName": "LDAPS",
        "requirePorts": false,
        "defaultsTo": "TCP and UDP connections on port 636."
    },
    {
        "id": 16,
        "protocolName": "SMB",
        "requirePorts": true,
        "defaultsTo": null
    },
    {
        "id": 17,
        "protocolName": "IMAP",
        "requirePorts": false,
        "defaultsTo": "TCP connections on ports 143 and 220(IMAPv3)."
    },
    {
        "id": 18,
        "protocolName": "IMAPS",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 993."
    },
    {
        "id": 19,
        "protocolName": "MS SQL",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 1433."
    },
    {
        "id": 20,
        "protocolName": "NFS",
        "requirePorts": false,
        "defaultsTo": "TCP and UDP connections on port 2049."
    },
    {
        "id": 21,
        "protocolName": "MySQL",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 3306."
    },
    {
        "id": 22,
        "protocolName": "RDP",
        "requirePorts": false,
        "defaultsTo": "TCP and UDP connections on port 3389."
    },
    {
        "id": 23,
        "protocolName": "Redshift",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 5439."
    },
    {
        "id": 24,
        "protocolName": "PostgreSQL",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 5432."
    },
    {
        "id": 25,
        "protocolName": "Oracle RDS",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 1521, 2483, and 2484."
    },
    {
        "id": 26,
        "protocolName": "WinRm-HTTP",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 5985."
    },
    {
        "id": 27,
        "protocolName": "WinRM-HTTPS",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 5986."
    },
    {
        "id": 28,
        "protocolName": "Elastic Graphics",
        "requirePorts": false,
        "defaultsTo": "TCP connections on port 2007."
    }
].map(item => new models_1.NetworkProtocol().deserialize(item));
exports.institutionData = [
    {
        id: 3001,
        name: 'Home',
        dataType: 'STRING',
        collectionType: 'LIST',
        institutionDataDomain: 'INSTITUTION'
    },
    {
        id: 3002,
        name: 'InsightsUrls',
        dataType: 'STRING',
        collectionType: 'LIST',
        institutionDataDomain: 'INSTITUTION'
    },
    {
        id: 3003,
        name: 'AwsAccounts',
        dataType: 'STRING',
        collectionType: 'LIST',
        institutionDataDomain: 'ORGANIZATION'
    }
].map(item => new models_1.InstitutionDataCatalog().deserialize(item));
/* tslint:enable */
exports.fakeSubscriptions = () => ([
    'sub1',
    'sub2',
    'sub3'
]);
exports.fakeResourceGroups = () => [
    'Group1',
    'Group2',
    'Group3'
];
exports.fakeCatalogService = () => ({ awsProducts: exports.awsProducts, awsRegion: exports.awsRegion, networkProtocols: exports.networkProtocols, institutionData: exports.institutionData });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0YWxvZy1zZXJ2aWNlLmZha2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vY29uY291cnNlL2phdmFzY3JpcHQvY29uY291cnNlLWFwcC9zcmMvYXBwL3N0b3JlL2NhdGFsb2ctc2VydmljZS9zZXJ2aWNlcy9jYXRhbG9nLXNlcnZpY2UuZmFrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0Q0FBNEM7QUFFNUMsbURBS2dDO0FBRWhDLG9CQUFvQjtBQUNQLFFBQUEsV0FBVyxHQUFpQjtJQUN2QztRQUNFLFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvQixTQUFTLEVBQUUsSUFBSTtRQUNmLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFdBQVcsRUFBRSxVQUFVO1FBQ3ZCLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGFBQWEsRUFBRSx3RkFBd0Y7S0FDeEcsRUFBRTtRQUNELFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvQixTQUFTLEVBQUUsSUFBSTtRQUNmLGFBQWEsRUFBRSxLQUFLO1FBQ3BCLFdBQVcsRUFBRSxVQUFVO1FBQ3ZCLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLGFBQWEsRUFBRSxtTEFBbUw7S0FDbk0sRUFBRTtRQUNELFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFNBQVMsRUFBRSxDQUFDO1FBQ1osU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMvQixTQUFTLEVBQUUsSUFBSTtRQUNmLGFBQWEsRUFBRSxJQUFJO1FBQ25CLFdBQVcsRUFBRSxTQUFTO1FBQ3RCLFdBQVcsRUFBRSxLQUFLO1FB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