'use strict';

angular.module('headcountManagementFilter').factory('HeadcountManagementFilterSelectedAttributeValues',
  function ($resource, CoreConstants, UserDetails, HeadcountManagementFilterData, toaster, HcmGetHierarchyService, $q, HCMParseHierarchyViewService) {
      var savedAttributeValues = null;
      return {
          setSavedAttributeValues: function (userName, filterName, callback) {
              //if (savedAttributeValues) {
              //    return savedAttributeValues;
              //}
              //else {
              var promises = [];
              var url = CoreConstants.baseHeadcountUrl + "Services/Employee_HCM_FilterGetService.xsodata/HCM_HEADCOUNT_FILTER_GET_SERVICEParameters(IP_USERNAME=':userName',IP_FILTERNAME=':filterName')/Results?$format=json";
              var Result = $resource(url, { userName: '@userName', filterName: '@filterName' }, {
                  'get': {
                      method: 'GET',
                      withCredentials: true,
                      transformResponse: function (data) {
                          data = angular.fromJson(data).d;
                          HeadcountManagementFilterData.selectedAttributeValues = {};
                          angular.forEach(data.results, function (item) {
                              var selAttr;
                              if (item.TYPE_OF_FILTER == 'DATE') {
                                  selAttr = item.TYPE_OF_FILTER;
                                  if (HeadcountManagementFilterData.selectedAttributeValues[selAttr] === undefined || Object.keys(HeadcountManagementFilterData.selectedAttributeValues[selAttr]).length == 0)
                                      HeadcountManagementFilterData.selectedAttributeValues[selAttr] = {};

                                  HeadcountManagementFilterData.selectedAttributeValues[selAttr] = item;
                              }
                              else {
                                  selAttr = item.ATTRIBUTENAME_DATE;
                                  if (HeadcountManagementFilterData.selectedAttributeValues[selAttr] === undefined || HeadcountManagementFilterData.selectedAttributeValues[selAttr].length == 0)
                                      HeadcountManagementFilterData.selectedAttributeValues[selAttr] = [];

                                  switch (selAttr) {
                                      case 'PAYPCT':
                                          var paytctValues = item.ATTRIBUTE_NAME.split('-');
                                          for (var i = 0; i < paytctValues.length; i++) {
                                              HeadcountManagementFilterData.selectedAttributeValues[selAttr].push(parseFloat(paytctValues[i]));
                                          }
                                          break;
                                      case 'MAST_CCTR_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.COST_CENTER_HIER, item.ROOT));
                                          break;
                                      case 'PFUNCTION_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.FUNCTION_HIER, item.ROOT));
                                          break;
                                      case 'PLEVEL_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.JOB_LEVEL_HIER, item.ROOT));
                                          break;
                                      case 'PHRREGN_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.REGION_HIER, item.ROOT));
                                          break;
                                      case 'ORGUNIT_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.ORGUNIT_HIER, item.ROOT));
                                          break;
                                      case 'PPMARKET_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.PMARKET_OFFER_HIER, item.ROOT));
                                          break;
                                      case 'PSMARKET_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.SMARKET_OFFER_HIER, item.ROOT));
                                          break;
                                      case 'USI_FUNC_TXT_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.USI_AFUNCTION_HIER, item.ROOT));
                                          break;
                                      case 'AGE_GENERATION_HIER':
                                          var updater = new FilterDataUpdater(HeadcountManagementFilterData.selectedAttributeValues, selAttr);
                                          promises.push(updater.update(item.AGE_GENERATION_HIER, item.ROOT));
                                          break;


                                      default:
                                          HeadcountManagementFilterData.selectedAttributeValues[selAttr].push(item.ATTRIBUTE_NAME);
                                          break;
                                  }

                                  // for Exclude / Include Toggle button
                                  var excludeSetKey = selAttr + '_EXCLUDE';
                                  
                                  if (item.HIERARCHY_INCLUDE_EXCLUDE === 'EXCLUDE_ALL') {
                                      HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] = true;          //For Hierachy Attributes
                                  }
                                  else  if (item.HIERARCHY_INCLUDE_EXCLUDE === 'INCLUDE_ALL') {                              
                                      HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] = false;
                                  }
                                  else if (item.OPERATOR === 'NOT IN' ) {                                      
                                      HeadcountManagementFilterData.selectedAttributeValues[excludeSetKey] = item.OPERATOR; //For NonHierachy Attributes
                                  }
                              }
                          });
                      }
                  }
              });
              var deferred = $q.defer();

              Result.get({ userName: userName, filterName: filterName }).$promise
              .then(function () {
                     return $q.all(promises);
                  }, function (err) {
                     deferred.reject();                 
                  }).then(function () {
                         deferred.resolve();
                      }, function (err) {
                         deferred.reject();
                      });              

              return deferred.promise;
          },
          getSavedAttributeValues: function () {
              return savedAttributeValues;
          }
      }

      function FilterDataUpdater(attributes, attributeName) {
          this.attributes = attributes;
          this.attributeName = attributeName;
          this.update = function (json, rootId) {
              this.attributes[this.attributeName] = { data: HCMParseHierarchyViewService.parsedJson(json) };
              this.attributes[this.attributeName + '_root_id'] = rootId;
              var deferred = $q.defer();
              var _this = this;

              // get hierarchy data in order to count selected values             
              HcmGetHierarchyService.getHierarchyData(this.attributeName, rootId, function (data) {
                  _this.attributes[_this.attributeName].count = data.selectedAttributeValCount;
                  deferred.resolve();
                  
              }, function (err) {
                  deferred.reject();
                  // Tracking errors
                  var errMessage = "Get hierarchy data returned an error";
                  console.error(errMessage, err);
                  toaster.pop('error', errMessage);
              })

              return deferred.promise;
          };
      }
  }
);