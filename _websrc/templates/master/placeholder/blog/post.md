---
### ALL PAGES ###
layout: master/placeholder/blog/post
sitemap:
  include: true

### POST ONLY ###
post:
  title: "Example post number {count}"
  excerpt: "This is a sample excerpt for post number {count}"
  description: "This is a sample excerpt for post number {count}"
  author: alex
  id: {id}
  tags: ["business marketing"]
  categories: ["Marketing", "Business"]
  affiliate-search-term: Marketing
---

## Title inside post {count}
This is a wonderful paragrah inside a post! This is post #{count} with ID {id}.

Before ads

{% include /master/modules/adunits/adsense-in-article.html index="0" %}

Between ads

{% include /master/modules/adunits/adsense-in-article.html index="1" %}

After ads
