import * as ui from './ui';

// Very simple router
const router = {
   
    routes: {},

    init: function() {
        this.registerRoutes();
    },

    route: function (path, templateId, controller) {
        this.routes[path] = { templateId, controller };
    },

    registerRoutes: function() {
        this.route('/', 'track-list', function () {});
        this.route('/single', 'track-box', function () {});     
    },
   
    navigateTo: function(path) {        
        ui.removeClass('.page', 'visible');
        ui.addClass('#' + this.routes[path].templateId, 'visible');                
        location.hash = path;
    }
}

export default router;