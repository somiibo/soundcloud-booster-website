var Global = module.exports = {
  properties: {},
  set: function(path, value) {
    // Global.properties[path] = value;
    set(Global.properties, path, value)
  },
  get: function(path, def) {
    // return Global.properties[path] || def;
    return get(Global.properties, path, def)
  }
}


var get = function(obj, path, def) {
  var fullPath = (path || '')
    .replace(/\[/g, '.')
    .replace(/]/g, '')
    .split('.')
    .filter(Boolean);

  return fullPath.every(everyFunc) ? obj : def;

  function everyFunc(step) {
    // return !(step && (obj = obj[step]) === undefined);
    // console.log(' CHECK > ', !(step && (obj = obj[step]) === undefined));
    // console.log('step', step, 'obj', obj, 'objstep', obj[step]);
    // return !(step && (obj = obj[step]) === undefined);
    return !(step && (obj = obj[step]) === undefined);
  }
}

/* https://stackoverflow.com/questions/54733539/javascript-implementation-of-lodash-set-method */
var set = function(obj, path, value) {
  if (Object(obj) !== obj) {
    return obj;
  }; // When obj is not an object

  var p = (path || '').split("."); // Get the keys from the path

  p.slice(0, -1).reduce(function (a, c, i) {
    return (// Iterate all of them except the last one
      Object(a[c]) === a[c] // Does the key exist and is its value an object?
      // Yes: then follow that path
      ? a[c] // No: create the key. Is the next key a potential array-index?
      : a[c] = Math.abs(p[i + 1]) >> 0 === +p[i + 1] ? [] // Yes: assign a new array object
      : {}
    );
  }, // No: assign a new plain object
  obj)[p.pop()] = value; // Finally assign the value to the last key

  return obj; // Return the top-level object to allow chaining
}

// var Global = module.exports = {
//   // count: 1,
//   properties: {},
//   set: function(path, value) {
//     if (Object(Global.properties) !== Global.properties) {
//       return Global.properties;
//     }; // When obj is not an object
//
//     var p = (path || '').split("."); // Get the keys from the path
//
//     p.slice(0, -1).reduce(function (a, c, i) {
//       return (// Iterate all of them except the last one
//         Object(a[c]) === a[c] // Does the key exist and is its value an object?
//         // Yes: then follow that path
//         ? a[c] // No: create the key. Is the next key a potential array-index?
//         : a[c] = Math.abs(p[i + 1]) >> 0 === +p[i + 1] ? [] // Yes: assign a new array object
//         : {}
//       );
//     }, // No: assign a new plain object
//     Global.properties)[p.pop()] = value; // Finally assign the value to the last key
//
//     return Global.properties; // Return the top-level object to allow chaining
//   },
//   get: function(path, def) {
//     var fullPath = (path || '')
//       .replace(/\[/g, '.')
//       .replace(/]/g, '')
//       .split('.')
//       .filter(Boolean);
//
//     return fullPath.every(everyFunc) ? Global.properties : def;
//
//     function everyFunc(step) {
//       return !(step && (Global.properties = (Global.properties || {})[step]) === undefined);
//     }
//   },
//   remove: function(name, value) {
//     // Global.count += 1;
//   }
// }
