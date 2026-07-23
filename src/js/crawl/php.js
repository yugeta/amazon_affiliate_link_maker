import { Util } from "../util.js"

export class Php extends Util{
  constructor(){
    super()
    // this.send()
  }

  async init(){
    const body = {
      url: this.amazon_url,
    }
    this.body = JSON.stringify(body);
    this.timestamp = new Date().toISOString();
    return await this.send()
  }

  get setting(){
    return {
      endpoint_localhost: "http://localhost:8888/crawl.myntinc.com/api/",
      endpoint_docker: "http://nginx/crawl.myntinc.com/api/",
      endpoint: "https://crawl.myntinc.com/api/",
      secret_key: "13d3f0328e96a50a28195aa19d60d5fcb7c3b57ec7592a9453c17ce11120335f"
    }
  }

  async createSignature() {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(this.setting.secret_key),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(this.timestamp + "\n" + this.body)
    );

    return Array.from(new Uint8Array(signature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async send() {
    const signature = await this.createSignature();

    const headers = {
      "Content-Type": "application/json",
      "X-TIMESTAMP": this.timestamp,
      "X-SIGNATURE": signature
    };

    try{
      const response = await fetch(this.setting.endpoint, {
        method: "POST",
        headers,
        body: this.body
      });
      const rawText = await response.text();

      if(!response.ok){
        const message = rawText
          ? `クロールAPIエラー: HTTP ${response.status} / ${rawText.slice(0, 200)}`
          : `クロールAPIエラー: HTTP ${response.status}`
        console.warn(message)
        return await this.sendFallback()
      }

      if(!rawText || !rawText.trim()){
        console.warn("クロールAPIから空のレスポンスが返されました。ローカルAPIにフォールバックします。")
        return await this.sendFallback()
      }

      try{
        return JSON.parse(rawText)
      }
      catch(err){
        console.warn(`クロールAPIのレスポンスがJSON形式ではありません: ${rawText.slice(0, 200)}`)
        return await this.sendFallback()
      }
    }
    catch(err){
      console.warn("クロールAPI通信に失敗しました。ローカルAPIにフォールバックします。", err)
      return await this.sendFallback()
    }
  }

  async sendFallback(){
    const query = {
      mode : "get_info",
      url  : this.amazon_url,
    }

    const body = Object.entries(query)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&")

    const endpoints = [
      "main.php",
      "https://amazon.affiliate.myntinc.com/main.php",
    ]

    let lastError = null

    for(const endpoint of endpoints){
      try{
        const response = await fetch(endpoint, {
          method : "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body,
        })

        const rawText = await response.text()

        if(!response.ok){
          const message = rawText
            ? `フォールバックAPIエラー(${endpoint}): HTTP ${response.status} / ${rawText.slice(0, 200)}`
            : `フォールバックAPIエラー(${endpoint}): HTTP ${response.status}`
          lastError = new Error(message)
          continue
        }

        if(!rawText || !rawText.trim()){
          lastError = new Error(`フォールバックAPIが空レスポンスです (${endpoint})`)
          continue
        }

        try{
          return JSON.parse(rawText)
        }
        catch(err){
          lastError = new Error(`フォールバックAPIのレスポンスがJSON形式ではありません (${endpoint}): ${rawText.slice(0, 200)}`)
          continue
        }
      }
      catch(err){
        lastError = err
      }
    }

    if(lastError){
      throw lastError
    }
    throw new Error("フォールバックAPI呼び出しに失敗しました。")
  }
}