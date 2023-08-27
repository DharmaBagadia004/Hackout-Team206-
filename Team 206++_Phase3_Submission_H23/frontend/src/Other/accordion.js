const accordions = document.querySelectorAll('.accordion');

accordions.forEach(accordion => {
  accordion.addEventListener('click', function() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      // calculate the height of the panel with the added padding
      panel.style.maxHeight = panel.scrollHeight + panel.clientHeight + 'px';
    }
  });

  const arrow = accordion.querySelector('.arrow');
  arrow.addEventListener('click', function(e) {
    e.stopPropagation();
    const accordion = this.parentElement;
    accordion.classList.toggle('active');
    const panel = accordion.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      // calculate the height of the panel with the added padding
      panel.style.maxHeight = panel.scrollHeight + panel.clientHeight + 'px';
    }
  });
  
  const panel = accordion.nextElementSibling;
  panel.style.maxHeight = null;
});


















