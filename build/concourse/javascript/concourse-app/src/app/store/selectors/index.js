"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = require("@ngrx/store");
const helpers_1 = require("@concourse/shared/helpers");
const queryNotification = require("@concourse/core/notification/state/notification.selectors");
const queryApproval = require("../approval/state/approval.selectors");
const queryAsset = require("../asset/state/asset.selectors");
const queryAttributeTags = require("../attribute-tag/state/attribute-tag.selectors");
const queryAuditHistory = require("../audit-history/state/audit-history.selectors");
const queryAuth = require("../auth/state/auth.selectors");
const queryAwsAccounts = require("../aws-accounts/state/aws-account.selectors");
const queryBaselineAssets = require("../baseline-asset/state/baseline-asset.selectors");
const queryCloudRoleAssignment = require("../cloud-role-assignments/state/cloud-role-assignment.selectors");
const queryCloudRole = require("../cloud-role/state/cloud-role.selectors");
const queryDiscoveredDeployment = require("../discovered-deployment/state/discovered-deployment.selectors");
const queryGroup = require("../group/state/group.selectors");
const queryLogicalDeployment = require("../logical-deployment/state/logical-deployment.selectors");
const queryPolicyGroupTemplates = require("../policy-group-template/state/policy-group-template.selectors");
const queryPolicyGroup = require("../policy-group/state/policy-group.selectors");
const queryPolicyResolution = require("../policy-resolution/state/policy-resolution.selectors");
const queryPolicyTemplates = require("../policy-template/state/policy-template.selectors");
const queryPolicyViolation = require("../policy-violation/state/policy-violation.selectors");
const querySurfaceLayer = require("../surface-layer/state/surface-layer.selectors");
const querySurface = require("../surface/state/surface.selectors");
const queryUser = require("../user/state/user.selectors");
exports.getSurfaceLayerEntitiesWithChildren = store_1.createSelector(querySurfaceLayer.getEntities, surfaceLayerEntities => Object.entries(surfaceLayerEntities)
    .map(([id, surfaceLayer]) => surfaceLayer.populate({ surfaceLayerEntities }))
    .reduce((acc, sl) => (Object.assign(Object.assign({}, acc), { [sl.id]: sl })), {}));
exports.getSelectedSurfaceLayerWithChildren = store_1.createSelector(exports.getSurfaceLayerEntitiesWithChildren, querySurfaceLayer.getSelectedId, (surfaceLayerEntities, selectedId) => surfaceLayerEntities[selectedId]);
exports.getSurfaceLayersWithChildren = store_1.createSelector(querySurfaceLayer.getEntities, querySurface.getSelectedId, (surfaceLayerEntities, surfaceId) => Object.entries(surfaceLayerEntities)
    .filter(([id, surfaceLayer]) => surfaceLayer.isRoot && surfaceLayer.surfaceId === surfaceId)
    .map(([id, surfaceLayer]) => surfaceLayer.populate({ surfaceLayerEntities })));
