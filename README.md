
# webtask for Motion Trakcer

This is a webtask that listens to web request that the [Motion Tracker](https://github.com/gsilvatici/Motion-Tracker) sends. 

## Install

Using the CLI of webtask, a url can be generated passing a mongo database url as a secret:

```bash
$ wt create --secret MONGO_URL='mongodb://...' motiont-listener.js
```
And for the view page: 

```bash
$ wt create --secret MONGO_URL='mongodb://...' motiont-view.js
```

For more information about webtask visit the webtask docs [page](https://webtask.io/docs/101)

## Considerations

This webtask uses mongoDB to store values, so in order to generate a new webtask it is neccesary to provide mongoDB database address.

## Author

Gabriel Silvatici.



