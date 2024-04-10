export class Element{
  static get elm_button(){
    return document.querySelector(`button[name="create"]`)
  }
  static get elm_preview(){
    return document.querySelector(".preview")
  }
  static get elm_source(){
    return document.querySelector(`textarea[name="source"]`)
  }
  static get elm_main_image(){
    return document.querySelector(".preview .main-image img")
  }
  static get elm_root(){
    return document.querySelector(".preview .amazon-affiliate-link-maker")
  }
  static get elm_imagesize(){
    return document.querySelector(`select[name="size"]`)
  }
  static get value_imagesize(){
    return this.elm_imagesize ? this.elm_imagesize.value : null
  }
  static get elm_fontsize(){
    return document.querySelector(`select[name="font_size"]`)
  }
  static get value_fontsize(){
    return this.elm_fontsize ? this.elm_fontsize.value : null
  }
  static get elm_url(){
    return document.querySelector(`input[name="url"]`)
  }
  static get elm_tag(){
    return document.querySelector(`input[name="tag"]`)
  }
  static get value_tag(){
    return this.elm_tag ? this.elm_tag.value : null
  }
  static get elm_item(){
    return document.querySelector(`input[name="item"]`)
  }
  static get elm_partner(){
    return document.querySelector(`input[name="partner"]`)
  }
  static get elm_access(){
    return document.querySelector(`input[name="access"]`)
  }
  static get elm_secret(){
    return document.querySelector(`input[name="secret"]`)
  }
  static get elm_thumbs(){
    return document.querySelector(`.preview .thumbs`)
  }
  static get elm_json(){
    return document.querySelector(`.json`)
  }

  static get elm_control(){
    return document.querySelector(".control")
  }

  static get elm_exceptStyle(){
    return document.querySelector(`label.except-style input[type="checkbox"]`)
  }
}