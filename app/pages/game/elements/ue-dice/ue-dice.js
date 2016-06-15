/*global Polymer,document,templates,alert */
(function() {
    'use strict';
    Polymer({
	is: 'ue-dice',
	properties: {
	    dice: {
		type: Object,
		notify: true
	    }
	    
	},
	handleTap: function(){
	    if(!clickable){
		return;
	    }
	    if (this.dice.rollable) {
		this.dice.roll();
	    }
	    this.set('dice.value',this.dice.value);
	    this.set('dice.color',this.dice.color);
	},
	ccolor: function(value,pos,color,dotcolor){
	    if ( (value == 1 || value == 5 || value == 3 ) && pos == 4 ){
		return dotcolor;
	    }
	    if ( (value == 5 || value == 6 || value == 4 || value == 2 || value == 3)
		 && (pos == 1 || pos == 7) ){
		return dotcolor;
	    }
	    if ( value == 6 && ( pos == 2 || pos == 6 )){
		return dotcolor;
	    }
	    if ((value == 5 || value == 6 || value == 4) && (pos == 3 || pos ==5) ){
		return dotcolor;
	    }
	    return color;
	},
	cx: function(dicesize,pos){
	    if (pos == 4 ){
		return dicesize / 2;
	    }
	    if (pos == 1 || pos == 2 || pos == 3){
		return dicesize / 4;
	    }
	    if (pos == 5 || pos == 6 || pos == 7){
		return dicesize - dicesize / 4;
	    }
	},
	cy: function(dicesize,pos){
	    if ( pos == 2 || pos == 4 || pos == 6) {
		return dicesize / 2;
	    }
	    if (pos == 1 || pos == 5 ) {
		return dicesize / 4;
	    }
	    if (pos == 3 || pos == 7){
		return dicesize - dicesize/4;
	    }
	},
	color: function(dcolor){
	    return dcolor;
	},
	dice1: function(){
	    return true;
	},
	part: function(dicesize,p){
	    return (+ dicesize)/p;
	},
	r: function(dicesize){
	    return (+ dicesize)/6;
	},
	dot: function(dicesize){
	    return (+ dicesize)/8;
	}
	
    });
}());
