'use strict';

angular.module('headcountManagementFilter').factory('HcmCascading',
  function (HcmCascadingCostCenter, HcmCascadingHistoricFunction, HeadcountManagementFilterData, toaster, HcmCascadingGetLineAttributeValuesService, HcmCascadingGetAreaAttributeValuesService, HcmGetCascadingAttributeValuesService) {
      var costCenter = null;
      var historicFunction = null;
      var attributeValues = [];

      function getCascadingServiceHandle(attribute) {
          switch (attribute) {
              case 'PFUNCTION_CURR':
              case 'PHRSAREA_CURR':
              case 'PHRSLINE_CURR':
                  return HcmCascadingCostCenter;
                  break;
              case 'PFUNCTION':
              case 'PHRSAREA':
              case 'PHRSLINE':
                  return HcmCascadingHistoricFunction;
                  break;
          }
      }
      function getAttributeVal(attribute) {
          switch (attribute) {
              case 'PFUNCTION_CURR':
              case 'PHRSAREA_CURR':
              case 'PHRSLINE_CURR':
                  return costCenter;

              case 'PFUNCTION':
              case 'PHRSAREA':
              case 'PHRSLINE':
                  return historicFunction;
          }
      }
      function setAttributeVal(attribute, data) {
          switch (attribute) {
              case 'PFUNCTION_CURR':
              case 'PHRSAREA_CURR':
              case 'PHRSLINE_CURR':
                  costCenter = data;
                  break;
              case 'PFUNCTION':
              case 'PHRSAREA':
              case 'PHRSLINE':
                  historicFunction = data;
                  break;
          }
      }
      function getDataByAttribute(data, selectedAttribute) {
          var savedData;
          savedData = HeadcountManagementFilterData.selectedAttributeValues;

          attributeValues = [];
          var d = {};
          var isFunctionAttributeExcluded = false;
          var isAreaAttributeExcluded = false;
          var excludeSetKey;
          switch (selectedAttribute) {
              case 'PFUNCTION':
              case 'PFUNCTION_CURR':
                      angular.forEach(angular.fromJson(data), function (item) {
                          HcmGetCascadingAttributeValuesService.getCascadingAttributeValues(item, savedData, selectedAttribute, attributeValues);
                      });
                  break;
              case 'PHRSAREA':
                  //Check function attribute is excluded
                  excludeSetKey = 'PFUNCTION_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PFUNCTION'] != 'undefined' && ['PFUNCTION'] != undefined && savedData['PFUNCTION'].length > 0)
                      isFunctionAttributeExcluded = true;
                  HcmCascadingGetAreaAttributeValuesService.getCascadingAreaAttributeValues(data, 'PFUNCTION', selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded);
                  break;
              case 'PHRSAREA_CURR':
                  //Check function attribute is excluded
                  excludeSetKey = 'PFUNCTION_CURR_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PFUNCTION_CURR'] != 'undefined' && savedData['PFUNCTION_CURR'] != undefined && savedData['PFUNCTION_CURR'].length > 0)
                      isFunctionAttributeExcluded = true;
                  HcmCascadingGetAreaAttributeValuesService.getCascadingAreaAttributeValues(data, 'PFUNCTION_CURR', selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded);
                  break;
              case 'PHRSLINE':
                  //Check function attribute is excluded
                  excludeSetKey = 'PFUNCTION_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PFUNCTION'] != 'undefined' && savedData['PFUNCTION'] != undefined && savedData['PFUNCTION'].length > 0)
                      isFunctionAttributeExcluded = true;

                  //Check area attribute is excluded
                  excludeSetKey = 'PHRSAREA_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PHRSAREA'] != 'undefined' && savedData['PHRSAREA'] != undefined && savedData['PHRSAREA'].length > 0)
                      isAreaAttributeExcluded = true;

                  HcmCascadingGetLineAttributeValuesService.getCascadingLineAttributeValues(data, 'PFUNCTION', 'PHRSAREA', selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded, isAreaAttributeExcluded);
                  break;

              case 'PHRSLINE_CURR':
                  //Check function attribute is excluded
                  excludeSetKey = 'PFUNCTION_CURR_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PFUNCTION_CURR'] != 'undefined' && savedData['PFUNCTION_CURR'] != undefined && savedData['PFUNCTION_CURR'].length > 0)
                      isFunctionAttributeExcluded = true;
                  //Check area attribute is excluded
                  excludeSetKey = 'PHRSAREA_CURR_EXCLUDE';
                  if (savedData[excludeSetKey] && savedData['PHRSAREA_CURR'] != 'undefined' && savedData['PHRSAREA_CURR'] != undefined && savedData['PHRSAREA_CURR'].length > 0)
                      isAreaAttributeExcluded = true;
                  HcmCascadingGetLineAttributeValuesService.getCascadingLineAttributeValues(data, 'PFUNCTION_CURR', 'PHRSAREA_CURR', selectedAttribute, savedData, attributeValues, isFunctionAttributeExcluded, isAreaAttributeExcluded);
                  break;
          }

          // Remove duplicate data
          var result = [];

          $.each(attributeValues, function (index, value) {
              var matchingItems = $.grep(result, function (item) {
                  return item.name === value.name && item.id === value.id;
              });
              if (matchingItems.length === 0) {
                  result.push(value);
              }
          });

          // update cascading filtered selected values
          var selectedValues = [];
          angular.forEach(result, function (item) {
              if (item.checked) {
                  selectedValues.push(item.id);
              }
          });

          if(selectedValues.length > 0){
              HeadcountManagementFilterData.selectedAttributeValues[selectedAttribute] = selectedValues;
          }

          d.results = result;
          return d;
      }

      return {
          getCascadingData: function (selectedAttribute, savedData, callback) {
              if (getAttributeVal(selectedAttribute)) {
                  callback(getDataByAttribute(getAttributeVal(selectedAttribute), selectedAttribute));
              }
              else {
                  getCascadingServiceHandle(selectedAttribute).get(function (data) {
                      setAttributeVal(selectedAttribute, angular.fromJson(data.results));
                      callback(getDataByAttribute(angular.fromJson(data.results), selectedAttribute));
                  }, function (err) {
                      // Tracking errors
                      var errMessage = "Get cascading returned an error";
                      console.error(errMessage, err);
                      toaster.pop('error', errMessage);
                  });
              }
          }
      }
  });