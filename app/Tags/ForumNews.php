<?php

namespace App\Tags;

use Statamic\Tags\Tags;
use SimplePie\SimplePie;

class ForumNews extends Tags
{
    /**
     * The {{ forum_news }} tag.
     *
     * @return string|array
     */
    public function index()
    {
        $feed = new SimplePie();

        $feed->set_feed_url(array(
            'https://community.the-ninth-age.com/news/news-feed/?at=8366-dfb85073ce90941ea799071a1174d2347960776d'
        ));
        $feed->enable_cache(false);
        $feed->init();
        $data = [];
        foreach($feed->get_items(0, 10) as $item) {
          $data[] = [
            'title' => $item->get_title(),
            'url' => $item->get_permalink(),
            'content' => $item->get_content(),
            'date' => $item->get_date(),
          ];
        }
        return $data;
    }

    /**
     * The {{ forum_news:example }} tag.
     *
     * @return string|array
     */
    public function example()
    {
        //
    }
}