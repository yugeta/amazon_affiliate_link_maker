import { Data } from './data.js'

export class GoogleForm{
  constructor(){
    this.complete_set()
    this.form_set()
    this.form_post()
  }

  submitted = false
  elm_form = document.querySelector(`form[name="google-form"]`)
  elm_complete = document.querySelector(`iframe[name="complete"]`)

  complete_set(){
    if(!this.elm_complete){return}
    this.elm_complete.onload = (e => {
      if(!this.submitted){return}
      console.log("aaa")
      return false
    }).bind(this)
  }

  form_set(){
    if(!this.elm_form){return}
    this.elm_form.onsubmit = (e => {
      this.submitted = true
    }).bind(this)

    this.elm_form.querySelector(`input[data-name='id']`).value         = document.querySelector(`input[name="tag"]`).value
    this.elm_form.querySelector(`input[data-name='url']`).value        = document.querySelector(`input[name="url"]`).value
    this.elm_form.querySelector(`input[data-name='uuid']`).value       = Data.uuid
    this.elm_form.querySelector(`input[data-name='img-size']`).value   = document.querySelector(`select[name="size"]`).value
    this.elm_form.querySelector(`input[data-name='font-size']`).value  = document.querySelector(`select[name="font_size"]`).value
    this.elm_form.querySelector(`input[data-name='user-agent']`).value = navigator.userAgent
  }

  form_post(){
    this.elm_form.submit()
  }
}