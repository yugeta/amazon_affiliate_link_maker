import { Asset }     from "./asset.js"
import { Convert }   from "./convert.js"
import { Data }      from "./data.js"
import { Element }   from "./element.js"

export class Code{
  constructor(options){
    this.options = options || {}
    this.clear()
    if(!Data.datas){return}
    this.set_code()
  }

  clear(){
    Element.elm_source.value = ""
  }

  set_code(){
    const html = new Convert(this.template).double_bracket(Data.datas)
    Element.elm_source.value = html
  }

  get template(){
    const tmp = Data.template_load()
    const ast = Asset.sample
    return tmp ? tmp : ast
  }
}