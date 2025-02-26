<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class NinthBuilderService {

  protected $base_url = "https://www.9thbuilder.com";

  public function get_armies() {
    $query = "/en/api/v1/ninth_age/armies.json";
    $response = Http::get($this->base_url . $query);
    return $response->json();
  }

  public function get_versions() {
    $query = "/en/api/v1/ninth_age/versions/full";
    $response = Http::get($this->base_url . $query);
    return $response->json();
  }
}