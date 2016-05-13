# Test app for autocomplete capability.

### Download the project zip

Download the project zip from Github repository: https://github.com/yisbecker/suggestion_textbox

### Install Dependencies

I have two kinds of dependencies in this project: tools and framework code.  The tools help
us manage and test the application.

* Get the tools we depend upon via `npm`, the [node package manager][npm].
* Get the framework code via `bower`, a [client-side code package manager][bower].

I have preconfigured `npm` to automatically run `bower` so we can simply do:

```
npm install

```

Behind the scenes this will also call `bower install`.  You should find that you have two new
folders in your project.

* `node_modules` - contains the npm packages for the tools we need
* `public/bower_components` - contains the framework files

## Directory Layout

```
public/                          --> all of the source files for the front end (client-side)
  app.ctrl.js                      --> angular controller for main application
  app.js                           --> main application
  autocompleteProvider.factory.js  --> angular factory for autocomplete capability using a trie
  customTemplate.html              --> style the dropdown of the suggestion box
  index.html                       --> main html view for the app
.bowerrc                         --> bower resource file (sets location for bower_compoennts directory)
bower.json                       --> bower package manager script file (framework files)
package.json                     --> node tools package manager script file (npm tools)
README.md                        --> app instructions and general information
```

### Running the App

For this project I use a preconfigured local development webserver.  It is a node.js
tool called [http-server][http-server].  You can start this webserver with script command `npm start` but
you may choose to install the tool globally:

```
sudo npm install -g http-server
```

Then you can start your own development web server to serve static files from a folder by
running:

```
http-server -a localhost -p 8080
```

### Testing the App

Open a web browser (ideally Chrome) and navigate to http://localhost:8080.  You should see two text inputs
labeled "Train" and "Input".  Enter text into the train text input and click the button labeled "Train".  This will "train" the autocomplete component.  In this case, it will add words to the dictionary.  Now, as you type into the "Input" text input, words trained will popup as autocomplete suggestions.

### Future improvements
- This app implemented Trie data structure in its most basic sense.  Each character is a node.  There are other/more efficient ways of data storage.
- Testing.  I didn't include any automated tests due to time limitations I had.
