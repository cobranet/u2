"use strict";
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
exports.Dice = Dice;
