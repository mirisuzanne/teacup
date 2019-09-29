---
layout: base
title: Music
banner: Soundscapes & Poetry
sub: by Dan, Sondra, Miriam, and Josie
type: album
calendar: all
summary: |
  Sometimes complex, dissonant,
  or introspective --
  but always pushing towards moments of
  unexpected harmony and celebration
---

{% import "content.macros.njk" as content %}


{% set who = collections.all | getPage('/adjectives/') %}

{{ content.quote(who.data.press[0]) }}


{% set thtl = collections.all | getPage('/2015/07/09/holes-they-leave/') %}

{{ content.fig(
  thtl.data.audio,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) }}
