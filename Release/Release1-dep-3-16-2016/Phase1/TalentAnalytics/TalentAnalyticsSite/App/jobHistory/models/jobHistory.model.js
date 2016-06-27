'use strict';

angular.module('jobHistory').factory('JobHistoryModel', function () {

    function JobHistoryModel() {

    }

    JobHistoryModel.prototype.getModelFromResponse = function (response) {
        var data = response.d.results;

        var model = new JobHistoryModel();

        model.list = [];
        data.forEach(function (row) {
            model.list.push({
                effectiveDate: row.EFFECTIVE_DATE,
                actionType: row.ACTION_TYPE,
                actionTypeDescription:row.ACTION_TYPE_DESC,
                pLevelTxt:row.PLEVEL_TXT,
                reasonForAction:row.REASON_FOR_ACTION,
                reasonForActionDesc: row.REASON_FOR_ACTION_DESC,
                jobCode:row.JOB_KEY,
                jobDescription: row.JOB_MED_TXT,
                positionCode:row.HRPOSITION_KEY,
                positionDescription: row.HRPOSITION_TXT,
                typeOfChange: row.TYPE_OF_CHANGE
            });
        });

        return model;
    };

    return JobHistoryModel;

});