import { Preview } from "./preview.js"

export class CreateApi{
  constructor(){
    this.set_event()
  }

  elm_button  = document.querySelector(`button[name="create"]`)
  elm_url     = document.querySelector(`input[name="url"]`)
  elm_item    = document.querySelector(`input[name="item"]`)
  elm_partner = document.querySelector(`input[name="partner"]`)
  elm_access  = document.querySelector(`input[name="access"]`)
  elm_secret  = document.querySelector(`input[name="secret"]`)

  set_event(){
    this.elm_button.addEventListener("click" , this.send.bind(this))
  }

  send(){
    const item = this.elm_item.value || this.url2item(this.elm_url.value)
    if(!item){
      alert("item-idが取得できません")
      return
    }
    console.log(item)
    const query = {
      mode     : "get_api",
      // item     : ,
      item     : item,
      partner  : this.elm_partner.value,
      access   : this.elm_access.value,
      secret   : this.elm_secret.value,
    }
    const xhr = new XMLHttpRequest()
    xhr.open('POST' , "main.php" , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.res.bind(this,"items")
    xhr.send(Object.entries(query).map(([k, v])=>`${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&'))
  }

  url2item(url){
    const queries = Object.fromEntries(new URLSearchParams(url).entries())
    if(queries.pd_rd_i){
      return queries.pd_rd_i
    }
    if(queries.pf_rd_r){
      return queries.pf_rd_r
    } 
  }

  res(mode , e){
    if(!e || !e.target || !e.target.response){return}
    const data = JSON.parse(e.target.response)
    data.mode = mode
    new Preview(data)
  }

}