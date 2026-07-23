import { Util as Element } from "./util.js"
import { CreateCrawl } from "./create_crawl.js"
import { Data }        from "./data.js"
import { Code }        from "./code.js"
import { Preview }     from "./preview.js"
import { AmazonData }  from "./amazon_data.js"

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

  async click_create(){
    const res = await new CreateCrawl().init()
    if(!res || res.status !== "success"){
      const message = res && res.message
        ? res.message
        : "データ取得に失敗しました。時間をおいて再度お試しください。"
      console.warn("create_error", res)
      alert(message)
      return
    }
    // const datas = res && res.status === "success" ? new AmazonData(res).data : null
    await new Data(res).init()
    console.log(Data.datas)
    // Data.status = res.status
    // Data.datas = datas
    new Code()
    new Preview()
  }

  set_except_style(e){
    if(!Data.source){return}
    Element.elm_source.value = Code.except_style(Data.source)
  }
}