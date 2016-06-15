/*global Polymer, alert,Utopia */
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
	    var self = this;
	    self.game = new Utopia.Game("11","braca","img");
	    console.log(self.game.search.top);
	}
	
    }
	   );
}());
 

    