exports.getAllSurfaceLayersBySurfaceId = store_1.createSelector(querySurfaceLayer.getAll, querySurface.getSelectedId, (allSurfaceLayers, surfaceId) => allSurfaceLayers.filter(surfaceLayer => surfaceLayer.surfaceId === surfaceId));
exports.getSelectedSurfaceWithRelated = store_1.createSelector(querySurface.getSelected, exports.getAllSurfaceLayersBySurfaceId, queryGroup.getEntities, queryAwsAccounts.getAll, (selectedSurface, surfaceLayers, groupEntities, awsAccounts) => !selectedSurface ? selectedSurface : selectedSurface.populate({ surfaceLayers, groupEntities, awsAccounts }));
exports.getEvaluatedPolicyGroupWithRelated = store_1.createSelector(queryPolicyViolation.getEvaluation, queryPolicyGroup.getEntities, (policyViolation, policyGroupEntities) => !policyViolation ? policyViolation : Object.assign(Object.assign({}, policyViolation), { deploymentEvaluations: policyViolation.deploymentEvaluations.map(dE => (Object.assign(Object.assign({}, dE), { evaluation: dE.evaluation.hasViolations ? dE.evaluation.copyWith({
            policyViolations: dE.evaluation.policyViolations.map(pv => {
                const policyGroup = policyGroupEntities[+pv.policyGroupId];
                return helpers_1.Util.isUndefined(policyGroup) ? pv : Object.assign(Object.assign({}, pv), { policyGroup, policy: policyGroup.policies.find(p => p.id === +pv.policyId) });
            })
        }) : dE.evaluation }))), modelEvaluations: policyViolation.modelEvaluations.map(mE => (Object.assign(Object.assign({}, mE), { evaluation: mE.evaluation.hasViolations ? mE.evaluation.copyWith({
            policyViolations: mE.evaluation.policyViolations.map(pv => {
                const policyGroup = policyGroupEntities[+pv.policyGroupId];
                return helpers_1.Util.isUndefined(policyGroup) ? pv : Object.assign(Object.assign({}, pv), { policyGroup, policy: policyGroup.policies.find(p => p.id === +pv.policyId) });
            })
        }) : mE.evaluation }))) }));
exports.getUnsavedModelEvaluationWithRelated = store_1.createSelector(queryPolicyViolation.getEvaluation, queryPolicyGroup.getEntities, (policyViolation, policyGroupEntities) => !policyViolation ? policyViolation : Object.assign(Object.assign({}, policyViolation), { evaluation: policyViolation.response.copyWith({
        policyViolations: policyViolation.response.hasViolations ? policyViolation.response.policyViolations.map(pv => {
            const policyGroup = policyGroupEntities[+pv.policyGroupId];
            return helpers_1.Util.isUndefined(policyGroup) ? pv : Object.assign(Object.assign({}, pv), { policyGroup, policy: policyGroup.policies.find(p => p.id === +pv.policyId) });
        }) : []
    }) }));
exports.getSavedModelEvaluationWithRelated = store_1.createSelector(queryPolicyViolation.getEvaluation, queryPolicyGroup.getEntities, (policyViolation, policyGroupEntities) => !policyViolation ? policyViolation : Object.assign(Object.assign({}, policyViolation), { evaluation: policyViolation.evaluation.copyWith({
        policyViolations: policyViolation.evaluation.hasViolations ? policyViolation.evaluation.policyViolations.map(pv => {
            const policyGroup = policyGroupEntities[+pv.policyGroupId];
            return helpers_1.Util.isUndefined(policyGroup) ? pv : Object.assign(Object.assign({}, pv), { policyGroup, policy: policyGroup.policies.find(p => p.id === +pv.policyId) });
        }) : []
    }) }));
exports.getLogicalDeploymentEvaluationWithRelated = store_1.createSelector(queryPolicyViolation.getEvaluation, queryPolicyGroup.getEntities, (policyViolation, policyGroupEntities) => !policyViolation ? policyViolation : Object.assign(Object.assign({}, policyViolation), { evaluation: policyViolation.evaluation.copyWith({
        policyViolations: policyViolation.evaluation.hasViolations ? policyViolation.evaluation.policyViolations.map(pv => {
            const policyGroup = policyGroupEntities[+pv.policyGroupId];
            return helpers_1.Util.isUndefined(policyGroup) ? pv : Object.assign(Object.assign({}, pv), { policyGroup, policy: policyGroup.policies.find(p => p.id === +pv.policyId) });
        }) : []
    }) }));
