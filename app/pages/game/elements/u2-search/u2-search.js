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
	    if (change.base[index] && change.base[index] != -1000 ){
		return change.base[index];
	    }
	    console.log('nema nista');
	    return '\xa0';
	},
	notifyDices: function(){
	    this.notifyPath('search.ldice.dicesize', this.search.ldice.dicesize);
	    this.notifyPath('search.rdice.dicesize', this.search.rdice.dicesize);
	    this.notifyPath('search.ldice.value', this.search.ldice.value);
	    this.notifyPath('search.rdice.value', this.search.rdice.value);
	    this.notifyPath('search.state',this.search.state);
	},
	clickTop: function(e){
	    if ( this.search.state === Utopia.SearchState.WaitingForRoll ) {
		return;
	    }
	    var col = e.currentTarget.attributes.col.value;
	    this.search.writeTop(col);
	    this.notifyPath('search.top.'+ col, this.search.top[col]);
	    this.notifyPath('search.score.' + col, this.search.score[col]);
	    this.notifyDices();

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
	    if ( this.search.state === Utopia.SearchState.WaitingForRoll ) {
		return;
	    }
	    var col = e.currentTarget.attributes.col.value;
	    this.search.writeBottom(col);
	    this.notifyPath('search.bottom.'+col, this.search.bottom[col]);
	    this.notifyPath('search.score.' +col, this.search.score[col]);
	    this.notifyDices();
	    
	    
	}
	
    }
);
}());
 

    
