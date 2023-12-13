import { Asset }    from "./asset.js"
import { Event }    from "./event.js"
import { Data }     from "./data.js"
import { Element }  from "./element.js"
import { Template } from "./template.js"
import { Loading }  from "./loading/loading.js"

class Main{
  constructor(){
    new Loading()
    new Event()
    new Asset({
      callback : (()=>{
        new Template()
      })
    })
    this.storage()
  }
  storage(){
    const storage_data = Data.storage_load()
    if(!storage_data){return}
    // console.log(storage_data)
    for(const key in storage_data){
      switch(key){
        case "fontsize":
          Element.elm_fontsize.value = storage_data[key]
          break
        case "imagesize":
          Element.elm_imagesize.value = storage_data[key]
          break
        case "tag":
          Element.elm_tag.value = storage_data[key]
          break
      }
    }
    // console.log(storage_data)
  }
}

switch(document.readyState){
  case "complete":
  case "interactive":
    new Main()
    break
  default:
    window.addEventListener("DOMContentLoaded" , (()=>new Main()))
}