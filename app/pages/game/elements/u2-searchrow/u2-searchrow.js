/*global Polymer, alert,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-searchrow',
	extends: 'tr',
	properties: {
	    row: {
		type: String,
		notify: true
		
	    },
	    arr: {
		type: Array,
		notify: true
	    }
	},
	arrayItem: function(change,index){
	    if (change.base[index] != null){
		return change.base[index];
	    }
	    return '\xa0';
	},

	click: function(e){
	    alert('click in row');
	    var col = e.currentTarget.attributes.col.value;
	    this.fire("clickrow",{row: this.row,col: col});
	}
    }
);
}());
 

    
