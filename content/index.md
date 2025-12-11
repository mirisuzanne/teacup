---
layout: base.njk
title: Music
banner: Soundscapes & Poetry
sub: dark indie-rock band -- “too moody for pride”
type: album
calendar: all
---

{% import "content.macros.njk" as content %}

{% set jane = collections.all | getPage('/albums/jane-eyre/') | first %}
{% set whiskey = collections.all | getPage('/albums/whiskey-from-strangers/') | first %}
{% set thtl = collections.all | getPage('/albums/holes-they-leave/') | first %}
{% set jlt = collections.all | getPage('/videos/just-like-that/') | first %}
{% set media = [jane.data.audio, whiskey.data.audio, thtl.data.audio, jlt.data.video] | mergeMedia %}

{{- content.fig(
  media,
  caption='Stream or buy on bandcamp, itunes, spotify, etc…'
) -}}

<section style="--type-column: main;">

If you're interested in occasional updates
on future shows and albums,
[sign up for our email newsletter](http://eepurl.com/in4yEg)

</section>
