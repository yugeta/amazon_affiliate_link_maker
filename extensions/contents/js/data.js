import { Element }   from "./element.js"
import { Thumbnail } from "./thumbnail.js"
import { Url }       from "./url.js"

export class Data{
  static datas = {}
  constructor(options){
    this.options = options || {}
    Data.status = this.options.status
    Data.datas  = this.options.datas
    Data.uuid   = this.options.uuid
    Data.set_value(this.options.datas)
    this.set_thumbs()
  }

  static set_value(datas){
    if(datas && datas.price_num){
      Data.datas.price           = datas.price_num ? Number(datas.price_num).toLocaleString() : null
    }
    if(datas && datas.url){
      Data.datas.affiliate_url   = new Url(datas.url).affiliate()
    }

    const size = Number(Element.elm_imagesize.value)
    Data.datas.img_size = size
    Data.datas.img_src = new Thumbnail(Data.datas.thumbnails[0]).size(size)
    Data.datas.font_size  = Element.elm_fontsize.value
    Data.datas.seller_url = new Url(datas.url).convert_path2url(Data.datas.seller_href)
  }

  set_thumbs(){
    const size = Number(Element.elm_imagesize.value)
    let html = ""
    for(const thumbnail of Data.datas.thumbnails){
      const src = new Thumbnail(thumbnail).size(size)
      html += `<li><img src="${thumbnail}" onclick="document.querySelector('.amazon-affiliate-link-maker .main-image img').src = this.getAttribute('data-src')" data-src="${src}"/></li>`
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