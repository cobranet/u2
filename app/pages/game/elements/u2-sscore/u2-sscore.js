/*global Polymer, alert,Utopia */
(function() {
    'use strict';
    Polymer({
	is: 'u2-sscore',
	properties: {
	    score: {
		type: Object
	    }
	},
	heading: function(score){
	    return "You score: " + score;
	},
	okrez: function(){
	    this.fire('score_ok',{score : this.score });
	},
	isConstruct: function(){
	    return true;
	}
    }
	   );
}());
 

    
