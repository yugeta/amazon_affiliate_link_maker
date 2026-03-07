import { Util } from "../util.js"
// import { CrawlGas } from "./crawl_gas.js"
// import { CrawlPhp } from "./crawl_php.js"

export class Gas extends Util{
  constructor(){
    super()
    // this.send()
  }

  async init(){
    // const html = await this.send()
    const res = new RequestApi()
    console.log(html)
    return html
  }

  // async crawl_engine(){
  //   switch(this.crawl_engine){
  //     case "gas":
  //       this.html = await new CrawlGas().init()
  //       break
  //     case "php":
  //       this.html = await new CrawlPhp().init()
  //       break
  //   }
  // }


  async send(){
    // const gas_url = "https://script.google.com/macros/s/AKfycbwnUr7gY4zFgPE9hm0UtIzMA-kg3tZFDqcz3choLlk1XC-NbtXpZpmhldle-q_xpwnm/exec" 
    // const gas_url = "https://script.google.com/macros/s/AKfycbza1QbGjpUR8zRaKHcBDKmiqRPnucSV9YhTAfXSnSdy97wmCnL_apf1yMOgWT2CdRzw/exec" 
    const gas_url = "https://script.google.com/macros/s/AKfycbzfz6KZpYHPj_hXSFbkRgpBXYhsTTv8bfScJjGNI8r2kZEZX4bRrSMyfBR9U7sR8JSi/exec" 
    // const param = {
    //   url : this.amazon_url,
    //   headers : JSON.stringify({
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    //     "Accept": "text/html,application/xhtml+xml",
    //     "Accept-Language": "ja-JP,ja;q=0.9",
    //     "Accept-Encoding": "gzip",
    //     "Cookie": "lc-main=ja_JP; i18n-prefs=JPY",
    //   })
    // }
    const res = await fetch(gas_url +"?url="+ encodeURIComponent(this.amazon_url.value)).then(e => e.json())
    console.log(res)
    // const res = await fetch(url, {
    //   method : "post",
    //    headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   body : new URLSearchParams(param)
    // }).then(e => e.json())
    return res && res.status === "success" ? res.html : null
  }

  // res(data){
  //   console.log("response-data", data)
  //   try{
  //     const data = JSON.parse(e.target.response)
  //     console.log(data)
  //     this.set_json(data)
  //     if(data.status === "success"){
  //       new Data(data)
  //     }
  //     else{
  //       alert("Error")
  //     }
  //   }
  //   catch(err){
  //     console.warn(err)
  //     alert("データが正常に取得できません。")
  //   }
  //   new Preview()
  //   new Code()
  //   new GoogleForm()
    
  //   this.finish()
  // }

  // set_json(json){
  //   const data = JSON.parse(json)
  //   Element.elm_json.textContent = JSON.stringify(data , null , "  ")
  //   return data
  // }

  // finish(){
  //   Loading.set_status('passive')
  //   console.log(`Time : ${Loading.time_range} sec`)
  // }
}