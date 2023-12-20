import { Data }   from "../../contents/js/data.js"
import { Element } from "../../contents/js/element.js"


export class Storage{
  constructor(){
    this.set_event()
    this.set_value()
  }

  set_event(){
    if(Element.elm_tag){
      Element.elm_tag.addEventListener("change" , this.change_tag.bind(this))
    }
    if(Element.elm_imagesize){
      Element.elm_imagesize.addEventListener("change" , this.change_tag.bind(this))
    }
    if(Element.elm_fontsize){
      Element.elm_fontsize.addEventListener("change" , this.change_tag.bind(this))
    }
  }

  set_value(){
    const data = Data.storage_load() || {}
    if(Element.elm_tag && data.tag){
      Element.elm_tag.value = data.tag
    }
    if(Element.elm_imagesize && data.imagesize){
      Element.elm_imagesize.value = data.imagesize
    }
    if(Element.elm_fontsize && data.fontsize){
      Element.elm_fontsize.value = data.fontsize
    }
  }

  change_tag(){
    Data.storage_save()
  }
}