exports.getPolicyGroupsWithRelated = store_1.createSelector(queryPolicyGroup.getAll, querySurfaceLayer.getEntities, (policyGroups, surfaceLayerEntities) => policyGroups.map(pg => pg.copyWith({
    surfaceLayers: pg.surfaceLayerIds.map(id => surfaceLayerEntities[id])
})));
exports.getSelectedPolicyGroupWithRelated = store_1.createSelector(queryPolicyGroup.getSelectedWithLineage, queryPolicyGroupTemplates.getAllEntities, queryPolicyTemplates.getEntities, exports.getAllSurfaceLayersBySurfaceId, queryAttributeTags.getEntities, queryGroup.getEntities, queryApproval.getAll, queryPolicyResolution.getAll, 
// tslint:disable-next-line:max-line-length
(selectedPolicyGroup, policyGroupTemplateEntities, policyTemplateEntities, allSurfaceLayers, attributeTagEntities, allGroupEntities, approvals, resolutions) => {
    if (!selectedPolicyGroup) {
        return selectedPolicyGroup;
    }
    const policyGroupTemplate = policyGroupTemplateEntities[selectedPolicyGroup.policyGroupTemplate.id];
    if (!policyGroupTemplate) {
        return selectedPolicyGroup;
    }
    return selectedPolicyGroup.copyWith({
        policies: selectedPolicyGroup.policies.map(policy => policy.copyWith({
            policyTemplate: policyTemplateEntities[policy.policyTemplate.id] || policy.policyTemplate,
            attributeValues: policy.attributeValues.map(av => {
                switch (av.attribute.type) {
                    case 'APPROVAL_GROUP': {
                        return av.copyWith({
                            entityValues: JSON.parse(av.value).map(v => !!allGroupEntities[v] ? allGroupEntities[v] : v)
                        });
                    }
                    case 'SURFACE_LAYER': {
                        return av.copyWith({
                            entityValues: allSurfaceLayers.filter(surfaceLayer => JSON.parse(av.value).includes(surfaceLayer.id))
                        });
                    }
                    default: {
                        return av.copyWith({
                            entityValues: []
                        });
                    }
                }
            })
        })),
        policyGroupTemplate: policyGroupTemplate.copyWith({
            policyTemplates: policyGroupTemplate.policyTemplates.map(pt => !!policyTemplateEntities[pt.id] ? policyTemplateEntities[pt.id] : pt)
        }),
        surfaceLayers: allSurfaceLayers.filter(surfaceLayer => selectedPolicyGroup.surfaceLayerIds.includes(surfaceLayer.id)),
        attributeTags: selectedPolicyGroup.attributeTagIds.map(id => attributeTagEntities[id]),
        approvalRequests: approvals.filter(ar => ar.requestEntityId === selectedPolicyGroup.id),
        policyResolutions: resolutions.filter(pr => pr.policyGroupId === selectedPolicyGroup.id),
        owningGroup: allGroupEntities[selectedPolicyGroup.owningGroupId]
    });
});
exports.getRoleAssignmentsWithRelated = store_1.createSelector(queryGroup.getRoleAssignments, queryGroup.getEntities, querySurfaceLayer.getEntities, querySurface.getSelectedId, (roleAssignments, groupEntities, surfaceLayerEntities, surfaceId) => roleAssignments
    .map(ra => ra.populate({ surfaceLayerEntities, groupEntities }))
    .filter(ra => ra.inSurface(surfaceId)));
