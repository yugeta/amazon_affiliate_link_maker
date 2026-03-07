import { Util } from "./util.js"

export class AmazonData extends Util{
  constructor(option){
    super()
    this.url  = this.amazon_url
    this.html = option.html
    this.dt   = new Date()
    this.dom  = new DOMParser().parseFromString(option.html, "text/html")
  }

  async data(){
    return {
      url         : this.url,
      title       : this.get_title(),
      asin        : this.get_asin(),
      price_num   : this.get_price_num(),
      unit        : this.get_unit(),
      category    : this.get_category(),
      image       : this.get_image(),
      thumbnails  : this.get_thumbnails(),
      datetime    : this.get_datetime(),
      seller_name : this.get_seller_name(),
      seller_html : this.get_seller_html(),
      get_date    : this.get_get_date(),
      get_time    : this.get_get_time(),
    }
  }
  get_title(){
    const elm = this.dom.querySelector("title")
    return this.text(elm)
  }
  get_asin(){
    const elm = this.dom.getElementById("ASIN")
    return this.attr(elm, "value")
  }
  get_price_num(){
    let elm = this.dom.getElementById("twister-plus-price-data-price")
    if(elm){
      return this.attr(elm, "value")
    }
    // hidden
    elm = this.dom.querySelector(`[name*=".action.displayedPrice.value"]`)
    if(elm){
      const num = this.attr(elm, "value")
      return Number(num)
    }
    return null
  }
  get_unit(){
    const elm = this.dom.getElementById("twister-plus-price-data-price-unit")
    return this.attr(elm, "value")
  }
  get_category(){
    const elm = this.dom.getElementById("nav-subnav")
    return this.attr(elm, "data-category")
  }
  get_image(){
    const img = this.dom.getElementById("imgTagWrapperId")
    if(!img){return ""}
    const imgs = img.getElementsByTagName("img");
    if(!imgs || !imgs.length){return ""}
    return imgs[0].getAttribute("src");
  }
  get_thumbnails(){
    const elm = this.dom.getElementById("altImages");
    if(!elm){return ""}
    const arr = [];
    const ul_lists = elm.getElementsByTagName("ul");
    if(!ul_lists || !ul_lists.length){return ""}
    for(let i=0; i<ul_lists.length; i++){
      const li_lists = ul_lists[i].getElementsByTagName("li");
      for(const li_list of li_lists){
        if(li_list.getAttribute("src")){continue}
        const cls = li_list.getAttribute("class")
        if(!cls){continue}
        const classes = cls.split(" ")
        if(!classes.includes("item")){continue;}
        const img = li_list.querySelector("img")
        if(!img){continue}
        arr.push(img.getAttribute("src"))
      }
    }
    return arr
  }
  get datetime(){
    return {
      y : this.dt.getFullYear(),
      m : ("00"+ (this.dt.getMonth()+1)).slice(-2),
      d : ("00"+ (this.dt.getDate())).slice(-2),
      h : ("00"+ (this.dt.getHours())).slice(-2),
      i : ("00"+ (this.dt.getMinutes())).slice(-2),
      s : ("00"+ (this.dt.getSeconds())).slice(-2),
    }
    
  }
  get_seller_name(){
    let elm = this.dom.getElementById("sellerProfileTriggerId")
    if(elm){
      return this.attr(elm, "data-category")
    }
    elm = this.dom.querySelector(".a-truncate-cut")
    if(elm){
      return elm.textContent
      return this.text(elm) + "-"
    }
    return null
  }
  get_seller_html(){
    let elm = this.dom.getElementById("sellerProfileTriggerId")
    if(elm){
      return this.attr(elm, "href")
    }
    return null
  }
  get_datetime(){
    const d = this.datetime
    return `${d.y}-${d.m}-${d.d} ${d.h}:${d.i}:${d.s}`
  }
  get_get_date(){
    const d = this.datetime
    return `${d.y}-${d.m}-${d.d}`
  }
  get_get_time(){
    const d = this.datetime
    return `${d.h}:${d.i}:${d.s}`
  }

  text(elm){
    return elm ? elm.textContent.trim() : null
  }
  attr(elm, name){
    return elm ? elm.getAttribute(name) : null
  }
}