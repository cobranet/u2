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
    class Cell {
        constructor(public value: number) {
        }
        set(val: number) {
            this.value = val;
        }
        clear() {
            this.value = null;
        }
    }
    enum State { WaitingForRoll, WriteFirstDice, WriteSecondDice };

    class Search {

        ldice: Dice;
        rdice: Dice;
        state: State;
        cells: Array<Array<Cell>>;
        constructor() {
            var i = 0;
            this.ldice = new Dice("blue");
            this.rdice = new Dice("red");
            this.state = State.WaitingForRoll;
            this.cells = new Array<Array<Cell>>();
            for (i = 0; i < 3; i++) {
                this.cells[i] = new Array<Cell>();
            }
            for (i = 0; i < 3; i++) {
                this.cells[0].push(new Cell(null));
                this.cells[1].push(new Cell(null));
                this.cells[2].push(new Cell(null));
            }
        }
        cell(x, y): number {
            return this.cells[x][y].value;
        }
        set(x, y, value): void {
            this.cells[x][y].set(value);
        }
        roll() {
            this.ldice.roll();
            this.rdice.roll();
            this.state = State.WriteFirstDice;
        }
        writeDice(value, row, col) {
            this.cells[row][col].set(value);
        }
        scoreCol(col) {
            this.cells[0][col].set(3);
            this.cells[1][col].set(2);
            var top: number = this.cells[0][col].value;
            var bottom: number = this.cells[1][col].value;

            if (top != null && bottom != null) {
                var rez: number = top - bottom;
                this.cells[2][col].set(rez);
                console.log(this.cells[2][col]);
            }
        }
        diceVisible() {
            switch (this.state) {
                case State.WaitingForRoll: {
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
