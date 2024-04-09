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
    Data.source = html
    Element.elm_source.value = Code.except_style(html)
  }

  get template(){
    const tmp = Data.template_load()
    const ast = Asset.sample
    return tmp ? tmp : ast
  }

  static except_style(html){
    if(!html){return html}
    switch(Element.elm_exceptStyle.checked){
      case true:
      return html

      case false:
      return html.replace(/<style.*?>[\s\S]*?<\/style>/gim, "")
    }
  }
}