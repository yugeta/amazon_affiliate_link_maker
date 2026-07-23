import { Util } from "./util.js"
import { Loading } from "./loading/loading.js"
import { Gas } from "./crawl/gas.js"
import { Php } from "./crawl/php.js"

export class CreateCrawl extends Util {
  constructor(){
    super()
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

    Loading.set_status("active")
    try{
      const res = await this.crawl_engine_switch()
      const data = this.convert_html2data(res)
      if(!this.has_validate_error(data.datas)){
        throw new Error("商品データが取得できませんでした。Amazonの検証画面または非商品ページの可能性があります。")
      }
      return data
    }
    finally{
      Loading.set_status("passive")
      console.log(`Time : ${Loading.time_range} sec`)
    }
  }

  async crawl_engine_switch(){
    switch(this.crawl_engine){
      case "gas":
        return await new Gas().init()
      case "php":
      default:
        return await new Php().init()
    }
  }

  convert_html2data(res){
    const html = this.get_response_html(res)
    const dom = new DOMParser().parseFromString(html, "text/html")
    const now = new Date()
    const sourceUrl = this.get_response_url(res)

    return {
      status : "success",
      uuid   : this.get_response_uuid(res),
      html,
      datas  : {
        url         : sourceUrl,
        title       : this.get_title(dom),
        asin        : this.get_asin(dom),
        price_num   : this.get_price_num(dom),
        unit        : this.get_unit(dom),
        category    : this.get_category(dom),
        image       : this.get_image(dom),
        thumbnails  : this.get_thumbnails(dom),
        datetime    : this.format_datetime(now),
        seller_name : this.get_seller_name(dom),
        seller_href : this.get_seller_href(dom),
        get_date    : this.format_date(now),
        get_time    : this.format_time(now),
      },
    }
  }

  get_response_html(res){
    if(!res){
      throw new Error("レスポンスが空です。")
    }

    if(typeof res === "string"){
      return res
    }

    if(typeof res === "object"){
      if(res.status && res.status !== "success"){
        throw new Error(res.message || "データ取得に失敗しました。")
      }
      if(typeof res.html === "string"){
        return res.html
      }
      if(typeof res.data === "string"){
        return res.data
      }
    }

    throw new Error("HTMLデータが取得できませんでした。")
  }

  get_response_url(res){
    if(res && typeof res === "object"){
      if(res.url){return res.url}
      if(res.datas && res.datas.url){return res.datas.url}
    }
    return this.amazon_url
  }

  get_response_uuid(res){
    if(res && typeof res === "object" && res.uuid){
      return res.uuid
    }
    return Date.now().toString(16)
  }

  has_validate_error(datas){
    if(!datas){return false}
    return !!datas.asin
  }

  get_title(dom){
    const elm = dom.getElementById("title") || dom.querySelector("title")
    return elm ? elm.textContent.trim() : ""
  }

  get_asin(dom){
    const elm = dom.getElementById("ASIN")
    return elm ? (elm.getAttribute("value") || "") : ""
  }

  get_price_num(dom){
    let elm = dom.getElementById("twister-plus-price-data-price")
    if(elm){
      const value = elm.getAttribute("value")
      return value ? Number(value) : null
    }
    elm = dom.querySelector('[name*=".action.displayedPrice.value"]')
    if(elm){
      const value = elm.getAttribute("value")
      return value ? Number(value) : null
    }
    return null
  }

  get_unit(dom){
    const elm = dom.getElementById("twister-plus-price-data-price-unit")
    return elm ? (elm.getAttribute("value") || "") : ""
  }

  get_category(dom){
    const elm = dom.getElementById("nav-subnav")
    return elm ? (elm.getAttribute("data-category") || null) : null
  }

  get_image(dom){
    const wrapper = dom.getElementById("imgTagWrapperId")
    if(!wrapper){return ""}
    const img = wrapper.querySelector("img")
    return img ? (img.getAttribute("src") || "") : ""
  }

  get_thumbnails(dom){
    const root = dom.getElementById("altImages")
    if(!root){return []}

    const thumbnails = []
    const liLists = root.querySelectorAll("ul li.item img")
    for(const img of liLists){
      const src = img.getAttribute("src")
      if(src){
        thumbnails.push(src)
      }
    }
    return thumbnails
  }

  get_seller_name(dom){
    const elm = dom.getElementById("sellerProfileTriggerId")
    if(elm){
      return elm.textContent ? elm.textContent.trim() : ""
    }
    const truncate = dom.querySelector(".a-truncate-cut")
    return truncate ? truncate.textContent.trim() : ""
  }

  get_seller_href(dom){
    const elm = dom.getElementById("sellerProfileTriggerId")
    return elm ? (elm.getAttribute("href") || "") : ""
  }

  pad(num){
    return String(num).padStart(2, "0")
  }

  format_date(dt){
    const y = dt.getFullYear()
    const m = this.pad(dt.getMonth() + 1)
    const d = this.pad(dt.getDate())
    return `${y}-${m}-${d}`
  }

  format_time(dt){
    const h = this.pad(dt.getHours())
    const i = this.pad(dt.getMinutes())
    const s = this.pad(dt.getSeconds())
    return `${h}:${i}:${s}`
  }

  format_datetime(dt){
    return `${this.format_date(dt)} ${this.format_time(dt)}`
  }
}
