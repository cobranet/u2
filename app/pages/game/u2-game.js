/*global Polymer, alert */
(function() {
    'use strict';
    Polymer({
	is: 'u2-game',
	properties: {
	    game: {
		type: Object,
		notify: true
	    }
	},
	ready:function(){
	    alert('ready u2 game');
	}
	
    }
	   );
}());
 

    
