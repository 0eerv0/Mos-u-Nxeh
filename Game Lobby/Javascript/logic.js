import { LobbyFunctions } from "./functionalities.js";
import { Helper } from "../../GameLogic/Helper.js";
import {GAME_CONST } from '../../GameConstants/GameConstants.js';

document.addEventListener("DOMContentLoaded", (event) => {
  // Togle Focus on click of theme and difficulty
  LobbyFunctions.toggleButtonFocus("themeInputs", "onSpaceButtonFocus");
  LobbyFunctions.toggleButtonFocus("difficultyInputs","onDifficultyButtonFocus");
  const data = {
    datas: [],
  };

  if (!localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY)) {
    let data_stringified = JSON.stringify(data);
    localStorage.setItem(GAME_CONST.LOCAL_STORAGE_KEY, data_stringified);
  }

  document.getElementById("save").addEventListener("click", (e) => {
    e.preventDefault();

    const namePlayerOne = document.getElementById("firstPlayer").value;
    let isValidNameOne = LobbyFunctions.validateName(namePlayerOne);

    const namePlayerTwo = document.getElementById("secondPlayer").value;
    let isValidNameTwo = LobbyFunctions.validateName(namePlayerTwo);

    let Option = LobbyFunctions.getInputThemeDifficulty();

    // Validate all fields before saving in local storage
    if (
      isValidNameOne &&
      isValidNameTwo &&
      Option.theme != "" &&
      Option.difficulty != ""
    ) {
      LobbyFunctions.saveOptions(
        namePlayerOne,
        namePlayerTwo,
        Option.theme,
        Option.difficulty
      );
      let themeChoosen = Helper.getTheme();
      if (themeChoosen === "Space Race") {
        window.location.href = "../../Story/SpaceRaceStory.html";
      } else if (themeChoosen === "Mystery Jungle") {
        window.location.href = "../../Story/MysteryJungleStory.html";
      } else {
        alert("Complete all the fields properly before procceding !");
        location.reload();
      }
    }
  });
});