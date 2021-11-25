import { PLAYERS } from "../../GameConstants/BoardConstants.js";

export let OnBoardMoves = (function(){

    return {
        initPlayerMove: initPlayerMove,
        movePlayerOnTile: movePlayerOnTile,
        eatPlayer: eatPlayer
    }

    // Public Methods
    function initPlayerMove(dicePoints, playerID){
        let targetTile = document.getElementById(dicePoints);
        let playerEl = document.getElementById(playerID);
        let playersContainer = document.getElementById('station');
    
        updateTilesStyleOnMove(targetTile, playerEl);
        movePlayer(playerEl, targetTile, playersContainer);
    }
    
    function movePlayerOnTile(playerID, playerPoints){
        let parentEl = document.getElementById(playerID).parentElement;
        let tileToLeaveId = parseInt(parentEl.getAttribute('id'));

        let playerEl = document.getElementById(playerID);
    
        let targetTile = document.getElementById(playerPoints);
        let isBusyTarget = targetTile.getAttribute('isbusy') === 'true';

        if(!isBusyTarget){  
            const isProgressing = (tileToLeaveId < playerPoints);
            switch(isProgressing){
                case false: {
                    updateTilesStyleOnLeave(parentEl);
                    updateTilesStyleOnMove(targetTile, playerEl);
        
                    movePlayer(playerEl, targetTile, parentEl);
                    break;
                }
                case true: {
                    moveSmothly(playerEl, targetTile, tileToLeaveId)
                    break;
                }
                default: {
                    alert('ERROR !');
                    console.error('Error on Switch isProgessing Line 31. OnBoardMoves.js');
                    break;
                } 
            }//Switch END
        }else{
            movePlayer(playerEl, targetTile, parentEl);
            updateTilesStyleOnLeave(parentEl);
            
            eatPlayer(targetTile);
        }
        
    }
    
    // Private Methods
    function eatPlayer(targetTileEl){
        const startTile = document.getElementById("1");
    
        let playerEl = targetTileEl.childNodes[1];

        let playerId = playerEl.getAttribute('id');
        let player = PLAYERS.getPlayerInstance(playerId);
        player.resetPoints();

        updateTilesStyleOnMove(startTile, playerEl);
        movePlayer(playerEl, startTile, targetTileEl);
    }
    
    function movePlayer(playerEl, targetTile, tileToLeave){
        let temp = playerEl;
        tileToLeave.removeChild(playerEl);
        targetTile.appendChild(temp);
    }


    function moveSmothly(playerEl, targetTile, tileToLeaveId){
        let targetTileId = parseInt(targetTile.getAttribute('id'));

        let temp = playerEl;
        let counter = 0;
        for(let id = tileToLeaveId; id < targetTileId; id++){
            document.body.style.pointerEvents = "none";
            counter++;
            setTimeout(()=>{
                try{
                    let tile = document.getElementById(id);
                    if(playerEl.parentElement !== tile){
                        throw new Error('This Tile is not parent of the Player Element !');
                    }

                    let nextTile = document.getElementById(parseInt(id)+1);

                    updateTilesStyleOnLeave(tile);         
                    tile.removeChild(playerEl);

                    updateTilesStyleOnMove(nextTile, temp);
                    nextTile.appendChild(temp);
                }catch(err){
                    console.groupCollapsed(err.message);
                    console.error(err.stack);
                    console.groupEnd();
                }
            }, 350*counter);

        }//END For
        setTimeout(()=>{
            document.body.style.pointerEvents = "auto";
        }, 350*(counter))
    }//END of Function

    function updateTilesStyleOnMove(targetEl, childEl){
        targetEl.style.border = "none";
    
        childEl.style.position = "absolute";
        childEl.style.left = "0";
        childEl.style.top = "0";
    
        targetEl.setAttribute('isbusy','true');
    }
    
    function updateTilesStyleOnLeave(parentEl){
        parentEl.style.border = "5px solid rgba(0, 0, 0, 0.3)";
        parentEl.setAttribute('isbusy','false');
    }

})();


