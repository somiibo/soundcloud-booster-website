---
### ALL PAGES ###
layout: master/global/default
permalink: /ads
sitemap:
  include: false

### REGULAR PAGES ###
meta:
  title: "Ads - {{ site.brand.name }}"
  description: "Test {{ site.brand.name }} ads"
  breadcrumb: "Ads"
  index: false
---
# {{ site.brand.name }} Ads Tester
{{ site.meta.description }}

## Display ads
This is an `adsense-display.html` ad:

{% include /master/modules/adunits/adsense-display.html index="1" %}

## In-article ads
This is an `adsense-in-article.html` ad:

{% include /master/modules/adunits/adsense-in-article.html index="1" %}

## In-feed ads
This is an `adsense-in-feed.html` ad:

{% include /master/modules/adunits/adsense-in-feed.html index="1" %}

## Multiplex ads
This is an `adsense-multiplex.html` ad:

{% include /master/modules/adunits/adsense-multiplex.html index="1" %}


<script>
  Manager.ready(function () {
    Manager.account().import()
    .then(function (Account) {
      var account = new Account();

      account.resolve()
      .then(function (properties) {
        accountData = properties;

        console.log('.account().resolve()', accountData);

        // account.handleAccount({
        //   plan: {
        //     id: 'premium',
        //   }
        // })

        return;
      })
      .catch(function (e) {
        console.error('.account().resolve()', e);
      })
    })
    .catch(function (e) {
      console.error('.account().resolve()', e);
    })
  })
</script>
