import singleSong from './singleSongController';    
import * as utils from '../../commons/utils';  
import router from '../../commons/router';  
import * as ui from '../../commons/ui';  
    
const singleSongView = {
    
    init: function() {
        
        // Store pointers to the DOM elements 
        this.cachedSelectors = {
            wrapper: ui.getEl('#track-box'),
            template: ui.getEl('#track-template')         
        }
        
        // Add event listeners
        this.attachEvents();
    },
    
    render: function() {
        const track = singleSong.getCurrentTrackData();       
        const templateString = this.cachedSelectors.template.innerHTML;
        
        // Format special fields
        track.timeFormatted = utils.formatTrackTime(track.trackTimeMillis);
        track.priceFormatted = track.trackPrice+utils.formatCurrency(track.currency);
  
        this.cachedSelectors.wrapper.innerHTML = utils.parseTemplate(templateString, track);
        router.navigateTo('/single');                       
    },
    
    attachEvents: function() {
        ui.onEvent(document, 'newTrack', () => this.render());        
        ui.addEvent('.prev-song', 'click', singleSong.prevSong.bind(singleSong));         
        ui.addEvent('.next-song', 'click', singleSong.nextSong.bind(singleSong));
        ui.addEvent('.play', 'click', singleSong.playAudio.bind(singleSong));
        ui.addEvent('.pause', 'click', singleSong.pauseAudio.bind(singleSong));
        ui.addEvent('.back-index', 'click', singleSong.backIndex.bind(singleSong));                      
    }
}
    
export default singleSongView;    