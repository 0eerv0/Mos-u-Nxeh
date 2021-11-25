import { Helper } from "../../GameLogic/Helper.js";

export function getEachName(){
    let names = Helper.getPlayerNames();
    let pl1 = document.getElementById("pl1");
    let pl2 = document.getElementById("pl2");
    //pl1.innerHTML +=names[0];
   // pl2.innerHTML +=names[1];
     pl1.append(names[0]);
     pl2.append(names[1]);
}
// document.addEventListener("DOMContentLoaded", ()=>{
    getEachName();
// });

