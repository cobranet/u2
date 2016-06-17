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
	isConstruct: function(){
	    if ( this.score.stype === 'construct' ){
		return true;
	    }
	    return false;
	}
    }
	   );
}());
 

    
