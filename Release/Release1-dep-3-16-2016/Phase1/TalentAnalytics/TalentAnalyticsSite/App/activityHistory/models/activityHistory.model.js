'use strict';

angular.module('activityHistory').factory('ActivityHistoryModel', function () {

    function ActivityHistoryModel() {

    }

    ActivityHistoryModel.prototype.getModelFromResponse = function (response) {

        if (!response || !response.d || !response.d.results) {
            console.error('Invalid response returned for the Summary Activity History Service');
            return new ActivityHistoryModel();
        }

        var data = response.d.results;
        var model = new ActivityHistoryModel();
        model.list = [];
        data.forEach(function (row) {
            var typeOfChange = row.TYPE_OF_CHANGE ? row.TYPE_OF_CHANGE.replace(" Change", "") : null;

            model.list.push({
                changeDate: row.CHANGE_DATE,
                typeOfChange: typeOfChange,
                actionTypeDesc: row.ACTION_TYPE_DESC,
                reasonforActionDesc: row.REASON_FOR_ACTION_DESC,
                securedata: row.SECURITY_FLAG
            });
        });

        return model;
    };

    return ActivityHistoryModel;

});