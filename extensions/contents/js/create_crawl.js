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
    try{
      const tabData = await this.get_active_tab_html()
      const data = this.convert_html2data({
        status : "success",
        uuid   : Date.now().toString(16),
        html   : tabData && tabData.html ? tabData.html : "",
        url    : tabData && tabData.url ? tabData.url : Element.elm_url.value,
      })

      this.set_json(data)

      if(!this.has_validate_error(data.datas)){
        throw new Error("商品データが取得できませんでした。Amazonの商品ページを開いてから実行してください。")
      }

      new Data(data)
    }
    catch(e){
      console.log(e)
      alert(e && e.message ? e.message : "データが正常に取得できません。")
    }
    new Preview()
    new Code()
    new GoogleForm()
    
    this.finish()
  }

  convert_html2data(res){
    const html = res && res.html ? res.html : ""
    const dom = new DOMParser().parseFromString(html, "text/html")
    const now = new Date()
    const sourceUrl = (res && res.url) ? res.url : Element.elm_url.value

    return {
      status : res.status,
      uuid   : res.uuid,
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

  get_active_tab_html(){
    return new Promise((resolve, reject) => {
      if(typeof chrome === "undefined" || !chrome.tabs || !chrome.scripting){
        reject(new Error("scripting API が利用できません。"))
        return
      }

      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs && tabs.length ? tabs[0] : null
        if(!tab || typeof tab.id === "undefined"){
          reject(new Error("アクティブタブが取得できません。"))
          return
        }

        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            func: () => ({
              html: document.documentElement ? document.documentElement.outerHTML : "",
              url : location.href,
            }),
          },
          (results) => {
            if(chrome.runtime.lastError){
              reject(new Error(chrome.runtime.lastError.message))
              return
            }
            const result = results && results[0] ? results[0].result : null
            resolve(result)
          }
        )
      })
    })
  }

  has_validate_error(datas){
    if(!datas){return false}
    // Product page minimum: ASIN should exist.
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

  set_json(data){
    Element.elm_json.textContent = JSON.stringify(data , null , "  ")
  }

  finish(){
    Loading.set_status('passive')
    console.log(`Time : ${Loading.time_range} sec`)
  }

}