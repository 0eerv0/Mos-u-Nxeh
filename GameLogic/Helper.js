import { GAME_CONST } from "../GameConstants/GameConstants.js";
export let Helper = (function(){

  function getTheme() {
    try{
      if(GAME_CONST.LOCAL_STORAGE_KEY === undefined)
        throw new Error("Local Storage Key is not defined !");
      else if(localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY).length === 0)
        throw new Error("Local Storage is empty !");
      
      let data = localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY);
      let dataObj = JSON.parse(data).datas;
      let lastArray = dataObj.slice(-1);

      return lastArray[0].theme;
    }
    catch(err){
      console.groupCollapsed(err.message);
      console.error(err.stack);
      console.groupEnd();

      return 'Mystery Jungle';
    }
    
  }
  function getDifficulty() {
    try{
      if(GAME_CONST.LOCAL_STORAGE_KEY === undefined)
        throw new Error("Local Storage Key is not defined !");
      else if(localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY).length === 0)
        throw new Error("Local Storage is empty !");

      let data = localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY);
      let dataObj = JSON.parse(data).datas;
      let lastArray = dataObj.slice(-1);
      return lastArray[0].difficulty;
    }catch(err){
      console.groupCollapsed(err.message);
      console.error(err.stack);
      console.groupEnd();

      return 'Normal';
    }
  }
  function getPlayerNames() {
      try{
        if(GAME_CONST.LOCAL_STORAGE_KEY === undefined)
          throw new Error("Local Storage Key is not defined !");
        else if(localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY).length === 0)
          throw new Error("Local Storage is empty !");

        let data = localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY);
        let dataObj = JSON.parse(data).datas;
        let lastArray = dataObj.slice(-1);
        let nameArray1 = lastArray[0].namePl1;
        let nameArray2 = lastArray[0].namePl2;
        let nameArray = [];
        nameArray.push(nameArray1, nameArray2);
        return nameArray;
      
      }catch(err){
        console.groupCollapsed(err.message);
        console.error(err.stack);
        console.groupEnd();

        return ['User', 'User'];
      }
  }

  return {
    getTheme: getTheme,
    getDifficulty: getDifficulty,
    getPlayerNames: getPlayerNames
  }

})();
