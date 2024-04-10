import { Element }     from "./element.js"
import { CreateCrawl } from "./create_crawl.js"
import { Data }        from "./data.js"
import { Code }        from "./code.js"
import { Preview }     from "./preview.js"

export class Event{
  constructor(){
    this.set_event()
  }

  set_event(){
    if(Element.elm_imagesize){
      Element.elm_imagesize.addEventListener("change", this.change_imagesize.bind(this))
    }
    if(Element.elm_fontsize){
      Element.elm_fontsize.addEventListener("change", this.change_fontsize.bind(this))
    }
    if(Element.elm_button){
      Element.elm_button.addEventListener("click" , this.click_create.bind(this))
    }
    if(Element.elm_tag){
      Element.elm_tag.addEventListener("input" , this.input_tag.bind(this))
    }
    if(Element.elm_exceptStyle){
      Element.elm_exceptStyle.addEventListener("change", this.set_except_style.bind(this))
    }
  }

  change_imagesize(e){
    Data.storage_save()
    const img = Element.elm_main_image
    if(!img){return}
    img.style.setProperty("width",`${e.target.value}px`,"")
    Data.set_value()
    new Code()
    new Preview()
  }

  change_fontsize(e){
    Data.storage_save()
    const root = Element.elm_root
    if(!root){return}
    root.style.setProperty("font-size",`${e.target.value}`,"")
    Data.set_value()
    new Code()
    new Preview()
  }

  input_tag(e){
    Data.storage_save()
  }

  click_create(){
    new CreateCrawl()
  }

  set_except_style(e){
    if(!Data.source){return}
    Element.elm_source.value = Code.except_style(Data.source)
  }
}