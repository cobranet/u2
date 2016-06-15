module Utopia {
    class Dice {
        value: number;
        set() {
            return 6;
        }
        constructor(public color: string) {
            this.color = color;
        }
        roll() {
            this.value = Math.floor((Math.random() * 6) + 1);
        }
    }

    enum SearchState { WaitingForRoll, WriteFirstDice, WriteSecondDice };

    class Search {

        ldice: Dice;
        rdice: Dice;
        state: SearchState;
        top: Array<number>;
        constructor() {
            var i: number;
            var k: number;
            this.ldice = new Dice("blue");
            this.rdice = new Dice("red");
            this.state = SearchState.WaitingForRoll;
            this.top = [1, 2, 3];
        }

        roll() {
            this.ldice.roll();
            this.rdice.roll();
            this.state = SearchState.WriteFirstDice;
        }

        diceVisible() {
            switch (this.state) {
                case SearchState.WaitingForRoll: {
                    return false;
                }
            }
            return true;
        }
    }
    class Site {
        state: String;
        constructor(public name: String) {
        }
    }
    export class Game {
        search: Search;
        constructor(public userid: String, public userName: String, public userImage: string) {
            this.search = new Search();
        }

    }
}
