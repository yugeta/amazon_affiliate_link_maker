import { Element } from "./element.js"

export class Amazon{
  constructor(){
    // Element.elm_url.value = this.addr
    this.set_url()
  }

  set_url(){
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},(tabs) => {
      // let txt = '';
      // const delimiter = '\n';  //区切り文字
      // const template = '[%%title%%](%%URL%% \"%%title%%\")'; //テンプレ
  
      // document.querySelector('#numOfTabs').value = tabs.length;
  
      // tabs.forEach((tab,i) => {
      //   if(i!=0) txt += delimiter;  //最初は区切り文字不要
      //   console.log(tab.title+" "+tab.url);
      //   txt += createTextFromTemplate(tab.title,tab.url,template);
      // });
  
      // document.querySelector('#txt').value = txt;
      // console.log(tabs.find(e => e.active))
      const tab = tabs.find(e => e.active)
      Element.elm_url.value = tab.url
      Element.elm_control.style.setProperty("display","none","")
      Element.elm_button.click()
    });
  }

}