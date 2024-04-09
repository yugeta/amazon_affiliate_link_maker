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

  send(){
    const query = {
      mode     : "get_info",
      url     : Element.elm_url.value,
    }
    const xhr = new XMLHttpRequest()
    xhr.open('POST' , "main.php" , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.res.bind(this)
    xhr.send(Object.entries(query).map(([k, v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&'))
  }

  res(e){
    if(!e || !e.target || !e.target.response){return}
    try{
      const data = JSON.parse(e.target.response)
      this.set_json(data)
      if(data.status === "success"){
        new Data(data)
      }
      else{
        alert("Error")
      }
    }
    catch(err){
      console.log(e)
      console.log(err)
      alert("データが正常に取得できません。")
    }
    new Preview()
    new Code()
    new GoogleForm()
    
    this.finish()
  }

  set_json(data){
    Element.elm_json.textContent = JSON.stringify(data , null , "  ")
  }

  finish(){
    Loading.set_status('passive')
    console.log(`Time : ${Loading.time_range} sec`)
  }

}