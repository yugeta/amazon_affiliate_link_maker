import { Control } from "./control.js"

class Main{
  constructor(){
    new Control()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
    break
  default:
    window.addEventListener("DOMContentLoaded", ()=>{new Main()})
}