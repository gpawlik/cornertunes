import * as ui from '../commons/ui';

export function getTracksData(term, limit=10) {    
    return ui.getJsonp('http://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&limit=' + limit);                                                                 
};