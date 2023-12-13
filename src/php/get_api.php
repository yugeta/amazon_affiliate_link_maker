<?php

require_once "aws_v4.php";

/* Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved. */
/* Licensed under the Apache License, Version 2.0. */

class GetApi{
  var $options = [];
  function __construct($options=[]){
    $this->options = $options;
    $res = $this->send();
    // echo $response;
    echo json_encode($res , JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  }

  function send(){
    // Put your Secret Key in place of **********
    $serviceName = "ProductAdvertisingAPI";
    $region      = "us-west-2";
    $accessKey   = $_POST["access"];
    $secretKey   = $_POST["secret"];
    $payload     = "{"
      ." \"ItemIds\": ["
      ."  \"{$_POST["item"]}\""
      ." ],"
      ." \"Resources\": ["
      ."  \"BrowseNodeInfo.BrowseNodes\","
      ."  \"Images.Primary.Small\""
      ." ],"
      ." \"PartnerTag\": \"{$_POST["partner"]}\","
      ." \"PartnerType\": \"Associates\","
      ." \"Marketplace\": \"www.amazon.co.jp\""
      ."}";
    $host    = "webservices.amazon.co.jp";
    $uriPath = "/paapi5/getitems";
    $awsv4 = new AwsV4 ($accessKey, $secretKey);
    $awsv4->setRegionName($region);
    $awsv4->setServiceName($serviceName);
    $awsv4->setPath ($uriPath);
    $awsv4->setPayload ($payload);
    $awsv4->setRequestMethod ("POST");
    $awsv4->addHeader ('content-encoding', 'amz-1.0');
    $awsv4->addHeader ('content-type', 'application/json; charset=utf-8');
    $awsv4->addHeader ('host', $host);
    $awsv4->addHeader ('x-amz-target', 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems');
    $headers = $awsv4->getHeaders ();
    $headerString = "";
    foreach ( $headers as $key => $value ) {
      $headerString .= $key . ': ' . $value . "\r\n";
    }
    $params = array (
      'http' => array (
        'header' => $headerString,
        'method' => 'POST',
        'content' => $payload
      )
    );
    $stream = stream_context_create ( $params );

    $fp = @fopen ( 'https://'.$host.$uriPath, 'rb', false, $stream );

    if (! $fp) {
      return [
        "status" => "error",
        "data"   => "Exception Occured 1",
      ];
      throw new Exception ( "Exception Occured" );
    }
    $response = @stream_get_contents ( $fp );
    if ($response === false) {
      return [
        "status" => "error",
        "data"   => "Exception Occured 2",
      ];
      throw new Exception ( "Exception Occured" );
    }
    return [
      "status" => "success",
      "data"   => $response,
    ];
  }
}