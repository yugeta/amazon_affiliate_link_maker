import { Util as Element } from "./util.js"
import { Thumbnail }       from "./thumbnail.js"
import { Url }             from "./url.js"
import { AmazonData }      from "./amazon_data.js"

export class Data{
  static datas = {}
  constructor(options){
    this.options = options || {}
  }

  async init(){
    Data.status = this.options.status
    if(this.options.datas && typeof this.options.datas === "object"){
      Data.datas = this.options.datas
    }
    else if(this.options.html){
      Data.datas = await new AmazonData(this.options).data()
    }
    else{
      throw new Error("データ形式が不正です。")
    }
    Data.uuid   = this.options.uuid
    Data.set_value(Data.datas)
    this.set_thumbs()
  }

  static set_value(datas){
    datas = datas || Data.datas

    if(datas && datas.price_num){
      Data.datas.price           = datas.price_num ? Number(datas.price_num).toLocaleString() : null
    }
    if(datas && datas.url){
      Data.datas.affiliate_url   = new Url(datas.url).affiliate()
    }

    const size = Number(Element.elm_imagesize.value)
    Data.datas.img_size = size
    const thumbSrc = Array.isArray(Data.datas.thumbnails) && Data.datas.thumbnails.length
      ? Data.datas.thumbnails[0]
      : Data.datas.image
    Data.datas.img_src = thumbSrc ? new Thumbnail(thumbSrc).size(size) : ""
    Data.datas.font_size  = Element.elm_fontsize.value
    const sellerHref = Data.datas.seller_href || Data.datas.seller_html
    Data.datas.seller_url = datas && datas.url && sellerHref
      ? new Url(datas.url).convert_path2url(sellerHref)
      : null
  }

  set_thumbs(){
    if(!Array.isArray(Data.datas.thumbnails) || !Data.datas.thumbnails.length){
      Data.datas.thumbs = ""
      return
    }
    const size = Number(Element.elm_imagesize.value)
    let html = ""
    for(const thumbnail of Data.datas.thumbnails){
      if(!thumbnail){continue}
      const src = new Thumbnail(thumbnail).size(size)
      html += `<li><img src="${thumbnail}" onclick="this.closest('.amazon-affiliate-link-maker').querySelector('.main-image img').src = this.getAttribute('data-src')" data-src="${src}"/></li>`
    }
    Data.datas.thumbs = html
  }

  // Storage
  static storage_name  = "amazon-affiliate"
  static template_name = "amazon-affiliate-template"

  static storage_load(){
    const str = window.localStorage.getItem(Data.storage_name)
    return str ? JSON.parse(decodeURIComponent(atob(str))) : null
  }

  static storage_save(){
    const data = {
      tag       : Element.value_tag,
      fontsize  : Element.value_fontsize,
      imagesize : Element.value_imagesize,
    }
    // console.log(data)
    const json = btoa(encodeURIComponent(JSON.stringify(data)))
    window.localStorage.setItem(Data.storage_name , json)
  }

  static template_load(){
    const str = window.localStorage.getItem(Data.template_name)
    return str ? decodeURIComponent(atob(str)) : null
  }

  static template_save(value){
    const json = btoa(encodeURIComponent(value))
    window.localStorage.setItem(Data.template_name , json)
  }
}