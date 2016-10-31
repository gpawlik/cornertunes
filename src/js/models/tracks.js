import * as api from '../api/tracks';  
import * as ui from '../commons/ui';  

const tracks = {
    data: {
        songs: [],
        currentTrack: false,
        searchTerm: ""        
    },
    
    getTracksData: function(term) {        
        return api.getTracksData(term);                                                           
    },     
    
    getTracks: function() {
        return this.data.songs;
    },
    
    setTracks: function(newTracks) {
        this.data.songs = newTracks;
        ui.triggerEvent(document, 'newTracks'); 
    },
    
    getCurrentTrack: function() {
        return this.data.currentTrack;
    },
    
    setCurrentTrack: function(newCurrentTrack) {
        this.data.currentTrack = newCurrentTrack;
        ui.triggerEvent(document, 'newTrack');  
    },
    
    getCurrentTrackData: function() {          
        return this.data.songs[this.data.currentTrack];              
    }, 
    
    getSearchTerm: function() {
        return this.data.searchTerm
    },
    
    setSearchTerm: function(newTerm) {
        this.data.searchTerm = newTerm;
        ui.triggerEvent(document, 'newTerm');         
    }   
};

export default tracks;