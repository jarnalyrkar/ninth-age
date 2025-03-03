<?php

namespace App\Marks;

use Statamic\Fieldtypes\Bard\Marks\Mark;

class CustomId extends Mark
{
  protected static $type = 'customId';

  public function render($html, $params)
  {
    $id = $params['id'] ?? null;

    return $id ? "<span id='{$id}'>{$html}</span>" : $html;
  }
}
