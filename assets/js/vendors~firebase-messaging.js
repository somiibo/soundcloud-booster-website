(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ 15:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ../web-manager/node_modules/@firebase/app/dist/index.cjs.js
var index_cjs = __webpack_require__(20);
var index_cjs_default = /*#__PURE__*/__webpack_require__.n(index_cjs);

// EXTERNAL MODULE: ../web-manager/node_modules/tslib/tslib.es6.js
var tslib_es6 = __webpack_require__(16);

// EXTERNAL MODULE: ../web-manager/node_modules/@firebase/util/dist/index.cjs.js
var dist_index_cjs = __webpack_require__(21);

// EXTERNAL MODULE: ../web-manager/node_modules/idb/build/idb.js
var idb = __webpack_require__(32);

// CONCATENATED MODULE: ../web-manager/node_modules/@firebase/installations/dist/index.esm.js





var version = "0.3.1";

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var PENDING_TIMEOUT_MS = 10000;
var PACKAGE_VERSION = "w:" + version;
var INTERNAL_AUTH_VERSION = 'FIS_v2';
var INSTALLATIONS_API_URL = 'https://firebaseinstallations.googleapis.com/v1';
var TOKEN_EXPIRATION_BUFFER = 60 * 60 * 1000; // One hour
var SERVICE = 'installations';
var SERVICE_NAME = 'Installations';

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_a;
var ERROR_DESCRIPTION_MAP = (index_esm_a = {},
    index_esm_a["missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */] = 'Missing App configuration values.',
    index_esm_a["create-installation-failed" /* CREATE_INSTALLATION_FAILED */] = 'Could not register Firebase Installation.',
    index_esm_a["generate-token-failed" /* GENERATE_TOKEN_FAILED */] = 'Could not generate Auth Token.',
    index_esm_a["not-registered" /* NOT_REGISTERED */] = 'Firebase Installation is not registered.',
    index_esm_a["installation-not-found" /* INSTALLATION_NOT_FOUND */] = 'Firebase Installation not found.',
    index_esm_a["request-failed" /* REQUEST_FAILED */] = '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
    index_esm_a["app-offline" /* APP_OFFLINE */] = 'Could not process request. Application offline.',
    index_esm_a["delete-pending-registration" /* DELETE_PENDING_REGISTRATION */] = "Can't delete installation while there is a pending registration request.",
    index_esm_a);
var ERROR_FACTORY = new dist_index_cjs["ErrorFactory"](SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);
/** Returns true if error is a FirebaseError that is based on an error from the server. */
function isServerError(error) {
    return (error instanceof dist_index_cjs["FirebaseError"] &&
        error.code.includes("request-failed" /* REQUEST_FAILED */));
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function extractAppConfig(app) {
    if (!app || !app.options) {
        throw ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    var appName = app.name;
    var _a = app.options, projectId = _a.projectId, apiKey = _a.apiKey, appId = _a.appId;
    if (!appName || !projectId || !apiKey || !appId) {
        throw ERROR_FACTORY.create("missing-app-config-values" /* MISSING_APP_CONFIG_VALUES */);
    }
    return { appName: appName, projectId: projectId, apiKey: apiKey, appId: appId };
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getInstallationsEndpoint(_a) {
    var projectId = _a.projectId;
    return INSTALLATIONS_API_URL + "/projects/" + projectId + "/installations";
}
function extractAuthTokenInfoFromResponse(response) {
    return {
        token: response.token,
        requestStatus: 2 /* COMPLETED */,
        expiresIn: getExpiresInFromResponseExpiresIn(response.expiresIn),
        creationTime: Date.now()
    };
}
function getErrorFromResponse(requestName, response) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var responseJson, errorData;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, response.json()];
                case 1:
                    responseJson = _a.sent();
                    errorData = responseJson.error;
                    return [2 /*return*/, ERROR_FACTORY.create("request-failed" /* REQUEST_FAILED */, {
                            requestName: requestName,
                            serverCode: errorData.code,
                            serverMessage: errorData.message,
                            serverStatus: errorData.status
                        })];
            }
        });
    });
}
function getHeaders(_a) {
    var apiKey = _a.apiKey;
    return new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-goog-api-key': apiKey
    });
}
function getHeadersWithAuth(appConfig, _a) {
    var refreshToken = _a.refreshToken;
    var headers = getHeaders(appConfig);
    headers.append('Authorization', getAuthorizationHeader(refreshToken));
    return headers;
}
/**
 * Calls the passed in fetch wrapper and returns the response.
 * If the returned response has a status of 5xx, re-runs the function once and
 * returns the response.
 */
function retryIfServerError(fn) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var result;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fn()];
                case 1:
                    result = _a.sent();
                    if (result.status >= 500 && result.status < 600) {
                        // Internal Server Error. Retry request.
                        return [2 /*return*/, fn()];
                    }
                    return [2 /*return*/, result];
            }
        });
    });
}
function getExpiresInFromResponseExpiresIn(responseExpiresIn) {
    // This works because the server will never respond with fractions of a second.
    return Number(responseExpiresIn.replace('s', '000'));
}
function getAuthorizationHeader(refreshToken) {
    return INTERNAL_AUTH_VERSION + " " + refreshToken;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createInstallation(appConfig, _a) {
    var fid = _a.fid;
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var endpoint, headers, body, request, response, responseValue, registeredInstallationEntry;
        return Object(tslib_es6["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    endpoint = getInstallationsEndpoint(appConfig);
                    headers = getHeaders(appConfig);
                    body = {
                        fid: fid,
                        authVersion: INTERNAL_AUTH_VERSION,
                        appId: appConfig.appId,
                        sdkVersion: PACKAGE_VERSION
                    };
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, retryIfServerError(function () { return fetch(endpoint, request); })];
                case 1:
                    response = _b.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _b.sent();
                    registeredInstallationEntry = {
                        fid: responseValue.fid || fid,
                        registrationStatus: 2 /* COMPLETED */,
                        refreshToken: responseValue.refreshToken,
                        authToken: extractAuthTokenInfoFromResponse(responseValue.authToken)
                    };
                    return [2 /*return*/, registeredInstallationEntry];
                case 3: return [4 /*yield*/, getErrorFromResponse('Create Installation', response)];
                case 4: throw _b.sent();
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/** Returns a promise that resolves after given time passes. */
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function bufferToBase64UrlSafe(array) {
    var b64 = btoa(String.fromCharCode.apply(String, Object(tslib_es6["__spread"])(array)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_');
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VALID_FID_PATTERN = /^[cdef][\w-]{21}$/;
var INVALID_FID = '';
/**
 * Generates a new FID using random values from Web Crypto API.
 * Returns an empty string if FID generation fails for any reason.
 */
function generateFid() {
    try {
        // A valid FID has exactly 22 base64 characters, which is 132 bits, or 16.5
        // bytes. our implementation generates a 17 byte array instead.
        var fidByteArray = new Uint8Array(17);
        var crypto_1 = self.crypto || self.msCrypto;
        crypto_1.getRandomValues(fidByteArray);
        // Replace the first 4 random bits with the constant FID header of 0b0111.
        fidByteArray[0] = 112 + (fidByteArray[0] % 16);
        var fid = encode(fidByteArray);
        return VALID_FID_PATTERN.test(fid) ? fid : INVALID_FID;
    }
    catch (_a) {
        // FID generation errored
        return INVALID_FID;
    }
}
/** Converts a FID Uint8Array to a base64 string representation. */
function encode(fidByteArray) {
    var b64String = bufferToBase64UrlSafe(fidByteArray);
    // Remove the 23rd character that was added because of the extra 4 bits at the
    // end of our 17 byte array, and the '=' padding.
    return b64String.substr(0, 22);
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DATABASE_NAME = 'firebase-installations-database';
var DATABASE_VERSION = 1;
var OBJECT_STORE_NAME = 'firebase-installations-store';
var dbPromise = null;
function getDbPromise() {
    if (!dbPromise) {
        dbPromise = Object(idb["openDb"])(DATABASE_NAME, DATABASE_VERSION, function (upgradeDB) {
            // We don't use 'break' in this switch statement, the fall-through
            // behavior is what we want, because if there are multiple versions between
            // the old version and the current version, we want ALL the migrations
            // that correspond to those versions to run, not only the last one.
            // eslint-disable-next-line default-case
            switch (upgradeDB.oldVersion) {
                case 0:
                    upgradeDB.createObjectStore(OBJECT_STORE_NAME);
            }
        });
    }
    return dbPromise;
}
/** Assigns or overwrites the record for the given key with the given value. */
function set(appConfig, value) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var key, db, tx;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).put(value, key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/, value];
            }
        });
    });
}
/** Removes record(s) from the objectStore that match the given key. */
function remove(appConfig) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var key, db, tx;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    return [4 /*yield*/, tx.objectStore(OBJECT_STORE_NAME).delete(key)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, tx.complete];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Atomically updates a record with the result of updateFn, which gets
 * called with the current value. If newValue is undefined, the record is
 * deleted instead.
 * @return Updated value
 */
function update(appConfig, updateFn) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var key, db, tx, store, oldValue, newValue;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    key = getKey(appConfig);
                    return [4 /*yield*/, getDbPromise()];
                case 1:
                    db = _a.sent();
                    tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
                    store = tx.objectStore(OBJECT_STORE_NAME);
                    return [4 /*yield*/, store.get(key)];
                case 2:
                    oldValue = _a.sent();
                    newValue = updateFn(oldValue);
                    if (!(newValue === undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, store.delete(key)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, store.put(newValue, key)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [4 /*yield*/, tx.complete];
                case 7:
                    _a.sent();
                    return [2 /*return*/, newValue];
            }
        });
    });
}
function getKey(appConfig) {
    return appConfig.appName + "!" + appConfig.appId;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Updates and returns the InstallationEntry from the database.
 * Also triggers a registration request if it is necessary and possible.
 */
function getInstallationEntry(appConfig) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var registrationPromise, installationEntry, _a;
        return Object(tslib_es6["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        var installationEntry = updateOrCreateInstallationEntry(oldEntry);
                        var entryWithPromise = triggerRegistrationIfNecessary(appConfig, installationEntry);
                        registrationPromise = entryWithPromise.registrationPromise;
                        return entryWithPromise.installationEntry;
                    })];
                case 1:
                    installationEntry = _b.sent();
                    if (!(installationEntry.fid === INVALID_FID)) return [3 /*break*/, 3];
                    _a = {};
                    return [4 /*yield*/, registrationPromise];
                case 2: 
                // FID generation failed. Waiting for the FID from the server.
                return [2 /*return*/, (_a.installationEntry = _b.sent(), _a)];
                case 3: return [2 /*return*/, {
                        installationEntry: installationEntry,
                        registrationPromise: registrationPromise
                    }];
            }
        });
    });
}
/**
 * Creates a new Installation Entry if one does not exist.
 * Also clears timed out pending requests.
 */
function updateOrCreateInstallationEntry(oldEntry) {
    var entry = oldEntry || {
        fid: generateFid(),
        registrationStatus: 0 /* NOT_STARTED */
    };
    return clearTimedOutRequest(entry);
}
/**
 * If the Firebase Installation is not registered yet, this will trigger the
 * registration and return an InProgressInstallationEntry.
 */
