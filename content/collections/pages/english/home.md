---
id: home
blueprint: pages
title: Home
updated_by: 9da3c936-f032-4fc4-95ba-d7d71ca81a34
updated_at: 1741635883
modules:
  -
    id: m0bgapwc
    heading: 'Welcome to The Ninth Age'
    background_image: battlescene.webp
    type: hero
    enabled: true
    news_heading: 'News from the trenches'
    archive_label: 'Deep Dive the Archive'
    archive_link: 'https://community.the-ninth-age.com/news/'
    subheading: 'A fantasy wargame by the community'
    layout: centered
    background_video: ninth-age-hero.mp4
    scroll_to_id: tabs_cards_m0bhvzb1
  -
    id: m0bhvzb1
    heading: 'How we play'
    cards:
      -
        id: m0bhw70i
        tab_name: Collect
        content:
          -
            type: heading
            attrs:
              level: 2
            content:
              -
                type: text
                text: 'Start Your Collection'
          -
            type: paragraph
            content:
              -
                type: text
                text: 'We do not sell or produce miniatures, so you get to pick and choose miniatures from whichever manufacturer you like the most! You could even 3D-print your own army, or use Lego or paper proxies. Using third-party services, you can also play the game online.'
          -
            type: set
            attrs:
              id: m7rgxk81
              values:
                type: button
                label: 'Collecting for your army'
                link: '/getting-started#collecting-an-army'
        type: card
        enabled: true
        image: wdt-barbarian-horde.jpg
      -
        id: m0bhyv81
        tab_name: 'Build & Paint'
        content:
          -
            type: heading
            attrs:
              level: 2
            content:
              -
                type: text
                text: 'Assemble and Add Some Colour'
          -
            type: paragraph
            content:
              -
                type: text
                text: "Building and painting is one of the most rewarding parts of the hobby. Whether you're crafting a regular human soldier, a towering daemon, or a colossal mechanical construct, your skills will grow with practice as you bring your miniatures to life."
          -
            type: set
            attrs:
              id: m7rgy3pj
              values:
                type: button
                label: 'Assembling and painting'
                link: '/getting-started#hobby'
        type: card
        enabled: true
        image: 2024-08-27_20-42.jpeg
      -
        id: m0bhz5wm
        tab_name: Play
        content:
          -
            type: heading
            attrs:
              level: 2
            content:
              -
                type: text
                text: 'Battle on the Tabletop'
          -
            type: paragraph
            content:
              -
                type: text
                text: 'Learn to play using our free rulebooks, or use video resources made by the community. Many people love to play games against friends, family, and other members of the Ninth Age community.'
          -
            type: set
            attrs:
              id: m7rh2juq
              values:
                type: button
                label: 'Learning the game'
                link: '/getting-started#what-you-need-to-play'
        type: card
        enabled: true
        image: minis-tabletop.jpg
      -
        id: m0bhza59
        tab_name: Compete
        type: card
        enabled: true
        content:
          -
            type: heading
            attrs:
              level: 2
            content:
              -
                type: text
                text: 'Join the Tournaments!'
          -
            type: paragraph
            content:
              -
                type: text
                text: 'If you like competing in tournaments, there are several competitions each year.'
          -
            type: set
            attrs:
              id: m7rh339k
              values:
                type: button
                label: 'More on Competitive Play'
                link: '/getting-started#tournaments'
        image: etc24_venue_4-16-9.jpg
    type: tabs_cards
    enabled: true
  -
    id: m0cvfxy4
    heading: 'News from the Battlefront'
    type: forum_news
    enabled: true
    archive_label: 'Deep Dive the Archive'
    archive_link: 'https://community.the-ninth-age.com/news/'
  -
    id: m321d3t6
    type: armies_list
    enabled: true
    layout: module
  -
    id: m0fgtrhv
    heading: 'Start your Ninth Age Journey'
    cards:
      -
        id: m0fgtydb
        super: 'Next Steps'
        heading: 'Get started'
        description: 'Find the resources you need to start playing the game'
        type: new_card
        enabled: true
        image: 20221203_144520.jpg
        link: 'entry::b139f9be-a614-4407-840a-76c31fd6d2e8'
      -
        id: m0fguy4k
        super: 'Next Steps'
        heading: 'Explore the Setting'
        description: 'Humanity is beset on all sides by terrible threats. Technology and science offer no hope, and there is no peace between the stars.'
        type: new_card
        enabled: true
        image: skaven_bataille_final_1024_web16-9.jpg
        link: 'entry::6be30cad-dd51-4835-8779-7d7455147eb3'
      -
        id: m0fgvfti
        super: 'Next Steps'
        heading: 'Discover the Armies'
        description: 'From defenders of the Imperium to malign, mystical forces and alien tides, the galaxy is filled with warring factions.'
        type: new_card
        enabled: true
        image: art_cover_frb-16-9.jpg
        link: 'entry::b215bef1-5b14-4d8e-baa4-7a67e71fd444'
    type: cards
    enabled: true
    background_image: art_army_ud_26_army-of-the-dead.jpg
---
