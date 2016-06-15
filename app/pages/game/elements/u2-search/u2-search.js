/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-search',
	properties: {
	    top : {
		type: Array
	    },
	    bottom: {
		type: Array
	    },
	    score: {
		type: Array
	    }
	},
	arrayItem: function(change,index){
	    console.log(change);
	    console.log(change.base[index]);
	    return change.base[index];
	},
	click: function(){
	    console.log(this.top);
	    this.set('top.1',Math.floor((Math.random() * 6) + 1));
	},
	dice: function(search){
	    alert('tu sam');
	    
	    return search.ldice.value;
	}
	
    }
);
}());
 

    
