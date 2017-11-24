myApp = angular.module('RVTD_tripsPage', [])
    .config(function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self'
        ]);
    });

myApp.controller('AddTripCtrl', [
    '$scope', '$http',
    function($scope, $http) {

        $scope.submitNewTrip = function() {
            $scope.errorMessage = '';

            // A little "spin-lock" to prevent double-submission
            // (because disabling the submit button still allows double-posts
            //  if a user hits the ENTER key to submit the form multiple times.)
            if ($scope.busySubmittingTrip) {
                return;
            }

            // Harvest the data out of the form
            // (thanks to ng-model, it's already in the $scope object)
            var _newTrip = {
                OriginDateTime: $scope.newTripOriginDateTime,
                OriginAddress: $scope.newTripOriginAddress,
                OriginCity: $scope.newTripOriginCity,
                OriginState: $scope.newTripOriginState,
                OriginZip: $scope.newTripOriginZip,
                DestinationDateTime: $scope.newTripDestinationDateTime,
                DestinationAddress: $scope.newTripDestinationAddress,
                DestinationCity: $scope.newTripDestinationCity,
                DestinationState: $scope.newTripDestinationState,
                DestinationZip: $scope.newTripDestinationZip,
                DestinationPhone: $scope.newTripDestinationPhone
            };

            // (this is where you put your client-side validation when relevant)

            if (_newTrip.OriginDateTime === null || !/.*/.test(_newTrip.OriginDateTime)) {
                $scope.errorMessage = "Origin DateTime must be yyyy-mm-dd hh:mm:ss.";
            }
            if (_newTrip.OriginAddress === null) {
              $scope.errorMessage = "Origin Address is required.";
            }
            if (_newTrip.OriginCity === null) {
              $scope.errorMessage = "Origin City is required.";
            }
            if (_newTrip.OriginState === null || !/((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))/.test(_newTrip.OriginState)) {
              $scope.errorMessage = "Origin State is required and must be an official 2-character code.";
            }
            if (_newTrip.OriginZip === null || !/^\d{5}$|^\d{5}(-\d{4})$/.test(_newTrip.OriginZip)) {
              $scope.errorMessage = "Origin Zip is required and must be 5 digits or 5 digits followed by hyphen and 4 digits.";
            }
            if (_newTrip.DestinationDateTime === null || !/.*/.test(_newTrip.DestinationDateTime)) {
              $scope.errorMessage = "Destination DateTime is required and must be DateTime.";
            }
            if (_newTrip.DestinationAddress === null) {
              $scope.errorMessage = "Destination Address is required.";
            }
            if (_newTrip.DestinationCity === null) {
              $scope.errorMessage = "Destination City is required.";
            }
            if (_newTrip.DestinationState === null || !/((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))/.test(_newTrip.DestinationState)) {
              $scope.errorMessage = "Destination State is required and must be an official 2-character code.";
            }
            if (_newTrip.DestinationZip === null || !/^\d{5}$|^\d{5}(-\d{4})$/.test(_newTrip.DestinationZip)) {
              $scope.errorMessage = "Destination Zip is required and must be 5 digits or 5 digits followed by hyphen and 4 digits.";
            }
            if (_newTrip.DestinationPhone === null) {
              $scope.errorMessage = "Destination Phone is required.";
            }

            if ($scope.errorMessage === "") {
                // Now we'll submit the new Trip to the server:

                // First, show a loading State
                // (also disables form submission)
                $scope.busySubmittingTrip = true;

                $http.post('/trips/create', {
                  OriginDateTime: _newTrip.OriginDateTime,
                  OriginAddress: _newTrip.OriginAddress,
                  OriginCity: _newTrip.OriginCity,
                  OriginState: _newTrip.OriginState,
                  OriginZip: _newTrip.OriginZip,
                  DestinationDateTime: _newTrip.DestinationDateTime,
                  DestinationAddress: _newTrip.DestinationAddress,
                  DestinationCity: _newTrip.DestinationCity,
                  DestinationState: _newTrip.DestinationState,
                  DestinationZip: _newTrip.DestinationZip,
                  DestinationPhone: _newTrip.DestinationPhone
                })
                    .then(function onSuccess(sailsResponse) {
                    })
                    .catch(function onError(error) {
                        console.log("An unexpected error occurred: " + error.statusText);
                        if (error.data.invalidAttributes) {
                            $scope.errorMessage = 'Error writing to database. ';
                            for (var attribute in error.data.invalidAttributes) {
                                $scope.errorMessage = $scope.errorMessage + ' Invalid data in ' + attribute;
                            }
                        } else {
                            $scope.errorMessage = 'Error writing to database.';
                        }

                    })
                    .finally(function eitherWay() {
                        $scope.busySubmittingTrip = false;
                        $scope.newTripOriginDateTime = '';
                        $scope.newTripOriginAddress = '';
                        $scope.newTripOriginCity = '';
                        $scope.newTripOriginState = '';
                        $scope.newTripOriginZip = '';
                        $scope.newTripDestinationDateTime = '';
                        $scope.newTripDestinationAddress = '';
                        $scope.newTripDestinationCity = '';
                        $scope.newTripDestinationState = '';
                        $scope.newTripDestinationZip = '';
                        $scope.newTripDestinationPhone = '';
                    });
            }
        };
    }

]);


