---
layout: base.njk
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock band -- “too moody for pride”
type: album
calendar: all
signup_note:
  New album coming soon,
  with music from
  [Strange Bird, Queer Bird](https://grapefruitlab.com/shows/queer-bird/),
  our current show with **Grapefruit Lab**.
  Signup for details, and pre-sales!
---

{% import "content.macros.njk" as content %}
{% import "contact.macros.njk" as contact %}

{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}
{% set jlt = collections.all | getPage('/videos/just-like-that/') | first %}
{% set media = [thtl.data.audio, jlt.data.video] | mergeMedia %}

{{ content.fig(
  media,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) }}

{{ contact.signup(
  note=signup_note
) }}
