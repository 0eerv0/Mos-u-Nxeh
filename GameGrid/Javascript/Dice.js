export let Dice = (function(){

  return {
    fetchAPI: fetchAPI,
    getDicePromise: getDicePromise,
    getDicePoints: getDicePoints,
    displayDicePoints: displayDicePoints
  }

  async function fetchAPI() {
    let cacheName = 'diceAPI';

    let dice = document.getElementById("diceToDisplay");
    dice.src = "../../assets/Css/images/dice.gif";
    document.body.style.pointerEvents = 'none';

    let response; 
    try{
      let url = "http://roll.diceapi.com/json/d6";
      response = await fetch(url);

      if (!response.ok) 
        throw new Error("Dice API ERROR !");
        
        document.body.style.pointerEvents = 'auto';

      caches.open(cacheName).then(cache => cache.add(url));
      return await response.json();
    }catch(err){
      document.getElementById('errorModal').style.display = 'block';
      document.body.style.pointerEvents = 'none';
      console.groupCollapsed(err.message);
      console.error(err.stack);
      console.groupEnd();
    }

  }

  function getDicePromise() {
    let DicePromise = fetchAPI();
    return DicePromise;
  }
  async function getDicePoints(Promise) {
    let dicePoints = 0;
    await Promise.then((data) => {
      dicePoints = data.dice[0].value;
    });
    
    return dicePoints;
  }

  async function displayDicePoints(DicePromise) {
    let dicePoints = await getDicePoints(DicePromise);
    let dice = document.getElementById("diceToDisplay");

    dice.src = `http://roll.diceapi.com/images/poorly-drawn/d6/${dicePoints}.png`;
  }

})();
