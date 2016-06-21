define(["require", "exports"], function (require, exports) {
    "use strict";
    (function (SearchState) {
        SearchState[SearchState["WaitingForRoll"] = 0] = "WaitingForRoll";
        SearchState[SearchState["WriteFirstDice"] = 1] = "WriteFirstDice";
        SearchState[SearchState["WriteSecondDice"] = 2] = "WriteSecondDice";
        SearchState[SearchState["Finished"] = 3] = "Finished";
    })(exports.SearchState || (exports.SearchState = {}));
    var SearchState = exports.SearchState;
    ;
    (function (SiteState) {
        SiteState[SiteState["Inactive"] = 0] = "Inactive";
        SiteState[SiteState["InSearch"] = 1] = "InSearch";
        SiteState[SiteState["OtherSearch"] = 2] = "OtherSearch";
        SiteState[SiteState["ScoreSearch"] = 3] = "ScoreSearch";
    })(exports.SiteState || (exports.SiteState = {}));
    var SiteState = exports.SiteState;
    ;
});
