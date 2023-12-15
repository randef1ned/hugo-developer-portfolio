set_dark = function(isChecked) {
  // if (localStorage.hasOwnProperty('dark'))
  const theme = isChecked ? "dark" : "light";
  localStorage.setItem('dark', isChecked);
  const text_color = ['text-black', 'text-white'];
  document.documentElement.dataset.mdbTheme = theme;
  // cv is an exception
  var cv = document.getElementById('cv');
  if (cv != null) {
    cv.classList.remove(text_color[1-Number(isChecked)]);
    cv.classList.add(text_color[Number(isChecked)]);
  }
  var reverse_image = document.getElementsByClassName('dark-rev');
  if (reverse_image.length) {
    for (var i = 0; i < reverse_image.length; i++) {
      if (isChecked) {
        reverse_image[i].classList.add('dark-img');
      } else {
        reverse_image[i].classList.remove('dark-img');
      }
    }
  }
};
window.addEventListener('DOMContentLoaded', () => {
  // keep dark mode
  if (localStorage.getItem('dark') == 'true') {
    set_dark(true);
    document.getElementById('themingSwitcher').click();
  }
  
  const themeStitcher = document.getElementById("themingSwitcher");
  const isSystemThemeSetToDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  // set toggler position based on system theme
  if (isSystemThemeSetToDark) {
    themeStitcher.checked = true;
  }
  
  // add listener to theme toggler
  themeStitcher.addEventListener("change", (e) => {
    toggleTheme(e.target.checked);
  });
  
  const toggleTheme = (isChecked) => {
    set_dark(isChecked);
  }
  
  // add listener to toggle theme with Shift + D
  document.addEventListener("keydown", (e) => {
    if (e.shiftKey && e.key === "D") {
      themeStitcher.checked = !themeStitcher.checked;
      toggleTheme(themeStitcher.checked);
    }
  });
  
  // render tables
  for (var table of document.getElementsByTagName('table')) {
    table.classList = 'table table-striped table-hover'; 
  };
  for (var th of document.getElementsByTagName('th')) {
    th.setAttribute('scope', 'col');
  };
  for (var thead of document.getElementsByTagName('th')) {
    thead.classList = 'table-dark'; 
  };
  for (var tbody of document.getElementsByTagName('tbody')) {
    tbody.classList = 'table-group-divider table-divider-color';
  };
  
  // render lightbox
  window.ViewImage && ViewImage.init('.large a');
});
