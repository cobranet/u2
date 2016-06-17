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
		type: String
	    }
	},
	ready:function(){
	    var self = this;
	    self.game = new Utopia.Game("11","braca","img");
	    
	},
	toastText:function(text){
	    return text;
	},
	onSearchEnd: function(e){
	    this.toast_text="Your score : " + e.detail.score;
	    this.$.toast.open();
	},
	openToast: function() {
	    this.$.toast.open();
	},
	onSearch: function(e){
	    var that = this;
	    this.game.sites.forEach(function(site,index){
		if (index != e.detail.search ) {
		    site.state = Utopia.SiteState.OtherSearch;
		    site.name = "No Name";
		    that.notifyPath('game.sites.'+ index +'.state',that.game.sites[index].state);
		    console.log(site.name);
		}
	    });
	}
	
	
    }
	   );
}());
 

    
