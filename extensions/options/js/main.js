import { Storage } from "./storage.js"

class Main{
  constructor(){
    new Storage()
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
    break
  default:
    window.addEventListener("DOMContentLoaded" , ()=>new Main())
}