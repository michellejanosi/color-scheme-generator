/* Requirements:
  * Choose "seed color" with input type of color.
  * Choose color scheme mode in a select box.
  * Clicking button makes a request to color api (https://www.thecolorapi.com/docs#schemes) to get a color scheme.
  * Display scheme colors and hex values on the page.
  * Click hex values to copy to clipboard.
*/

const form = document.querySelector('.input-group');
let colorsArr = [];

function renderColors() {
  let colorsHtml = '';
  let hexValuesHtml = '';

  for (let color of colorsArr) {
    colorsHtml += `
      <div class="color"><img src="${color.image.bare}"></div>`;

    hexValuesHtml += `
      <div class="hex-value">${color.hex.value}</div>`;
  }

  const colors = document.querySelector('.colors');
  const hexValues = document.querySelector('.hex-values');
  colors.innerHTML = colorsHtml;
  hexValues.innerHTML = hexValuesHtml;
}

function getScheme(hex='F15025', mode='monochrome') {
  fetch(`https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}&count=5`)
    .then((response) => response.json())
    .then((data) => {
      colorsArr = data.colors;
      renderColors();
    });
}

getScheme();

form.addEventListener('submit', e => {
  e.preventDefault()
  const colorPicked = document.getElementById('color').value.substring(1);
  const colorScheme = document.getElementById('color-type').value
  const data = {
    color: colorPicked,
    scheme: colorScheme
  }

  getScheme(data.color, data.scheme);
})
