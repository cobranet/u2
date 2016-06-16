/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-site',
	properties: {
	    site: {
		type: Object
	    }
	},
	isInSearch: function(state){
	    if(state == Utopia.SiteState.InSearch){
		return true;
	    }
	    return false;
	},
	search: function(){
	    this.site.state = Utopia.SiteState.InSearch;
	    this.notifyPath('site.state',this.site.state);
	}
    }
);
}());
 

    