exports.getRoleAssignmentsWithRelatedBySufaceLayers = store_1.createSelector(queryGroup.getRoleAssignments, queryGroup.getEntities, querySurfaceLayer.getEntities, (roleAssignments, groupEntities, surfaceLayerEntities) => (surfaceLayerIds) => {
    if (!helpers_1.Util.isArray(surfaceLayerIds)) {
        surfaceLayerIds = [surfaceLayerIds];
    }
    return roleAssignments
        .map(ra => ra.populate({ surfaceLayerEntities, groupEntities }))
        .filter(ra => !helpers_1.Util.isUndefined(surfaceLayerIds) ?
        helpers_1.intersection(ra.surfaceLayerIds, surfaceLayerIds, (a, b) => a === b).length > 0 :
        false);
});
exports.getSelectedUserWithRelated = store_1.createSelector(queryUser.getSelected, queryGroup.getEntities, querySurfaceLayer.getEntities, querySurface.getSelectedId, (selectedUser, groupEntities, surfaceLayerEntities, surfaceId) => !helpers_1.Util.isUndefined(selectedUser) ? selectedUser.populate({ groupEntities, surfaceLayerEntities, surfaceId }) : undefined);
exports.getAuthenticatedUser = store_1.createSelector(queryAuth.getAuthenticatedUserId, queryUser.getEntities, (authenticatedUserId, userEntities) => userEntities[authenticatedUserId]);
exports.getCloudRoleAssignmentsWithRelated = store_1.createSelector(queryCloudRoleAssignment.getAll, queryGroup.getEntities, querySurfaceLayer.getEntities, queryCloudRole.getEntities, (cloudRoleAssignments, groupEntities, surfaceLayerEntities, cloudRoleEntities) => cloudRoleAssignments.map(c => c.populate({ surfaceLayerEntities, groupEntities, cloudRoleEntities })));
exports.getAuthenticatedUserWithRelated = store_1.createSelector(exports.getAuthenticatedUser, queryGroup.getEntities, querySurfaceLayer.getEntities, querySurface.getSelectedId, (authenticatedUser, groupEntities, surfaceLayerEntities) => authenticatedUser ? authenticatedUser.populate({ groupEntities, surfaceLayerEntities }) : undefined);
exports.getSelectedGroupWithRelated = store_1.createSelector(queryGroup.getSelected, queryUser.getEntities, querySurfaceLayer.getEntities, querySurface.getSelected, exports.getCloudRoleAssignmentsWithRelated, (selectedGroup, userEntities, surfaceLayerEntities, surface, cloudRoles) => !selectedGroup ? selectedGroup : selectedGroup.populate({ userEntities, surfaceLayerEntities, surface, cloudRoles }));
exports.getGroupsWithRelated = store_1.createSelector(queryGroup.getAll, queryUser.getEntities, querySurfaceLayer.getEntities, querySurface.getSelectedId, (groups, userEntities, surfaceLayerEntities, surfaceId) => groups.map(g => g.populate({ userEntities, surfaceLayerEntities, surfaceId })));
exports.getSelectedOwningGroups = store_1.createSelector(exports.getGroupsWithRelated, queryAuth.getAuthenticatedUserId, querySurface.getSelectedId, (groups, userId, surfaceId, props) => groups.filter(group => group.hasUser(userId) && group.hasPermission(props.permission, surfaceId)));
exports.getSelectedAssetWithRelated = store_1.createSelector(queryAsset.getSelected, queryApproval.getAll, queryLogicalDeployment.getAll, queryDiscoveredDeployment.getAll, queryPolicyResolution.getAll, queryGroup.getEntities, queryAttributeTags.getEntities, (selectedAsset, approvalRequests, logicalDeployments, discoveredDeployments, policyViolations, groupEntities, attributeTagEntities) => !!selectedAsset ? selectedAsset.populate({
    approvalRequests,
    logicalDeployments,
    discoveredDeployments,
    policyViolations,
    groupEntities,
    attributeTagEntities
}) : undefined);
exports.getAssetsWithRelated = store_1.createSelector(queryAsset.getAll, queryGroup.getEntities, (assets, groupEntities) => assets.map(asset => asset.populate({ groupEntities })));
exports.getSelectedAttributeTagWithRelated = store_1.createSelector(queryAttributeTags.getSelectedId, queryAttributeTags.getEntities, queryAsset.getAllEnclaves, queryPolicyGroup.getAll, (selectedId, attributeTagEntities, enclaves, policyGroups) => {
    const attributeTag = attributeTagEntities[selectedId];
    if (!attributeTag) {
        return attributeTag;
    }
    const enclaveAttributeIdMap = new Map(enclaves.map(enclave => [
        enclave.id,
        enclave.attributeTags.map(at => at.id)
    ]));
    return attributeTag.copyWith({
        policyGroups: policyGroups.filter(pg => pg.attributeTagIds.includes(selectedId)),
        enclaveModels: enclaves.filter(enclave => enclaveAttributeIdMap.get(enclave.id).includes(selectedId))
    });
});
exports.getPolicyGroupTemplateWithRelated = store_1.createSelector(queryPolicyGroupTemplates.getSelected, queryPolicyTemplates.getEntities, queryPolicyGroup.getEntities, (selectedPGT, policyTemplateEntities, policyGroupEntities) => {
    if (!selectedPGT) {
        return selectedPGT;
    }
    return selectedPGT.copyWith({
        policyTemplates: selectedPGT.policyTemplates.map(pt => !!policyTemplateEntities[pt.id] ? policyTemplateEntities[pt.id] : pt),
        policyGroups: selectedPGT.policyGroups.map(pg => !!policyGroupEntities[pg.id] ? policyGroupEntities[pg.id] : pg)
    });
});
exports.getAllPolicyGroupTemplatesWithRelated = store_1.createSelector(queryPolicyGroupTemplates.getAll, queryPolicyTemplates.getEntities, queryPolicyGroup.getEntities, (allPolicyGroupTemplates, policyTemplateEntities, policyGroupEntities) => allPolicyGroupTemplates.map(pgt => pgt.copyWith({
    policyTemplates: pgt.policyTemplates.map(pt => !!policyTemplateEntities[pt.id] ? policyTemplateEntities[pt.id] : pt),
    policyGroups: pgt.policyGroups.map(pg => !!policyGroupEntities[pg.id] ? policyGroupEntities[pg.id] : pg)
})));
exports.getPolicyGroupTemplatesByStatusWithRelated = store_1.createSelector(queryPolicyGroupTemplates.getAll, queryPolicyTemplates.getEntities, queryPolicyGroup.getEntities, (policyGroupTemplates, policyTemplateEntities, policyGroupEntities, props) => policyGroupTemplates
    .filter(pgt => pgt.status === props.status)
    .map(pgt => pgt.copyWith({
    policyTemplates: pgt.policyTemplates.map(pt => !!policyTemplateEntities[pt.id] ? policyTemplateEntities[pt.id] : pt),
    policyGroups: pgt.policyGroups.map(pg => !!policyGroupEntities[pg.id] ? policyGroupEntities[pg.id] : pg)
})));
exports.getSelectedApprovalRequestWithRelated = store_1.createSelector(queryApproval.getSelected, queryUser.getEntities, queryGroup.getEntities, queryLogicalDeployment.getEntities, (selectedApproval, userEntities, groupEntities, logicalDeploymentEntities) => {
    if (!selectedApproval) {
        return selectedApproval;
    }
    let requestEntity = {};
    if (selectedApproval.requestEntityType === 'DEPLOYMENT') {
        requestEntity = logicalDeploymentEntities[selectedApproval.requestEntityId];
    }
    return selectedApproval.copyWith({
        requester: userEntities[selectedApproval.requesterId],
        approvalUsers: selectedApproval.approvalUserIds.map(id => userEntities[id]),
        assignedUser: userEntities[selectedApproval.assigneeId],
        approvalGroups: selectedApproval.approvalGroupIds.map(id => groupEntities[id]).filter(Boolean),
        // discoveredAwsDeployment // TODO
        approvalActions: selectedApproval.approvalActions.map(action => (Object.assign(Object.assign({}, action), { assignedGroup: groupEntities[action.assignedGroupId], assignedUser: userEntities[action.assignedUserId], createdByUser: userEntities[action.createdBy], updatedByUser: userEntities[action.updatedBy] }))),
        // frontend property to hold additional entity data (example being an surfaceLayer for logical-deployments )
        requestEntity
    });
});
exports.getSelectedPolicyViolationWithRelated = store_1.createSelector(queryPolicyResolution.getSelected, queryUser.getEntities, queryGroup.getEntities, queryAsset.getEntities, querySurfaceLayer.getEntities, queryPolicyGroup.getEntities, queryLogicalDeployment.getEntities, 
// tslint:disable-next-line:max-line-length
(selectedPolicyViolation, userEntities, groupEntities, assetEntities, surfaceLayerEntities, policyGroupEntities, logicalDeploymentEntities) => helpers_1.Util.isUndefined(selectedPolicyViolation) ?
    selectedPolicyViolation :
    selectedPolicyViolation
        .populate({ userEntities, assetEntities, surfaceLayerEntities, policyGroupEntities, groupEntities, logicalDeploymentEntities }));
