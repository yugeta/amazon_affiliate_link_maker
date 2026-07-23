import { Util }       from "./util.js"
import { Preview }    from "./preview.js"
import { Util as Element } from "./util.js"
import { Data }       from "./data.js"
import { Code }       from "./code.js"
import { GoogleForm } from "./google_form.js"
import { Loading }    from "./loading/loading.js"
import { Gas }        from "./crawl/gas.js"
import { Php }        from "./crawl/php.js"

export class CreateCrawl extends Util{
  constructor(){
    super()
    // this.init()
  }

  async init(){
    try{
      return await this.proc()
    }
    catch(err){
      const message = err && err.message ? err.message : String(err)
      return {
        status  : "error",
        message : message,
        html    : "",
      }
    }
  }

  async proc(){
    if(!this.amazon_url){
      throw new Error("URLが入力されていません。")

    }
    Loading.set_status('active')
    const html = await this.crawl_engine_switch()
    // if(!html){return}
    // const data = this.convert_html2data(html)
    // if(!this.has_validate_error(data)){return}

    Loading.set_status('passive')
    console.log(`Time : ${Loading.time_range} sec`)
    return html
  }

  async crawl_engine_switch(){
    let html = null
    switch(this.crawl_engine){
      case "gas":
        html = await new Gas().init()
        break
      case "php":
        html = await new Php().init()
        break
    }
    return html
  }

  has_validate_error(data){
    if(!data){return true}

  }


  // async send(){
  //   const query = {
  //     url: Element.elm_url.value,
  //   };
  //   const url = "https://script.google.com/macros/s/AKfycbxw3yoOQNJpnE9M-wDGD06XEi2MmfMFwVhrOUcNG_JSEEs7AIDh0De3S1EYaEJT5Cqp/exec?url="+ encodeURIComponent(Element.elm_url.value)
  //   const res = await fetch(url).then(e => e.json())
  //   this.res(res)
  // }

  convert_html2data(html){
    console.log(html)
  }

  res(data){
    console.log(html)
    console.log("response-data", data)
    try{
      const data = JSON.parse(e.target.response)
      console.log(data)
      this.set_json(data)
      if(data.status === "success"){
        new Data(data)
      }
      else{
        alert("Error")
      }
    }
    catch(err){
      console.warn(err)
      alert("データが正常に取得できません。")
    }
    new Preview()
    new Code()
    new GoogleForm()
    
    this.finish()
  }

  set_json(json){
    const data = JSON.parse(json)
    Element.elm_json.textContent = JSON.stringify(data , null , "  ")
    return data
  }

  finish(){
    Loading.set_status('passive')
    console.log(`Time : ${Loading.time_range} sec`)
  }

}