import { Data }   from "../../contents/js/data.js"
import { Element } from "../../contents/js/element.js"


export class Storage{
  constructor(){
    this.init()
  }

  init(){
    const data = Data.storage_load()
    if(Element.elm_tag){
      Element.elm_tag.addEventListener("change" , this.change_tag.bind(this))
      if(data && data.tag){
        Element.elm_tag.value = data.tag
      }
    }
  }

  change_tag(){
    Data.storage_save()
  }
}
