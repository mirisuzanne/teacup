---
layout: base.njk
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock band -- “too moody for pride”
type: album
calendar: all
signup_note: >
  Follow along with the release of
  [Jane/Eyre](/albums/jane-eyre/),
  and get discounts on the vinyl record!
---

{% import "content.macros.njk" as content %}
{% import "contact.macros.njk" as contact %}

{% set jane_show = collections.all | getPage('/albums/jane-eyre/') | first %}
{{- content.feature(jane_show) -}}

{% set whiskey = collections.all | getPage('/albums/whiskey-from-strangers/') | first %}
{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}
{% set jlt = collections.all | getPage('/videos/just-like-that/') | first %}
{% set media = [whiskey.data.audio, thtl.data.audio, jlt.data.video] | mergeMedia %}

{{- content.fig(
  media,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) -}}

{{- contact.signup(
  note=signup_note
) -}}
