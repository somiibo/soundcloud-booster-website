---
### ALL PAGES ###
permalink: /@reference/guides/firebase-users/
---

# Basic Firebase User Skeleton
```js
{
  activity: {
    lastActivity: {
      timestamp: '2019-04-29T01:57:47Z',
      timestampUNIX: 1556503067000,
    },
  },
  firebase: {
    uid: '',
    email: '',
  },
  permissions: {
    admin: false,
    developer: false,
    betaTester: false,
  },
  plan: {
    expires: {
      timestamp: '2111-01-01T00:00:00Z',
      timestampUNIX: 1556503067000,
    },
    id: 'intro', // intro | basic | advanced... (intro is default value)
    enterprise: {
      // expires: {
      //   timestamp: '2111-01-01T00:00:00Z',
      //   timestampUNIX: 1556503067000,
      // },
      limits: {
        // ...
        // accounts: 0,
      }
    },
    payment: {
      method: '', // paypal | stripe | chargebee, etc
      data: {
        // Data from payment processor
      }
    }

  },
  affiliate: {
    code: "",
    referrals: {
      // TIMESTAMPS for referrals as KEYS
    },
    referredBy: "",
    prizeRedemptions: {

    }
  },
  api: {
    privateKey: 'api_1908-ea7ad440-bfa8-11e9-b4c3-f32ee92844a3',
    // publicKey: '', // Not stored here. Should be firebase email or firebase UID
    lastActivity: {
      timestamp: '2019-04-29T01:57:47Z',
      timestampUNIX: 1556503067000,
    },
  },

}
```
