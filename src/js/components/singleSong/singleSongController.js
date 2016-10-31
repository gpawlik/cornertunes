import tracks from '../../models/tracks'; 
import singleSongView from './singleSongView'; 
import * as ui from '../../commons/ui';
import router from '../../commons/router';         
    
const singleSongCtrl = {

    init: function() {
        singleSongView.init();                                                                      
    },
    
    getCurrentTrackData: function() {          
        return tracks.getCurrentTrackData();              
    }, 
    
    setCurrentTrack: function(trackId) {
        tracks.setCurrentTrack(trackId);            
    },    
    
    setNextTrack: function(direction) {
        const tracksLength = tracks.getTracks().length;
        const currentId = parseInt(tracks.getCurrentTrack(), 10);
        let nextTrackId;            
        if(direction === 'next') {
            nextTrackId = ((currentId + 1) >= tracksLength) ? 0 : currentId + 1;
        }
        else {
            nextTrackId = ((currentId - 1) < 0) ? tracksLength - 1 : currentId - 1;
        }
        this.setCurrentTrack(nextTrackId);            
    },        
    
    prevSong: function() {
        this.setNextTrack('prev');
    },
    
    nextSong: function() {
        this.setNextTrack('next');
    },
    
    playAudio: function() {
        const audio = ui.getEl('#audio');
        if(audio.paused) audio.play();   
    },
    
    pauseAudio: function() {
        const audio = ui.getEl('#audio');
        if(!audio.paused) audio.pause();    
    },
    
    backIndex: function() {
        this.pauseAudio();
        router.navigateTo('/');  
    }                 
};
   
export default singleSongCtrl;