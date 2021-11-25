import { GAME_CONST } from '../../GameConstants/GameConstants.js';
export let LobbyFunctions = (function(){

    return {
        saveOptions: saveOptions,
        validateName: validateName,
        getInputThemeDifficulty: getInputThemeDifficulty,
        toggleButtonFocus: toggleButtonFocus
    }


    // Public Methods
    function saveOptions(namePl1, namePl2, theme, difficulty){
        try{
            if(GAME_CONST.LOCAL_STORAGE_KEY === undefined)
              throw new Error("Local Storage Key is not defined !");
            else if(localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY).length === 0)
              throw new Error("Local Storage is empty !");
            
            let gameData = localStorage.getItem(GAME_CONST.LOCAL_STORAGE_KEY);
            let dataObj = JSON.parse(gameData);

            dataObj.datas.push({namePl1,namePl2,theme,difficulty});
            localStorage.setItem(GAME_CONST.LOCAL_STORAGE_KEY,JSON.stringify(dataObj));
        } catch(err){
            alert('ERROR: Game can not be initialized !');
            console.groupCollapsed(err.message);
            console.error(err.stack);
            console.groupEnd();
        }
    }

    function validateName(name){    
        let regName = /^[a-zA-Z]+/;
        if(name !== ""){
            if (regName.test(name)) 
                return true;
            else {
                alert('Invalid Name Input!');
                return false;
            }
    
        }else{
                alert('Name Fields must not be empty !');
                return false;
            }
    }

    function getInputThemeDifficulty(){
        let theme = "";
        let difficulty = "";
    
        let themeButtonList = document.querySelectorAll("#themeInputs button");
        let difficultyButtonList = document.querySelectorAll("#difficultyInputs button");
    
        for(let i = 0;i<2;i++){
            if(themeButtonList[i].getAttribute("clicked") == "true")
                theme = themeButtonList[i].value;
            if(difficultyButtonList[i].getAttribute("clicked") == "true")
                difficulty = difficultyButtonList[i].value;
        }
    
        return {
            'theme': theme,
            'difficulty': difficulty
        }
    }

    function toggleButtonFocus(rowId, classToToggle){
        let row = document.getElementById(rowId);
        let buttonsList = row.querySelectorAll('button');
        for(let button = 0; button < buttonsList.length; button++){
            let isClicked = buttonsList[button].getAttribute('clicked') == "true";
            buttonsList[button].addEventListener('click',function(){
                if(button==0){
                    if(!isClicked){
                        buttonsList[button].setAttribute('clicked','true');
                        buttonsList[button+1].setAttribute('clicked','false');
    
                        buttonsList[button].classList.add(classToToggle);
                        buttonsList[button+1].classList.remove(classToToggle);
                    }   
                }else{
                    if(!isClicked){
                        buttonsList[button].setAttribute('clicked','true');
                        buttonsList[button-1].setAttribute('clicked','false');
    
                        buttonsList[button].classList.add(classToToggle);
                        buttonsList[button-1].classList.remove(classToToggle);
                    }
                } 
            });
        }
    }
   

})();