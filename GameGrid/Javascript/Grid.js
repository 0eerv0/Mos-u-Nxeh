import { Helper } from "../../GameLogic/Helper.js";
import { GAME_CONST } from "../../GameConstants/GameConstants.js";
import { STYLE_THEME } from "../../GameConstants/GameTheme.js";

class Grid {
  constructor(id, level) {
    this.gridElement = document.getElementById(id);
    this.tileTypes = ["floor", "wall", "trap", "win"];
    this.tileDimension = GAME_CONST.TILE_DIMENSION;
    this.map = level.map;
    this.theme = level.theme;
    this.playerOne = { ...level.playerOne };
    this.playerTwo = { ...level.playerTwo };
    this.win = { ...level.win };
    this.index = 1;
    this.number = 1;
  }

  createTileElement(x, y, type) {
    let tileElement = document.createElement("div");
    tileElement.className = type;
    tileElement.style.width = tileElement.style.height = this.tileDimension + "px";
    tileElement.style.left = x * this.tileDimension + "px";
    tileElement.style.top = y * this.tileDimension + "px";
    return tileElement;
  }
  populateMap() {
    this.gridElement.className = "game-container " + this.theme;
    let n = 1;
    for (let y = 0; y < this.map.length; ++y) {
      if (y === 0) {
        continue;
      }
      if (y === 2 * n - 1) {
        for (let x = 0; x < this.map[y].length; ++x) {
          this.setTileType(y, x);
        }
        n = n + 2;
      } else {
        for (let x = this.map[y].length - 1; x >= 0; x--) {
          this.setTileType(y, x);
        }
      }
    }
  }

  setTileType(y, x) {
    let tiles = document.getElementById("tiles");
    let tileCode = this.map[y][x];
    let tileType = this.tileTypes[tileCode];
    let tile = this.createTileElement(x, y, tileType);
    if (tileType === "floor" || tileType === "trap" || tileType === "win") {
      tile.innerHTML = this.number++;
      tile.setAttribute("id", this.index++);
    }
    if (tileType === "trap") {
      tile.innerHTML = "";
    }
    if (tileType === "win") {
      tile.className = "win";
      tile.innerHTML = "";
    }
    tiles.appendChild(tile);
  }

  placePlayer(type) {
    let x = this[type].x;
    let y = this[type].y;
    let sprite = this.createTileElement(x, y, type);
    sprite.id = type;
    sprite.style.borderRadius = this.tileDimension + "px";
    let layer = this.gridElement.querySelector(".sprites");
    layer.appendChild(sprite);
  }
  sizeUp() {
    let map = this.gridElement.querySelector(".game-map");
    map.style.height = this.map.length * this.tileDimension + "px";
    map.style.width = this.map[0].length * this.tileDimension + "px";
  }

  styleTheme(backgroundPicture, stationPicture, tilesImage, trapsImage) {
    let body = document.body;
    let station = document.getElementById("station");
    body.style.backgroundImage = `url(${backgroundPicture})`;
    station.style.backgroundImage = `url(${stationPicture})`;
    for (let tilesIndex = 1; tilesIndex <= 49; tilesIndex++) {
      document.getElementById(tilesIndex).style.backgroundImage = `url(${tilesImage})`;
      if (document.getElementById(tilesIndex).classList.contains("trap")) {
        document.getElementById(tilesIndex).style.backgroundImage = `url(${trapsImage})`;
      }
    }
  }
  setTheme() {
    let themeChoosen = Helper.getTheme();
    if (themeChoosen === "Space Race") {
      this.styleTheme(STYLE_THEME.backgroundPictures[0],STYLE_THEME.stationImages[0],STYLE_THEME.tilesImage[0],STYLE_THEME.trapsImage[0]);
    } else if (themeChoosen === "Mystery Jungle") {
      this.styleTheme(STYLE_THEME.backgroundPictures[1],STYLE_THEME.stationImages[1],STYLE_THEME.tilesImage[1],STYLE_THEME.trapsImage[1]);
    }
  }
}



export default Grid;
