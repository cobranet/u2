module Utopia {
    class Dice {
        constructor(public value: number,
            public dicesize: number,
            public color: string,
            public dotcolor: string
        ) {
        }
        roll() {
            this.value = Math.floor((Math.random() * 6) + 1);
        }

    }

    export enum SearchState { WaitingForRoll, WriteFirstDice, WriteSecondDice };

    class Search {

        ldice: Dice;
        rdice: Dice;
        state: SearchState;
        top: Array<number>;
        bottom: Array<number>;
        score: Array<number>;
        constructor() {
            var i: number;
            var k: number;
            this.ldice = new Dice(1, 40, "blue", "yellow");
            this.rdice = new Dice(1, 30, "red", "white");
            this.state = SearchState.WaitingForRoll;
            this.top = [null, null, null];
            this.bottom = [null, null, null];
            this.score = [-1000, -1000, -1000];
        }

        activeDiceVal() {
            switch (this.state) {
                case SearchState.WriteFirstDice: {
                    return this.ldice.value;
                }

                case SearchState.WriteSecondDice: {
                    return this.rdice.value;
                }
            }
            return this.rdice.value;
        }
        roll() {
            this.ldice.roll();
            this.rdice.roll();
            this.state = SearchState.WriteFirstDice;
        }
        scoreCol(col: number) {
            if (this.top[col] != null && this.bottom[col] != null) {
                this.score[col] = this.top[col] - this.bottom[col];
            }
        }

        writeDice() {
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

        }
        writeTop(col: number) {
            this.top[col] = this.activeDiceVal();
            this.scoreCol(col);
            this.writeDice();
        }

        writeBottom(col: number) {
            this.bottom[col] = this.activeDiceVal();
            this.writeDice();
            this.scoreCol(col);
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
