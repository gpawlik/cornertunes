import tracks from '../../models/tracks'; 
import singleSongController from '../singleSong/singleSongController'; 
import searchBoxView from '../searchBox/searchBoxView';   
import songsListView from './songsListView';  
import * as utils from '../../commons/utils';   
import router from '../../commons/router';    
    
const songsController = {

    init: function() {        
        singleSongController.init();  
        searchBoxView.init();
        songsListView.init(); 
        router.init();                                                                         
    },

    getSongsData: function() {  
        const term = tracks.getSearchTerm();       
        tracks.getTracksData(term).then(function(data) {  
            // Check current term to leave-out delayed responses
            const currentTerm = tracks.getSearchTerm();                        
            if (term === currentTerm) { 
                tracks.setTracks(data.results);                                         
            }
        }).catch(function(err) { 
            console.log('Error getting data:', err); 
        });                                                                  
    }, 
    
    getSongs: function() {
        return tracks.getTracks();
    },
    
    sortTracks: function(e){
        const songs = this.getSongs();
        const sortBy = e.target.getAttribute('data-sortby');
        const order = e.target.getAttribute('data-sort-order');
        utils.sortByKey(songs, sortBy, order);
        songsListView.render();
    },
    
    showTrack: function(e) {
        const id = e.target.parentElement.getAttribute('data-id');      
        tracks.setCurrentTrack(id);
    }     

};
   
export default songsController;