function triggerRegistrationIfNecessary(appConfig, installationEntry) {
    if (installationEntry.registrationStatus === 0 /* NOT_STARTED */) {
        if (!navigator.onLine) {
            // Registration required but app is offline.
            var registrationPromiseWithError = Promise.reject(ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */));
            return {
                installationEntry: installationEntry,
                registrationPromise: registrationPromiseWithError
            };
        }
        // Try registering. Change status to IN_PROGRESS.
        var inProgressEntry = {
            fid: installationEntry.fid,
            registrationStatus: 1 /* IN_PROGRESS */,
            registrationTime: Date.now()
        };
        var registrationPromise = registerInstallation(appConfig, inProgressEntry);
        return { installationEntry: inProgressEntry, registrationPromise: registrationPromise };
    }
    else if (installationEntry.registrationStatus === 1 /* IN_PROGRESS */) {
        return {
            installationEntry: installationEntry,
            registrationPromise: waitUntilFidRegistration(appConfig)
        };
    }
    else {
        return { installationEntry: installationEntry };
    }
}
/** This will be executed only once for each new Firebase Installation. */
function registerInstallation(appConfig, installationEntry) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var registeredInstallationEntry, e_1;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 7]);
                    return [4 /*yield*/, createInstallation(appConfig, installationEntry)];
                case 1:
                    registeredInstallationEntry = _a.sent();
                    return [2 /*return*/, set(appConfig, registeredInstallationEntry)];
                case 2:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && e_1.serverCode === 409)) return [3 /*break*/, 4];
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 3:
                    // Server returned a "FID can not be used" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: 
                // Registration failed. Set FID as not registered.
                return [4 /*yield*/, set(appConfig, {
                        fid: installationEntry.fid,
                        registrationStatus: 0 /* NOT_STARTED */
                    })];
                case 5:
                    // Registration failed. Set FID as not registered.
                    _a.sent();
                    _a.label = 6;
                case 6: throw e_1;
                case 7: return [2 /*return*/];
            }
        });
    });
}
/** Call if FID registration is pending. */
function waitUntilFidRegistration(appConfig) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var entry;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // createInstallation request still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // createInstallation request still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateInstallationRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    if (entry.registrationStatus === 0 /* NOT_STARTED */) {
                        throw ERROR_FACTORY.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                    }
                    return [2 /*return*/, entry];
            }
        });
    });
}
/**
 * Called only if there is a CreateInstallation request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * CreateInstallation request.
 *
 * Returns the updated InstallationEntry.
 */
function updateInstallationRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!oldEntry) {
            throw ERROR_FACTORY.create("installation-not-found" /* INSTALLATION_NOT_FOUND */);
        }
        return clearTimedOutRequest(oldEntry);
    });
}
function clearTimedOutRequest(entry) {
    if (hasInstallationRequestTimedOut(entry)) {
        return {
            fid: entry.fid,
            registrationStatus: 0 /* NOT_STARTED */
        };
    }
    return entry;
}
function hasInstallationRequestTimedOut(installationEntry) {
    return (installationEntry.registrationStatus === 1 /* IN_PROGRESS */ &&
        installationEntry.registrationTime + PENDING_TIMEOUT_MS < Date.now());
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function generateAuthToken(appConfig, installationEntry) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var endpoint, headers, body, request, response, responseValue, completedAuthToken;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getGenerateAuthTokenEndpoint(appConfig, installationEntry);
                    headers = getHeadersWithAuth(appConfig, installationEntry);
                    body = {
                        installation: {
                            sdkVersion: PACKAGE_VERSION
                        }
                    };
                    request = {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(body)
                    };
                    return [4 /*yield*/, retryIfServerError(function () { return fetch(endpoint, request); })];
                case 1:
                    response = _a.sent();
                    if (!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.json()];
                case 2:
                    responseValue = _a.sent();
                    completedAuthToken = extractAuthTokenInfoFromResponse(responseValue);
                    return [2 /*return*/, completedAuthToken];
                case 3: return [4 /*yield*/, getErrorFromResponse('Generate Auth Token', response)];
                case 4: throw _a.sent();
            }
        });
    });
}
function getGenerateAuthTokenEndpoint(appConfig, _a) {
    var fid = _a.fid;
    return getInstallationsEndpoint(appConfig) + "/" + fid + "/authTokens:generate";
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Returns a valid authentication token for the installation. Generates a new
 * token if one doesn't exist, is expired or about to expire.
 *
 * Should only be called if the Firebase Installation is registered.
 */
function refreshAuthToken(appConfig, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var tokenPromise, entry, authToken, _a;
        return Object(tslib_es6["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, update(appConfig, function (oldEntry) {
                        if (!isEntryRegistered(oldEntry)) {
                            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
                        }
                        var oldAuthToken = oldEntry.authToken;
                        if (!forceRefresh && isAuthTokenValid(oldAuthToken)) {
                            // There is a valid token in the DB.
                            return oldEntry;
                        }
                        else if (oldAuthToken.requestStatus === 1 /* IN_PROGRESS */) {
                            // There already is a token request in progress.
                            tokenPromise = waitUntilAuthTokenRequest(appConfig);
                            return oldEntry;
                        }
                        else {
                            // No token or token expired.
                            if (!navigator.onLine) {
                                throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
                            }
                            var inProgressEntry = makeAuthTokenRequestInProgressEntry(oldEntry);
                            tokenPromise = fetchAuthTokenFromServer(appConfig, inProgressEntry);
                            return inProgressEntry;
                        }
                    })];
                case 1:
                    entry = _b.sent();
                    if (!tokenPromise) return [3 /*break*/, 3];
                    return [4 /*yield*/, tokenPromise];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    _a = entry.authToken;
                    _b.label = 4;
                case 4:
                    authToken = _a;
                    return [2 /*return*/, authToken.token];
            }
        });
    });
}
/**
 * Call only if FID is registered and Auth Token request is in progress.
 */
function waitUntilAuthTokenRequest(appConfig) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var entry, authToken;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 1:
                    entry = _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(entry.authToken.requestStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 5];
                    // generateAuthToken still in progress.
                    return [4 /*yield*/, sleep(100)];
                case 3:
                    // generateAuthToken still in progress.
                    _a.sent();
                    return [4 /*yield*/, updateAuthTokenRequest(appConfig)];
                case 4:
                    entry = _a.sent();
                    return [3 /*break*/, 2];
                case 5:
                    authToken = entry.authToken;
                    if (authToken.requestStatus === 0 /* NOT_STARTED */) {
                        throw ERROR_FACTORY.create("generate-token-failed" /* GENERATE_TOKEN_FAILED */);
                    }
                    else {
                        return [2 /*return*/, authToken];
                    }
                    return [2 /*return*/];
            }
        });
    });
}
/**
 * Called only if there is a GenerateAuthToken request in progress.
 *
 * Updates the InstallationEntry in the DB based on the status of the
 * GenerateAuthToken request.
 *
 * Returns the updated InstallationEntry.
 */
