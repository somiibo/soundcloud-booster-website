---
### ALL PAGES ###
permalink: /@reference/guides/firebase-users/
---

# Basic Firebase User Skeleton
```js
{
  person: {
    firstName: 'Ian',
    lastName: 'Wieds',
    birthday: {
      timestamp: '',
      timestampUNIX: 0
    }
  },
  verifications: {
    email: true
  },
  activity: {
    created: {
      timestamp: '2019-04-29T01:57:47Z',
      timestampUNIX: 1556503067000,
    },
    lastActivity: {
      timestamp: '2019-04-29T01:57:47Z',
      timestampUNIX: 1556503067000,
    },
  },
  auth: {
    uid: '',
    email: '',
  },
  roles: {
    admin: false,
    developer: false,
    betaTester: false,
  },
  plan: {
    id: null, // intro | basic | advanced... (intro is default value)
    expires: {
      timestamp: '2111-01-01T00:00:00Z',
      timestampUNIX: 1556503067000,
    },
    enterprise: {
      limits: {
        // ...
        // accounts: 0,
      }
    },
    payment: {
      method: '', // paypal | stripe | chargebee, etc
      data: {
        // Data from payment processor like
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
  view: {
    key: ',' // if they have this, they can view the doc temporarily without being logged in
    expires: {
      timestamp: '2111-01-01T00:00:00Z',
      timestampUNIX: 1556503067000,
    },    
  },
  // temp: false,
}
```
