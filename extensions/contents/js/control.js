
export class Control{
  constructor(){
    this.set_event()
    this.set_value()
    this.check_tag()
  }
  storage_name   = "amazon_affiliate_link_maker"
  elm_tag        = document.querySelector(`input[name="tag"]`)
  elm_img_size   = document.querySelector(`select[name="size"]`)
  elm_font_size  = document.querySelector(`select[name="font_size"]`)
  elm_tag_exists = document.querySelector(`.tag-exists`)

  set_event(){
    if(this.elm_tag){
      this.elm_tag.addEventListener("change" , this.change_tag.bind(this))
    }
    if(this.elm_img_size){
      this.elm_img_size.addEventListener("change" , this.change_img_size.bind(this))
    }
    if(this.elm_font_size){
      this.elm_font_size.addEventListener("change" , this.change_font_size.bind(this))
    }
  }

  set_value(){
    if(this.elm_tag){
      this.elm_tag.value = this.get_storage("tag") || ''
    }
    if(this.elm_img_size){
      this.elm_img_size.value = this.get_storage("img_size") || ''
    }
    if(this.elm_font_size){
      this.elm_font_size.value = this.get_storage("font_size") || ''
    }
  }

  check_tag(){
    if(this.tag){
      this.elm_tag_exists.parentNode.removeChild(this.elm_tag_exists)
    }
  }

  change_tag(e){
    this.set_storage("tag" , e.target.value)
    this.check_tag()
  }

  change_img_size(e){
    this.set_storage("img_size" , e.target.value)
  }

  change_font_size(e){
    this.set_storage("font_size" , e.target.value)
  }

  set_storage(key , value){
    const data = window.localStorage.getItem(this.storage_name) || {}
    if(value){
      data[key] = value
    }
    else if(data[key]){
      delete data[key]
    }
    const json = btoa(encodeURIComponent(JSON.stringify(data)))
    window.localStorage.setItem(this.storage_name , json)
  }

  get_storage(key){
    const str  = window.localStorage.getItem(this.storage_name)
    const data = str ? decodeURIComponent(atob(str)) : {}
    return data[key]
  }

  get tag(){
    return this.elm_tag.value || ""
  }
  get img_size(){
    return this.elm_img_size.value || ""
  }
  get font_size(){
    return this.elm_font_size.value || ""
  }
}