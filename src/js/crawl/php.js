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

    const response = await fetch(this.setting.endpoint, {
      method: "POST",
      headers,
      body: this.body
    });

    return await response.json();
  }
}