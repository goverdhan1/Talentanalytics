'use strict';

angular.module('hcm-hierarchy').factory('HcmGetHierarchyService',
  function (HeadcountManagementFilterData, HcmFilterHierarchyService, HcmJobLevelHierarchyService, HcmMarketOfferHierarchyService,
      HcmSecondaryMarketOfferHierarchyService, HcmOrgUnitHierarchyService, HcmFunctionHierarchyService, HcmRegionHierarchyService,
      HcmGenerationHierarchyService, HcmUSIAlignFunctionHierarchyService, HcmGetHierarchyFromFlatService, HcmSetCheckedStatusForTreeNodesService,
      toaster, HCMParseHierarchyViewService) {

      
      var hierarchyData = {};
      var hierearchySearch = '';
      var checkedStatus = [];
      var hierarchicalData;

      function sortOnLevelAndOrder(data) {
          data.sort(function (first, second) {
              var firstLevel = parseInt(first.LEVEL);
              var secondLevel = parseInt(second.LEVEL);
              if (firstLevel === secondLevel) {
                  var firstOrder = first.SORT_ORDER_VALUE;
                  var secondOrder = second.SORT_ORDER_VALUE;
                  if (firstOrder && secondOrder) {
                      return parseInt(firstOrder) - parseInt(secondOrder);
                  }
              }
              return firstLevel - secondLevel;
          });
      }
      // Todo: Once again cross check the Attribute Values
      // Todo: Function Hierarchy value is shown in Atribute List, make sure the case 'Function_HIER is corrent'
      function getHierarchyServiceHandle(attribute) {
          switch (attribute) {
              case 'MAST_CCTR_HIER':
                  return HcmFilterHierarchyService;
              case 'PLEVEL_HIER':
                  return HcmJobLevelHierarchyService;
              case 'PPMARKET_HIER':
                  return HcmMarketOfferHierarchyService;
              case 'PSMARKET_HIER':
                  return HcmSecondaryMarketOfferHierarchyService;
              case 'ORGUNIT_HIER':
                  return HcmOrgUnitHierarchyService;
              case 'PFUNCTION_HIER':
                  return HcmFunctionHierarchyService;
              case 'PHRREGN_HIER':
                  return HcmRegionHierarchyService;
              case 'AGE_GENERATION_HIER':
                  return HcmGenerationHierarchyService;
              case 'USI_FUNC_TXT_HIER':
                  return HcmUSIAlignFunctionHierarchyService;
          }
      }          

      function getTreeviewData(data, savedItem) {

          var data = data.results;

          sortOnLevelAndOrder(data);

          hierarchicalData = [];

          hierarchicalData = HcmGetHierarchyFromFlatService.getHierarchyFromFlatList(data);

          // create new json to keep checked and unchecked item
          checkedStatus = []
          HCMParseHierarchyViewService.createCheckedItem(savedItem, checkedStatus);

          // update saved item
          var selectedAttributeValCount = HcmSetCheckedStatusForTreeNodesService.setCheckedStatusForTreeNodes(hierarchicalData, checkedStatus);

          var d = {}
          d.results = hierarchicalData;
          d.selectedAttributeValCount = selectedAttributeValCount;
          return d;
      }

      function getFlatData(data) {
          var parent = [];
          function iteration(data) {
              for (var i = 0; i < data.length; i++) {
                  var obj = {};
                  obj.id = data[i].id;
                  obj.name = data[i].name;
                  obj.checked = data[i].checked;
                  obj.level_number = data[i].level_number;
                  obj.parent_id = data[i].parent_id;
                  parent.push(obj);
                  if (data[i].children != null && data[i].children.length > 0) {
                      iteration(data[i].children)
                  }
              }
          }
          iteration(data);
         
          var d = {}
          d.results = parent;
          return d;
      }

      function getAllIdsForAGivenNode(treeData, nodeId) {
          var allIdsForNode = {};

          findMatchingNode(treeData);
          return allIdsForNode;

          function findMatchingNode(data) {
              for (var i = 0; i < data.length; i++) {
                  if (data[i].id === nodeId) {
                      iteration([data[i]]);
                      break;
                  }
                  if (data[i].children != null && data[i].children.length > 0) {
                      findMatchingNode(data[i].children);
                  }
              }
          }

          function iteration(data) {
              for (var i = 0; i < data.length; i++) {
                  allIdsForNode[data[i].id] = true;
                  if (data[i].children != null && data[i].children.length > 0) {
                      iteration(data[i].children)
                  }
              }
          }
      }

      function getCorrespondingNodeInTreeView(treeData, nodeId) {
          var matchedNode = null;
          findMatchingNode(treeData);
          if (!matchedNode) {
              console.error('Could not find a matched node for ', nodeId);
          }
          return matchedNode;

          function findMatchingNode(data) {
              for (var i = 0; i < data.length; i++) {
                  if (data[i].id === nodeId) {
                      matchedNode = data[i];
                      break;
                  }
                  if (!matchedNode && data[i].children != null && data[i].children.length > 0) {
                      findMatchingNode(data[i].children);
                  }
              }
          }
      } 

      function updateCorrespondingNodeAndChildrenForTreeView(node, checkedStatus) {
          iteration(node);
          
          function iteration(data) {
              data.checked = checkedStatus;
              if (data.children && data.children.length) {
                  data.children.forEach(function(item){
                      iteration(item);
                  });
              }
          }
      }


      return {
          getHierarchyData: function (selectedAttribute, rootNode, callback) {
              hierearchySearch = rootNode;

              var treeviewDataExists = hierarchyData[rootNode] && hierarchyData[rootNode].treeviewData && hierarchyData[rootNode].treeviewData.results.length > 0;             

              if (treeviewDataExists) {
                  callback(hierarchyData[rootNode].treeviewData);
              }
              else if (rootNode !== '') {
                  getHierarchyServiceHandle(selectedAttribute).get({ rootId: rootNode }, function (data) {                    

                      // Getting saved item from memory and keep it in variable for further process
                      var savedItem = HeadcountManagementFilterData.selectedAttributeValues[selectedAttribute].data;

                      hierarchyData[rootNode] = data;
                      hierarchyData[rootNode].treeviewData = getTreeviewData(data, savedItem);
                      callback(hierarchyData[rootNode].treeviewData);
                  }, function (err) {
                      // Tracking errors
                      var errMessage = "Get treeview data service returned an error";
                      console.error(errMessage, err);
                      toaster.pop('error', errMessage);
                  });
              }
          },

          getHierarchySearch: function () {
              return hierarchyData[hierearchySearch];
          },

          clearHierarchyData: function () {
              hierarchyData = {};
          },

          removeRootHierarchyData: function (rootNode) {
              if (hierarchyData[rootNode]!== undefined) {
                  delete hierarchyData[rootNode];
              }
          },

          getFlatViewData: function (data, callback) {
              callback(getFlatData(data));
          },

          getAllIdsForAGivenNode: getAllIdsForAGivenNode,

          getCorrespondingNodeInTreeView: getCorrespondingNodeInTreeView,

          updateCorrespondingNodeAndChildrenForTreeView: updateCorrespondingNodeAndChildrenForTreeView
      }
  });