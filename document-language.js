/* Keep explicit and manual language choices while visiting information pages. */
(function () {
  var languageLinks = document.querySelectorAll('nav a[lang]');
  function current() {
    var hash = location.hash.slice(1);
    return WordGardenLanguage.resolve({
      query: /^(zh|en|nl|es)$/i.test(hash) ? hash : new URLSearchParams(location.search).get('lang'),
      saved: WordGardenLanguage.readSaved(),
      language: navigator.language
    });
  }
  function updateHome(language) {
    document.querySelectorAll('a.doc-brand, nav a[href^="./"]').forEach(function (link) {
      link.href = './?lang=' + language;
    });
  }
  updateHome(current());
  languageLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var language = WordGardenLanguage.resolve({query: link.getAttribute('lang')});
      WordGardenLanguage.remember(language);
      updateHome(language);
    });
  });
  window.addEventListener('hashchange', function () { updateHome(current()); });
})();
