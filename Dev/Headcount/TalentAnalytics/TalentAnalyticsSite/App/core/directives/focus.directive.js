﻿'use strict';

angular.module('core').directive('focusMe', function ($timeout, $parse) {
    return {
        scope: { trigger: '@focusMe' },
        link: function (scope, element) {
            scope.$watch('trigger', function (value) {
                if (value === "true") {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            });
        }
    };
});