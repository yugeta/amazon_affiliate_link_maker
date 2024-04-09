<?php

class GetCrawl{
  var $version = "1.1.1";
  var $dom = null;

  function __construct($query=[]){
    if(!$query){
      $res = [
        "status" => "error",
        "html" => "error!!!",
      ];
      return;
    }
    $this->dom = $this->get_dom($query["url"]);

    try{
      $res = [
        "status"  => $this->dom ? "success" : "error",
        "html"    => $this->dom ? $this->dom->saveHTML() : null,
        "version" => $this->version,
        "uuid"    => uniqid(),
        "datas"   => [
          "url"         => $query["url"],
          "title"       => $this->get_title(),
          "asin"        => $this->get_asin(),
          "price_num"   => $this->get_price(),
          "unit"        => $this->get_unit(),
          "category"    => $this->get_main_category(),
          "image"       => $this->get_image_src(),
          "thumbnails"  => $this->get_thumbnails(),
          "datetime"    => date("Y-m-d H-i-s"),
          "seller_name" => $this->get_seller_name(),
          "seller_href" => $this->get_seller_href(),
          "get_date"    => date("Y-m-d"),
          "get_time"    => date("H:i:s"),
          // "seller_rate" => $this->get_seller_rate(),
        ],
        
        // "prime_badge" => $this->get_prime_badge(),
        // "images"     => $this->get_images(),
        // "videos"     => $this->get_videos(),
        // "contents"   => $contents,
        // "aplus"      => $this->get_aplus(),

      ];
    }
    catch(Exception $e){
      $res = [
        "status" => "error",
        "message" => $e,
      ];
    }
    echo json_encode($res , JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  }

  function get_dom($url=""){
    $ch = curl_init();
    curl_setopt_array($ch, [
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_AUTOREFERER    => true,
      CURLOPT_USERAGENT      => 'Mozilla/5.0',
      CURLOPT_ENCODING       => 'gzip',
    ]);
    $html = curl_exec($ch);
    $dom = new DOMDocument;
    @$dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));
    return $dom;
  }

  function get_image_src(){
    $img = $this->dom->getElementById("imgTagWrapperId");
    if(!$img){return "";}
    $imgs = $img->getElementsByTagName("img");
    if(!$imgs){return "";}
    return $imgs[0]->getAttribute("src");
  }

  function get_thumbnails(){
    $elm = $this->dom->getElementById("altImages");
    if(!$elm){return "";}
    $arr = [];
    $ul_lists = $elm->getElementsByTagName("ul");
    if(!$ul_lists){return "";}
    for($i=0; $i<count($ul_lists); $i++){
      $li_lists = $ul_lists[$i]->getElementsByTagName("li");
      for($j=0; $j<count($li_lists); $j++){
        if($li_lists[$j]->getAttribute("src")){continue;}
        $class = $li_lists[$j]->getAttribute("class");
        if(!$class){continue;}
        $classes = explode(" ",$class);
        if(!in_array("item" , $classes)){continue;}
        array_push($arr, $li_lists[$j]->getElementsByTagName("img")[0]->getAttribute("src"));
      }
    }
    return $arr;
  }

  function get_title(){
    $elm = $this->dom->getElementById("title");
    if(!$elm){return "";}
    $title = $elm->textContent;
    return trim($title);
  }

  function get_asin(){
    $elm = $this->dom->getElementById("ASIN");
    if(!$elm){return "";}
    return $elm->getAttribute("value");
  }

  function get_price(){
    $elm = $this->dom->getElementById("twister-plus-price-data-price");
    if(!$elm){return "";}
    $price = $elm->getAttribute("value");
    return $price ? (int)$price : null;
  }

  function get_unit(){
    $elm = $this->dom->getElementById("twister-plus-price-data-price-unit");
    if(!$elm){return "";}
    return $elm->getAttribute("value");
  }

  function get_main_category(){
    $elm = $this->dom->getElementById("nav-subnav");
    return $elm ? $elm->getAttribute("data-category") : null;
  }

  function get_seller_name(){
    $elm = $this->dom->getElementById("sellerProfileTriggerId");
    if(!$elm){return "";}
    return $elm->textContent;
  }
  function get_seller_href(){
    $elm = $this->dom->getElementById("sellerProfileTriggerId");
    if(!$elm){return "";}
    return $elm->getAttribute("href");
  }
}
