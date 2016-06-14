/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-search',
	properties: {
	    search: {
		type: Object,
		notify: true
	    }
	},
	_cell: function(search,x,y){
	    var score =  search.cell(x,y);
	    if (score) return score;
	    return '\xa0';
	}
	
    }
);
}());
 

    
