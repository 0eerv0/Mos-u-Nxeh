import Player from "./Player.js"
// Class that holds a collection of players and properties and functions for the group
export class Players {
   constructor(){
      this.players = [];
    }

    initPlayer(id, name, hasTurn) {
      const player = new Player(id, name, hasTurn);
      
      this.players.push(player);
      return player;
    }
    
    getAllPlayers(){
      return this.players;
    }
   
    getPlayerInstance(playerId){
      return this.players.find(player => player.getPlayerId() == playerId )
    }

    emptyPlayersList(){
      this.players = [];
    }

}