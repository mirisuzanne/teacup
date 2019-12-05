---
layout: base
title: Videos
hero:
  img: shows/2019/prf.jpg
  caption: Look at the pretty band
index: media
---

{% import "content.macros.njk" as content %}

{{ content.fig(
  data=collections.video | getVideos(3)
) }}

