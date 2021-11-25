import { Helper } from "../GameLogic/Helper.js";
import { GameLogic } from "../GameLogic/GameLogic.js";
import { Players } from "../GameLogic/Players.js";

export const PLAYERS = new Players();
export const GAME = new GameLogic();
const hasTurn = true;

export let BoardConstants = (function(){
    return {
        PLAYER_ONE_OBJECT: PLAYERS.initPlayer("playerOne", Helper.getPlayerNames()[0], hasTurn),
        PLAYER_TWO_OBJECT: PLAYERS.initPlayer("playerTwo", Helper.getPlayerNames()[1], !hasTurn),
        PLAYERS_LIST: PLAYERS.getAllPlayers()
    }

})();

// This was named playGameConstans but some of the constants of this module moved to GameConstants.js