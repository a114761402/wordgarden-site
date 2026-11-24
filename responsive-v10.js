(function () {
  var tabs=Array.from(document.querySelectorAll('.device-tabs [role="tab"]'));
  function select(tab,focus) { tabs.forEach(function(t){var active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});if(focus)tab.focus(); }
  tabs.forEach(function(tab,i){ tab.addEventListener('click',function(){select(tab,false);});tab.addEventListener('keydown',function(e){var n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!=null){e.preventDefault();select(tabs[n],true);}}); });
})();
