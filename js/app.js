/* ===================== APP INIT ===================== */
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('cop-select').addEventListener('change', function(){
    document.getElementById('cw-section').style.display = this.value==='misto'?'block':'none';
  });
});

window.addEventListener('load', function() {
  document.addEventListener('keydown', function(e) {
    if(e.key==='/' && document.activeElement !== document.getElementById('search-input')) {
      e.preventDefault();
      document.getElementById('search-input').focus();
    }
  });
});
