"use strict"

// Define the `phonecatApp` module
var rycApp = angular.module('rycApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
rycApp.controller('RYCController', function RYCController($scope) {
  $scope.duration = {};
  $scope.frequency = {};
  $scope.totalDuration = {};
  $scope.automationDuration = {};
  RYC.LANG = RYC['en'];

  $scope.switchLang = function(languageShort) {
    RYC.LANG = RYC[languageShort];
  };

  $scope.ln = function(tag) {
    return RYC.LANG[tag];
  }

  $scope.getReadableUnit = function(obj) {
    if(obj.unit === "years") {
      if(obj.value > 1)       return $scope.ln("YEARS");
      else                    return $scope.ln("YEAR");
    }

    if(obj.unit === "months") {
      if(obj.value > 1)       return $scope.ln("MONTHS");
      else                    return $scope.ln("MONTH");
    }

    if(obj.unit === "weeks") {
      if(obj.value > 1)       return $scope.ln("WEEKS");
      else                    return $scope.ln("WEEK");
    }

    if(obj.unit === "days") {
      if(obj.value > 1)       return $scope.ln("DAYS");
      else                    return $scope.ln("DAY");
    }

    if(obj.unit === "hours") {
      if(obj.value > 1)       return $scope.ln("HOURS");
      else                    return $scope.ln("HOUR");
    }

    if(obj.unit === "mins") {
      if(obj.value > 1)       return $scope.ln("MINS");
      else                    return $scope.ln("MIN");
    }
  };

  $scope.calculate = function() {
    // Convert duration in minutes
    if($scope.duration.unit === "days") {
      $scope.duration.valuecalculatedValue = $scope.duration.value * 24 * 60;
    } else if($scope.duration.unit === "hours") {
      $scope.duration.valuecalculatedValue = $scope.duration.value * 60;
    } else {
      $scope.duration.valuecalculatedValue = $scope.duration.value;
    }

    // Convert frequency in days
    if($scope.frequency.unit === "years") {
      $scope.frequency.valuecalculatedValue = $scope.frequency.value / 365;
    } else if($scope.frequency.unit === "months") {
      $scope.frequency.valuecalculatedValue = $scope.frequency.value / 30;
    } else {
      $scope.frequency.valuecalculatedValue = $scope.frequency.value;
    }

    // Convert totalDuration in days
    if($scope.totalDuration.unit === "years") {
      $scope.totalDuration.valuecalculatedValue = $scope.totalDuration.value * 365;
    } else if($scope.totalDuration.unit === "months") {
      $scope.totalDuration.valuecalculatedValue = $scope.totalDuration.value * 30;
    } else if($scope.totalDuration.unit === "weeks") {
      $scope.totalDuration.valuecalculatedValue = $scope.totalDuration.value * 7;
    } else {
      $scope.totalDuration.valuecalculatedValue = $scope.totalDuration.value;
    }

    // Calculate duration in minutes
    $scope.result = {
      value : $scope.duration.valuecalculatedValue * $scope.frequency.valuecalculatedValue * $scope.totalDuration.valuecalculatedValue
    };

    var resultMins = $scope.result.value;

    // Convert value into a human understandable unit
    if($scope.result.value > 60) {
      $scope.result.value /= 60;

      if($scope.result.value > 24) {
        $scope.result.value /= 24;
        $scope.result.unit = "days";

        if($scope.result.value > 365) {
          $scope.result.value /= 365;
          $scope.result.unit = "years";
        }
      } else {
        $scope.result.unit = "hours";
      }
    } else {
      $scope.result.unit = "mins";
    }

    $scope.result.value = $scope.result.value.toFixed(1);

    if($scope.automationDuration.value !== undefined) {
      var autoMins = null;
      if($scope.automationDuration.unit === "weeks")   autoMins = $scope.automationDuration.value * 5 * 8 * 60;
      if($scope.automationDuration.unit === "days")   autoMins = $scope.automationDuration.value * 8 * 60;
      if($scope.automationDuration.unit === "hours")   autoMins = $scope.automationDuration.value * 60;

      if(resultMins > autoMins) {
        $(".totalAutomatic").addClass("success");
        $(".totalManuelly").removeClass("success");
      } else {
        $(".totalManuelly").addClass("success");
        $(".totalAutomatic").removeClass("success");
      }
    }
  };
});
