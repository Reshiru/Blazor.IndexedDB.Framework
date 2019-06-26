/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Scripts/InitialiseIndexDbBlazor.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/InitialiseIndexDbBlazor.ts":
/*!********************************************!*\
  !*** ./Scripts/InitialiseIndexDbBlazor.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const indexedDbBlazor_1 = __webpack_require__(/*! ./indexedDbBlazor */ "./Scripts/indexedDbBlazor.ts");
var IndexDb;
(function (IndexDb) {
    const timeghostExtensions = 'TimeGhost';
    const extensionObject = {
        IndexedDbManager: new indexedDbBlazor_1.IndexedDbManager()
    };
    function initialise() {
        if (typeof window !== 'undefined' && !window[timeghostExtensions]) {
            window[timeghostExtensions] = Object.assign({}, extensionObject);
        }
        else {
            window[timeghostExtensions] = Object.assign({}, window[timeghostExtensions], extensionObject);
        }
    }
    IndexDb.initialise = initialise;
})(IndexDb || (IndexDb = {}));
IndexDb.initialise();


/***/ }),

/***/ "./Scripts/indexedDbBlazor.ts":
/*!************************************!*\
  !*** ./Scripts/indexedDbBlazor.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const idb_1 = __webpack_require__(/*! idb */ "./node_modules/idb/lib/idb.js");
class IndexedDbManager {
    constructor() {
        this.dbInstance = null;
        this.openDatabase = (data, instanceWrapper) => __awaiter(this, void 0, void 0, function* () {
            const dbStore = data;
            instanceWrapper.instance.invokeMethod(instanceWrapper.methodName, "Hello from the other side");
            this.dbInstance = yield idb_1.default.open(dbStore.dbName, dbStore.version, upgradeDB => {
                this.upgradeDatabase(upgradeDB, dbStore);
            });
            return `IndexedDB ${data.dbName} opened`;
        });
        this.deleteDb = (dbName) => __awaiter(this, void 0, void 0, function* () {
            this.dbInstance.close();
            yield idb_1.default.delete(dbName);
            return `The database ${dbName} has been deleted`;
        });
        this.addRecord = (record) => __awaiter(this, void 0, void 0, function* () {
            const stName = record.storename;
            let itemToSave = record.data;
            const tx = this.getTransaction(this.dbInstance, stName, 'readwrite');
            const objectStore = tx.objectStore(stName);
            itemToSave = this.checkForKeyPath(objectStore, itemToSave);
            const result = yield objectStore.add(itemToSave, record.key);
            return `Added new record with id ${result}`;
        });
        this.updateRecord = (record) => __awaiter(this, void 0, void 0, function* () {
            const stName = record.storename;
            const tx = this.getTransaction(this.dbInstance, stName, 'readwrite');
            const result = yield tx.objectStore(stName).put(record.data, record.key);
            return `updated record with id ${result}`;
        });
        this.getRecords = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readonly');
            let results = yield tx.objectStore(storeName).getAll();
            yield tx.complete;
            return results;
        });
        this.clearStore = (storeName) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storeName, 'readwrite');
            yield tx.objectStore(storeName).clear();
            yield tx.complete;
            return `Store ${storeName} cleared`;
        });
        this.getRecordByIndex = (searchData) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');
            const results = yield tx.objectStore(searchData.storename)
                .index(searchData.indexName)
                .get(searchData.queryValue);
            yield tx.complete;
            return results;
        });
        this.getAllRecordsByIndex = (searchData) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, searchData.storename, 'readonly');
            let results = [];
            tx.objectStore(searchData.storename)
                .index(searchData.indexName)
                .iterateCursor(cursor => {
                if (!cursor) {
                    return;
                }
                if (cursor.key === searchData.queryValue) {
                    results.push(cursor.value);
                }
                cursor.continue();
            });
            yield tx.complete;
            return results;
        });
        this.getRecordById = (storename, id) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readonly');
            let result = yield tx.objectStore(storename).get(id);
            return result;
        });
        this.deleteRecord = (storename, id) => __awaiter(this, void 0, void 0, function* () {
            const tx = this.getTransaction(this.dbInstance, storename, 'readwrite');
            yield tx.objectStore(storename).delete(id);
            return `Record with id: ${id} deleted`;
        });
    }
    getTransaction(dbInstance, stName, mode) {
        const tx = dbInstance.transaction(stName, mode);
        tx.complete.catch(err => {
            console.log(err.message);
        });
        return tx;
    }
    checkForKeyPath(objectStore, data) {
        if (!objectStore.autoIncrement || !objectStore.keyPath) {
            return data;
        }
        if (typeof objectStore.keyPath !== 'string') {
            return data;
        }
        const keyPath = objectStore.keyPath;
        if (!data[keyPath]) {
            delete data[keyPath];
        }
        return data;
    }
    upgradeDatabase(upgradeDB, dbStore) {
        if (upgradeDB.oldVersion < dbStore.version) {
            if (dbStore.stores) {
                for (var store of dbStore.stores) {
                    if (!upgradeDB.objectStoreNames.contains(store.name)) {
                        let primaryKey = store.primaryKey;
                        if (!primaryKey) {
                            primaryKey = { name: 'id', keyPath: 'id', auto: true };
                        }
                        const newStore = upgradeDB.createObjectStore(store.name, { keyPath: primaryKey.name, autoIncrement: primaryKey.auto });
                        for (var index of store.indexes) {
                            newStore.createIndex(index.name, index.keyPath, { unique: index.unique });
                        }
                    }
                }
            }
        }
    }
}
exports.IndexedDbManager = IndexedDbManager;