exports.getLogicalDeploymentsWithRelated = store_1.createSelector(queryLogicalDeployment.getAll, queryUser.getEntities, querySurfaceLayer.getEntities, queryAsset.getEntities, querySurface.getSelectedId, (logicalDeploymentEntities, userEntities, surfaceLayerEntities, enclaveModelEntities, surfaceId) => logicalDeploymentEntities
    .map(ld => ld.copyWith({
    requester: userEntities[ld.requesterId],
    surfaceLayer: surfaceLayerEntities[ld.surfaceLayerId],
    model: enclaveModelEntities[`enclave-${ld.modelId}`] // TODO: Update when we have modelType
}))
    .filter(ld => ld.surfaceId === surfaceId));
exports.getSelectedLogicalDeploymentWithRelated = store_1.createSelector(queryLogicalDeployment.getSelected, queryUser.getEntities, querySurfaceLayer.getEntities, queryAsset.getEntities, queryDiscoveredDeployment.getAll, queryApproval.getAll, queryPolicyResolution.getAll, querySurface.getSelectedId, 
// tslint:disable-next-line:max-line-length
(selectedDeployment, userEntities, surfaceLayerEntities, enclaveModelEntities, discoveredDeployments, approvals, policyResolutions, surfaceId) => {
    if (!selectedDeployment) {
        return undefined;
    }
    if (selectedDeployment.surfaceId !== surfaceId) {
        return undefined;
    }
    return selectedDeployment.copyWith({
        requester: userEntities[selectedDeployment.requesterId],
        surfaceLayer: surfaceLayerEntities[selectedDeployment.surfaceLayerId],
        model: enclaveModelEntities[`enclave-${selectedDeployment.modelId}`],
        discoveredDeployment: discoveredDeployments.find(dd => dd.logicalDeploymentId === selectedDeployment.id),
        approvalRequests: approvals.filter(ar => ar.requestEntityId === selectedDeployment.id),
        policyResolutions: policyResolutions.filter(pr => pr.deploymentId === selectedDeployment.id)
    });
});
exports.getDiscoveredDeploymentsWithRelated = store_1.createSelector(queryDiscoveredDeployment.getAll, queryAsset.getEntities, queryLogicalDeployment.getEntities, (discoveredDeploymentEntities, enclaveModelEntities, logicalDeploymentEntities) => {
    if (!discoveredDeploymentEntities) {
        return undefined;
    }
    if (!enclaveModelEntities) {
        return undefined;
    }
    return discoveredDeploymentEntities.map(dd => (dd.copyWith({
        model: enclaveModelEntities[`enclave-${dd.modelId}`],
        logicalDeployment: logicalDeploymentEntities[dd.logicalDeploymentId]
    })));
});
exports.getSelectedSurfaceLayerWithRelated = store_1.createSelector(querySurfaceLayer.getSelected, queryPolicyGroup.getAll, queryAwsAccounts.getAll, (selectedSurfaceLayer, allPolicyGroups, allAwsAccounts) => {
    if (!selectedSurfaceLayer) {
        return selectedSurfaceLayer;
    }
    return selectedSurfaceLayer.copyWith({
        policyGroups: allPolicyGroups.filter(pg => pg.inSurface(selectedSurfaceLayer.id)),
        awsAccounts: allAwsAccounts.filter(aa => aa.inSurfaceLayers(selectedSurfaceLayer.id))
    });
});
exports.getSelectedDiscoveredDeploymentWithRelated = store_1.createSelector(queryDiscoveredDeployment.getSelected, queryAsset.getEntities, queryLogicalDeployment.getEntities, (discoveredDeployment, enclaveModelEntities, logicalDeploymentEntities) => {
    if (!discoveredDeployment) {
        return undefined;
    }
    return discoveredDeployment.copyWith({
        model: enclaveModelEntities[`enclave-${discoveredDeployment.modelId}`],
        logicalDeployment: logicalDeploymentEntities[discoveredDeployment.logicalDeploymentId]
    });
});
exports.notificationsWithRelated = store_1.createSelector(queryNotification.getAllNotifications, queryLogicalDeployment.getEntities, (notifications, logicalDeploymentEntities) => notifications.map(notification => {
    if (notification.subjectType === 'DEPLOYMENT') {
        notification.surfaceLayerId = logicalDeploymentEntities[notification.subjectId] ?
            logicalDeploymentEntities[notification.subjectId].surfaceLayerId : undefined;
    }
    return notification;
}));
exports.getAuditHistoryWithRelated = store_1.createSelector(queryAuditHistory.getAuditHistory, queryUser.getEntities, (auditHistory, userEntities) => auditHistory.map(ah => ah.populate({ userEntities })));
exports.getSelectedCloudRoleWithRelated = store_1.createSelector(queryCloudRole.getSelected, exports.getCloudRoleAssignmentsWithRelated, queryApproval.getAll, (selectedCloudRole, cloudRoles, approvals) => !selectedCloudRole ? selectedCloudRole : selectedCloudRole.populate({ cloudRoles, approvals }));
exports.getSelectedBaselineAssetWithRelated = store_1.createSelector(queryBaselineAssets.selected, queryApproval.getAll, queryPolicyViolation.getEvaluation, queryGroup.getEntities, queryAttributeTags.getEntities, queryBaselineAssets.getStats, queryBaselineAssets.getContent, queryBaselineAssets.getOverview, (selectedAsset, approvalRequests, policyViolations, groupEntities, attributeTags, stats, content, overview) => !!selectedAsset ? selectedAsset.populate({
    approvalRequests,
    policyViolations,
    groupEntities,
    attributeTags,
    stats,
    content,
    overview
}) : undefined);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9jb25jb3Vyc2UvamF2YXNjcmlwdC9jb25jb3Vyc2UtYXBwL3NyYy9hcHAvc3RvcmUvc2VsZWN0b3JzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBQTZDO0FBRzdDLHVEQUErRDtBQUUvRCwrRkFBK0Y7QUFDL0Ysc0VBQXNFO0FBQ3RFLDZEQUE2RDtBQUM3RCxxRkFBcUY7QUFDckYsb0ZBQW9GO0FBQ3BGLDBEQUEwRDtBQUMxRCxnRkFBK0U7QUFDL0Usd0ZBQXdGO0FBQ3hGLDRHQUE0RztBQUM1RywyRUFBMkU7QUFDM0UsNEdBQTRHO0FBQzVHLDZEQUE2RDtBQUM3RCxtR0FBbUc7QUFDbkcsNEdBQTRHO0FBQzVHLGlGQUFpRjtBQUNqRixnR0FBZ0c7QUFDaEcsMkZBQTJGO0FBQzNGLDZGQUE2RjtBQUM3RixvRkFBb0Y7QUFDcEYsbUVBQW1FO0FBQ25FLDBEQUEwRDtBQUU3QyxRQUFBLG1DQUFtQyxHQUFHLHNCQUFjLENBQy9ELGlCQUFpQixDQUFDLFdBQVcsRUFDN0Isb0JBQW9CLENBQUMsRUFBRSxDQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0tBQ2pDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO0tBQzVFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLGlDQUFNLEdBQUcsS0FBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUcsRUFBRSxFQUFxQyxDQUFDLENBQzNGLENBQUM7QUFFVyxRQUFBLG1DQUFtQyxHQUFHLHNCQUFjLENBQy9ELDJDQUFtQyxFQUNuQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQy9C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