function updateAuthTokenRequest(appConfig) {
    return update(appConfig, function (oldEntry) {
        if (!isEntryRegistered(oldEntry)) {
            throw ERROR_FACTORY.create("not-registered" /* NOT_REGISTERED */);
        }
        var oldAuthToken = oldEntry.authToken;
        if (hasAuthTokenRequestTimedOut(oldAuthToken)) {
            return Object(tslib_es6["__assign"])(Object(tslib_es6["__assign"])({}, oldEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
        }
        return oldEntry;
    });
}
function fetchAuthTokenFromServer(appConfig, installationEntry) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var authToken, updatedInstallationEntry, e_1, updatedInstallationEntry;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 8]);
                    return [4 /*yield*/, generateAuthToken(appConfig, installationEntry)];
                case 1:
                    authToken = _a.sent();
                    updatedInstallationEntry = Object(tslib_es6["__assign"])(Object(tslib_es6["__assign"])({}, installationEntry), { authToken: authToken });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, authToken];
                case 3:
                    e_1 = _a.sent();
                    if (!(isServerError(e_1) && (e_1.serverCode === 401 || e_1.serverCode === 404))) return [3 /*break*/, 5];
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    return [4 /*yield*/, remove(appConfig)];
                case 4:
                    // Server returned a "FID not found" or a "Invalid authentication" error.
                    // Generate a new ID next time.
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5:
                    updatedInstallationEntry = Object(tslib_es6["__assign"])(Object(tslib_es6["__assign"])({}, installationEntry), { authToken: { requestStatus: 0 /* NOT_STARTED */ } });
                    return [4 /*yield*/, set(appConfig, updatedInstallationEntry)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: throw e_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
function isEntryRegistered(installationEntry) {
    return (installationEntry !== undefined &&
        installationEntry.registrationStatus === 2 /* COMPLETED */);
}
function isAuthTokenValid(authToken) {
    return (authToken.requestStatus === 2 /* COMPLETED */ &&
        !isAuthTokenExpired(authToken));
}
function isAuthTokenExpired(authToken) {
    var now = Date.now();
    return (now < authToken.creationTime ||
        authToken.creationTime + authToken.expiresIn < now + TOKEN_EXPIRATION_BUFFER);
}
/** Returns an updated InstallationEntry with an InProgressAuthToken. */
function makeAuthTokenRequestInProgressEntry(oldEntry) {
    var inProgressAuthToken = {
        requestStatus: 1 /* IN_PROGRESS */,
        requestTime: Date.now()
    };
    return Object(tslib_es6["__assign"])(Object(tslib_es6["__assign"])({}, oldEntry), { authToken: inProgressAuthToken });
}
function hasAuthTokenRequestTimedOut(authToken) {
    return (authToken.requestStatus === 1 /* IN_PROGRESS */ &&
        authToken.requestTime + PENDING_TIMEOUT_MS < Date.now());
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getId(app) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var appConfig, _a, installationEntry, registrationPromise;
        return Object(tslib_es6["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (registrationPromise) {
                        // Suppress registration errors as they are not a problem for getId.
                        registrationPromise.catch(function () { });
                    }
                    if (installationEntry.registrationStatus === 2 /* COMPLETED */) {
                        // If the installation is already registered, update the authentication
                        // token if needed. Suppress errors as they are not relevant to getId.
                        refreshAuthToken(appConfig).catch(function () { });
                    }
                    return [2 /*return*/, installationEntry.fid];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getToken(app, forceRefresh) {
    if (forceRefresh === void 0) { forceRefresh = false; }
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var appConfig;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, completeInstallationRegistration(appConfig)];
                case 1:
                    _a.sent();
                    // At this point we either have a Registered Installation in the DB, or we've
                    // already thrown an error.
                    return [2 /*return*/, refreshAuthToken(appConfig, forceRefresh)];
            }
        });
    });
}
function completeInstallationRegistration(appConfig) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var _a, installationEntry, registrationPromise;
        return Object(tslib_es6["__generator"])(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getInstallationEntry(appConfig)];
                case 1:
                    _a = _b.sent(), installationEntry = _a.installationEntry, registrationPromise = _a.registrationPromise;
                    if (!registrationPromise) return [3 /*break*/, 3];
                    // A createInstallation request is in progress. Wait until it finishes.
                    return [4 /*yield*/, registrationPromise];
                case 2:
                    // A createInstallation request is in progress. Wait until it finishes.
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    if (installationEntry.registrationStatus !== 2 /* COMPLETED */) {
                        // Installation ID can't be registered.
                        throw ERROR_FACTORY.create("create-installation-failed" /* CREATE_INSTALLATION_FAILED */);
                    }
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function deleteInstallation(appConfig, installationEntry) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var endpoint, headers, request, response;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    endpoint = getDeleteEndpoint(appConfig, installationEntry);
                    headers = getHeadersWithAuth(appConfig, installationEntry);
                    request = {
                        method: 'DELETE',
                        headers: headers
                    };
                    return [4 /*yield*/, retryIfServerError(function () { return fetch(endpoint, request); })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, getErrorFromResponse('Delete Installation', response)];
                case 2: throw _a.sent();
                case 3: return [2 /*return*/];
            }
        });
    });
}
function getDeleteEndpoint(appConfig, _a) {
    var fid = _a.fid;
    return getInstallationsEndpoint(appConfig) + "/" + fid;
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function deleteInstallation$1(app) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var appConfig, entry;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    appConfig = extractAppConfig(app);
                    return [4 /*yield*/, update(appConfig, function (oldEntry) {
                            if (oldEntry && oldEntry.registrationStatus === 0 /* NOT_STARTED */) {
                                // Delete the unregistered entry without sending a deleteInstallation request.
                                return undefined;
                            }
                            return oldEntry;
                        })];
                case 1:
                    entry = _a.sent();
                    if (!entry) return [3 /*break*/, 6];
                    if (!(entry.registrationStatus === 1 /* IN_PROGRESS */)) return [3 /*break*/, 2];
                    // Can't delete while trying to register.
                    throw ERROR_FACTORY.create("delete-pending-registration" /* DELETE_PENDING_REGISTRATION */);
                case 2:
                    if (!(entry.registrationStatus === 2 /* COMPLETED */)) return [3 /*break*/, 6];
                    if (!!navigator.onLine) return [3 /*break*/, 3];
                    throw ERROR_FACTORY.create("app-offline" /* APP_OFFLINE */);
                case 3: return [4 /*yield*/, deleteInstallation(appConfig, entry)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, remove(appConfig)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}

/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerInstallations(instance) {
    var installationsName = 'installations';
    var factoryMethod = function (app) {
        // Throws if app isn't configured properly.
        extractAppConfig(app);
        return {
            app: app,
            getId: function () { return getId(app); },
            getToken: function (forceRefresh) { return getToken(app, forceRefresh); },
            delete: function () { return deleteInstallation$1(app); }
        };
    };
    instance.INTERNAL.registerService(installationsName, factoryMethod);
}
registerInstallations(index_cjs_default.a);


//# sourceMappingURL=index.esm.js.map

// CONCATENATED MODULE: ../web-manager/node_modules/@firebase/messaging/dist/index.esm.js





/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var dist_index_esm_a;
var ERROR_MAP = (dist_index_esm_a = {},
    dist_index_esm_a["only-available-in-window" /* AVAILABLE_IN_WINDOW */] = 'This method is available in a Window context.',
    dist_index_esm_a["only-available-in-sw" /* AVAILABLE_IN_SW */] = 'This method is available in a service worker context.',
    dist_index_esm_a["should-be-overriden" /* SHOULD_BE_INHERITED */] = 'This method should be overriden by extended classes.',
    dist_index_esm_a["bad-sender-id" /* BAD_SENDER_ID */] = "Please ensure that 'messagingSenderId' is set " +
        'correctly in the options passed into firebase.initializeApp().',
    dist_index_esm_a["permission-default" /* PERMISSION_DEFAULT */] = 'The required permissions were not granted and dismissed instead.',
    dist_index_esm_a["permission-blocked" /* PERMISSION_BLOCKED */] = 'The required permissions were not granted and blocked instead.',
    dist_index_esm_a["unsupported-browser" /* UNSUPPORTED_BROWSER */] = "This browser doesn't support the API's " +
        'required to use the firebase SDK.',
    dist_index_esm_a["notifications-blocked" /* NOTIFICATIONS_BLOCKED */] = 'Notifications have been blocked.',
    dist_index_esm_a["failed-serviceworker-registration" /* FAILED_DEFAULT_REGISTRATION */] = 'We are unable to register the ' +
        'default service worker. {$browserErrorMessage}',
    dist_index_esm_a["sw-registration-expected" /* SW_REGISTRATION_EXPECTED */] = 'A service worker registration was the expected input.',
    dist_index_esm_a["get-subscription-failed" /* GET_SUBSCRIPTION_FAILED */] = 'There was an error when trying to get ' +
        'any existing Push Subscriptions.',
    dist_index_esm_a["invalid-saved-token" /* INVALID_SAVED_TOKEN */] = 'Unable to access details of the saved token.',
    dist_index_esm_a["sw-reg-redundant" /* SW_REG_REDUNDANT */] = 'The service worker being used for push was made redundant.',
    dist_index_esm_a["token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */] = 'A problem occured while subscribing the user to FCM: {$errorInfo}',
    dist_index_esm_a["token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */] = 'FCM returned no token when subscribing the user to push.',
    dist_index_esm_a["token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */] = 'A problem occured while unsubscribing the ' +
        'user from FCM: {$errorInfo}',
    dist_index_esm_a["token-update-failed" /* TOKEN_UPDATE_FAILED */] = 'A problem occured while updating the user from FCM: {$errorInfo}',
    dist_index_esm_a["token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */] = 'FCM returned no token when updating the user to push.',
    dist_index_esm_a["use-sw-before-get-token" /* USE_SW_BEFORE_GET_TOKEN */] = 'The useServiceWorker() method may only be called once and must be ' +
        'called before calling getToken() to ensure your service worker is used.',
    dist_index_esm_a["invalid-delete-token" /* INVALID_DELETE_TOKEN */] = 'You must pass a valid token into ' +
        'deleteToken(), i.e. the token from getToken().',
    dist_index_esm_a["delete-token-not-found" /* DELETE_TOKEN_NOT_FOUND */] = 'The deletion attempt for token could not ' +
        'be performed as the token was not found.',
    dist_index_esm_a["delete-scope-not-found" /* DELETE_SCOPE_NOT_FOUND */] = 'The deletion attempt for service worker ' +
        'scope could not be performed as the scope was not found.',
    dist_index_esm_a["bg-handler-function-expected" /* BG_HANDLER_FUNCTION_EXPECTED */] = 'The input to setBackgroundMessageHandler() must be a function.',
    dist_index_esm_a["no-window-client-to-msg" /* NO_WINDOW_CLIENT_TO_MSG */] = 'An attempt was made to message a non-existant window client.',
    dist_index_esm_a["unable-to-resubscribe" /* UNABLE_TO_RESUBSCRIBE */] = 'There was an error while re-subscribing ' +
        'the FCM token for push messaging. Will have to resubscribe the ' +
        'user on next visit. {$errorInfo}',
    dist_index_esm_a["no-fcm-token-for-resubscribe" /* NO_FCM_TOKEN_FOR_RESUBSCRIBE */] = 'Could not find an FCM token ' +
        'and as a result, unable to resubscribe. Will have to resubscribe the ' +
        'user on next visit.',
    dist_index_esm_a["failed-to-delete-token" /* FAILED_TO_DELETE_TOKEN */] = 'Unable to delete the currently saved token.',
    dist_index_esm_a["no-sw-in-reg" /* NO_SW_IN_REG */] = 'Even though the service worker registration was ' +
        'successful, there was a problem accessing the service worker itself.',
    dist_index_esm_a["bad-scope" /* BAD_SCOPE */] = 'The service worker scope must be a string with at ' +
        'least one character.',
    dist_index_esm_a["bad-vapid-key" /* BAD_VAPID_KEY */] = 'The public VAPID key is not a Uint8Array with 65 bytes.',
    dist_index_esm_a["bad-subscription" /* BAD_SUBSCRIPTION */] = 'The subscription must be a valid PushSubscription.',
    dist_index_esm_a["bad-token" /* BAD_TOKEN */] = 'The FCM Token used for storage / lookup was not ' +
        'a valid token string.',
    dist_index_esm_a["failed-delete-vapid-key" /* FAILED_DELETE_VAPID_KEY */] = 'The VAPID key could not be deleted.',
    dist_index_esm_a["invalid-public-vapid-key" /* INVALID_PUBLIC_VAPID_KEY */] = 'The public VAPID key must be a string.',
    dist_index_esm_a["use-public-key-before-get-token" /* USE_PUBLIC_KEY_BEFORE_GET_TOKEN */] = 'The usePublicVapidKey() method may only be called once and must be ' +
        'called before calling getToken() to ensure your VAPID key is used.',
    dist_index_esm_a["public-vapid-key-decryption-failed" /* PUBLIC_KEY_DECRYPTION_FAILED */] = 'The public VAPID key did not equal 65 bytes when decrypted.',
    dist_index_esm_a);
var errorFactory = new dist_index_cjs["ErrorFactory"]('messaging', 'Messaging', ERROR_MAP);

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_PUBLIC_VAPID_KEY = new Uint8Array([
    0x04,
    0x33,
    0x94,
    0xf7,
    0xdf,
    0xa1,
    0xeb,
    0xb1,
    0xdc,
    0x03,
    0xa2,
    0x5e,
    0x15,
    0x71,
    0xdb,
    0x48,
    0xd3,
    0x2e,
    0xed,
    0xed,
    0xb2,
    0x34,
    0xdb,
    0xb7,
    0x47,
    0x3a,
    0x0c,
    0x8f,
    0xc4,
    0xcc,
    0xe1,
    0x6f,
    0x3c,
    0x8c,
    0x84,
    0xdf,
    0xab,
    0xb6,
    0x66,
    0x3e,
    0xf2,
    0x0c,
    0xd4,
    0x8b,
    0xfe,
    0xe3,
    0xf9,
    0x76,
    0x2f,
    0x14,
    0x1c,
    0x63,
    0x08,
    0x6a,
    0x6f,
    0x2d,
    0xb1,
    0x1a,
    0x95,
    0xb0,
    0xce,
    0x37,
    0xc0,
    0x9c,
    0x6e
]);
var ENDPOINT = 'https://fcmregistrations.googleapis.com/v1';
var FN_CAMPAIGN_ID = 'google.c.a.c_id';
var FN_CAMPAIGN_NAME = 'google.c.a.c_l';
var FN_CAMPAIGN_TIME = 'google.c.a.ts';
/** Set to '1' if Analytics is enabled for the campaign */
var FN_CAMPAIGN_ANALYTICS_ENABLED = 'google.c.a.e';

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MessageType;
(function (MessageType) {
    MessageType["PUSH_MSG_RECEIVED"] = "push-msg-received";
    MessageType["NOTIFICATION_CLICKED"] = "notification-clicked";
})(MessageType || (MessageType = {}));

/**
 * @license
 * Copyright 2018 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function isArrayBufferEqual(a, b) {
    if (a == null || b == null) {
        return false;
    }
    if (a === b) {
        return true;
    }
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    var viewA = new DataView(a);
    var viewB = new DataView(b);
    for (var i = 0; i < a.byteLength; i++) {
        if (viewA.getUint8(i) !== viewB.getUint8(i)) {
            return false;
        }
    }
    return true;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function toBase64(arrayBuffer) {
    var uint8Version = new Uint8Array(arrayBuffer);
    return btoa(String.fromCharCode.apply(String, Object(tslib_es6["__spread"])(uint8Version)));
}
function arrayBufferToBase64(arrayBuffer) {
    var base64String = toBase64(arrayBuffer);
    return base64String
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_SubscriptionManager = /** @class */ (function () {
    function SubscriptionManager() {
    }
    SubscriptionManager.prototype.getToken = function (app, subscription, vapidKey) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var headers, body, subscribeOptions, responseData, response, err_1, message;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_esm_getHeaders(app)];
                    case 1:
                        headers = _a.sent();
                        body = getBody(subscription, vapidKey);
                        subscribeOptions = {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(app), subscribeOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        throw errorFactory.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                            errorInfo: err_1
                        });
                    case 6:
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw errorFactory.create("token-subscribe-failed" /* TOKEN_SUBSCRIBE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        if (!responseData.token) {
                            throw errorFactory.create("token-subscribe-no-token" /* TOKEN_SUBSCRIBE_NO_TOKEN */);
                        }
                        return [2 /*return*/, responseData.token];
                }
            });
        });
    };
    /**
     * Update the underlying token details for fcmToken.
     */
    SubscriptionManager.prototype.updateToken = function (tokenDetails, app, subscription, vapidKey) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var headers, body, updateOptions, responseData, response, err_2, message;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_esm_getHeaders(app)];
                    case 1:
                        headers = _a.sent();
                        body = getBody(subscription, vapidKey);
                        updateOptions = {
                            method: 'PATCH',
                            headers: headers,
                            body: JSON.stringify(body)
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(app) + "/" + tokenDetails.fcmToken, updateOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        err_2 = _a.sent();
                        throw errorFactory.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                            errorInfo: err_2
                        });
                    case 6:
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw errorFactory.create("token-update-failed" /* TOKEN_UPDATE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        if (!responseData.token) {
                            throw errorFactory.create("token-update-no-token" /* TOKEN_UPDATE_NO_TOKEN */);
                        }
                        return [2 /*return*/, responseData.token];
                }
            });
        });
    };
    SubscriptionManager.prototype.deleteToken = function (app, tokenDetails) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var headers, unsubscribeOptions, response, responseData, message, err_3;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, index_esm_getHeaders(app)];
                    case 1:
                        headers = _a.sent();
                        unsubscribeOptions = {
                            method: 'DELETE',
                            headers: headers
                        };
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fetch(getEndpoint(app) + "/" + tokenDetails.fcmToken, unsubscribeOptions)];
                    case 3:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 4:
                        responseData = _a.sent();
                        if (responseData.error) {
                            message = responseData.error.message;
                            throw errorFactory.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                                errorInfo: message
                            });
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        throw errorFactory.create("token-unsubscribe-failed" /* TOKEN_UNSUBSCRIBE_FAILED */, {
                            errorInfo: err_3
                        });
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SubscriptionManager;
}());
function getEndpoint(app) {
    return ENDPOINT + "/projects/" + app.options.projectId + "/registrations";
}
function index_esm_getHeaders(app) {
    return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
        var installations, authToken;
        return Object(tslib_es6["__generator"])(this, function (_a) {
            switch (_a.label) {
                case 0:
                    installations = app.installations();
                    return [4 /*yield*/, installations.getToken()];
                case 1:
                    authToken = _a.sent();
                    return [2 /*return*/, new Headers({
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                            'x-goog-api-key': app.options.apiKey,
                            'x-goog-firebase-installations-auth': "FIS " + authToken
                        })];
            }
        });
    });
}
function getBody(subscription, vapidKey) {
    var p256dh = arrayBufferToBase64(subscription.getKey('p256dh'));
    var auth = arrayBufferToBase64(subscription.getKey('auth'));
    var body = {
        web: {
            endpoint: subscription.endpoint,
            p256dh: p256dh,
            auth: auth
        }
    };
    if (!isArrayBufferEqual(vapidKey.buffer, DEFAULT_PUBLIC_VAPID_KEY.buffer)) {
        body.web.applicationPubKey = arrayBufferToBase64(vapidKey);
    }
    return body;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function base64ToArrayBuffer(base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var OLD_DB_NAME = 'undefined';
var OLD_OBJECT_STORE_NAME = 'fcm_token_object_Store';
function handleDb(db, app) {
    if (!db.objectStoreNames.contains(OLD_OBJECT_STORE_NAME)) {
        // We found a database with the name 'undefined', but our expected object
        // store isn't defined.
        return;
    }
    var transaction = db.transaction(OLD_OBJECT_STORE_NAME);
    var objectStore = transaction.objectStore(OLD_OBJECT_STORE_NAME);
    var subscriptionManager = new index_esm_SubscriptionManager();
    var openCursorRequest = objectStore.openCursor();
    openCursorRequest.onerror = function (event) {
        // NOOP - Nothing we can do.
        console.warn('Unable to cleanup old IDB.', event);
    };
    openCursorRequest.onsuccess = function () {
        var cursor = openCursorRequest.result;
        if (cursor) {
            // cursor.value contains the current record being iterated through
            // this is where you'd do something with the result
            var tokenDetails = cursor.value;
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            subscriptionManager.deleteToken(app, tokenDetails);
            cursor.continue();
        }
        else {
            db.close();
            indexedDB.deleteDatabase(OLD_DB_NAME);
        }
    };
}
function cleanV1(app) {
    var request = indexedDB.open(OLD_DB_NAME);
    request.onerror = function (_event) {
        // NOOP - Nothing we can do.
    };
    request.onsuccess = function (_event) {
        var db = request.result;
        handleDb(db, app);
    };
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_DbInterface = /** @class */ (function () {
    function DbInterface() {
        this.dbPromise = null;
    }
    /** Gets record(s) from the objectStore that match the given key. */
    DbInterface.prototype.get = function (key) {
        return this.createTransaction(function (objectStore) { return objectStore.get(key); });
    };
    /** Gets record(s) from the objectStore that match the given index. */
    DbInterface.prototype.getIndex = function (index, key) {
        function runRequest(objectStore) {
            var idbIndex = objectStore.index(index);
            return idbIndex.get(key);
        }
        return this.createTransaction(runRequest);
    };
    /** Assigns or overwrites the record for the given value. */
    // IndexedDB values are of type "any"
    DbInterface.prototype.put = function (value) {
        return this.createTransaction(function (objectStore) { return objectStore.put(value); }, 'readwrite');
    };
    /** Deletes record(s) from the objectStore that match the given key. */
    DbInterface.prototype.delete = function (key) {
        return this.createTransaction(function (objectStore) { return objectStore.delete(key); }, 'readwrite');
    };
    /**
     * Close the currently open database.
     */
    DbInterface.prototype.closeDatabase = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var db;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dbPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dbPromise];
                    case 1:
                        db = _a.sent();
                        db.close();
                        this.dbPromise = null;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates an IndexedDB Transaction and passes its objectStore to the
     * runRequest function, which runs the database request.
     *
     * @return Promise that resolves with the result of the runRequest function
     */
    DbInterface.prototype.createTransaction = function (runRequest, mode) {
        if (mode === void 0) { mode = 'readonly'; }
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var db, transaction, request, result;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getDb()];
                    case 1:
                        db = _a.sent();
                        transaction = db.transaction(this.objectStoreName, mode);
                        request = transaction.objectStore(this.objectStoreName);
                        return [4 /*yield*/, promisify(runRequest(request))];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) {
                                transaction.oncomplete = function () {
                                    resolve(result);
                                };
                                transaction.onerror = function () {
                                    reject(transaction.error);
                                };
                            })];
                }
            });
        });
    };
    /** Gets the cached db connection or opens a new one. */
    DbInterface.prototype.getDb = function () {
        var _this = this;
        if (!this.dbPromise) {
            this.dbPromise = new Promise(function (resolve, reject) {
                var request = indexedDB.open(_this.dbName, _this.dbVersion);
                request.onsuccess = function () {
                    resolve(request.result);
                };
                request.onerror = function () {
                    _this.dbPromise = null;
                    reject(request.error);
                };
                request.onupgradeneeded = function (event) { return _this.onDbUpgrade(request, event); };
            });
        }
        return this.dbPromise;
    };
    return DbInterface;
}());
/** Promisifies an IDBRequest. Resolves with the IDBRequest's result. */
function promisify(request) {
    return new Promise(function (resolve, reject) {
        request.onsuccess = function () {
            resolve(request.result);
        };
        request.onerror = function () {
            reject(request.error);
        };
    });
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_TokenDetailsModel = /** @class */ (function (_super) {
    Object(tslib_es6["__extends"])(TokenDetailsModel, _super);
    function TokenDetailsModel(app) {
        var _this = _super.call(this) || this;
        _this.app = app;
        _this.dbName = 'fcm_token_details_db';
        _this.dbVersion = 4;
        _this.objectStoreName = 'fcm_token_object_Store';
        return _this;
    }
    TokenDetailsModel.prototype.onDbUpgrade = function (request, event) {
        var db = request.result;
        // Lack of 'break' statements is intentional.
        switch (event.oldVersion) {
            case 0: {
                // New IDB instance
                var objectStore = db.createObjectStore(this.objectStoreName, {
                    keyPath: 'swScope'
                });
                // Make sure the sender ID can be searched
                objectStore.createIndex('fcmSenderId', 'fcmSenderId', {
                    unique: false
                });
                objectStore.createIndex('fcmToken', 'fcmToken', { unique: true });
            }
            case 1: {
                // Prior to version 2, we were using either 'fcm_token_details_db'
                // or 'undefined' as the database name due to bug in the SDK
                // So remove the old tokens and databases.
                cleanV1(this.app);
            }
            case 2: {
                // Update from v2 to v4 directly in a single openCursor request.
                // We need to do this because for some reason, doing a subsequent update on the same data
                // in the same transaction drops the first update.
                var objectStore = request.transaction.objectStore(this.objectStoreName);
                var cursorRequest_1 = objectStore.openCursor();
                cursorRequest_1.onsuccess = function () {
                    var cursor = cursorRequest_1.result;
                    if (cursor) {
                        var value = cursor.value;
                        var newValue = Object(tslib_es6["__assign"])({}, value);
                        if (!value.createTime) {
                            newValue.createTime = Date.now();
                        }
                        if (typeof value.vapidKey === 'string') {
                            newValue.vapidKey = base64ToArrayBuffer(value.vapidKey);
                        }
                        if (typeof value.auth === 'string') {
                            newValue.auth = base64ToArrayBuffer(value.auth).buffer;
                        }
                        if (typeof value.auth === 'string') {
                            newValue.p256dh = base64ToArrayBuffer(value.p256dh).buffer;
                        }
                        if (typeof value.fcmPushSet === 'string') {
                            delete newValue.fcmPushSet;
                        }
                        cursor.update(newValue);
                        cursor.continue();
                    }
                };
                // Break here as we've already updated to v4.
                break;
            }
            case 3: {
                // Update from V3 to V4.
                var objectStore = request.transaction.objectStore(this.objectStoreName);
                var cursorRequest_2 = objectStore.openCursor();
                cursorRequest_2.onsuccess = function () {
                    var cursor = cursorRequest_2.result;
                    if (cursor) {
                        var value = cursor.value;
                        var newValue = Object(tslib_es6["__assign"])({}, value);
                        if (typeof value.fcmPushSet === 'string') {
                            delete newValue.fcmPushSet;
                        }
                        cursor.update(newValue);
                        cursor.continue();
                    }
                };
            }
            default: // ignore
        }
    };
    /**
     * Given a token, this method will look up the details in indexedDB.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromToken = function (fcmToken) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                if (!fcmToken) {
                    throw errorFactory.create("bad-token" /* BAD_TOKEN */);
                }
                validateInputs({ fcmToken: fcmToken });
                return [2 /*return*/, this.getIndex('fcmToken', fcmToken)];
            });
        });
    };
    /**
     * Given a service worker scope, this method will look up the details in
     * indexedDB.
     * @return The details associated with that token.
     */
    TokenDetailsModel.prototype.getTokenDetailsFromSWScope = function (swScope) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                if (!swScope) {
                    throw errorFactory.create("bad-scope" /* BAD_SCOPE */);
                }
                validateInputs({ swScope: swScope });
                return [2 /*return*/, this.get(swScope)];
            });
        });
    };
    /**
     * Save the details for the fcm token for re-use at a later date.
     * @param input A plain js object containing args to save.
     */
    TokenDetailsModel.prototype.saveTokenDetails = function (tokenDetails) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                if (!tokenDetails.swScope) {
                    throw errorFactory.create("bad-scope" /* BAD_SCOPE */);
                }
                if (!tokenDetails.vapidKey) {
                    throw errorFactory.create("bad-vapid-key" /* BAD_VAPID_KEY */);
                }
                if (!tokenDetails.endpoint || !tokenDetails.auth || !tokenDetails.p256dh) {
                    throw errorFactory.create("bad-subscription" /* BAD_SUBSCRIPTION */);
                }
                if (!tokenDetails.fcmSenderId) {
                    throw errorFactory.create("bad-sender-id" /* BAD_SENDER_ID */);
                }
                if (!tokenDetails.fcmToken) {
                    throw errorFactory.create("bad-token" /* BAD_TOKEN */);
                }
                validateInputs(tokenDetails);
                return [2 /*return*/, this.put(tokenDetails)];
            });
        });
    };
    /**
     * This method deletes details of the current FCM token.
     * It's returning a promise in case we need to move to an async
     * method for deleting at a later date.
     *
     * @return Resolves once the FCM token details have been deleted and returns
     * the deleted details.
     */
    TokenDetailsModel.prototype.deleteToken = function (token) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var details;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof token !== 'string' || token.length === 0) {
                            return [2 /*return*/, Promise.reject(errorFactory.create("invalid-delete-token" /* INVALID_DELETE_TOKEN */))];
                        }
                        return [4 /*yield*/, this.getTokenDetailsFromToken(token)];
                    case 1:
                        details = _a.sent();
                        if (!details) {
                            throw errorFactory.create("delete-token-not-found" /* DELETE_TOKEN_NOT_FOUND */);
                        }
                        return [4 /*yield*/, this.delete(details.swScope)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, details];
                }
            });
        });
    };
    return TokenDetailsModel;
}(index_esm_DbInterface));
/**
 * This method takes an object and will check for known arguments and
 * validate the input.
 * @return Promise that resolves if input is valid, rejects otherwise.
 */
