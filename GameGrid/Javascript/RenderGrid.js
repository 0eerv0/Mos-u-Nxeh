import Grid from "./Grid.js";
import { Helper } from "../../GameLogic/Helper.js";

let levels = [];
levels[0] = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],

  playerOne: {
    x: 1,
    y: 0,
  },
  playerTwo: {
    x: 1,
    y: 1,
  },

  theme: "default",
};

levels[1] = {
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 2, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],

  playerOne: {
    x: 1,
    y: 2,
  },
  playerTwo: {
    x: 2,
    y: 1,
  },

  theme: "default",
};
function createGridwithProperties(id, level){
  let grid = new Grid(id, level);
  grid.populateMap();
  grid.sizeUp();
  grid.setTheme();
  grid.placePlayer("playerOne");
  grid.placePlayer("playerTwo");
}
export function init() {
  let difficulty = Helper.getDifficulty();
  if (difficulty === "Normal") {
    createGridwithProperties("game-container-1", levels[0]);
  } else if (difficulty === "Hard") {
    createGridwithProperties("game-container-1", levels[1]);
  }
}
