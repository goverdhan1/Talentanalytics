'use strict';

angular.module('ratingHistory').factory('RatingHistoryModel', function () {

    function RatingHistoryModel() {

    }

    RatingHistoryModel.prototype.getModelFromResponse = function (response) {

        if (!response || !response.d || !response.d.results) return response;
        var data = response.d.results;
        var model = new RatingHistoryModel();
        model.list = [];
        data.forEach(function (row) {
               model.list.push({
                RatingYear: row.FISCALYEAR,
                YearRank: row.PGEAPPRTE
            });
           
        });
        return model;
    };

    return RatingHistoryModel;

});