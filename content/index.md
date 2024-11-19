---
layout: base.njk
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock band -- “too moody for pride”
type: album
calendar: all
signup_note: >
  New EP
  _[Whiskey From Strangers](/albums/whiskey-from-strangers/)_
  is live,
  and we're working on the next
  **Grapefruit Lab** production.
  Signup for details!
---

{% import "content.macros.njk" as content %}
{% import "contact.macros.njk" as contact %}

{% set whiskey = collections.all | getPage('/albums/whiskey-from-strangers/') | first %}
{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}
{% set jlt = collections.all | getPage('/videos/just-like-that/') | first %}
{% set media = [whiskey.data.audio, thtl.data.audio, jlt.data.video] | mergeMedia %}

{{- content.fig(
  media,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) -}}

{% set whiskey = collections.all | getPage('/albums/jane-eyre/') | first %}

{{- content.feature(whiskey) -}}

{{- contact.signup(
  note=signup_note
) -}}
