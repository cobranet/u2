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

    export enum SearchState { WaitingForRoll, WriteFirstDice, WriteSecondDice, Finished };
    export enum SiteState { Inactive, InSearch };

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
            this.score = [null, null, null];
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
            if (this.score[0] != null && this.score[1] != null && this.score[2] != null) {
                this.state = SearchState.Finished;
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
    class Component {
        constructor(public name: String, public image: String, public color: String, public desc?: String) {
        }
    }
    class Construct {
        constructor(public name: String, public image: String, public color: String, public desc?: String) {

        }
    }
    class Treasure {
        constructor(public name: String, public image: String, public color: String, public desc?: String) {

        }
    }
    class TimeLapse {
        current: number;
        constructor(public times: Array<number>) {
            this.current = 0;
        }
    }
    class Site {
        state: SiteState;
        search: Search;
        num_search: number;
        constructor(public name: String, public image: String, public component: Component, public construct: Construct, public treasure: Treasure, public timelapse: TimeLapse) {
            this.state = SiteState.Inactive;
            this.search = new Search();
            this.num_search = 0;
        }
    }
    export class Game {
        sites: Array<Site>;
        constructor(public userid: String, public userName: String, public userImage: string) {
            this.sites = new Array<Site>();
            this.sites.push(new Site("Forest", "forest.png",
                new Component("Silver", "silver.png", "grey", "Silver is very neat"),
                new Construct("Seal of Balance", "seal.png", "red", "Seal of balance is very hard to get"),
                new Treasure("Ice plate", "ice_plate.png", "blue", "Super treasure"),
                new TimeLapse([-1, -1, 0, 0, 0, 0])
            ));
            this.sites.push(new Site("Desert", "desert.png",
                new Component("Quarz", "quarz.png", "cyan", "Quarc is esenciall"),
                new Construct("Void gate", "void.png", "red", "Void gate is only thing that can save world"),
                new Treasure("The ancient record", "record.png", "yellow", "Ancient record of engine"),
                new TimeLapse([-1, 0, 0, -1, 0, 0])
            ));
            this.sites.push(new Site("Lake", "swamp.png",
                new Component("Gum", "gum.png", "black", "Bouncy"),
                new Construct("Bracelet of los", "bracelet.png", "red", "What the fuck is this"),
                new Treasure("Molted shard", "molted.png", "gold", "Molted"),
                new TimeLapse([-1, 0, -1, 0, -1, 0])
            ));
            this.sites.push(new Site("Polar", "pole.png",
                new Component("Lead", "lead.png", "maroon", "Heavy"),
                new Construct("Crystal Battery", "battery.png", "red", "Batery for mashine"),
                new Treasure("Shimmering Moonlace", "moonlace.png", "navy", "Shimmering"),
                new TimeLapse([-1, 0, 0, -1, 0, 0])
            ));
        }

    }
}
