import videojs from 'video.js';
import {version as VERSION} from '../package.json';

const Plugin = videojs.getPlugin('plugin');

const defaults = {};

class Viyo extends Plugin {
  constructor(player, options) {
    super(player);

    this.options = videojs.mergeOptions(defaults, options);
    let viyoPlayer = this.player; 

    viyoPlayer.ready(() => {
      let qOne = false, qTwo = false, qThree = false; 
      
      let pctComplete = () => {
        return Math.round((viyoPlayer.currentTime() / viyoPlayer.mediainfo.duration) * 100) / 100; 
      }

      let klaviyoOptions = (pctViewed) => {
        return {
          method: 'POST',
          headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'},
          body: new URLSearchParams({
            data: `{
              "token": "QBC6R2", 
              "event": "Video Percentage Viewed", 
              "customer_properties": {
                "$email": "robertfarese@yahoo.com"
              }, 
              "properties": {
                "video_name": "${viyoPlayer.catalog.data.name}", 
                "video_id": "${viyoPlayer.catalog.data.id}",
                "percentage": "${pctViewed}"}
            }`
          })
        };  
      }

      let trackViewEvent = (pctViewed) => {
        let optionsConfig = klaviyoOptions(pctViewed);

        fetch('https://a.klaviyo.com/api/track', optionsConfig)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err)); 
      }

      viyoPlayer.one('play', function(){
        trackViewEvent(0.01);         
      });

      viyoPlayer.on('analytics_request', function(e){
        let pct = pctComplete();

        if (!qOne && pct >= .25 && pct < .5){
          trackViewEvent(.25);         
          qOne = true; 
        }

        if (!qTwo && pct >= .5 && pct < .75){
          trackViewEvent(.5);         
          qTwo = true; 
        }
  
        if (!qThree && pct >= .75 && pct < 1){
          trackViewEvent(.75);         
          qThree = true; 
        }  
      }); 

      viyoPlayer.one('ended', function(){
        trackViewEvent(1.0);
      }); 
    });
  }
}

Viyo.defaultState = {};
Viyo.VERSION = VERSION;

videojs.registerPlugin('viyo', Viyo);

export default Viyo;
