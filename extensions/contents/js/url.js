export class Url{
  constructor(url){
    this.url = url
  }

  elm_affiliate_id = document.querySelector(`input[name="tag"]`)

  affiliate(){
    if(this.elm_affiliate_id.value){
      return Url.add_affiliate_tag(this.url, this.elm_affiliate_id.value)
    }
    else{
      return this.url
    }
  }

  host_root(url){
    if(!url){return null}
    if(!url.match(/^http\:\/\//) && !url.match(/^https\:\/\//)){return null}
    return url.split("/").slice(0,3).join("/")
  }

  convert_path2url(href){
    if(!href){return}
    if(href.match(/http:\/\//) || href.match(/https:\/\//)){
      return href
    }
    const base_host = this.host_root(this.url)
    console.log(this.url)
    console.log(base_host)
    console.log(href)
    if(!href){return}
    return `${base_host}${href}`
  }

  static add_affiliate_tag(url , tag){
    if(!url.match(/\?/)){
      return url +"?tag="+ tag
    }
    else{
      return url +"&tag="+ tag
    }
  }
}


