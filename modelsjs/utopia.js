var Utopia;
(function (Utopia) {
    var Dice = (function () {
        function Dice(color) {
            this.color = color;
            this.color = color;
        }
        Dice.prototype.set = function () {
            return 6;
        };
        Dice.prototype.roll = function () {
            this.value = Math.floor((Math.random() * 6) + 1);
        };
        return Dice;
    }());
    var SearchState;
    (function (SearchState) {
        SearchState[SearchState["WaitingForRoll"] = 0] = "WaitingForRoll";
        SearchState[SearchState["WriteFirstDice"] = 1] = "WriteFirstDice";
        SearchState[SearchState["WriteSecondDice"] = 2] = "WriteSecondDice";
    })(SearchState || (SearchState = {}));
    ;
    var Search = (function () {
        function Search() {
            var i;
            var k;
            this.ldice = new Dice("blue");
            this.rdice = new Dice("red");
            this.state = SearchState.WaitingForRoll;
            this.top = [1, 2, 3];
        }
        Search.prototype.roll = function () {
            this.ldice.roll();
            this.rdice.roll();
            this.state = SearchState.WriteFirstDice;
        };
        Search.prototype.diceVisible = function () {
            switch (this.state) {
                case SearchState.WaitingForRoll: {
                    return false;
                }
            }
            return true;
        };
        return Search;
    }());
    var Site = (function () {
        function Site(name) {
            this.name = name;
        }
        return Site;
    }());
    var Game = (function () {
        function Game(userid, userName, userImage) {
            this.userid = userid;
            this.userName = userName;
            this.userImage = userImage;
            this.search = new Search();
        }
        return Game;
    }());
    Utopia.Game = Game;
})(Utopia || (Utopia = {}));
