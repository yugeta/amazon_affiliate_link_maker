export class Asset{
  constructor(options){
    this.options = options || {}
    this.load()
  }
  load(){
    const xhr = new XMLHttpRequest()
    xhr.open('GET' , "asset/sample.html" , true)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
    xhr.onload = this.loaded.bind(this)
    xhr.send()
  }
  loaded(e){
    if(!e || !e.target || !e.target.response){return}
    Asset.sample = e.target.response
    this.finish()
  }
  finish(){
    if(this.options.callback){
      this.options.callback()
    }
  }
}