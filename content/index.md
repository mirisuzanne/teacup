---
layout: base
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock -- “too moody for pride”
type: album
calendar: all
---

{% import "content.macros.njk" as content %}

{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}

{{ content.fig(
  thtl.data.audio,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) }}
