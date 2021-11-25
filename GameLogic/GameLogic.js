import {OnBoardMoves} from "../GameGrid/Javascript/OnBoardMoves.js";
import { Helper } from "./Helper.js";
import { PLAYERS } from "../GameConstants/BoardConstants.js";
import { GAME_CONST } from "../GameConstants/GameConstants.js";

export let GameLogic = function(){
    function onFirstRoll( player){
        player.onStart = false;
        player.setPoints(1); 
        let tilesToMove = player.getPoints();
        let playerID = player.getPlayerId();
        OnBoardMoves.initPlayerMove(tilesToMove, playerID);
    }

    function onRoll(player){
        let playerID = player.getPlayerId();
        let tilesToMove = player.getPoints();
        
        OnBoardMoves.movePlayerOnTile( playerID, tilesToMove);
    }

    function playerTurn(gotSixOnDice, player){
        // Dice Rules on Six
        if(!gotSixOnDice) {
            player.switchTurn();
        }else if(gotSixOnDice && player.getPlayerTurn()){
            player.gotSixPoints();
            if(player.banPlayerTurn()){
                // Check the initial player tile and move back accordingly
                let theTileBeforeThirdSix = player.getPoints()-12;
                if(theTileBeforeThirdSix == 1)
                    player.setPoints(-12);
                else
                    player.setPoints(-17);

                onRoll(player);
                player.switchTurn();
            }//End nested if
        }
    }


    function winCase(dicePoints, player){
        let tilesToMove = player.getPoints();
        let playerID = player.getPlayerId();

        if(tilesToMove > 50){
            alert('Cant move on tile '+ tilesToMove);
            player.setPoints((-dicePoints)); 

            return true;
        }
        else if(tilesToMove === 50 && dicePoints === 6){
            alert('You cant Win on Six !');
            player.setPoints(-6);

            return true;
        } 
         else if (tilesToMove == 50 && dicePoints !== 6){
            OnBoardMoves.movePlayerOnTile( playerID, tilesToMove);
            onWin(playerID);

            return true;
         }
         else{
             return false;
         }
    }
   
    // Private Methods
    function onWin(playerID){
        let modalDiv = document.getElementById("winBanner");
        let winnerName = document.getElementById("winner");
        if(playerID === 'playerOne'){
            winnerName.append(Helper.getPlayerNames()[0]);
        }
        else if(playerID === 'playerTwo'){
            winnerName.append(Helper.getPlayerNames()[1]);
        }
        modalDiv.style.display = "block";
        let buttonToEndGame = document.getElementById("closeWin");
        buttonToEndGame.addEventListener("click", (e) => {
            e.preventDefault();
            PLAYERS.emptyPlayersList();
            localStorage.removeItem(GAME_CONST.LOCAL_STORAGE_KEY);
            window.location.href = '../Game Lobby/gameLobby.html';
        });
    }
    function highlightPlayerName(playerID){
        switch(playerID){
            case "playerOne":{
                GAME_CONST.PLAYER_ONE_EL.classList.add("turn");
                GAME_CONST.PLAYER_TWO_EL.classList.remove("turn");
                break;
            }
            case "playerTwo": {
                GAME_CONST.PLAYER_ONE_EL.classList.remove("turn");
                GAME_CONST.PLAYER_TWO_EL.classList.add("turn");
                break;
            }
            default: {
                GAME_CONST.PLAYER_ONE_EL.classList.remove("turn");
                GAME_CONST.PLAYER_TWO_EL.classList.remove("turn");
                break;
            }
        }
    }
    return {
        onFirstRoll: onFirstRoll,
        onRoll: onRoll,
        playerTurn: playerTurn,
        onWin: onWin,
        highlightPlayerName: highlightPlayerName,
        winCase:winCase
    }
};