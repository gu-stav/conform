Very much **WIP**: Just started this project, because I did not like the APIs of already existing node-form-frameworks. If you want to use it, wait until it reaches the 1.0 release.

**1.0 ROADMAP**
- Documentation
- API sugar
- Automatic ID Generation, to apply labels to inputs

#Conform#
A node form-framework, with minimal dependencies, heavily inspired by the great
python framework [deform](http://deform.readthedocs.org/).

#Installation#
```bash
npm install conform
```

#Usage#
```js
var conform = require('conform');

var Button = conform.Button;
var Form = conform.Form;
var Input = conform.Input;
var Label = conform.Label;

var label = new Label('Search-Term');
var input = new Input({type: 'text', name: 'term'}, label);

input.render();
/*
  <label>Search-Term</label>
  <input type="text">
*/

var button = new Button('Submit');
var form = new Form([input, button]);

form.render();
/*
  <form method="post" action="">
    <label>Search-Term</label>
    <input type="text">
    <button type="submit">Submit</button>
  </form>
*/
```

### Advanced Layouts ###
```js
var conform = require('conform');

var Button = conform.Button;
var Form = conform.Form;
var Group = conform.Group;
var Input = conform.Input;
var Label = conform.Label;

var label = new Label('Search-Term');
var input = new Input({type: 'text', name: 'term'}, label);
var group = new Group('div', [input], {class: 'test'});
var button = new Button('Submit');
var form = form = new Form([group, button]);

form.render();

/*
<form method="post" action="">
  <div class="test">
    <label>Search-Term</label>
    <input type="text">
  </div>

  <button type="submit">Submit</button>
</form>
*/

```

## VALIDATION ##
```js
input.validators = {
  notEmpty: function(value) {
    return new Promise(function(resolve, reject) {
      if(!value) {
        throw new Error('Field should not be empty.')
      } else {
        resolve();
      }
    });
  }
};

input
  .valdidate('')
  .then(function(errors) {
    if(!errors) {
      /* everything is fine */
    } else {
      /* handle your errors */
    }
  });

form
  .validate({term: ''})
  .then(function(errors) {
    if(!errors) {
      /* everything is fine */
    } else {
      /* handle your errors */
    }
  });

```

