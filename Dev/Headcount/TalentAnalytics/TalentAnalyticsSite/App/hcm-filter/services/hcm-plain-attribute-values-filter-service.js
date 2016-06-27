'use strict';

angular.module('headcountManagementFilter').factory('HeadcountManagementFilterPlainAttributeValuesService',
  function ($resource, CoreConstants, HeadcountManagementFilterData, HcmPocEditFilterValues, toaster) {

      var plainAttributeValues = {};

      function getPlainAttributeValues(selectedAttribute,data)
      {
          var savedData;
          savedData = HeadcountManagementFilterData.selectedAttributeValues[selectedAttribute];

          var attributeValues = [];
          var attributeValue = {};
          angular.forEach(data.results, function (item) {
              if (item.ATTRIBUTE_NAME && item.ATTRIBUTE_VALUE) {
                  attributeValue = {};
                  attributeValue.id = angular.copy(item.ATTRIBUTE_NAME);
                  attributeValue.name = angular.copy(item.ATTRIBUTE_VALUE);

                  var curValue;
                  if (savedData) {
                      curValue = savedData.filter(function (savedVal) {
                          return (savedVal === item.ATTRIBUTE_NAME);
                      });
                  }

                  if (savedData && curValue && curValue.length > 0) {
                      attributeValue.checked = true;
                  }
                  else {
                      attributeValue.checked = false;
                  }

                  attributeValues.push(angular.copy(attributeValue));
              }
          });
          var d = {};
          d.results = attributeValues;
          return d;
      }
      return {
          getPlainAttributeValues: function (selectedAttribute, callback) {             
              if (plainAttributeValues[selectedAttribute] != null) {
                  callback(getPlainAttributeValues(selectedAttribute, plainAttributeValues[selectedAttribute]));
              }
              else {
                  HcmPocEditFilterValues.get({ selectedAttribute: selectedAttribute }, function (data) {
                      plainAttributeValues[selectedAttribute] = data;
                      callback(getPlainAttributeValues(selectedAttribute, data));
                  }, function (error) {
                      // Tracking errors
                      var errMessage = "Edit filter values error";
                      console.error(errMessage, error);
                      toaster.pop('error', errMessage);
                  });
              }
          }
      };
  }
);