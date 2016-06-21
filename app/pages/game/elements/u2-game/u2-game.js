/*global Polymer, alert,Utopia */
(function() {
    'use strict';
    Polymer({
	is: 'u2-game',
	listeners: {
	    'search' : 'onSearch',
	    'search_resolved' : 'onSearchEnd'
	},
	properties: {
	    game: {
		type: Object,
		notify: true
	    },
	    toast_text: {
		type: String,
		notify: true
	    }
	},
	ready:function(){
	    var self = this;
	    self.game = new Utopia.Game(new Utopia.Player("11","braca","img"));
	    
	},
	toastText:function(text){
	    return text;
	},
	onSearchEnd: function(e){
	    var that = this;
	    this.toast_text="Your score : " + e.detail.score.score;
	    this.$.toast.open();
	    this.game.sites.forEach(function(site,index){
		site.state = Utopia.SiteState.Inactive;
		that.notifyPath('game.sites.'+ index +'.state',that.game.sites[index].state);
	    });
	    
	    
	},
	openToast: function() {
	    this.$.toast.open();
	},
	onSearch: function(e){
	    var that = this;
	    this.game.sites.forEach(function(site,index){
		if (index != e.detail.search ) {
		    site.state = Utopia.SiteState.OtherSearch;
		    that.notifyPath('game.sites.'+ index +'.state',that.game.sites[index].state);

		}
	    });
	}
	
	
    }
	   );
}());
 

    
