/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-search',
	properties: {
	    search: {
		type: Object
	    }
	},
	arrayItem: function(change,index){
	    console.log(index);
	    if (change.base[index] != null){
		return change.base[index];
	    }
	    console.log('nema nista');
	    return '\xa0';
	},
	notifyScore: function(col){
	    this.notifyPath('search.score.'+col, -1000);
	    this.notifyPath('search.score.'+col, this.search.score[col]);

	},
	notifyDices: function(){
	    this.notifyPath('search.ldice.dicesize', this.search.ldice.dicesize);
	    this.notifyPath('search.rdice.dicesize', this.search.rdice.dicesize);
	    this.notifyPath('search.ldice.value', this.search.ldice.value);
	    this.notifyPath('search.rdice.value', this.search.rdice.value);
	    this.notifyPath('search.state',this.search.state);
	},
	canClick: function(){
	    return (this.search.state === Utopia.SearchState.WaitingForRoll || this.search.state === Utopia.SearchState.Finished );
	}, 
	clickTop: function(e){
	    if ( this.canClick() )  {
		return;
	    }
	    var col = e.currentTarget.attributes.col.value;

	    if(this.search.top[col] != null){
		return;
	    }
	    this.search.writeTop(col);
	    this.notifyPath('search.top.'+ col, -1000);
	    this.notifyPath('search.top.'+ col, this.search.top[col]);
	    this.notifyScore();
	    this.notifyDices();

	},
	isDicesVisible: function(state){
	    if (state == Utopia.SearchState.WaitingForRoll ||
		state == Utopia.SearchState.Finished ) {
		return false;
	    }
	    return true;
	},
	isButtonVisible: function(state){
	    if (state === Utopia.SearchState.WaitingForRoll ){
		return false;
	    }
	    return true;
	},
	roll: function(){
	    this.search.roll();
	    this.notifyDices();
	 
	},
	clickBottom: function(e){
	    if ( this.canClick()){
		return;
	    }
	    var col = e.currentTarget.attributes.col.value;
	    if(this.search.bottom[col] != null){
		return;
	    }
	    this.search.writeBottom(col);
	    /* some bug in notify */
	    this.notifyPath('search.bottom.'+col, -1000);
	    this.notifyPath('search.bottom.'+col, this.search.bottom[col]);
	    this.notifyScore();
	    this.notifyDices();
	    
	    
	}
	
    }
);
}());
 

    
