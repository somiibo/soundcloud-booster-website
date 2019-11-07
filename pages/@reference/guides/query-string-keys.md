---
### ALL PAGES ###
permalink: /@reference/guides/query-string-keys/
---

# Query String Keys
## ref_source
  * Referring source URL
  * Save to local storage and send via checkouts

## auth_return
  * URL to visit after a successful authentication, this is also sent whenever user visits a page with required auth

## auth_email
## auth_premium

## auth_aff
  * Affiliate ID/email/etc. Immediately saved to local storage.

## auth_redirect
  * Send the user to this URL.
  * Only triggered when the user signs in, has no effect otherwise.

## redirect
  * Send the user to this URL immediately upon arriving at the page.

NOTIFICATION STRUCTURE
key = sequential UUID
- token = browser token thing
- userId = firebase userId
- date/timestamp = date acquired
- date/timestampUNIX = same as above but timestampUNIX
