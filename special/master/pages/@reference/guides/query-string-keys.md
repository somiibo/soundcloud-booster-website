---
### ALL PAGES ###
permalink: /@reference/guides/query-string-keys
sitemap:
  include: false
---

# Query String Keys
## ref_source
  * Referring source URL
  * Save to local storage and send via checkouts

## auth_email
## auth_premium

## aff
  * Affiliate ID/email/etc. Immediately saved to local storage.

## auth_redirect
  * URL to visit after a successful authentication, this is also sent whenever user visits a page with required auth

## redirect
  * Send the user to this URL immediately upon arriving at the page.

NOTIFICATION STRUCTURE
key = sequential UUID
- token = browser token thing
- userId = firebase userId
- date/timestamp = date acquired
- date/timestampUNIX = same as above but timestampUNIX
