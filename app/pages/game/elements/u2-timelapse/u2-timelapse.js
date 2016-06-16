/*global Polymer, alert,Utopia */
(function() {
    'use strict';
    Polymer({
	is: 'u2-timelapse',
	properties: {
	    timelapse: {
		type: Object,
		notify: true
	    }
	},
	numclass: function(index){
	    var cl = "";
	    if (index < this.timelapse.current ){
		cl = cl + "used "; 
	    } else {
		cl = cl + "notused";
	    }
	    if (this.timelapse.times[index] == -1 ){
		cl = cl + " one" ;
	    } else {
		cl = cl + " zero";
	    }
	    return cl;
	},
	lapse:function(item){
	    if(item===-1){
		return true;
	    }
	    return false;
	}
    }
	   );
}());
 

