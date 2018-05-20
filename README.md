# browsebirb
Simple website browser to show video thumbnails and information

## Deployment
Just deploy the ui directory to your system - the application expects ui/ to sit at the same level as archive/.

There's no login handling; the application expects the web server and browser to deal with that itself.

## Dependencies
There are a bunch of JavaScript/CSS dependencies, which are fetched from CDN:
- Bootstrap (and its dependencies)
- vue.js
- lodash
- moment.js
- jQuery

## Testing
There's a basic Sinatra application for testing stuff.  Use `bundle install` if you want to use this utility, and then `user=<user> pass=<pass> rake test.json` to generate a realistic test file.
