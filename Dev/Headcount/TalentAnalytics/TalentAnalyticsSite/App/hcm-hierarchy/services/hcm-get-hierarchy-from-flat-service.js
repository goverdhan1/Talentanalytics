'use strict';

/*
 * Given a flat list of nodes with defined levels, this service can be used to get a hierarchical structure data from it
 * This service does not handle the check or uncheck status of the nodes. It only rearranges the source flat data and returns the hierarchical json
 */
angular.module('hcm-hierarchy').factory('HcmGetHierarchyFromFlatService',
  function () {
      return {
          getHierarchyFromFlatList: getHierarchyFromFlatList
      };

      function getHierarchyFromFlatList(data) {
          var nodes = [];
          var parentPositions = {};
          data.forEach(function (item) {
              var level = parseInt(item.LEVEL);

              if (level === 0) {
                  return;
              }

              //CHILD property gives the node id
              //PARENT property gives the parent node id

              //lets say level is 5
              //nodes[level1Index].children[level2Index].children[level3Index].children[level4Index].push(item);

              var parentLevels = [];
              var currentLevel = level;
              var nodeName = item.PARENT;
              while (currentLevel > 1) {
                  var positionOfParent = parentPositions[nodeName];

                  if (!positionOfParent) {
                      console.error('Problem with logic of parentLevels ', nodeName);
                      return;
                  }

                  parentLevels.push(positionOfParent);

                  currentLevel--;
                  nodeName = positionOfParent.parentName;
              }

              var parent = nodes;

              for (var ctr = parentLevels.length - 1; ctr >= 0; ctr--) {
                  var parentLevel = parentLevels[ctr];

                  var positionOfParent = parentLevel.position;

                  if (!parent[positionOfParent]) {
                      console.error('Problem with the logic', item);
                      return;
                  } else {
                      if (!parent[positionOfParent].children) {
                          parent[positionOfParent].children = [];
                      }
                      parent = parent[positionOfParent].children;
                  }
              }

              var obj = {};
              obj.id = item.CHILD;
              obj.name = item.CHILD_TEXT;
              obj.checked = false;
              obj.level_number = item.LEVEL;
              obj.parent_id = item.PARENT;

              parent.push(obj);
              var position = parent.length - 1;
              parentPositions[item.CHILD] = { position: position, parentName: item.PARENT };
          });

          return nodes;
      }
  });