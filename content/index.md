---
layout: base
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock band -- “too moody for pride”
type: album
calendar: all
---

{% import "content.macros.njk" as content %}

{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}
{% set jlt = collections.all | getPage('/videos/just-like-that/') | first %}
{% set media = [thtl.data.audio, jlt.data.video] | mergeMedia %}

{{ content.fig(
  media,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) }}
