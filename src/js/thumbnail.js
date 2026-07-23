export class Thumbnail{
  constructor(src){
    if(!src){return}
    this.src = src
  }

  size(x){
    if(!this.src || typeof this.src !== "string"){
      return ""
    }
    const name = this.src.split("/").slice(-1).join("/")
    const sp   = name.split(".")
    if(sp.length < 3){
      return this.src
    }
    const size = `_AC_SX${x}_`
    const newName  = `${sp[0]}.${size}.${sp[2]}`
    return this.src.split("/").slice(0,-1).join("/") +"/"+ newName;
  }

}
