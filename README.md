# videojs-viyo



## Installation

```sh
npm install --save videojs-viyo
```

## Usage

To include videojs-viyo on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-viyo.min.js"></script>
<script>
  var player = videojs('my-video');

  player.viyo();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-viyo via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-viyo');

var player = videojs('my-video');

player.viyo();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-viyo'], function(videojs) {
  var player = videojs('my-video');

  player.viyo();
});
```

## License

MIT. Copyright (c) Bobby Farese &lt;bfarese@brightcove.com&gt;


[videojs]: http://videojs.com/

Going to walk through 
[1] Connecting a Brightcove Player with Klaviyo. 
[2] We are capturing how much of a video someone has watched using the Brightcove Player interface 
[3] Next we send a POST request to Klaviyo's Track endpoint using a Video Percentage Viewed event