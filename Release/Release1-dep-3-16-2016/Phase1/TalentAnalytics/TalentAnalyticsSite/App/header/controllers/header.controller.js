'use strict';
angular.module('header').controller('headerController', ['$scope', '$stateParams', 'LoggedInUserDetailsService',
        '$window', 'UserDetails', 'CoreConstants', 'CoreFunctions', '$interval', 'KeepAliveService', 'LogoutService',
        function ($scope, $stateParams, LoggedInUserDetailsService, $window, UserDetails, CoreConstants, CoreFunctions, $interval, KeepAliveService, LogoutService) {
        $scope.loadData = function () {
            var employeeId = $stateParams.employeeId;

            $scope.closeHeaderMenu = function () {
              $scope.headerPopupClose = false;
            };

            $scope.UserId = UserDetails.userId;

            $scope.UserFName = UserDetails.userFirstName;
            $scope.UserLName = UserDetails.userLastName;
            $scope.UserDesig = UserDetails.userDesignation;

            $scope.UserProfileImg = CoreFunctions.getFormattedString(CoreConstants.profileImageLink, CoreConstants.baseProfileImageUrl, UserDetails.windowsUserId);
            $scope.UserDpnNetURL = CoreFunctions.getDPNProfileLink(UserDetails.windowsUserId);
            $scope.myInformationLink = CoreFunctions.getMyInformationLink(UserDetails.windowsUserId);
            $scope.accessEmailURL = CoreConstants.AccessEmailURL;
            $scope.resetPassword = CoreConstants.ResetPassword;
            $scope.resetPin = CoreConstants.ResetPin;
            $scope.reportVoilation = CoreConstants.ReportVoilation;
            $scope.deloitteNet = CoreConstants.DeloitteNet;

            initiateKeepAlive();
        };

        function initiateKeepAlive() {
            $interval(function () {
                if (!$scope.keepAliveServiceCallErroring) {
                    KeepAliveService.get({
                    }, function () {
                    }, function (err) {
                        $scope.keepAliveServiceCallErroring = true;
                        console.error('Keep alive service returned an error: ');
                        console.error(err);
                    });
                }
            }, 300000);
        }

        $scope.logout = function () {
            LogoutService.get({
            }, function (response) {
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
                }
                window.location.href = CoreConstants.deloitteNetLogoutPage;
            }, function (error) {
                console.log("Unable to logout. Error: " + error.statusText);
                window.location.href = CoreConstants.deloitteNetLogoutPage;
            });
        }

        $scope.redirect = function (url)
        {
            window.open(url, '_blank');
        }

        function getDomain() {
            return window.location.host;
        }
        //jquery code for the rate this app
        $("#rateThisApp").rateThisApp({
            userAlias:UserDetails.userId,
            serviceUri: AppRateServiceUri,
            uniqueId: "deloitteRateThisApp",
            show: function (e) {
                var container = $("#deloitteRateThisApp");

                container.addClass("rta-container");
                container.children(".dra-body").addClass("rta-body");
            }
        });

    }]);