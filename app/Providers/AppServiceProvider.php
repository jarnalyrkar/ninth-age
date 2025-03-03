<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use JackSleight\StatamicBardMutator\Facades\Mutator;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{


    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
      Mutator::html('heading', function ($value, $item) {
          if ($item->attrs->level === 2) {
              $value[1]['id'] = Str::slug(collect($item->content)->implode('text', ''));
          }
          return $value;
      });
    }
}