/***/ }),

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function() {
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

  var exp = {
    open: function(name, version, upgradeCallback) {
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
    },
    delete: function(name) {
      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);
    }
  };

  if (true) {
    module.exports = exp;
    module.exports.default = module.exports;
  }
  else {}
}());


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vU2NyaXB0cy9Jbml0aWFsaXNlSW5kZXhEYkJsYXpvci50cyIsIndlYnBhY2s6Ly8vLi9TY3JpcHRzL2luZGV4ZWREYkJsYXpvci50cyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaWRiL2xpYi9pZGIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLHVHQUFxRDtBQUVyRCxJQUFVLE9BQU8sQ0FtQmhCO0FBbkJELFdBQVUsT0FBTztJQUNiLE1BQU0sbUJBQW1CLEdBQVcsV0FBVyxDQUFDO0lBQ2hELE1BQU0sZUFBZSxHQUFHO1FBQ3BCLGdCQUFnQixFQUFFLElBQUksa0NBQWdCLEVBQUU7S0FDM0MsQ0FBQztJQUVGLFNBQWdCLFVBQVU7UUFDdEIsSUFBSSxPQUFPLE1BQU0sS0FBSyxX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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxJQUE2QjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxPQUFPLEVBRUo7QUFDSCxDQUFDIiwiZmlsZSI6ImluZGV4ZWREYi5CbGF6b3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL1NjcmlwdHMvSW5pdGlhbGlzZUluZGV4RGJCbGF6b3IudHNcIik7XG4iLCJpbXBvcnQgeyBJbmRleGVkRGJNYW5hZ2VyIH0gZnJvbSAnLi9pbmRleGVkRGJCbGF6b3InO1xuXG5uYW1lc3BhY2UgSW5kZXhEYiB7XG4gICAgY29uc3QgdGltZWdob3N0RXh0ZW5zaW9uczogc3RyaW5nID0gJ1RpbWVHaG9zdCc7XG4gICAgY29uc3QgZXh0ZW5zaW9uT2JqZWN0ID0ge1xuICAgICAgICBJbmRleGVkRGJNYW5hZ2VyOiBuZXcgSW5kZXhlZERiTWFuYWdlcigpXG4gICAgfTtcblxuICAgIGV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXNlKCk6IHZvaWQge1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgIXdpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSkge1xuICAgICAgICAgICAgd2luZG93W3RpbWVnaG9zdEV4dGVuc2lvbnNdID0ge1xuICAgICAgICAgICAgICAgIC4uLmV4dGVuc2lvbk9iamVjdFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdpbmRvd1t0aW1lZ2hvc3RFeHRlbnNpb25zXSA9IHtcbiAgICAgICAgICAgICAgICAuLi53aW5kb3dbdGltZWdob3N0RXh0ZW5zaW9uc10sXG4gICAgICAgICAgICAgICAgLi4uZXh0ZW5zaW9uT2JqZWN0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICB9XG59XG5cbkluZGV4RGIuaW5pdGlhbGlzZSgpOyIsIi8vLy8vIDxyZWZlcmVuY2UgcGF0aD1cIk1pY3Jvc29mdC5KU0ludGVyb3AuZC50c1wiLz5cbmltcG9ydCBpZGIgZnJvbSAnaWRiJztcbmltcG9ydCB7IERCLCBVcGdyYWRlREIsIE9iamVjdFN0b3JlLCBUcmFuc2FjdGlvbiB9IGZyb20gJ2lkYic7XG5pbXBvcnQgeyBJRGJTdG9yZSwgSUluZGV4U2VhcmNoLCBJSW5kZXhTcGVjLCBJU3RvcmVSZWNvcmQsIElTdG9yZVNjaGVtYSwgSURvdE5ldEluc3RhbmNlV3JhcHBlciB9IGZyb20gJy4vaW50ZXJvcEludGVyZmFjZXMnO1xuXG5cblxuZXhwb3J0IGNsYXNzIEluZGV4ZWREYk1hbmFnZXIge1xuXG4gICAgcHJpdmF0ZSBkYkluc3RhbmNlOmFueSA9IG51bGw7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgcHVibGljIG9wZW5EYXRhYmFzZSA9IGFzeW5jIChkYXRhOiBJRGJTdG9yZSwgaW5zdGFuY2VXcmFwcGVyOiBJRG90TmV0SW5zdGFuY2VXcmFwcGVyKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgY29uc3QgZGJTdG9yZSA9IGRhdGE7XG4gICAgICAgIC8vanVzdCBhIHRlc3QgZm9yIHRoZSBtb21lbnRcbiAgICAgICAgaW5zdGFuY2VXcmFwcGVyLmluc3RhbmNlLmludm9rZU1ldGhvZChpbnN0YW5jZVdyYXBwZXIubWV0aG9kTmFtZSwgXCJIZWxsbyBmcm9tIHRoZSBvdGhlciBzaWRlXCIpO1xuICAgICAgIFxuICAgICAgICAgICAgdGhpcy5kYkluc3RhbmNlID0gIGF3YWl0IGlkYi5vcGVuKGRiU3RvcmUuZGJOYW1lLCBkYlN0b3JlLnZlcnNpb24sIHVwZ3JhZGVEQiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGdyYWRlRGF0YWJhc2UodXBncmFkZURCLCBkYlN0b3JlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYEluZGV4ZWREQiAke2RhdGEuZGJOYW1lfSBvcGVuZWRgO1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVEYiA9IGFzeW5jKGRiTmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgICAgICAgdGhpcy5kYkluc3RhbmNlLmNsb3NlKCk7XG5cbiAgICAgICAgYXdhaXQgaWRiLmRlbGV0ZShkYk5hbWUpO1xuXG4gICAgICAgIHJldHVybiBgVGhlIGRhdGFiYXNlICR7ZGJOYW1lfSBoYXMgYmVlbiBkZWxldGVkYDtcbn1cblxuICAgIHB1YmxpYyBhZGRSZWNvcmQgPSBhc3luYyAocmVjb3JkOiBJU3RvcmVSZWNvcmQpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICBjb25zdCBzdE5hbWUgPSByZWNvcmQuc3RvcmVuYW1lO1xuICAgICAgICBsZXQgaXRlbVRvU2F2ZSA9IHJlY29yZC5kYXRhO1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdE5hbWUsICdyZWFkd3JpdGUnKTtcbiAgICAgICAgY29uc3Qgb2JqZWN0U3RvcmUgPSB0eC5vYmplY3RTdG9yZShzdE5hbWUpO1xuXG4gICAgICAgIGl0ZW1Ub1NhdmUgPSB0aGlzLmNoZWNrRm9yS2V5UGF0aChvYmplY3RTdG9yZSwgaXRlbVRvU2F2ZSk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgb2JqZWN0U3RvcmUuYWRkKGl0ZW1Ub1NhdmUsIHJlY29yZC5rZXkpO1xuXG4gICAgICAgIHJldHVybiBgQWRkZWQgbmV3IHJlY29yZCB3aXRoIGlkICR7cmVzdWx0fWA7XG4gICAgfVxuXG4gICAgcHVibGljIHVwZGF0ZVJlY29yZCA9IGFzeW5jIChyZWNvcmQ6IElTdG9yZVJlY29yZCk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIGNvbnN0IHN0TmFtZSA9IHJlY29yZC5zdG9yZW5hbWU7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHN0TmFtZSwgJ3JlYWR3cml0ZScpO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHN0TmFtZSkucHV0KHJlY29yZC5kYXRhLCByZWNvcmQua2V5KTtcbiAgICAgICBcbiAgICAgICAgcmV0dXJuIGB1cGRhdGVkIHJlY29yZCB3aXRoIGlkICR7cmVzdWx0fWA7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFJlY29yZHMgPSBhc3luYyAoc3RvcmVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPGFueT4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZU5hbWUsICdyZWFkb25seScpO1xuXG4gICAgICAgIGxldCByZXN1bHRzID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVOYW1lKS5nZXRBbGwoKTtcblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgY2xlYXJTdG9yZSA9IGFzeW5jIChzdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZU5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmNsZWFyKCk7XG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuXG4gICAgICAgIHJldHVybiBgU3RvcmUgJHtzdG9yZU5hbWV9IGNsZWFyZWRgO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRSZWNvcmRCeUluZGV4ID0gYXN5bmMgKHNlYXJjaERhdGE6IElJbmRleFNlYXJjaCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy5nZXRUcmFuc2FjdGlvbih0aGlzLmRiSW5zdGFuY2UsIHNlYXJjaERhdGEuc3RvcmVuYW1lLCAncmVhZG9ubHknKTtcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHR4Lm9iamVjdFN0b3JlKHNlYXJjaERhdGEuc3RvcmVuYW1lKVxuICAgICAgICAgICAgLmluZGV4KHNlYXJjaERhdGEuaW5kZXhOYW1lKVxuICAgICAgICAgICAgLmdldChzZWFyY2hEYXRhLnF1ZXJ5VmFsdWUpO1xuXG4gICAgICAgIGF3YWl0IHR4LmNvbXBsZXRlO1xuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0QWxsUmVjb3Jkc0J5SW5kZXggPSBhc3luYyAoc2VhcmNoRGF0YTogSUluZGV4U2VhcmNoKTogUHJvbWlzZTxhbnk+ID0+IHtcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc2VhcmNoRGF0YS5zdG9yZW5hbWUsICdyZWFkb25seScpO1xuICAgICAgICBsZXQgcmVzdWx0czogYW55W10gPSBbXTtcblxuICAgICAgICB0eC5vYmplY3RTdG9yZShzZWFyY2hEYXRhLnN0b3JlbmFtZSlcbiAgICAgICAgICAgIC5pbmRleChzZWFyY2hEYXRhLmluZGV4TmFtZSlcbiAgICAgICAgICAgIC5pdGVyYXRlQ3Vyc29yKGN1cnNvciA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFjdXJzb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3Iua2V5ID09PSBzZWFyY2hEYXRhLnF1ZXJ5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGN1cnNvci52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBhd2FpdCB0eC5jb21wbGV0ZTtcblxuICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0UmVjb3JkQnlJZCA9IGFzeW5jIChzdG9yZW5hbWU6IHN0cmluZywgaWQ6IGFueSk6IFByb21pc2U8YW55PiA9PiB7XG5cbiAgICAgICAgY29uc3QgdHggPSB0aGlzLmdldFRyYW5zYWN0aW9uKHRoaXMuZGJJbnN0YW5jZSwgc3RvcmVuYW1lLCAncmVhZG9ubHknKTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0gYXdhaXQgdHgub2JqZWN0U3RvcmUoc3RvcmVuYW1lKS5nZXQoaWQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHB1YmxpYyBkZWxldGVSZWNvcmQgPSBhc3luYyAoc3RvcmVuYW1lOiBzdHJpbmcsIGlkOiBhbnkpOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgICAgICBjb25zdCB0eCA9IHRoaXMuZ2V0VHJhbnNhY3Rpb24odGhpcy5kYkluc3RhbmNlLCBzdG9yZW5hbWUsICdyZWFkd3JpdGUnKTtcblxuICAgICAgICBhd2FpdCB0eC5vYmplY3RTdG9yZShzdG9yZW5hbWUpLmRlbGV0ZShpZCk7XG5cbiAgICAgICAgcmV0dXJuIGBSZWNvcmQgd2l0aCBpZDogJHtpZH0gZGVsZXRlZGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRUcmFuc2FjdGlvbihkYkluc3RhbmNlOiBEQiwgc3ROYW1lOiBzdHJpbmcsIG1vZGU/OiAncmVhZG9ubHknIHwgJ3JlYWR3cml0ZScpIHtcbiAgICAgICAgY29uc3QgdHggPSBkYkluc3RhbmNlLnRyYW5zYWN0aW9uKHN0TmFtZSwgbW9kZSk7XG4gICAgICAgIHR4LmNvbXBsZXRlLmNhdGNoKFxuICAgICAgICAgICAgZXJyID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygoZXJyIGFzIEVycm9yKS5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0eDtcbiAgICB9XG5cbiAgICAvLyBDdXJyZW50bHkgZG9uJ3Qgc3VwcG9ydCBhZ2dyZWdhdGUga2V5c1xuICAgIHByaXZhdGUgY2hlY2tGb3JLZXlQYXRoKG9iamVjdFN0b3JlOiBPYmplY3RTdG9yZTxhbnksIGFueT4sIGRhdGE6IGFueSkge1xuICAgICAgICBpZiAoIW9iamVjdFN0b3JlLmF1dG9JbmNyZW1lbnQgfHwgIW9iamVjdFN0b3JlLmtleVBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RTdG9yZS5rZXlQYXRoICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBrZXlQYXRoID0gb2JqZWN0U3RvcmUua2V5UGF0aCBhcyBzdHJpbmc7XG5cbiAgICAgICAgaWYgKCFkYXRhW2tleVBhdGhdKSB7XG4gICAgICAgICAgICBkZWxldGUgZGF0YVtrZXlQYXRoXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHVwZ3JhZGVEYXRhYmFzZSh1cGdyYWRlREI6IFVwZ3JhZGVEQiwgZGJTdG9yZTogSURiU3RvcmUpIHtcbiAgICAgICAgaWYgKHVwZ3JhZGVEQi5vbGRWZXJzaW9uIDwgZGJTdG9yZS52ZXJzaW9uKSB7XG4gICAgICAgICAgICBpZiAoZGJTdG9yZS5zdG9yZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBzdG9yZSBvZiBkYlN0b3JlLnN0b3Jlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXVwZ3JhZGVEQi5vYmplY3RTdG9yZU5hbWVzLmNvbnRhaW5zKHN0b3JlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJpbWFyeUtleSA9IHN0b3JlLnByaW1hcnlLZXk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcHJpbWFyeUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW1hcnlLZXkgPSB7IG5hbWU6ICdpZCcsIGtleVBhdGg6ICdpZCcsIGF1dG86IHRydWUgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3U3RvcmUgPSB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoc3RvcmUubmFtZSwgeyBrZXlQYXRoOiBwcmltYXJ5S2V5Lm5hbWUsIGF1dG9JbmNyZW1lbnQ6IHByaW1hcnlLZXkuYXV0byB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggb2Ygc3RvcmUuaW5kZXhlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1N0b3JlLmNyZWF0ZUluZGV4KGluZGV4Lm5hbWUsIGluZGV4LmtleVBhdGgsIHsgdW5pcXVlOiBpbmRleC51bmlxdWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gdG9BcnJheShhcnIpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJyKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpO1xuICAgICAgfTtcblxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncykge1xuICAgIHZhciByZXF1ZXN0O1xuICAgIHZhciBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZXF1ZXN0ID0gb2JqW21ldGhvZF0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgIH0pO1xuXG4gICAgcC5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICByZXR1cm4gcDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb21pc2lmeUN1cnNvclJlcXVlc3RDYWxsKG9iaiwgbWV0aG9kLCBhcmdzKSB7XG4gICAgdmFyIHAgPSBwcm9taXNpZnlSZXF1ZXN0Q2FsbChvYmosIG1ldGhvZCwgYXJncyk7XG4gICAgcmV0dXJuIHAudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgcmV0dXJuIG5ldyBDdXJzb3IodmFsdWUsIHAucmVxdWVzdCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eVByb3BlcnRpZXMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgcHJvcGVydGllcykge1xuICAgIHByb3BlcnRpZXMuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUHJveHlDbGFzcy5wcm90b3R5cGUsIHByb3AsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICB0aGlzW3RhcmdldFByb3BdW3Byb3BdID0gdmFsO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5UmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcm94eU1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpc1t0YXJnZXRQcm9wXVtwcm9wXS5hcHBseSh0aGlzW3RhcmdldFByb3BdLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHByb3h5Q3Vyc29yUmVxdWVzdE1ldGhvZHMoUHJveHlDbGFzcywgdGFyZ2V0UHJvcCwgQ29uc3RydWN0b3IsIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgaWYgKCEocHJvcCBpbiBDb25zdHJ1Y3Rvci5wcm90b3R5cGUpKSByZXR1cm47XG4gICAgICBQcm94eUNsYXNzLnByb3RvdHlwZVtwcm9wXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5Q3Vyc29yUmVxdWVzdENhbGwodGhpc1t0YXJnZXRQcm9wXSwgcHJvcCwgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBJbmRleChpbmRleCkge1xuICAgIHRoaXMuX2luZGV4ID0gaW5kZXg7XG4gIH1cblxuICBwcm94eVByb3BlcnRpZXMoSW5kZXgsICdfaW5kZXgnLCBbXG4gICAgJ25hbWUnLFxuICAgICdrZXlQYXRoJyxcbiAgICAnbXVsdGlFbnRyeScsXG4gICAgJ3VuaXF1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ2dldCcsXG4gICAgJ2dldEtleScsXG4gICAgJ2dldEFsbCcsXG4gICAgJ2dldEFsbEtleXMnLFxuICAgICdjb3VudCdcbiAgXSk7XG5cbiAgcHJveHlDdXJzb3JSZXF1ZXN0TWV0aG9kcyhJbmRleCwgJ19pbmRleCcsIElEQkluZGV4LCBbXG4gICAgJ29wZW5DdXJzb3InLFxuICAgICdvcGVuS2V5Q3Vyc29yJ1xuICBdKTtcblxuICBmdW5jdGlvbiBDdXJzb3IoY3Vyc29yLCByZXF1ZXN0KSB7XG4gICAgdGhpcy5fY3Vyc29yID0gY3Vyc29yO1xuICAgIHRoaXMuX3JlcXVlc3QgPSByZXF1ZXN0O1xuICB9XG5cbiAgcHJveHlQcm9wZXJ0aWVzKEN1cnNvciwgJ19jdXJzb3InLCBbXG4gICAgJ2RpcmVjdGlvbicsXG4gICAgJ2tleScsXG4gICAgJ3ByaW1hcnlLZXknLFxuICAgICd2YWx1ZSdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhDdXJzb3IsICdfY3Vyc29yJywgSURCQ3Vyc29yLCBbXG4gICAgJ3VwZGF0ZScsXG4gICAgJ2RlbGV0ZSdcbiAgXSk7XG5cbiAgLy8gcHJveHkgJ25leHQnIG1ldGhvZHNcbiAgWydhZHZhbmNlJywgJ2NvbnRpbnVlJywgJ2NvbnRpbnVlUHJpbWFyeUtleSddLmZvckVhY2goZnVuY3Rpb24obWV0aG9kTmFtZSkge1xuICAgIGlmICghKG1ldGhvZE5hbWUgaW4gSURCQ3Vyc29yLnByb3RvdHlwZSkpIHJldHVybjtcbiAgICBDdXJzb3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY3Vyc29yID0gdGhpcztcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGN1cnNvci5fY3Vyc29yW21ldGhvZE5hbWVdLmFwcGx5KGN1cnNvci5fY3Vyc29yLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2lmeVJlcXVlc3QoY3Vyc29yLl9yZXF1ZXN0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgIHJldHVybiBuZXcgQ3Vyc29yKHZhbHVlLCBjdXJzb3IuX3JlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIE9iamVjdFN0b3JlKHN0b3JlKSB7XG4gICAgdGhpcy5fc3RvcmUgPSBzdG9yZTtcbiAgfVxuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5jcmVhdGVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuY3JlYXRlSW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIE9iamVjdFN0b3JlLnByb3RvdHlwZS5pbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgSW5kZXgodGhpcy5fc3RvcmUuaW5kZXguYXBwbHkodGhpcy5fc3RvcmUsIGFyZ3VtZW50cykpO1xuICB9O1xuXG4gIHByb3h5UHJvcGVydGllcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIFtcbiAgICAnbmFtZScsXG4gICAgJ2tleVBhdGgnLFxuICAgICdpbmRleE5hbWVzJyxcbiAgICAnYXV0b0luY3JlbWVudCdcbiAgXSk7XG5cbiAgcHJveHlSZXF1ZXN0TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ3B1dCcsXG4gICAgJ2FkZCcsXG4gICAgJ2RlbGV0ZScsXG4gICAgJ2NsZWFyJyxcbiAgICAnZ2V0JyxcbiAgICAnZ2V0QWxsJyxcbiAgICAnZ2V0S2V5JyxcbiAgICAnZ2V0QWxsS2V5cycsXG4gICAgJ2NvdW50J1xuICBdKTtcblxuICBwcm94eUN1cnNvclJlcXVlc3RNZXRob2RzKE9iamVjdFN0b3JlLCAnX3N0b3JlJywgSURCT2JqZWN0U3RvcmUsIFtcbiAgICAnb3BlbkN1cnNvcicsXG4gICAgJ29wZW5LZXlDdXJzb3InXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhPYmplY3RTdG9yZSwgJ19zdG9yZScsIElEQk9iamVjdFN0b3JlLCBbXG4gICAgJ2RlbGV0ZUluZGV4J1xuICBdKTtcblxuICBmdW5jdGlvbiBUcmFuc2FjdGlvbihpZGJUcmFuc2FjdGlvbikge1xuICAgIHRoaXMuX3R4ID0gaWRiVHJhbnNhY3Rpb247XG4gICAgdGhpcy5jb21wbGV0ZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25jb21wbGV0ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9O1xuICAgICAgaWRiVHJhbnNhY3Rpb24ub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QoaWRiVHJhbnNhY3Rpb24uZXJyb3IpO1xuICAgICAgfTtcbiAgICAgIGlkYlRyYW5zYWN0aW9uLm9uYWJvcnQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KGlkYlRyYW5zYWN0aW9uLmVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBUcmFuc2FjdGlvbi5wcm90b3R5cGUub2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX3R4Lm9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX3R4LCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVHJhbnNhY3Rpb24sICdfdHgnLCBbXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnLFxuICAgICdtb2RlJ1xuICBdKTtcblxuICBwcm94eU1ldGhvZHMoVHJhbnNhY3Rpb24sICdfdHgnLCBJREJUcmFuc2FjdGlvbiwgW1xuICAgICdhYm9ydCdcbiAgXSk7XG5cbiAgZnVuY3Rpb24gVXBncmFkZURCKGRiLCBvbGRWZXJzaW9uLCB0cmFuc2FjdGlvbikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gICAgdGhpcy5vbGRWZXJzaW9uID0gb2xkVmVyc2lvbjtcbiAgICB0aGlzLnRyYW5zYWN0aW9uID0gbmV3IFRyYW5zYWN0aW9uKHRyYW5zYWN0aW9uKTtcbiAgfVxuXG4gIFVwZ3JhZGVEQi5wcm90b3R5cGUuY3JlYXRlT2JqZWN0U3RvcmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFN0b3JlKHRoaXMuX2RiLmNyZWF0ZU9iamVjdFN0b3JlLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoVXBncmFkZURCLCAnX2RiJywgW1xuICAgICduYW1lJyxcbiAgICAndmVyc2lvbicsXG4gICAgJ29iamVjdFN0b3JlTmFtZXMnXG4gIF0pO1xuXG4gIHByb3h5TWV0aG9kcyhVcGdyYWRlREIsICdfZGInLCBJREJEYXRhYmFzZSwgW1xuICAgICdkZWxldGVPYmplY3RTdG9yZScsXG4gICAgJ2Nsb3NlJ1xuICBdKTtcblxuICBmdW5jdGlvbiBEQihkYikge1xuICAgIHRoaXMuX2RiID0gZGI7XG4gIH1cblxuICBEQi5wcm90b3R5cGUudHJhbnNhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zYWN0aW9uKHRoaXMuX2RiLnRyYW5zYWN0aW9uLmFwcGx5KHRoaXMuX2RiLCBhcmd1bWVudHMpKTtcbiAgfTtcblxuICBwcm94eVByb3BlcnRpZXMoREIsICdfZGInLCBbXG4gICAgJ25hbWUnLFxuICAgICd2ZXJzaW9uJyxcbiAgICAnb2JqZWN0U3RvcmVOYW1lcydcbiAgXSk7XG5cbiAgcHJveHlNZXRob2RzKERCLCAnX2RiJywgSURCRGF0YWJhc2UsIFtcbiAgICAnY2xvc2UnXG4gIF0pO1xuXG4gIC8vIEFkZCBjdXJzb3IgaXRlcmF0b3JzXG4gIC8vIFRPRE86IHJlbW92ZSB0aGlzIG9uY2UgYnJvd3NlcnMgZG8gdGhlIHJpZ2h0IHRoaW5nIHdpdGggcHJvbWlzZXNcbiAgWydvcGVuQ3Vyc29yJywgJ29wZW5LZXlDdXJzb3InXS5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmNOYW1lKSB7XG4gICAgW09iamVjdFN0b3JlLCBJbmRleF0uZm9yRWFjaChmdW5jdGlvbihDb25zdHJ1Y3Rvcikge1xuICAgICAgLy8gRG9uJ3QgY3JlYXRlIGl0ZXJhdGVLZXlDdXJzb3IgaWYgb3BlbktleUN1cnNvciBkb2Vzbid0IGV4aXN0LlxuICAgICAgaWYgKCEoZnVuY05hbWUgaW4gQ29uc3RydWN0b3IucHJvdG90eXBlKSkgcmV0dXJuO1xuXG4gICAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGVbZnVuY05hbWUucmVwbGFjZSgnb3BlbicsICdpdGVyYXRlJyldID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBuYXRpdmVPYmplY3QgPSB0aGlzLl9zdG9yZSB8fCB0aGlzLl9pbmRleDtcbiAgICAgICAgdmFyIHJlcXVlc3QgPSBuYXRpdmVPYmplY3RbZnVuY05hbWVdLmFwcGx5KG5hdGl2ZU9iamVjdCwgYXJncy5zbGljZSgwLCAtMSkpO1xuICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNhbGxiYWNrKHJlcXVlc3QucmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHBvbHlmaWxsIGdldEFsbFxuICBbSW5kZXgsIE9iamVjdFN0b3JlXS5mb3JFYWNoKGZ1bmN0aW9uKENvbnN0cnVjdG9yKSB7XG4gICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRBbGwpIHJldHVybjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0QWxsID0gZnVuY3Rpb24ocXVlcnksIGNvdW50KSB7XG4gICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgdmFyIGl0ZW1zID0gW107XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgIGluc3RhbmNlLml0ZXJhdGVDdXJzb3IocXVlcnksIGZ1bmN0aW9uKGN1cnNvcikge1xuICAgICAgICAgIGlmICghY3Vyc29yKSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXRlbXMucHVzaChjdXJzb3IudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKGNvdW50ICE9PSB1bmRlZmluZWQgJiYgaXRlbXMubGVuZ3RoID09IGNvdW50KSB7XG4gICAgICAgICAgICByZXNvbHZlKGl0ZW1zKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfSk7XG5cbiAgdmFyIGV4cCA9IHtcbiAgICBvcGVuOiBmdW5jdGlvbihuYW1lLCB2ZXJzaW9uLCB1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgIHZhciBwID0gcHJvbWlzaWZ5UmVxdWVzdENhbGwoaW5kZXhlZERCLCAnb3BlbicsIFtuYW1lLCB2ZXJzaW9uXSk7XG4gICAgICB2YXIgcmVxdWVzdCA9IHAucmVxdWVzdDtcblxuICAgICAgaWYgKHJlcXVlc3QpIHtcbiAgICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmICh1cGdyYWRlQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIHVwZ3JhZGVDYWxsYmFjayhuZXcgVXBncmFkZURCKHJlcXVlc3QucmVzdWx0LCBldmVudC5vbGRWZXJzaW9uLCByZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcC50aGVuKGZ1bmN0aW9uKGRiKSB7XG4gICAgICAgIHJldHVybiBuZXcgREIoZGIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0Q2FsbChpbmRleGVkREIsICdkZWxldGVEYXRhYmFzZScsIFtuYW1lXSk7XG4gICAgfVxuICB9O1xuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZXhwO1xuICAgIG1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBtb2R1bGUuZXhwb3J0cztcbiAgfVxuICBlbHNlIHtcbiAgICBzZWxmLmlkYiA9IGV4cDtcbiAgfVxufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=