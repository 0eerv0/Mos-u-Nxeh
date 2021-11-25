import {OnBoardMoves} from "../GameGrid/Javascript/OnBoardMoves.js";
import { Challenge } from "../GameChallanges/Challenge.js";
import { CHALLENGE_CONST } from "../GameConstants/ChallengeConstants.js";
import { Helper } from "./Helper.js";

let correctAnswer;
let answer;

export let TrapsLogic = (function(){

  return {
    checkTraps: checkTraps,
    checkTrapsHard: checkTrapsHard,
    checkTrapsWithDifficulty: checkTrapsWithDifficulty
  }

  function randomIntFromInterval(max) { 
    return Math.floor(Math.random() * max);
  }

  function resetAnswerField(){
    document.getElementById('answer').value="  ";
  }
  
  function playerMover(correctAnswer, player, answer) {
    if (answer === correctAnswer) {
      player.setPoints(2);
      alert("You found correct answer! Go 2 tiles forward!");
    } else {
      player.setPoints(-2);
      alert("You didnt find the correct answer! Now you have to go 2 tiles back!")
    }
    
    OnBoardMoves.movePlayerOnTile(player.getPlayerId(), player.getPoints());
    resetAnswerField();
    CHALLENGE_CONST.MODAL.style.display = "none";
  }
  
  function challengeSetter(challenge) {
    let randInt = randomIntFromInterval(4);
  
    CHALLENGE_CONST.QUESTION.innerHTML = challenge[randInt].question;
    let correctAnswer = challenge[randInt].answer;
  
    CHALLENGE_CONST.MODAL.style.display = "block";
    document.getElementById("diceToRoll").style.pointerEvents = "none";  
    return correctAnswer;
  }
  
  
  // Public
  async function checkTraps(player){
    
    if ( CHALLENGE_CONST.TRAPPED_POINTS_NORMAL.includes(player.playerPoints) )
    {
      switch (player.playerPoints) {
        case 4:{
          player.setPoints(2);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
          
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="You found a jet booster at tile 4. You advance to 6";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";
  
          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 4000);
          break;
        }
         
        case 16: {
          const galaxyChallenge = await Challenge.fetchChallengeToArray("../GameChallanges/QuizChallenge.json", "galaxy");
          correctAnswer = challengeSetter(galaxyChallenge);
  
          CHALLENGE_CONST.BTN_CLOSE.onclick = function () {
            answer = document.getElementById("answer").value;
            playerMover(correctAnswer, player, answer);
            CHALLENGE_CONST.QUESTION.innerHTML = "";
            resetAnswerField();
            setTimeout(function () {
              document.getElementById("diceToRoll").style.pointerEvents = "auto";
            }, 4000);
            
          };
          break;
        }
          
        case 22: {
          player.setPoints(10);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
  
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="You pass through a wormhole at tile 22. Time travel to tile 32";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";
          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 4000);
          break;
        }
          
        case 26: {
          const colorChallenge = await Challenge.fetchChallengeToArray("../GameChallanges/ColorChallenge.json", "color");
          correctAnswer = challengeSetter(colorChallenge);
  
          CHALLENGE_CONST.BTN_CLOSE.onclick = function () {
            answer = document.getElementById("answer").value;
            playerMover(correctAnswer, player, answer);
            CHALLENGE_CONST.QUESTION.innerHTML = "";
            resetAnswerField();
            setTimeout(function () {
              document.getElementById("diceToRoll").style.pointerEvents = "auto";
            }, 4000);
          };
          break;
        }
          
        case 33: {
          player.setPoints(-12);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
  
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="A small asteroid debris hits you at tile 33. Go to 21 to check your spaceship";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";
          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 4000);
          break;
        }
          
        case 38: {
          const galaxyStrChallenge = await Challenge.fetchChallengeToArray("../GameChallanges/StringChallenge.json", "galaxy");
          correctAnswer = challengeSetter(galaxyStrChallenge);
  
          CHALLENGE_CONST.BTN_CLOSE.onclick = function () {
            answer = document.getElementById("answer").value;
            playerMover(correctAnswer, player, answer);
            resetAnswerField();
            setTimeout(function () {
              document.getElementById("diceToRoll").style.pointerEvents = "auto";
            }, 4000);
          };
          break;
        }
          
        case 44: {
          player.setPoints(-16);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
  
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="Gravity makes you sleepy at tile 44. Go to 28 to rest";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";
          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 4000);
          break;
        }
          
        default:
          console.log("Well done! You made it without getting caught in any trap! ");
          break;
      }//End of SWITCH
    }//End of IF
  }//Function END

  async function checkTrapsHard(player){
    checkTraps(player);
    if(CHALLENGE_CONST.TRAPPED_POINTS_HARD.includes(player.playerPoints)){
      switch(player.playerPoints){
        case 10:{ 

          player.setPoints(-8);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="You found a boost trap! Watch out for surprise!";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";

          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 3000);
          break;
        }
        case 20:{ 

          const galaxyStrChallenge = await Challenge.fetchChallengeToArray("../GameChallanges/ArithmeticalChallenges.json", "hard");
          correctAnswer = challengeSetter(galaxyStrChallenge);
  
          CHALLENGE_CONST.BTN_CLOSE.onclick = function () {
            answer = document.getElementById("answer").value;
            playerMover(correctAnswer, player, answer);
            resetAnswerField();
            setTimeout(function () {
              document.getElementById("diceToRoll").style.pointerEvents = "auto";
            }, 4000);
          };
          break;
        }

        case 47:{

          player.setPoints(-46);
          OnBoardMoves.movePlayerOnTile(player.getPlayerId(),player.getPoints());
          
          CHALLENGE_CONST.ALERT_MODAL.innerHTML ="GO TO 1";
          CHALLENGE_CONST.ALERT_MODAL.style.display = "block";
  
          setTimeout(function () {
            CHALLENGE_CONST.ALERT_MODAL.style.display = "none";
            document.getElementById("diceToRoll").style.pointerEvents = "auto";
          }, 1000);
          break;
        }
        default:
          console.log("Well done! You made it without getting caught in any Hard trap! ");
          break;
      }
    }
  }

  function checkTrapsWithDifficulty(player){
    if(Helper.getDifficulty() === "Normal"){
      checkTraps(player);
    }
    else if(Helper.getDifficulty() === "Hard"){
      checkTrapsHard(player);
    }
  }

})();//Module END


