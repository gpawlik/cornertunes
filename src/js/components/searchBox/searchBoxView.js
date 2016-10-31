import tracks from '../../models/tracks'; 
import songsController from '../songsList/songsListController';   
import * as ui from '../../commons/ui';  
    
const searchBoxController = {
    init: function() {
        this.attachEvents();
    },
    
    attachEvents: function() {
        ui.addEvent('input[name="search-music"]', 'keyup', function(e){  
            tracks.setSearchTerm(e.target.value);            
        });                
    }                            
};
   
export default searchBoxController;