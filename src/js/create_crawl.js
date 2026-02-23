import { Preview }    from "./preview.js"
import { Element }    from "./element.js"
import { Data }       from "./data.js"
import { Code }       from "./code.js"
import { GoogleForm } from "./google_form.js"
import { Loading }    from "./loading/loading.js"

export class CreateCrawl{
  constructor(){
    Loading.set_status('active')
    this.send()
  }

  async send(){
    const query = {
      url: Element.elm_url.value,
    };
    const url = "https://script.google.com/macros/s/AKfycbxw3yoOQNJpnE9M-wDGD06XEi2MmfMFwVhrOUcNG_JSEEs7AIDh0De3S1EYaEJT5Cqp/exec?url="+ encodeURIComponent(Element.elm_url.value)
    const res = await fetch(url).then(e => e.json())
    this.res(res)
  }

  res(data){
    console.log("response-data", data)
    try{
      if(data.status === "success"){
        new Data(data)
      }
      else{
        alert("Error")
      }
    }
    catch(err){
      console.warn(e)
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