// An individual player. Holds properties and behavior for one player
class Player{
    constructor(playerId, playerName, hasTurn){
        this.playerId = playerId;
        this.playerName = playerName;
        this.hasTurn = hasTurn;
        this.playerPoints = 0;
        this.onStart = true;
        this.countTheSix = 0;
    }

    gotSixPoints(){
        this.countTheSix++;
    }
    banPlayerTurn(){
        if(this.countTheSix == 3){
            alert('You got three six in a row ! Dont Cheat !');
            
            this.countTheSix = 0;
            return true;
        }
        return false;
    }

    setOnStartState(onStartState){
        return this.onStart = onStartState;
    }
    getOnStartState(){
        return this.onStart;
    }

    setPoints(pointsFromDice){
        return this.playerPoints += pointsFromDice;
    }
    resetPoints(){
        return this.playerPoints = 1;
    }
    getPoints(){
        return this.playerPoints;
    }

    getPlayerId(){
        return this.playerId;
    }

    getPlayerTurn(){
        return this.hasTurn;
    }
    switchTurn(){
        this.countTheSix = 0;
        return this.hasTurn = !this.hasTurn;
    }   
}
export default Player;