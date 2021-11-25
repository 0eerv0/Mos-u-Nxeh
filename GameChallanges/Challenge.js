export let Challenge = (function(){

    return {
        fetchChallengeToArray: fetchChallengeToArray
    }

    async function fetchChallengeToArray(jsonPath, challengeCategory){
        try{
            let res = await fetch(jsonPath);
    
            if(!res.ok)
                throw new Error(`JSON ${challengeCategory} ERROR !`);
    
            let Challenge = await res.json();
            let challengeArray = Challenge[challengeCategory];
    
            return challengeArray;
    
        }catch(e){
            console.log(e);
            return null;
        }
    }

})();

