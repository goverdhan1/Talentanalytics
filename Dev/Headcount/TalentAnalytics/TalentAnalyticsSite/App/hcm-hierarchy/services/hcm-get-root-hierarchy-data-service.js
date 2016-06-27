'use strict';

angular.module('hcm-hierarchy').factory('HcmGetRootHierarchyService', ['HcmCostCenterRootNode', 'HcmJobLevelRootNode', 'HcmMarketOfferRootNode', 'HcmSecondaryMarketOfferRootNode',
                                        'HcmOrgUnitRootNode', 'HcmFunctionRootNode', 'HcmRegionRootNode', 'HcmGenerationRootNode', 'HcmUSIAlignFunctionRootNode', 'toaster',
function (HcmCostCenterRootNode, HcmJobLevelRootNode, HcmMarketOfferRootNode, HcmSecondaryMarketOfferRootNode, HcmOrgUnitRootNode,
    HcmFunctionRootNode, HcmRegionRootNode, HcmGenerationRootNode, HcmUSIAlignFunctionRootNode, toaster) {

      var hierarchyRootData = {};

      var getRootHierarchyServiceHandle = function (attribute) {
          switch (attribute) {
              case 'MAST_CCTR_HIER':
                  return HcmCostCenterRootNode;
              case 'PLEVEL_HIER':
                  return HcmJobLevelRootNode;
              case 'PPMARKET_HIER':
                  return HcmMarketOfferRootNode;
              case 'PSMARKET_HIER':
                  return HcmSecondaryMarketOfferRootNode;
              case 'ORGUNIT_HIER':
                  return HcmOrgUnitRootNode;
              case 'PFUNCTION_HIER':
                  return HcmFunctionRootNode;
              case 'PHRREGN_HIER':
                  return HcmRegionRootNode;
              case 'AGE_GENERATION_HIER':
                  return HcmGenerationRootNode;
              case 'USI_FUNC_TXT_HIER':
                  return HcmUSIAlignFunctionRootNode;
          }
      }

      return {
          getRootHierarchyData: function (selectedAttribute, callback) {

              if (hierarchyRootData[selectedAttribute] !== undefined) {
                  callback(hierarchyRootData[selectedAttribute]);
              }
              else {
                  getRootHierarchyServiceHandle(selectedAttribute).get(selectedAttribute).$promise.then(function (data) {
                      hierarchyRootData[selectedAttribute] = data;
                      callback(data);
                  }, function (error) {
                      // Tracking errors
                      var errMessage = "Get root hierarchy service returned an error";
                      console.error(errMessage, error);
                      toaster.pop('error', errMessage);
                  });
              }
          },

          clearRootHierarchyData: function () {
              hierarchyRootData = {};
          }          
      }
  }]);