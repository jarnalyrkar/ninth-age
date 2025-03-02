<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NinthBuilderService;

class CardGeneratorController extends Controller
{
    public function show() {
      $service = new NinthBuilderService();
      $versions =  $service->get_versions();
      usort($versions, function ($a, $b) {
        return $b['updated_at'] <=> $a['updated_at'];
      });

    return view('card-generator', ['versions' => $versions]);
    }
}
