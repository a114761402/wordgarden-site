/* Shared language resolver: explicit URL, manual choice, then system language. */
(function (root) {
  'use strict';
  var supported = ['zh', 'en', 'nl', 'es'];
  function match(value) {
    if (typeof value !== 'string') return null;
    var base = value.trim().toLowerCase().split(/[-_]/)[0];
    return supported.indexOf(base) >= 0 ? base : null;
  }
  root.WordGardenLanguage = {
    resolve: function (options) {
      return match(options.query) || match(options.saved) || match(options.language) || 'en';
    },
    readSaved: function () {
      try { return root.localStorage.getItem('wg.site.lang'); } catch (e) { return null; }
    },
    remember: function (language) {
      var value = match(language);
      if (!value) return;
      try { root.localStorage.setItem('wg.site.lang', value); } catch (e) {}
    }
  };
})(globalThis);
