/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-site',
	listeners: {
	    'search_end' : 'onSearchEnd'
	},
	properties: {
	    site: {
		type: Object
	    },
	    ind: {
		type: Number
	    }
	},
	score: function(score){
	    return this.site.resolve_score(score);
	},
	onSearchEnd: function(e){
	    alert(e.detail.score);
	    this.state = Utopia.SiteState.ScoreSearch;
	    this.notifyPath('site.search.finalScore',this.site.search.finalScore);
	    console.log(this.site);
	    this.fire('search_resolved',{score: e.detail.score});
	},
	isInSearch: function(state){
	    if(state == Utopia.SiteState.InSearch){
		return true;
	    }
	    return false;
	},
	isButtonVisible: function(state){
	    if(state == Utopia.SiteState.Inactive){
		return true;
	    }
	    return false;
	},
	search: function(){
	    this.site.state = Utopia.SiteState.InSearch;
	    this.notifyPath('site.state',this.site.state);
	    this.fire('search',{search: this.ind});
	}
    }
);
}());
 

    
