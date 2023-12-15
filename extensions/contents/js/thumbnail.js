export class Thumbnail{
  constructor(src){
    if(!src){return}
    this.src = src
  }

  size(x){
    const name = this.src.split("/").slice(-1).join("/")
    const sp   = name.split(".")
    const size = `_AC_SX${x}_`
    const newName  = `${sp[0]}.${size}.${sp[2]}`
    return this.src.split("/").slice(0,-1).join("/") +"/"+ newName;
  }

}
