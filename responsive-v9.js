(function () {
  var mobile = matchMedia('(max-width: 700px)');
  var toggle = document.querySelector('.language-toggle');
  function closeLanguages() { toggle.setAttribute('aria-expanded','false'); document.querySelector('nav').classList.remove('lang-expanded'); }
  toggle.addEventListener('click', function () { var open=toggle.getAttribute('aria-expanded')!=='true'; toggle.setAttribute('aria-expanded',String(open)); document.querySelector('nav').classList.toggle('lang-expanded',open); });
  document.querySelectorAll('.lang button').forEach(function(b){ b.addEventListener('click',function(){var open=toggle.getAttribute('aria-expanded')==='true';closeLanguages();if(open)toggle.focus();}); });
  document.addEventListener('keydown',function(e){if(e.key==='Escape' && toggle.getAttribute('aria-expanded')==='true'){closeLanguages();toggle.focus();}});
  var tabs=Array.from(document.querySelectorAll('.device-tabs [role="tab"]'));
  function select(tab,focus) { tabs.forEach(function(t){var active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});if(focus)tab.focus(); }
  tabs.forEach(function(tab,i){ tab.addEventListener('click',function(){select(tab,false);});tab.addEventListener('keydown',function(e){var n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!=null){e.preventDefault();select(tabs[n],true);}}); });
  var folds=Array.from(document.querySelectorAll('.feature-fold'));
  folds.forEach(function(f){var feature=f.querySelector('.feature');function sync(){f.hidden=feature.hidden;}sync();new MutationObserver(sync).observe(feature,{attributes:true,attributeFilter:['hidden']});});
  function adapt() { closeLanguages();folds.forEach(function(f,i){f.open=!mobile.matches||i===0;}); }
  adapt();mobile.addEventListener('change',adapt);
})();
