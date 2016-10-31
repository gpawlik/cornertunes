import songsList from './songsListController';
import * as utils from '../../commons/utils';
import * as ui from '../../commons/ui';
import router from '../../commons/router';  

const songsListView = {
    
    init: function() {        
        
        // Store pointers to the DOM elements 
        this.cachedSelectors = {
            wrapper: ui.getEl('#track-table'),
            template: ui.getEl('#tracklist-template'),            
        }
        
        // Add event listeners
        this.attachEvents();
    },  
    
    render: function() {
        const results = songsList.getSongs();    
        const templateString = this.cachedSelectors.template.innerHTML;
        
        // Format special fields
        const resultsFormatted = results.map((item) => {
            const formattedData = {
                releaseFormatted: utils.formatDate(item.releaseDate),
                timeFormatted: utils.formatTrackTime(item.trackTimeMillis),
                priceFormatted: item.trackPrice+utils.formatCurrency(item.currency)                 
            };   
            return Object.assign({}, item, formattedData);     
        });

        this.cachedSelectors.wrapper.innerHTML = utils.parseTemplate(templateString, { 
            results: resultsFormatted, 
            count: results.length 
        });
        router.navigateTo('/');                   
    },
    
    attachEvents: function() {        
        ui.onEvent(document, 'newTracks', () => this.render()); 
        ui.onEvent(document, 'newTerm', songsList.getSongsData.bind(songsList));             
        ui.addEvent('.icon-sort', 'click', songsList.sortTracks.bind(songsList));         
        ui.addEvent('.track-row', 'click', songsList.showTrack);                                 
    }      
};
    
export default songsListView;    