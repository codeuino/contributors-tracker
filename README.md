## contributors-backers-tracker
**Contributors backers tracker** is a repository that keeps track of all Codeuino's contributors.

## Bragging right
We understand the feeling of beingn part of something and being publicly noticed. So contributors-backers-tracker is a Project created and maintained by Conduino to display all contributors to Codeuino's Projects.

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

A Standard code format will help others contributing to this project
Example:
```Javascript
jQuery.('.class').on('ready', function(event) {
  event.preventDefault();
  var output;
  output = jQuery.(this).val();
  console.log(output);
});
```
 
## Tech-Stack/Framework(s) used

<b>Built with</b>
- [jQuery](https://jquery.com)
- [NodeJS](https://nodejs.org/en/)

## Features
Display Icon of All Contributors

## Code Example
```javascript
var token = "******************************";
$.get("https://api.github.com/user?access_token="+token, function(data, status) {
    console.log(data);
});
```

## Contribute
You can contribute by reviewing code and opening issues ticket as a tester, and as a developer visit issues and try to render solutions to open issues. A [Guidelines](https://github.com/codeuino/codeuino-docs/blob/master/Guide.md).

MIT © [Precious Tom](https://prezine.herokuapp.com)
