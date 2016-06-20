"use strict";
var enums_1 = require('./enums');
var dice_1 = require('./dice');
var Search = (function () {
    function Search() {
        var i;
        var k;
        this.ldice = new dice_1.Dice(1, 40, "blue", "yellow");
        this.rdice = new dice_1.Dice(1, 30, "red", "white");
        this.state = enums_1.SearchState.WaitingForRoll;
        this.top = [null, null, null];
        this.bottom = [null, null, null];
        this.score = [null, null, null];
    }
    Search.prototype.activeDiceVal = function () {
        switch (this.state) {
            case enums_1.SearchState.WriteFirstDice: {
                return this.ldice.value;
            }
            case enums_1.SearchState.WriteSecondDice: {
                return this.rdice.value;
            }
        }
        return this.rdice.value;
    };
    Search.prototype.roll = function () {
        this.ldice.roll();
        this.rdice.roll();
        this.state = enums_1.SearchState.WriteFirstDice;
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
            this.state = enums_1.SearchState.Finished;
            this.finalScore = this.calcScore();
        }
    };
    Search.prototype.writeDice = function () {
        if (this.state === enums_1.SearchState.WriteFirstDice) {
            this.state = enums_1.SearchState.WriteSecondDice;
            this.rdice.dicesize = 40;
            this.ldice.dicesize = 30;
            return;
        }
        if (this.state === enums_1.SearchState.WriteSecondDice) {
            this.state = enums_1.SearchState.WaitingForRoll;
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
exports.Search = Search;
