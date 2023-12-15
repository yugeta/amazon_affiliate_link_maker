import { Asset }     from "./asset.js"
import { Convert }   from "./convert.js"
import { Element }   from "./element.js"
import { Data }      from "./data.js"

export class Preview{
  constructor(options){
    this.options = options || {}
    this.clear()
    if(!Data.datas){return}
    if(Data.status === "success"){
      this.view()
    }
    else{
      this.error()
    }
    this.finish()
  }

  get template(){
    const tmp = Data.template_load()
    const ast = Asset.sample
    return tmp ? tmp : ast
  }

  clear(){
    Element.elm_preview.innerHTML = ""
  }

  view(){
    const html = new Convert(this.template).double_bracket(Data.datas)
    Element.elm_preview.innerHTML = html
  }

  error(){
    Element.elm_preview.textContent = JSON.stringify(Data.datas.data)
  }

  finish(){
    if(this.options.callback){
      this.options.callback()
    }
  }
}