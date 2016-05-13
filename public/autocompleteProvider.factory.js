'use strict';

angular.module('mainApp')
	.factory('AutocompleteProvider', function() {

	  /**
		* Constructor for root node of prefix tree (trie)
		*/
	  var AutocompleteProvider = function () {
        this.wordCount = 0;   // Score or number of times this word has been added to dictionary (trained)
        this.childNode = [];  // Children nodes
      };

	  /**
	   * Inserts a word into the dictionary
	   */
      AutocompleteProvider.prototype.train = function (word) {

        if ((word === undefined) || (word === null) || (typeof word !== 'string')) {
          console.log("Not a valid word");
          return;
        }

        var currentNode = this;

        for (var pos = 0; pos < word.length; pos++) {
            var tempChar = word[pos];
            // Check if this character is already a node in the trie, if not then add it
            if (currentNode.childNode[tempChar] === undefined) {
              currentNode.childNode[tempChar] = new AutocompleteProvider();
            }

            // Head down to the next level of the trie
            currentNode = currentNode.childNode[tempChar];
        }

        currentNode.wordCount++;
      };

      /**
       * Finds all words in the dictionary that start with the specified prefix
       */
      AutocompleteProvider.prototype.getWords = function (prefix) {

        if ((prefix === undefined) || (prefix === null) || (typeof prefix !== 'string')) {
          console.log("Not a valid word");
          return [];
        }

        var currentNode = this;
        var returnWords = [];

        // Find the child node that contains the entire prefix
        for (var pos = 0; pos < prefix.length; pos++) {
          var tempChar = prefix[pos];

          if(tempChar in currentNode.childNode) {
            // Head down to the next level of the trie
            currentNode = currentNode.childNode[tempChar];
          }
            else {
              return [];
          }
        }

        // Now, currentNode should be the child node that contains the prefix
        // Search for all children nodes of this node and add words to array
        findWordsInNode(prefix, currentNode, returnWords);

        function findWordsInNode(prefix, node, words) {
          if(node.wordCount > 0) {
            words.push({'name': prefix, 'score': node.wordCount});
          }

          for(var tempChar in node.childNode) {
            findWordsInNode(prefix + tempChar, node.childNode[tempChar], words);
          }
        }

        return returnWords;
      };

	  /**
	   * Return the constructor function
	   */
	  return AutocompleteProvider;

	});