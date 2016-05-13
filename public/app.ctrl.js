'use strict';

angular.module('mainApp')
    .controller('mainController', ['$scope', 'AutocompleteProvider', function($scope, AutocompleteProvider) {

        var autocompleteProvider = new AutocompleteProvider();
        $scope.autocompleteResults = [];
        $scope.inputText = undefined;
        $scope.trainText = undefined;

        $scope.train = function () {
            var psg = $scope.trainText.trim();
            psg.replace(/\s+/g, ' ');
            var words = psg.split(' ');

            for (var i = 0; i < words.length; i++)
            {
                autocompleteProvider.train(words[i]);
            }
        };

        $scope.autoComplete = function(prefix) {
            var tempResults = autocompleteProvider.getWords(prefix);

            // Sort on score, then alphabetically
            tempResults.sort(function(a, b) {
                if(a.score === b.score)
                {
                    var x = a.name.toLowerCase();
                    var y = b.name.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                }
                return b.score - a.score
            });
            return tempResults;
        };

        $scope.startsWith = function(autocompleteResult, viewValue) {
            return autocompleteResult.substr(0, viewValue.length).toLowerCase() == viewValue.toLowerCase();
        }

    }]);
