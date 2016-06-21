/*global Polymer, alert,Utopia,Search */
(function() {
    'use strict';
    Polymer({
	is: 'u2-site',
	listeners: {
	    'search_end' : 'onSearchEnd',
	    'score_ok' : 'onScoreOk'
	},
	properties: {
	    site: {
		type: Object
	    },
	    ind: {
		type: Number
	    }
	},
	onScoreOk: function(e){
	    alert('end');
	    var score = e.detail.score;
	    if (score.stype == 'construct') {
		this.fire('search_resolved',{score: score});
	    }
	},
	score: function(score){
	    return this.site.resolve_score(score);
	},
	onSearchEnd: function(e){
	    this.state = Utopia.SiteState.ScoreSearch;
	    this.notifyPath('site.search.finalScore',this.site.search.finalScore);
	    this.notifyPath('site.state',this.site.search.state);
	},
	isSearchShown: function(state){
	    if(state == Utopia.SiteState.InSearch){
		return true;
	    }
	    return false;
	},
	isResultShown: function(state){
	    if(state == Utopia.SiteState.ScoreSearch){
		return true;
	    }
	    return false;
	},
	isInfoShown: function(state){
	    if(state == Utopia.SiteState.Inactive) {
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
 

    
