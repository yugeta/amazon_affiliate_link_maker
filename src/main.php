<?php

switch(@$_POST["mode"]){
  case "get_api":
    require_once "php/get_api.php";
    new GetApi($_POST);
    break;

  case "get_info":
    require_once "php/get_crawl.php";
    new GetCrawl($_POST);
    break;
}
