---
### ALL PAGES ###
permalink: /@reference/guides/attributes
sitemap:
  include: false
---

# Attributes
## .auth-email-input
## .auth-password-input
## .auth-password-confirm-input
  * When checking these, do an .each loop and use the first NON NULL value (to allow multiple inputs per page)
## .auth-error-message-element
## .auth-terms-input
  * If this element exists it checks that it is checked.
## .auth-newsletter-input
  * (NIY) If this element exists it runs server-side code to add the email to newsletter list.

## .auth-signin-email-btn
## .auth-signup-email-btn
## .auth-signout-all-btn
## .auth-forgot-email-btn
## .auth-subscribe-notifications-btn
  * Automatically calls `Manager.notifications().subscribe();`.

## .auth-email-element
## .auth-name-element
## .auth-plan-element
## .auth-uid-element

## .auth-plan-premium-true-element
## .auth-plan-premium-false-element

## .auth-signedin-true-element
  * Shows if user is signed in otherwise its hidden
## .auth-signedin-false-element
  * Shows if user is NOT signed in otherwise its hidden

## .ad-unit
  * Hidden if user is premium
