import { Data }    from "./data.js"
import { Asset }   from "./asset.js"
import { Preview } from "./preview.js"
import { Code }    from "./code.js"

export class Template{
  static elm   = document.querySelector(`.control textarea[name="template"]`)
  static reset = document.querySelector(`.control .template-reset`)

  constructor(){
    this.init()
    Template.set_template()
  }

  init(){
    if(Template.elm){
      Template.elm.addEventListener("change" , this.change.bind(this))
    }
    if(Template.reset){
      Template.reset.addEventListener("click" , this.click_reset.bind(this))
    }
  }

  change(){
    const value = Template.elm.value
    Data.template_save(value)
    new Preview()
    new Code()
  }

  click_reset(){
    if(!confirm("テンプレートをデフォルトに戻してもよろしいですか？")){return}
    Template.elm.value = Asset.sample
    this.change()
  }

  static set_template(){
    Template.elm.value = Template.get_template
  }

  static get get_template(){
    const storage = Data.template_load()
    return storage ? storage : Asset.sample
  }
}
