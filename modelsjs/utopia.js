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
        Search.prototype.scoreCol = function (col) {
            if (this.top[col] != null && this.bottom[col] != null) {
                this.score[col] = this.top[col] - this.bottom[col];
            }
            if (this.score[0] != null && this.score[1] != null && this.score[2] != null) {
                this.state = SearchState.Finished;
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
