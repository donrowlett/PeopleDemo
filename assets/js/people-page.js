myApp = angular.module('RVTD_peoplePage', [])
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self'
    ]);
  });

myApp.controller('PageCtrl', [
  '$scope', '$http',
  function ($scope, $http) {
    /////////////////////////////////////////////////////////////////////////////
    // Immediately start fetching list of people from the server.
    /////////////////////////////////////////////////////////////////////////////

    fetch_people();
    // if (sailsResponse.data.length === 0) {

    // }

    function fetch_people() {
      // First, show a loading spinner
      $scope.peopleLoading = true;
      $scope.errorMessage = "";

      $scope.submitPeopleError = false;

      // Get the existing people.
      $http.get('/people')

        .then(function onSuccess(sailsResponse) {
          $scope.people = sailsResponse.data;
        })
        .catch(function onError(sailsResponse) {

          if (sailsResponse.data.status === '404') {
            return;
          }

          console.log("An unexpected error occurred: " + sailsResponse.data.statusText);

        })
        .finally(function eitherWay() {
          $scope.peopleLoading = false;
        });
    }

    $scope.edit_person = function (personData) {
      $scope.newPersonID = personData.ID;
      $scope.newPersonFirstName = personData.FirstName;
      $scope.newPersonLastName = personData.LastName;
      $scope.newPersonStreetAddress = personData.StreetAddress;
      $scope.newPersonCity = personData.City;
      $scope.newPersonState = personData.State;
      $scope.newPersonZip = personData.Zip;
      $scope.newPersonPhone = personData.Phone;
      $scope.newPersonPhotoUrl = personData.PhotoUrl;
      $scope.buttonLabel = "Update Person";
    };

    $scope.delete_person = function (personData) {
      if (confirm("Delete this person?") === true) {
        $http.post('/people/destroy/' + personData.ID)
          .then(function onSuccess(sailsResponse) {
            fetch_people();
          })
          .catch(function onError(error) {
            console.log("An unexpected error occurred: " + error.statusText);
            $scope.errorMessage = 'Error deleting from database.';
          })
          .finally(function eitherWay() {
          });
      }
    };

    $scope.submitNewPerson = function () {
      $scope.errorMessage = '';

      // A little "spin-lock" to prevent double-submission
      // (because disabling the submit button still allows double-posts
      //  if a user hits the ENTER key to submit the form multiple times.)
      if ($scope.busySubmittingPerson) {
        return;
      }

      // Harvest the data out of the form
      // (thanks to ng-model, it's already in the $scope object)
      var _newPerson = {
        ID: $scope.newPersonID,
        FirstName: $scope.newPersonFirstName,
        LastName: $scope.newPersonLastName,
        StreetAddress: $scope.newPersonStreetAddress,
        City: $scope.newPersonCity,
        State: $scope.newPersonState,
        Zip: $scope.newPersonZip,
        Phone: $scope.newPersonPhone,
        PhotoUrl: $scope.newPersonPhotoUrl
      };

      // (this is where you put your client-side validation when relevant)

      if (_newPerson.FirstName === null || /[^a-zA-Z ]/.test(_newPerson.FirstName)) {
        $scope.errorMessage = "First Name is required and must be alpha only.";
      }
      if (_newPerson.LastName === null || /[^a-zA-Z ]/.test(_newPerson.LastName)) {
        $scope.errorMessage = "Last Name is required and must be alpha only.";
      }
      if (_newPerson.StreetAddress === null) {
        $scope.errorMessage = "Street Address is required.";
      }
      if (_newPerson.City === null) {
        $scope.errorMessage = "City is required.";
      }
      if (_newPerson.State === null || !/((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))/.test(_newPerson.State)) {
        $scope.errorMessage = "State is required and must be an official 2-character code.";
      }
      if (_newPerson.Zip === null || !/^\d{5}$|^\d{5}(-\d{4})$/.test(_newPerson.Zip)) {
        $scope.errorMessage = "Zip is required and must be 5 digits or 5 digits followed by hyphen and 4 digits.";
      }

      if ($scope.errorMessage === "") {
        // Now we'll submit the new person to the server:

        // First, show a loading State
        // (also disables form submission)
        $scope.busySubmittingPerson = true;

        if (_newPerson.ID === "" || _newPerson.ID === undefined) {
          $http.post('/people/create', {
            FirstName: _newPerson.FirstName,
            LastName: _newPerson.LastName,
            StreetAddress: _newPerson.StreetAddress,
            City: _newPerson.City,
            State: _newPerson.State,
            Zip: _newPerson.Zip,
            Phone: _newPerson.Phone,
            PhotoUrl: _newPerson.PhotoUrl
          })
            .then(function onSuccess(sailsResponse) {
              $scope.people.unshift(_newPerson);
              fetch_people();
            })
            .catch(function onError(error) {
              console.log("An unexpected error occurred: " + error.statusText);
              if (error.data.invalidAttributes) {
                $scope.errorMessage = 'Error writing to database. ';
                for (var attribute in error.data.invalidAttributes) {
                  $scope.errorMessage = 'Invalid data in ' + attribute;
                }
              } else {
                $scope.errorMessage = 'Error writing to database.';
              }

            })
            .finally(function eitherWay() {
              $scope.busySubmittingPerson = false;
              $scope.newPersonID = '';
              $scope.newPersonFirstName = '';
              $scope.newPersonLastName = '';
              $scope.newPersonStreetAddress = '';
              $scope.newPersonCity = '';
              $scope.newPersonState = '';
              $scope.newPersonZip = '';
              $scope.newPersonPhone = '';
              $scope.newPersonPhotoUrl = '';
            });
        } else {
          $http.post('/people/update/' + _newPerson.ID, {
            FirstName: _newPerson.FirstName,
            LastName: _newPerson.LastName,
            StreetAddress: _newPerson.StreetAddress,
            City: _newPerson.City,
            State: _newPerson.State,
            Zip: _newPerson.Zip,
            Phone: _newPerson.Phone,
            PhotoUrl: _newPerson.PhotoUrl
          })
            .then(function onSuccess(sailsResponse) {
              $scope.people.unshift(_newPerson);
              fetch_people();
            })
            .catch(function onError(error) {
              console.log("An unexpected error occurred: " + error.statusText);
              if (error.data.invalidAttributes) {
                $scope.errorMessage = 'Error writing to database. ';
                for (var attribute in error.data.invalidAttributes) {
                  $scope.errorMessage = 'Invalid data in ' + attribute;
                }
              } else {
                $scope.errorMessage = 'Error writing to database.';
              }

            })
            .finally(function eitherWay() {
              $scope.busySubmittingPerson = false;
              $scope.newPersonID = '';
              $scope.newPersonFirstName = '';
              $scope.newPersonLastName = '';
              $scope.newPersonStreetAddress = '';
              $scope.newPersonCity = '';
              $scope.newPersonState = '';
              $scope.newPersonZip = '';
              $scope.newPersonPhone = '';
              $scope.newPersonPhotoUrl = '';
            });
        }
      }
    };
  }

]);


