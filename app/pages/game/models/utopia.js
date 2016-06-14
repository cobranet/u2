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
    })();
    var Cell = (function () {
        function Cell(value) {
            this.value = value;
        }
        Cell.prototype.set = function (val) {
            this.value = val;
        };
        Cell.prototype.clear = function () {
            this.value = null;
        };
        return Cell;
    })();
    var State;
    (function (State) {
        State[State["WaitingForRoll"] = 0] = "WaitingForRoll";
        State[State["WriteFirstDice"] = 1] = "WriteFirstDice";
        State[State["WriteSecondDice"] = 2] = "WriteSecondDice";
    })(State || (State = {}));
    ;
    var Search = (function () {
        function Search() {
            var i = 0;
            this.ldice = new Dice("blue");
            this.rdice = new Dice("red");
            this.state = 0 /* WaitingForRoll */;
            this.cells = new Array();
            for (i = 0; i < 3; i++) {
                this.cells[i] = new Array();
            }
            for (i = 0; i < 3; i++) {
                this.cells[0].push(new Cell(null));
                this.cells[1].push(new Cell(null));
                this.cells[2].push(new Cell(null));
            }
        }
        Search.prototype.cell = function (x, y) {
            return this.cells[x][y].value;
        };
        Search.prototype.set = function (x, y, value) {
            this.cells[x][y].set(value);
        };
        Search.prototype.roll = function () {
            this.ldice.roll();
            this.rdice.roll();
            this.state = 1 /* WriteFirstDice */;
        };
        Search.prototype.writeDice = function (value, row, col) {
            this.cells[row][col].set(value);
        };
        Search.prototype.scoreCol = function (col) {
            this.cells[0][col].set(3);
            this.cells[1][col].set(2);
            var top = this.cells[0][col].value;
            var bottom = this.cells[1][col].value;
            if (top != null && bottom != null) {
                var rez = top - bottom;
                this.cells[2][col].set(rez);
                console.log(this.cells[2][col]);
            }
        };
        Search.prototype.diceVisible = function () {
            switch (this.state) {
                case 0 /* WaitingForRoll */: {
                    return false;
                }
            }
            return true;
        };
        return Search;
    })();
    var Site = (function () {
        function Site(name) {
            this.name = name;
        }
        return Site;
    })();
    var Game = (function () {
        function Game(userid, userName, userImage) {
            this.userid = userid;
            this.userName = userName;
            this.userImage = userImage;
            this.search = new Search();
        }
        return Game;
    })();
    Utopia.Game = Game;
})(Utopia || (Utopia = {}));
