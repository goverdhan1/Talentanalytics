'use strict';

angular.module('certificationSummary').factory('CertificationSummaryModel', function () {

    function CertificationSummaryModel() {

    }

    CertificationSummaryModel.prototype.getModelFromResponse = function (response) {

        if (!response || !response.d || !response.d.results) {
            console.error('Invalid response returned for the Summary Certification Details Service');
            return new CertificationSummaryModel();
        }

        var data = response.d.results;
        var model = new CertificationSummaryModel();

        model.list = [];
        data.forEach(function (row) {
            model.list.push({
                certificationDesc: row.CERTIFICATION_DESC,
                proficiency: row.PROFICIENCY,
                certificationeffectiveDate: row.EFFECTIVE_DATE
            });
        });

        return model;
    };

    return CertificationSummaryModel;

});