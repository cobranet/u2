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
		return false;
	    }
	    return true;
	}
    }
);
}());
 

    
