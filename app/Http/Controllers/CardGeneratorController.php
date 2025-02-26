<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NinthBuilderService;

class CardGeneratorController extends Controller
{
    public function show() {
      $service = new NinthBuilderService();
      $versions =  $service->get_versions();
      return view('card-generator', ['versions' => $versions]);
    }
}
