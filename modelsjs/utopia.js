var Utopia;
(function (Utopia) {
    var Dice = (function () {
        function Dice(value, dicesize, color, dotcolor) {
            this.value = value;
            this.dicesize = dicesize;
            this.color = color;
            this.dotcolor = dotcolor;
        }
        Dice.prototype.roll = function () {
            this.value = Math.floor((Math.random() * 6) + 1);
        };
        return Dice;
    }());
    (function (SearchState) {
        SearchState[SearchState["WaitingForRoll"] = 0] = "WaitingForRoll";
        SearchState[SearchState["WriteFirstDice"] = 1] = "WriteFirstDice";
        SearchState[SearchState["WriteSecondDice"] = 2] = "WriteSecondDice";
        SearchState[SearchState["Finished"] = 3] = "Finished";
    })(Utopia.SearchState || (Utopia.SearchState = {}));
    var SearchState = Utopia.SearchState;
    ;
    (function (SiteState) {
        SiteState[SiteState["Inactive"] = 0] = "Inactive";
        SiteState[SiteState["InSearch"] = 1] = "InSearch";
        SiteState[SiteState["OtherSearch"] = 2] = "OtherSearch";
        SiteState[SiteState["ScoreSearch"] = 3] = "ScoreSearch";
    })(Utopia.SiteState || (Utopia.SiteState = {}));
    var SiteState = Utopia.SiteState;
    ;
    var Search = (function () {
        function Search() {
            var i;
            var k;
            this.ldice = new Dice(1, 40, "blue", "yellow");
            this.rdice = new Dice(1, 30, "red", "white");
            this.state = SearchState.WaitingForRoll;
            this.top = [null, null, null];
            this.bottom = [null, null, null];
            this.score = [null, null, null];
        }
        Search.prototype.activeDiceVal = function () {
            switch (this.state) {
                case SearchState.WriteFirstDice: {
                    return this.ldice.value;
                }
                case SearchState.WriteSecondDice: {
                    return this.rdice.value;
                }
            }
            return this.rdice.value;
        };
        Search.prototype.roll = function () {
            this.ldice.roll();
            this.rdice.roll();
            this.state = SearchState.WriteFirstDice;
        };
        Search.prototype.calcScore = function () {
            var sign = 1;
            var pow = [100, 10, 1];
            var score = 0;
            for (var i = 0; i < 3; i++) {
                if (this.score[i] < 0) {
                    sign = -1;
                }
                score = score + Math.abs(this.score[i]) * pow[i];
            }
            return score * sign;
        };
        Search.prototype.scoreCol = function (col) {
            if (this.top[col] != null && this.bottom[col] != null) {
                this.score[col] = this.top[col] - this.bottom[col];
            }
            if (this.score[0] != null && this.score[1] != null && this.score[2] != null) {
                this.state = SearchState.Finished;
                this.finalScore = this.calcScore();
            }
        };
        Search.prototype.writeDice = function () {
            if (this.state === SearchState.WriteFirstDice) {
                this.state = SearchState.WriteSecondDice;
                this.rdice.dicesize = 40;
                this.ldice.dicesize = 30;
                return;
            }
            if (this.state === SearchState.WriteSecondDice) {
                this.state = SearchState.WaitingForRoll;
                this.rdice.dicesize = 30;
                this.ldice.dicesize = 40;
            }
        };
        Search.prototype.writeTop = function (col) {
            this.top[col] = this.activeDiceVal();
            this.scoreCol(col);
            this.writeDice();
        };
        Search.prototype.writeBottom = function (col) {
            this.bottom[col] = this.activeDiceVal();
            this.writeDice();
            this.scoreCol(col);
        };
        return Search;
    }());
    var Component = (function () {
        function Component(name, image, color, desc) {
            this.name = name;
            this.image = image;
            this.color = color;
            this.desc = desc;
        }
        return Component;
    }());
    var Construct = (function () {
        function Construct(name, image, color, desc) {
            this.name = name;
            this.image = image;
            this.color = color;
            this.desc = desc;
        }
        return Construct;
    }());
    var Treasure = (function () {
        function Treasure(name, image, color, desc) {
            this.name = name;
            this.image = image;
            this.color = color;
            this.desc = desc;
        }
        return Treasure;
    }());
    var TimeLapse = (function () {
        function TimeLapse(times) {
            this.times = times;
            this.current = 0;
        }
        return TimeLapse;
    }());
    var Site = (function () {
        function Site(name, image, component, construct, treasure, timelapse) {
            this.name = name;
            this.image = image;
            this.component = component;
            this.construct = construct;
            this.treasure = treasure;
            this.timelapse = timelapse;
            this.state = SiteState.Inactive;
            this.search = new Search();
            this.num_search = 0;
        }
        Site.prototype.resolve_score = function (score) {
            var search_score;
            if (score > -1 && score < 1100) {
                search_score = {
                    message: "You find: " + this.construct.name,
                    score: this.search.finalScore,
                    stype: 'construct',
                    construct: this.construct
                };
                return search_score;
            }
            if (score < 100) {
                search_score = {
                    message: "You find: " + this.component.name,
                    score: this.search.finalScore,
                    stype: 'component',
                    component: this.component
                };
                return search_score;
            }
        };
        return Site;
    }());
    var Game = (function () {
        function Game(userid, userName, userImage) {
            this.userid = userid;
            this.userName = userName;
            this.userImage = userImage;
            this.sites = new Array();
            this.sites.push(new Site("Forest", "forest.png", new Component("Silver", "silver.png", "grey", "Silver is very neat"), new Construct("Seal of Balance", "construct1.png", "red", "Seal of balance is very hard to get"), new Treasure("Ice plate", "ice_plate.png", "blue", "Super treasure"), new TimeLapse([-1, -1, 0, 0, 0, 0])));
            this.sites.push(new Site("Desert", "desert.png", new Component("Quarz", "quarz.png", "cyan", "Quarc is esenciall"), new Construct("Void gate", "void.png", "red", "Void gate is only thing that can save world"), new Treasure("The ancient record", "record.png", "yellow", "Ancient record of engine"), new TimeLapse([-1, 0, 0, -1, 0, 0])));
            this.sites.push(new Site("Lake", "swamp.png", new Component("Gum", "gum.png", "black", "Bouncy"), new Construct("Bracelet of los", "bracelet.png", "red", "What the fuck is this"), new Treasure("Molted shard", "molted.png", "gold", "Molted"), new TimeLapse([-1, 0, -1, 0, -1, 0])));
            this.sites.push(new Site("Polar", "pole.png", new Component("Lead", "lead.png", "maroon", "Heavy"), new Construct("Crystal Battery", "battery.png", "red", "Batery for mashine"), new Treasure("Shimmering Moonlace", "moonlace.png", "navy", "Shimmering"), new TimeLapse([-1, 0, 0, -1, 0, 0])));
            this.sites.push(new Site("Castle", "castle.png", new Component("Wax", "wax.png", "yellow", "Sticky"), new Construct("Scrying Lens", "lens.png", "red", "Lens for mashine"), new Treasure("Scale of the infinity", "scale.png", "navy", "Scale"), new TimeLapse([-1, 0, 0, -1, 0, 0])));
            this.sites.push(new Site("Island", "island.png", new Component("Silica", "silica.png", "yellow", "Sparky"), new Construct("Scrying Lens", "lens.png", "red", "Lens for mashine"), new Treasure("Scale of the infinity", "scale.png", "navy", "Scale"), new TimeLapse([-1, 0, 0, -1, 0, 0])));
        }
        return Game;
    }());
    Utopia.Game = Game;
})(Utopia || (Utopia = {}));
