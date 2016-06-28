/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-search',
	listeners: {
	    'clickrow' : 'clickrow'
	},
	properties: {
	    search: {
		type: Object,
		notify: true
	    }
	},
	notifyScore: function(){
	    this.notifyPath('search.score'  ,
			    [this.search.score[0],
			     this.search.score[1],
			     this.search.score[2]]);
	},
	notifyDices: function(){
	    this.notifyPath('search.ldice.dicesize', this.search.ldice.dicesize);
	    this.notifyPath('search.rdice.dicesize', this.search.rdice.dicesize);
	    this.notifyPath('search.ldice.value', this.search.ldice.value);
	    this.notifyPath('search.rdice.value', this.search.rdice.value);
	    this.notifyPath('search.state',this.search.state);
	    if (this.search.state == Utopia.SearchState.Finished){
		this.fire('search_end',{score: this.search.finalScore});
	    }
	},
	clickrow: function(e){
	    var col = e.detail.col;
	    var row = e.detail.row;
	    if (row == 'top') {
		this.search.writeTop(col);
	    }
	    if (row == 'bottom') {
		this.search.writeBottom(col);
	    }
	    this.notifyScore();
	    this.notifyPath('search.'+  row  ,[this.search[row][0],this.search[row][1],this.search[row][2]]);
	    this.notifyDices();
	},
	canClick: function(){
	    return (this.search.state === Utopia.SearchState.WaitingForRoll || this.search.state === Utopia.SearchState.Finished );
	}, 
	isDicesVisible: function(state){
	    if (state == Utopia.SearchState.WaitingForRoll ||
		state == Utopia.SearchState.Finished ) {
		return false;
	    }
	    return true;
	},
	isButtonVisible: function(state){
	    this.notifyScore();
	    if (state === Utopia.SearchState.WaitingForRoll ){
		return false;
	    }
	    return true;
	},
	roll: function(){
	    this.search.roll();
	    this.notifyDices();
	 
	}
	
    }
);
}());
 

    
