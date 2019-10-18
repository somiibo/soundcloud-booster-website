---
### ALL PAGES ###
permalink: /@reference/guides/firebase-rules/
---

# Basic Firestore Rules Skeleton
```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /{document=**} {
      allow read, write: if false;
    }

    match /users/{userEmail} {
      allow write: if validUserWrite();
      allow read: if userEmail == authEmail();
    }

    /// FUNCTIONS v1.0 ///
    function authEmail() {
      return request.auth.email;
    }
    function authUid() {
      return request.auth.uid;
    }    
    // Signed in Check
    function isSignedIn() {
      return request.auth != null;
    }
    // [READ] Data that exists on the Firestore document
    function existingData() {
      return resource.data;
    }
    // [WRITE] Data that is sent to a Firestore document
    function incomingData() {
      return request.resource.data;
    }
    function validUserWrite() {
      return !(request.resource.data.keys().hasAny(['firebase', 'permissions', 'plan', 'affiliate', 'api']));
    }
    /// END FUNCTIONS ///

  }
}
```