function validateInputs(input) {
    if (input.fcmToken) {
        if (typeof input.fcmToken !== 'string' || input.fcmToken.length === 0) {
            throw errorFactory.create("bad-token" /* BAD_TOKEN */);
        }
    }
    if (input.swScope) {
        if (typeof input.swScope !== 'string' || input.swScope.length === 0) {
            throw errorFactory.create("bad-scope" /* BAD_SCOPE */);
        }
    }
    if (input.vapidKey) {
        if (!(input.vapidKey instanceof Uint8Array) ||
            input.vapidKey.length !== 65) {
            throw errorFactory.create("bad-vapid-key" /* BAD_VAPID_KEY */);
        }
    }
    if (input.endpoint) {
        if (typeof input.endpoint !== 'string' || input.endpoint.length === 0) {
            throw errorFactory.create("bad-subscription" /* BAD_SUBSCRIPTION */);
        }
    }
    if (input.auth) {
        if (!(input.auth instanceof ArrayBuffer)) {
            throw errorFactory.create("bad-subscription" /* BAD_SUBSCRIPTION */);
        }
    }
    if (input.p256dh) {
        if (!(input.p256dh instanceof ArrayBuffer)) {
            throw errorFactory.create("bad-subscription" /* BAD_SUBSCRIPTION */);
        }
    }
    if (input.fcmSenderId) {
        if (typeof input.fcmSenderId !== 'string' ||
            input.fcmSenderId.length === 0) {
            throw errorFactory.create("bad-sender-id" /* BAD_SENDER_ID */);
        }
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var UNCOMPRESSED_PUBLIC_KEY_SIZE = 65;
var index_esm_VapidDetailsModel = /** @class */ (function (_super) {
    Object(tslib_es6["__extends"])(VapidDetailsModel, _super);
    function VapidDetailsModel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dbName = 'fcm_vapid_details_db';
        _this.dbVersion = 1;
        _this.objectStoreName = 'fcm_vapid_object_Store';
        return _this;
    }
    VapidDetailsModel.prototype.onDbUpgrade = function (request) {
        var db = request.result;
        db.createObjectStore(this.objectStoreName, { keyPath: 'swScope' });
    };
    /**
     * Given a service worker scope, this method will look up the vapid key
     * in indexedDB.
     */
    VapidDetailsModel.prototype.getVapidFromSWScope = function (swScope) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var result;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (typeof swScope !== 'string' || swScope.length === 0) {
                            throw errorFactory.create("bad-scope" /* BAD_SCOPE */);
                        }
                        return [4 /*yield*/, this.get(swScope)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result ? result.vapidKey : undefined];
                }
            });
        });
    };
    /**
     * Save a vapid key against a swScope for later date.
     */
    VapidDetailsModel.prototype.saveVapidDetails = function (swScope, vapidKey) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var details;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                if (typeof swScope !== 'string' || swScope.length === 0) {
                    throw errorFactory.create("bad-scope" /* BAD_SCOPE */);
                }
                if (vapidKey === null || vapidKey.length !== UNCOMPRESSED_PUBLIC_KEY_SIZE) {
                    throw errorFactory.create("bad-vapid-key" /* BAD_VAPID_KEY */);
                }
                details = {
                    swScope: swScope,
                    vapidKey: vapidKey
                };
                return [2 /*return*/, this.put(details)];
            });
        });
    };
    /**
     * This method deletes details of the current FCM VAPID key for a SW scope.
     * Resolves once the scope/vapid details have been deleted and returns the
     * deleted vapid key.
     */
    VapidDetailsModel.prototype.deleteVapidDetails = function (swScope) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var vapidKey;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getVapidFromSWScope(swScope)];
                    case 1:
                        vapidKey = _a.sent();
                        if (!vapidKey) {
                            throw errorFactory.create("delete-scope-not-found" /* DELETE_SCOPE_NOT_FOUND */);
                        }
                        return [4 /*yield*/, this.delete(swScope)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, vapidKey];
                }
            });
        });
    };
    return VapidDetailsModel;
}(index_esm_DbInterface));

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Token should be refreshed once a week.
var TOKEN_EXPIRATION_MILLIS = 7 * 24 * 60 * 60 * 1000; // 7 days
var index_esm_BaseController = /** @class */ (function () {
    function BaseController(app) {
        var _this = this;
        this.app = app;
        this.vapidDetailsModel = new index_esm_VapidDetailsModel();
        this.subscriptionManager = new index_esm_SubscriptionManager();
        if (!app.options.messagingSenderId ||
            typeof app.options.messagingSenderId !== 'string') {
            throw errorFactory.create("bad-sender-id" /* BAD_SENDER_ID */);
        }
        this.INTERNAL = {
            delete: function () { return _this.delete(); }
        };
        this.tokenDetailsModel = new index_esm_TokenDetailsModel(app);
    }
    BaseController.prototype.getToken = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var currentPermission, swReg, publicVapidKey, pushSubscription, tokenDetails;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentPermission = this.getNotificationPermission_();
                        if (currentPermission === 'denied') {
                            throw errorFactory.create("notifications-blocked" /* NOTIFICATIONS_BLOCKED */);
                        }
                        else if (currentPermission !== 'granted') {
                            // We must wait for permission to be granted
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.getSWRegistration_()];
                    case 1:
                        swReg = _a.sent();
                        return [4 /*yield*/, this.getPublicVapidKey_()];
                    case 2:
                        publicVapidKey = _a.sent();
                        return [4 /*yield*/, this.getPushSubscription(swReg, publicVapidKey)];
                    case 3:
                        pushSubscription = _a.sent();
                        return [4 /*yield*/, this.tokenDetailsModel.getTokenDetailsFromSWScope(swReg.scope)];
                    case 4:
                        tokenDetails = _a.sent();
                        if (tokenDetails) {
                            return [2 /*return*/, this.manageExistingToken(swReg, pushSubscription, publicVapidKey, tokenDetails)];
                        }
                        return [2 /*return*/, this.getNewToken(swReg, pushSubscription, publicVapidKey)];
                }
            });
        });
    };
    /**
     * manageExistingToken is triggered if there's an existing FCM token in the
     * database and it can take 3 different actions:
     * 1) Retrieve the existing FCM token from the database.
     * 2) If VAPID details have changed: Delete the existing token and create a
     * new one with the new VAPID key.
     * 3) If the database cache is invalidated: Send a request to FCM to update
     * the token, and to check if the token is still valid on FCM-side.
     */
    BaseController.prototype.manageExistingToken = function (swReg, pushSubscription, publicVapidKey, tokenDetails) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var isTokenValid, now;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isTokenValid = isTokenStillValid(pushSubscription, publicVapidKey, tokenDetails);
                        if (!isTokenValid) return [3 /*break*/, 1];
                        now = Date.now();
                        if (now < tokenDetails.createTime + TOKEN_EXPIRATION_MILLIS) {
                            return [2 /*return*/, tokenDetails.fcmToken];
                        }
                        else {
                            return [2 /*return*/, this.updateToken(swReg, pushSubscription, publicVapidKey, tokenDetails)];
                        }
                        return [3 /*break*/, 3];
                    case 1: 
                    // If the token is no longer valid (for example if the VAPID details
                    // have changed), delete the existing token from the FCM client and server
                    // database. No need to unsubscribe from the Service Worker as we have a
                    // good push subscription that we'd like to use in getNewToken.
                    return [4 /*yield*/, this.deleteTokenFromDB(tokenDetails.fcmToken)];
                    case 2:
                        // If the token is no longer valid (for example if the VAPID details
                        // have changed), delete the existing token from the FCM client and server
                        // database. No need to unsubscribe from the Service Worker as we have a
                        // good push subscription that we'd like to use in getNewToken.
                        _a.sent();
                        return [2 /*return*/, this.getNewToken(swReg, pushSubscription, publicVapidKey)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.updateToken = function (swReg, pushSubscription, publicVapidKey, tokenDetails) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var updatedToken, allDetails, e_1;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 6]);
                        return [4 /*yield*/, this.subscriptionManager.updateToken(tokenDetails, this.app, pushSubscription, publicVapidKey)];
                    case 1:
                        updatedToken = _a.sent();
                        allDetails = {
                            swScope: swReg.scope,
                            vapidKey: publicVapidKey,
                            fcmSenderId: this.app.options.messagingSenderId,
                            fcmToken: updatedToken,
                            createTime: Date.now(),
                            endpoint: pushSubscription.endpoint,
                            auth: pushSubscription.getKey('auth'),
                            p256dh: pushSubscription.getKey('p256dh')
                        };
                        return [4 /*yield*/, this.tokenDetailsModel.saveTokenDetails(allDetails)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vapidDetailsModel.saveVapidDetails(swReg.scope, publicVapidKey)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, updatedToken];
                    case 4:
                        e_1 = _a.sent();
                        return [4 /*yield*/, this.deleteToken(tokenDetails.fcmToken)];
                    case 5:
                        _a.sent();
                        throw e_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    BaseController.prototype.getNewToken = function (swReg, pushSubscription, publicVapidKey) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var newToken, allDetails;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.subscriptionManager.getToken(this.app, pushSubscription, publicVapidKey)];
                    case 1:
                        newToken = _a.sent();
                        allDetails = {
                            swScope: swReg.scope,
                            vapidKey: publicVapidKey,
                            fcmSenderId: this.app.options.messagingSenderId,
                            fcmToken: newToken,
                            createTime: Date.now(),
                            endpoint: pushSubscription.endpoint,
                            auth: pushSubscription.getKey('auth'),
                            p256dh: pushSubscription.getKey('p256dh')
                        };
                        return [4 /*yield*/, this.tokenDetailsModel.saveTokenDetails(allDetails)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.vapidDetailsModel.saveVapidDetails(swReg.scope, publicVapidKey)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, newToken];
                }
            });
        });
    };
    /**
     * This method deletes tokens that the token manager looks after,
     * unsubscribes the token from FCM  and then unregisters the push
     * subscription if it exists. It returns a promise that indicates
     * whether or not the unsubscribe request was processed successfully.
     */
    BaseController.prototype.deleteToken = function (token) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var registration, pushSubscription;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Delete the token details from the database.
                    return [4 /*yield*/, this.deleteTokenFromDB(token)];
                    case 1:
                        // Delete the token details from the database.
                        _a.sent();
                        return [4 /*yield*/, this.getSWRegistration_()];
                    case 2:
                        registration = _a.sent();
                        if (!registration) return [3 /*break*/, 4];
                        return [4 /*yield*/, registration.pushManager.getSubscription()];
                    case 3:
                        pushSubscription = _a.sent();
                        if (pushSubscription) {
                            return [2 /*return*/, pushSubscription.unsubscribe()];
                        }
                        _a.label = 4;
                    case 4: 
                    // If there's no SW, consider it a success.
                    return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * This method will delete the token from the client database, and make a
     * call to FCM to remove it from the server DB. Does not temper with the
     * push subscription.
     */
    BaseController.prototype.deleteTokenFromDB = function (token) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var tokenDetails;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenDetailsModel.deleteToken(token)];
                    case 1:
                        tokenDetails = _a.sent();
                        return [4 /*yield*/, this.subscriptionManager.deleteToken(this.app, tokenDetails)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets a PushSubscription for the current user.
     */
    BaseController.prototype.getPushSubscription = function (swRegistration, publicVapidKey) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var subscription;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, swRegistration.pushManager.getSubscription()];
                    case 1:
                        subscription = _a.sent();
                        if (subscription) {
                            return [2 /*return*/, subscription];
                        }
                        return [2 /*return*/, swRegistration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: publicVapidKey
                            })];
                }
            });
        });
    };
    //
    // The following methods should only be available in the window.
    //
    /**
     * @deprecated Use Notification.requestPermission() instead.
     * https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
     */
    BaseController.prototype.requestPermission = function () {
        throw errorFactory.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    BaseController.prototype.useServiceWorker = function (_registration) {
        throw errorFactory.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    BaseController.prototype.usePublicVapidKey = function (_b64PublicKey) {
        throw errorFactory.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    BaseController.prototype.onMessage = function (_nextOrObserver, _error, _completed) {
        throw errorFactory.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    BaseController.prototype.onTokenRefresh = function (_nextOrObserver, _error, _completed) {
        throw errorFactory.create("only-available-in-window" /* AVAILABLE_IN_WINDOW */);
    };
    //
    // The following methods are used by the service worker only.
    //
    BaseController.prototype.setBackgroundMessageHandler = function (_callback) {
        throw errorFactory.create("only-available-in-sw" /* AVAILABLE_IN_SW */);
    };
    //
    // The following methods are used by the service themselves and not exposed
    // publicly or not expected to be used by developers.
    //
    /**
     * This method is required to adhere to the Firebase interface.
     * It closes any currently open indexdb database connections.
     */
    BaseController.prototype.delete = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all([
                            this.tokenDetailsModel.closeDatabase(),
                            this.vapidDetailsModel.closeDatabase()
                        ])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the current Notification Permission state.
     */
    BaseController.prototype.getNotificationPermission_ = function () {
        return Notification.permission;
    };
    BaseController.prototype.getTokenDetailsModel = function () {
        return this.tokenDetailsModel;
    };
    BaseController.prototype.getVapidDetailsModel = function () {
        return this.vapidDetailsModel;
    };
    // Visible for testing
    // TODO: make protected
    BaseController.prototype.getSubscriptionManager = function () {
        return this.subscriptionManager;
    };
    return BaseController;
}());
/**
 * Checks if the tokenDetails match the details provided in the clients.
 */
function isTokenStillValid(pushSubscription, publicVapidKey, tokenDetails) {
    if (!tokenDetails.vapidKey ||
        !isArrayBufferEqual(publicVapidKey.buffer, tokenDetails.vapidKey.buffer)) {
        return false;
    }
    var isEndpointEqual = pushSubscription.endpoint === tokenDetails.endpoint;
    var isAuthEqual = isArrayBufferEqual(pushSubscription.getKey('auth'), tokenDetails.auth);
    var isP256dhEqual = isArrayBufferEqual(pushSubscription.getKey('p256dh'), tokenDetails.p256dh);
    return isEndpointEqual && isAuthEqual && isP256dhEqual;
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var FCM_MSG = 'FCM_MSG';
var index_esm_SwController = /** @class */ (function (_super) {
    Object(tslib_es6["__extends"])(SwController, _super);
    function SwController(app) {
        var _this = _super.call(this, app) || this;
        _this.bgMessageHandler = null;
        self.addEventListener('push', function (e) {
            _this.onPush(e);
        });
        self.addEventListener('pushsubscriptionchange', function (e) {
            _this.onSubChange(e);
        });
        self.addEventListener('notificationclick', function (e) {
            _this.onNotificationClick(e);
        });
        return _this;
    }
    // Visible for testing
    // TODO: Make private
    SwController.prototype.onPush = function (event) {
        event.waitUntil(this.onPush_(event));
    };
    // Visible for testing
    // TODO: Make private
    SwController.prototype.onSubChange = function (event) {
        event.waitUntil(this.onSubChange_(event));
    };
    // Visible for testing
    // TODO: Make private
    SwController.prototype.onNotificationClick = function (event) {
        event.waitUntil(this.onNotificationClick_(event));
    };
    /**
     * A handler for push events that shows notifications based on the content of
     * the payload.
     *
     * The payload must be a JSON-encoded Object with a `notification` key. The
     * value of the `notification` property will be used as the NotificationOptions
     * object passed to showNotification. Additionally, the `title` property of the
     * notification object will be used as the title.
     *
     * If there is no notification data in the payload then no notification will be
     * shown.
     */
    SwController.prototype.onPush_ = function (event) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var msgPayload, hasVisibleClients, notificationDetails, notificationTitle, reg, actions, maxActions;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.data) {
                            return [2 /*return*/];
                        }
                        try {
                            msgPayload = event.data.json();
                        }
                        catch (err) {
                            // Not JSON so not an FCM message
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.hasVisibleClients_()];
                    case 1:
                        hasVisibleClients = _a.sent();
                        if (hasVisibleClients) {
                            // App in foreground. Send to page.
                            return [2 /*return*/, this.sendMessageToWindowClients_(msgPayload)];
                        }
                        notificationDetails = this.getNotificationData_(msgPayload);
                        if (!notificationDetails) return [3 /*break*/, 3];
                        notificationTitle = notificationDetails.title || '';
                        return [4 /*yield*/, this.getSWRegistration_()];
                    case 2:
                        reg = _a.sent();
                        actions = notificationDetails.actions;
                        maxActions = Notification.maxActions;
                        if (actions && maxActions && actions.length > maxActions) {
                            console.warn("This browser only supports " + maxActions + " actions." +
                                "The remaining actions will not be displayed.");
                        }
                        return [2 /*return*/, reg.showNotification(notificationTitle, notificationDetails)];
                    case 3:
                        if (!this.bgMessageHandler) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.bgMessageHandler(msgPayload)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SwController.prototype.onSubChange_ = function (_event) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var registration, err_1, err_2, tokenDetailsModel, tokenDetails;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getSWRegistration_()];
                    case 1:
                        registration = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        throw errorFactory.create("unable-to-resubscribe" /* UNABLE_TO_RESUBSCRIBE */, {
                            errorInfo: err_1
                        });
                    case 3:
                        _a.trys.push([3, 5, , 8]);
                        return [4 /*yield*/, registration.pushManager.getSubscription()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 5:
                        err_2 = _a.sent();
                        tokenDetailsModel = this.getTokenDetailsModel();
                        return [4 /*yield*/, tokenDetailsModel.getTokenDetailsFromSWScope(registration.scope)];
                    case 6:
                        tokenDetails = _a.sent();
                        if (!tokenDetails) {
                            // This should rarely occure, but could if indexedDB
                            // is corrupted or wiped
                            throw err_2;
                        }
                        // Attempt to delete the token if we know it's bad
                        return [4 /*yield*/, this.deleteToken(tokenDetails.fcmToken)];
                    case 7:
                        // Attempt to delete the token if we know it's bad
                        _a.sent();
                        throw err_2;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SwController.prototype.onNotificationClick_ = function (event) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var msgPayload, link, windowClient, internalMsg;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!event.notification ||
                            !event.notification.data ||
                            !event.notification.data[FCM_MSG]) {
                            // Not an FCM notification, do nothing.
                            return [2 /*return*/];
                        }
                        else if (event.action) {
                            // User clicked on an action button.
                            // This will allow devs to act on action button clicks by using a custom
                            // onNotificationClick listener that they define.
                            return [2 /*return*/];
                        }
                        // Prevent other listeners from receiving the event
                        event.stopImmediatePropagation();
                        event.notification.close();
                        msgPayload = event.notification.data[FCM_MSG];
                        if (!msgPayload.notification) {
                            // Nothing to do.
                            return [2 /*return*/];
                        }
                        link = (msgPayload.fcmOptions && msgPayload.fcmOptions.link) ||
                            msgPayload.notification.click_action;
                        if (!link) {
                            if (msgPayload.data && FN_CAMPAIGN_ID in msgPayload.data) {
                                link = self.location.origin;
                            }
                            else {
                                // Nothing to do.
                                return [2 /*return*/];
                            }
                        }
                        return [4 /*yield*/, this.getWindowClient_(link)];
                    case 1:
                        windowClient = _a.sent();
                        if (!!windowClient) return [3 /*break*/, 4];
                        return [4 /*yield*/, self.clients.openWindow(link)];
                    case 2:
                        // Unable to find window client so need to open one.
                        windowClient = _a.sent();
                        // Wait three seconds for the client to initialize and set up the message
                        // handler so that it can receive the message.
                        return [4 /*yield*/, index_esm_sleep(3000)];
                    case 3:
                        // Wait three seconds for the client to initialize and set up the message
                        // handler so that it can receive the message.
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, windowClient.focus()];
                    case 5:
                        windowClient = _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!windowClient) {
                            // Window Client will not be returned if it's for a third party origin.
                            return [2 /*return*/];
                        }
                        // Delete notification and fcmOptions data from payload before sending to
                        // the page.
                        delete msgPayload.notification;
                        delete msgPayload.fcmOptions;
                        internalMsg = createNewMsg(MessageType.NOTIFICATION_CLICKED, msgPayload);
                        // Attempt to send a message to the client to handle the data
                        // Is affected by: https://github.com/slightlyoff/ServiceWorker/issues/728
                        return [2 /*return*/, this.attemptToMessageClient_(windowClient, internalMsg)];
                }
            });
        });
    };
    // Visible for testing
    // TODO: Make private
    SwController.prototype.getNotificationData_ = function (msgPayload) {
        var _a;
        if (!msgPayload) {
            return;
        }
        if (typeof msgPayload.notification !== 'object') {
            return;
        }
        var notificationInformation = Object(tslib_es6["__assign"])({}, msgPayload.notification);
        // Put the message payload under FCM_MSG name so we can identify the
        // notification as being an FCM notification vs a notification from
        // somewhere else (i.e. normal web push or developer generated
        // notification).
        notificationInformation.data = Object(tslib_es6["__assign"])(Object(tslib_es6["__assign"])({}, msgPayload.notification.data), (_a = {}, _a[FCM_MSG] = msgPayload, _a));
        return notificationInformation;
    };
    /**
     * Calling setBackgroundMessageHandler will opt in to some specific
     * behaviours.
     * 1.) If a notification doesn't need to be shown due to a window already
     * being visible, then push messages will be sent to the page.
     * 2.) If a notification needs to be shown, and the message contains no
     * notification data this method will be called
     * and the promise it returns will be passed to event.waitUntil.
     * If you do not set this callback then all push messages will let and the
     * developer can handle them in a their own 'push' event callback
     *
     * @param callback The callback to be called when a push message is received
     * and a notification must be shown. The callback will be given the data from
     * the push message.
     */
    SwController.prototype.setBackgroundMessageHandler = function (callback) {
        if (!callback || typeof callback !== 'function') {
            throw errorFactory.create("bg-handler-function-expected" /* BG_HANDLER_FUNCTION_EXPECTED */);
        }
        this.bgMessageHandler = callback;
    };
    /**
     * @param url The URL to look for when focusing a client.
     * @return Returns an existing window client or a newly opened WindowClient.
     */
    // Visible for testing
    // TODO: Make private
    SwController.prototype.getWindowClient_ = function (url) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var parsedURL, clientList, suitableClient, i, parsedClientUrl;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsedURL = new URL(url, self.location.href).href;
                        return [4 /*yield*/, getClientList()];
                    case 1:
                        clientList = _a.sent();
                        suitableClient = null;
                        for (i = 0; i < clientList.length; i++) {
                            parsedClientUrl = new URL(clientList[i].url, self.location.href)
                                .href;
                            if (parsedClientUrl === parsedURL) {
                                suitableClient = clientList[i];
                                break;
                            }
                        }
                        return [2 /*return*/, suitableClient];
                }
            });
        });
    };
    /**
     * This message will attempt to send the message to a window client.
     * @param client The WindowClient to send the message to.
     * @param message The message to send to the client.
     * @returns Returns a promise that resolves after sending the message. This
     * does not guarantee that the message was successfully received.
     */
    // Visible for testing
    // TODO: Make private
    SwController.prototype.attemptToMessageClient_ = function (client, message) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                // NOTE: This returns a promise in case this API is abstracted later on to
                // do additional work
                if (!client) {
                    throw errorFactory.create("no-window-client-to-msg" /* NO_WINDOW_CLIENT_TO_MSG */);
                }
                client.postMessage(message);
                return [2 /*return*/];
            });
        });
    };
    /**
     * @returns If there is currently a visible WindowClient, this method will
     * resolve to true, otherwise false.
     */
    // Visible for testing
    // TODO: Make private
    SwController.prototype.hasVisibleClients_ = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var clientList;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getClientList()];
                    case 1:
                        clientList = _a.sent();
                        return [2 /*return*/, clientList.some(function (client) {
                                return client.visibilityState === 'visible' &&
                                    // Ignore chrome-extension clients as that matches the background pages
                                    // of extensions, which are always considered visible.
                                    !client.url.startsWith('chrome-extension://');
                            })];
                }
            });
        });
    };
    /**
     * @param msgPayload The data from the push event that should be sent to all
     * available pages.
     * @returns Returns a promise that resolves once the message has been sent to
     * all WindowClients.
     */
    // Visible for testing
    // TODO: Make private
    SwController.prototype.sendMessageToWindowClients_ = function (msgPayload) {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var clientList, internalMsg;
            var _this = this;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getClientList()];
                    case 1:
                        clientList = _a.sent();
                        internalMsg = createNewMsg(MessageType.PUSH_MSG_RECEIVED, msgPayload);
                        return [4 /*yield*/, Promise.all(clientList.map(function (client) {
                                return _this.attemptToMessageClient_(client, internalMsg);
                            }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This will register the default service worker and return the registration.
     * @return he service worker registration to be used for the push service.
     */
    SwController.prototype.getSWRegistration_ = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                return [2 /*return*/, self.registration];
            });
        });
    };
    /**
     * This will return the default VAPID key or the uint8array version of the
     * public VAPID key provided by the developer.
     */
    SwController.prototype.getPublicVapidKey_ = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var swReg, vapidKeyFromDatabase;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSWRegistration_()];
                    case 1:
                        swReg = _a.sent();
                        if (!swReg) {
                            throw errorFactory.create("sw-registration-expected" /* SW_REGISTRATION_EXPECTED */);
                        }
                        return [4 /*yield*/, this.getVapidDetailsModel().getVapidFromSWScope(swReg.scope)];
                    case 2:
                        vapidKeyFromDatabase = _a.sent();
                        if (vapidKeyFromDatabase == null) {
                            return [2 /*return*/, DEFAULT_PUBLIC_VAPID_KEY];
                        }
                        return [2 /*return*/, vapidKeyFromDatabase];
                }
            });
        });
    };
    return SwController;
}(index_esm_BaseController));
function getClientList() {
    return self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
        // TS doesn't know that "type: 'window'" means it'll return WindowClient[]
    });
}
function createNewMsg(msgType, msgData) {
    return {
        firebaseMessagingType: msgType,
        firebaseMessagingData: msgData
    };
}
function index_esm_sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DEFAULT_SW_PATH = '/firebase-messaging-sw.js';
var DEFAULT_SW_SCOPE = '/firebase-cloud-messaging-push-scope';

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var index_esm_WindowController = /** @class */ (function (_super) {
    Object(tslib_es6["__extends"])(WindowController, _super);
    /**
     * A service that provides a MessagingService instance.
     */
    function WindowController(app) {
        var _this = _super.call(this, app) || this;
        _this.registrationToUse = null;
        _this.publicVapidKeyToUse = null;
        _this.messageObserver = null;
        // @ts-ignore: Unused variable error, this is not implemented yet.
        _this.tokenRefreshObserver = null;
        _this.onMessageInternal = Object(dist_index_cjs["createSubscribe"])(function (observer) {
            _this.messageObserver = observer;
        });
        _this.onTokenRefreshInternal = Object(dist_index_cjs["createSubscribe"])(function (observer) {
            _this.tokenRefreshObserver = observer;
        });
        _this.setupSWMessageListener_();
        return _this;
    }
    /**
     * Request permission if it is not currently granted
     *
     * @return Resolves if the permission was granted, otherwise rejects
     *
     * @deprecated Use Notification.requestPermission() instead.
     * https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
     */
    WindowController.prototype.requestPermission = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            var permissionResult;
            return Object(tslib_es6["__generator"])(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.getNotificationPermission_() === 'granted') {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Notification.requestPermission()];
                    case 1:
                        permissionResult = _a.sent();
                        if (permissionResult === 'granted') {
                            return [2 /*return*/];
                        }
                        else if (permissionResult === 'denied') {
                            throw errorFactory.create("permission-blocked" /* PERMISSION_BLOCKED */);
                        }
                        else {
                            throw errorFactory.create("permission-default" /* PERMISSION_DEFAULT */);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This method allows a developer to override the default service worker and
     * instead use a custom service worker.
     *
     * @param registration The service worker registration that should be used to
     * receive the push messages.
     */
    WindowController.prototype.useServiceWorker = function (registration) {
        if (!(registration instanceof ServiceWorkerRegistration)) {
            throw errorFactory.create("sw-registration-expected" /* SW_REGISTRATION_EXPECTED */);
        }
        if (this.registrationToUse != null) {
            throw errorFactory.create("use-sw-before-get-token" /* USE_SW_BEFORE_GET_TOKEN */);
        }
        this.registrationToUse = registration;
    };
    /**
     * This method allows a developer to override the default vapid key
     * and instead use a custom VAPID public key.
     *
     * @param publicKey A URL safe base64 encoded string.
     */
    WindowController.prototype.usePublicVapidKey = function (publicKey) {
        if (typeof publicKey !== 'string') {
            throw errorFactory.create("invalid-public-vapid-key" /* INVALID_PUBLIC_VAPID_KEY */);
        }
        if (this.publicVapidKeyToUse != null) {
            throw errorFactory.create("use-public-key-before-get-token" /* USE_PUBLIC_KEY_BEFORE_GET_TOKEN */);
        }
        var parsedKey = base64ToArrayBuffer(publicKey);
        if (parsedKey.length !== 65) {
            throw errorFactory.create("public-vapid-key-decryption-failed" /* PUBLIC_KEY_DECRYPTION_FAILED */);
        }
        this.publicVapidKeyToUse = parsedKey;
    };
    /**
     * @export
     * @param nextOrObserver An observer object or a function triggered on
     * message.
     * @param error A function triggered on message error.
     * @param completed function triggered when the observer is removed.
     * @return The unsubscribe function for the observer.
     */
    WindowController.prototype.onMessage = function (nextOrObserver, error, completed) {
        if (typeof nextOrObserver === 'function') {
            return this.onMessageInternal(nextOrObserver, error, completed);
        }
        else {
            return this.onMessageInternal(nextOrObserver);
        }
    };
    /**
     * @param nextOrObserver An observer object or a function triggered on token
     * refresh.
     * @param error A function triggered on token refresh error.
     * @param completed function triggered when the observer is removed.
     * @return The unsubscribe function for the observer.
     */
    WindowController.prototype.onTokenRefresh = function (nextOrObserver, error, completed) {
        if (typeof nextOrObserver === 'function') {
            return this.onTokenRefreshInternal(nextOrObserver, error, completed);
        }
        else {
            return this.onTokenRefreshInternal(nextOrObserver);
        }
    };
    /**
     * Given a registration, wait for the service worker it relates to
     * become activer
     * @param registration Registration to wait for service worker to become active
     * @return Wait for service worker registration to become active
     */
    // Visible for testing
    // TODO: Make private
    WindowController.prototype.waitForRegistrationToActivate_ = function (registration) {
        var serviceWorker = registration.installing || registration.waiting || registration.active;
        return new Promise(function (resolve, reject) {
            if (!serviceWorker) {
                // This is a rare scenario but has occured in firefox
                reject(errorFactory.create("no-sw-in-reg" /* NO_SW_IN_REG */));
                return;
            }
            // Because the Promise function is called on next tick there is a
            // small chance that the worker became active or redundant already.
            if (serviceWorker.state === 'activated') {
                resolve(registration);
                return;
            }
            if (serviceWorker.state === 'redundant') {
                reject(errorFactory.create("sw-reg-redundant" /* SW_REG_REDUNDANT */));
                return;
            }
            var stateChangeListener = function () {
                if (serviceWorker.state === 'activated') {
                    resolve(registration);
                }
                else if (serviceWorker.state === 'redundant') {
                    reject(errorFactory.create("sw-reg-redundant" /* SW_REG_REDUNDANT */));
                }
                else {
                    // Return early and wait to next state change
                    return;
                }
                serviceWorker.removeEventListener('statechange', stateChangeListener);
            };
            serviceWorker.addEventListener('statechange', stateChangeListener);
        });
    };
    /**
     * This will register the default service worker and return the registration
     * @return The service worker registration to be used for the push service.
     */
    WindowController.prototype.getSWRegistration_ = function () {
        var _this = this;
        if (this.registrationToUse) {
            return this.waitForRegistrationToActivate_(this.registrationToUse);
        }
        // Make the registration null so we know useServiceWorker will not
        // use a new service worker as registrationToUse is no longer undefined
        this.registrationToUse = null;
        return navigator.serviceWorker
            .register(DEFAULT_SW_PATH, {
            scope: DEFAULT_SW_SCOPE
        })
            .catch(function (err) {
            throw errorFactory.create("failed-serviceworker-registration" /* FAILED_DEFAULT_REGISTRATION */, {
                browserErrorMessage: err.message
            });
        })
            .then(function (registration) {
            return _this.waitForRegistrationToActivate_(registration).then(function () {
                _this.registrationToUse = registration;
                // We update after activation due to an issue with Firefox v49 where
                // a race condition occassionally causes the service worker to not
                // install
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                registration.update();
                return registration;
            });
        });
    };
    /**
     * This will return the default VAPID key or the uint8array version of the
     * public VAPID key provided by the developer.
     */
    WindowController.prototype.getPublicVapidKey_ = function () {
        return Object(tslib_es6["__awaiter"])(this, void 0, void 0, function () {
            return Object(tslib_es6["__generator"])(this, function (_a) {
                if (this.publicVapidKeyToUse) {
                    return [2 /*return*/, this.publicVapidKeyToUse];
                }
                return [2 /*return*/, DEFAULT_PUBLIC_VAPID_KEY];
            });
        });
    };
    /**
     * This method will set up a message listener to handle
     * events from the service worker that should trigger
     * events in the page.
     */
    // Visible for testing
    // TODO: Make private
    WindowController.prototype.setupSWMessageListener_ = function () {
        var _this = this;
        navigator.serviceWorker.addEventListener('message', function (event) {
            if (!event.data ||
                !event.data.firebaseMessagingType ||
                !event.data.firebaseMessagingData) {
                // Not a message from FCM
                return;
            }
            var _a = event.data, firebaseMessagingType = _a.firebaseMessagingType, firebaseMessagingData = _a.firebaseMessagingData;
            if (_this.messageObserver) {
                _this.messageObserver.next(firebaseMessagingData);
            }
            var data = firebaseMessagingData.data;
            if (data &&
                FN_CAMPAIGN_ID in data &&
                data[FN_CAMPAIGN_ANALYTICS_ENABLED] === '1') {
                // This message has a campaign id, meaning it was sent using the FN Console.
                // Analytics is enabled on this message, so we should log it.
                var eventType = getEventType(firebaseMessagingType);
                _this.app.INTERNAL.analytics.logEvent(eventType, 
                /* eslint-disable camelcase */
                {
                    message_name: data[FN_CAMPAIGN_NAME],
                    message_id: data[FN_CAMPAIGN_ID],
                    message_time: data[FN_CAMPAIGN_TIME],
                    message_device_time: Math.floor(Date.now() / 1000)
                }
                /* eslint-enable camelcase */
                );
            }
        }, false);
    };
    return WindowController;
}(index_esm_BaseController));
function getEventType(messageType) {
    switch (messageType) {
        case MessageType.NOTIFICATION_CLICKED:
            return 'notification_open';
        case MessageType.PUSH_MSG_RECEIVED:
            return 'notification_foreground';
        default:
            throw new Error();
    }
}

/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerMessaging(instance) {
    var messagingName = 'messaging';
    var factoryMethod = function (app) {
        if (!isSupported()) {
            throw errorFactory.create("unsupported-browser" /* UNSUPPORTED_BROWSER */);
        }
        if (self && 'ServiceWorkerGlobalScope' in self) {
            // Running in ServiceWorker context
            return new index_esm_SwController(app);
        }
        else {
            // Assume we are in the window context.
            return new index_esm_WindowController(app);
        }
    };
    var namespaceExports = {
        isSupported: isSupported
    };
    instance.INTERNAL.registerService(messagingName, factoryMethod, namespaceExports);
}
registerMessaging(index_cjs_default.a);
function isSupported() {
    if (self && 'ServiceWorkerGlobalScope' in self) {
        // Running in ServiceWorker context
        return isSWControllerSupported();
    }
    else {
        // Assume we are in the window context.
        return isWindowControllerSupported();
    }
}
/**
 * Checks to see if the required APIs exist.
 */
function isWindowControllerSupported() {
    return (navigator.cookieEnabled &&
        'serviceWorker' in navigator &&
        'PushManager' in window &&
        'Notification' in window &&
        'fetch' in window &&
        ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
        PushSubscription.prototype.hasOwnProperty('getKey'));
}
/**
 * Checks to see if the required APIs exist within SW Context.
 */
function isSWControllerSupported() {
    return ('PushManager' in self &&
        'Notification' in self &&
        ServiceWorkerRegistration.prototype.hasOwnProperty('showNotification') &&
        PushSubscription.prototype.hasOwnProperty('getKey'));
}


//# sourceMappingURL=index.esm.js.map

// CONCATENATED MODULE: ../web-manager/node_modules/firebase/messaging/dist/index.esm.js

//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory(exports) :
  undefined;
}(this, function (exports) { 'use strict';

  function toArray(arr) {
    return Array.prototype.slice.call(arr);
  }

  function promisifyRequest(request) {
    return new Promise(function(resolve, reject) {
      request.onsuccess = function() {
        resolve(request.result);
      };

      request.onerror = function() {
        reject(request.error);
      };
    });
  }

  function promisifyRequestCall(obj, method, args) {
    var request;
    var p = new Promise(function(resolve, reject) {
      request = obj[method].apply(obj, args);
      promisifyRequest(request).then(resolve, reject);
    });

    p.request = request;
    return p;
  }

  function promisifyCursorRequestCall(obj, method, args) {
    var p = promisifyRequestCall(obj, method, args);
    return p.then(function(value) {
      if (!value) return;
      return new Cursor(value, p.request);
    });
  }

  function proxyProperties(ProxyClass, targetProp, properties) {
    properties.forEach(function(prop) {
      Object.defineProperty(ProxyClass.prototype, prop, {
        get: function() {
          return this[targetProp][prop];
        },
        set: function(val) {
          this[targetProp][prop] = val;
        }
      });
    });
  }

  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return this[targetProp][prop].apply(this[targetProp], arguments);
      };
    });
  }

  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {
    properties.forEach(function(prop) {
      if (!(prop in Constructor.prototype)) return;
      ProxyClass.prototype[prop] = function() {
        return promisifyCursorRequestCall(this[targetProp], prop, arguments);
      };
    });
  }

  function Index(index) {
    this._index = index;
  }

  proxyProperties(Index, '_index', [
    'name',
    'keyPath',
    'multiEntry',
    'unique'
  ]);

  proxyRequestMethods(Index, '_index', IDBIndex, [
    'get',
    'getKey',
    'getAll',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(Index, '_index', IDBIndex, [
    'openCursor',
    'openKeyCursor'
  ]);

  function Cursor(cursor, request) {
    this._cursor = cursor;
    this._request = request;
  }

  proxyProperties(Cursor, '_cursor', [
    'direction',
    'key',
    'primaryKey',
    'value'
  ]);

  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [
    'update',
    'delete'
  ]);

  // proxy 'next' methods
  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {
    if (!(methodName in IDBCursor.prototype)) return;
    Cursor.prototype[methodName] = function() {
      var cursor = this;
      var args = arguments;
      return Promise.resolve().then(function() {
        cursor._cursor[methodName].apply(cursor._cursor, args);
        return promisifyRequest(cursor._request).then(function(value) {
          if (!value) return;
          return new Cursor(value, cursor._request);
        });
      });
    };
  });

  function ObjectStore(store) {
    this._store = store;
  }

  ObjectStore.prototype.createIndex = function() {
    return new Index(this._store.createIndex.apply(this._store, arguments));
  };

  ObjectStore.prototype.index = function() {
    return new Index(this._store.index.apply(this._store, arguments));
  };

  proxyProperties(ObjectStore, '_store', [
    'name',
    'keyPath',
    'indexNames',
    'autoIncrement'
  ]);

  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'put',
    'add',
    'delete',
    'clear',
    'get',
    'getAll',
    'getKey',
    'getAllKeys',
    'count'
  ]);

  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [
    'openCursor',
    'openKeyCursor'
  ]);

  proxyMethods(ObjectStore, '_store', IDBObjectStore, [
    'deleteIndex'
  ]);

  function Transaction(idbTransaction) {
    this._tx = idbTransaction;
    this.complete = new Promise(function(resolve, reject) {
      idbTransaction.oncomplete = function() {
        resolve();
      };
      idbTransaction.onerror = function() {
        reject(idbTransaction.error);
      };
      idbTransaction.onabort = function() {
        reject(idbTransaction.error);
      };
    });
  }

  Transaction.prototype.objectStore = function() {
    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));
  };

  proxyProperties(Transaction, '_tx', [
    'objectStoreNames',
    'mode'
  ]);

  proxyMethods(Transaction, '_tx', IDBTransaction, [
    'abort'
  ]);

  function UpgradeDB(db, oldVersion, transaction) {
    this._db = db;
    this.oldVersion = oldVersion;
    this.transaction = new Transaction(transaction);
  }

  UpgradeDB.prototype.createObjectStore = function() {
    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));
  };

  proxyProperties(UpgradeDB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(UpgradeDB, '_db', IDBDatabase, [
    'deleteObjectStore',
    'close'
  ]);

  function DB(db) {
    this._db = db;
  }

  DB.prototype.transaction = function() {
    return new Transaction(this._db.transaction.apply(this._db, arguments));
  };

  proxyProperties(DB, '_db', [
    'name',
    'version',
    'objectStoreNames'
  ]);

  proxyMethods(DB, '_db', IDBDatabase, [
    'close'
  ]);

  // Add cursor iterators
  // TODO: remove this once browsers do the right thing with promises
  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {
    [ObjectStore, Index].forEach(function(Constructor) {
      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.
      if (!(funcName in Constructor.prototype)) return;

      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {
        var args = toArray(arguments);
        var callback = args[args.length - 1];
        var nativeObject = this._store || this._index;
        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));
        request.onsuccess = function() {
          callback(request.result);
        };
      };
    });
  });

  // polyfill getAll
  [Index, ObjectStore].forEach(function(Constructor) {
    if (Constructor.prototype.getAll) return;
    Constructor.prototype.getAll = function(query, count) {
      var instance = this;
      var items = [];

      return new Promise(function(resolve) {
        instance.iterateCursor(query, function(cursor) {
          if (!cursor) {
            resolve(items);
            return;
          }
          items.push(cursor.value);

          if (count !== undefined && items.length == count) {
            resolve(items);
            return;
          }
          cursor.continue();
        });
      });
    };
  });

  function openDb(name, version, upgradeCallback) {
    var p = promisifyRequestCall(indexedDB, 'open', [name, version]);
    var request = p.request;

    if (request) {
      request.onupgradeneeded = function(event) {
        if (upgradeCallback) {
          upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));
        }
      };
    }

    return p.then(function(db) {
      return new DB(db);
    });
  }

  function deleteDb(name) {
    return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
  }

  exports.openDb = openDb;
  exports.deleteDb = deleteDb;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


/***/ })

}]);