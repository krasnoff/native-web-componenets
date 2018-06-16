class PopUpInfo extends HTMLElement {
    constructor() {
    // Always call super first in constructor
    super();
  
      // Create a shadow root
    var shadow = this.attachShadow({mode: 'open'});

    // Create spans
    var wrapper = document.createElement('span');
    wrapper.setAttribute('class','wrapper');
    var icon = document.createElement('span');
    icon.setAttribute('class','icon');
    icon.setAttribute('tabindex', 0);
    var info = document.createElement('span');
    info.setAttribute('class','info');

    // Take attribute content and put it inside the info span
    var text = this.getAttribute('text');
    info.textContent = text;

    // Insert icon
    var imgUrl;
    if(this.hasAttribute('img')) {
        imgUrl = this.getAttribute('img');
    } else {
        imgUrl = 'img/default.png';
    }
    var img = document.createElement('img');
    img.src = imgUrl;
    icon.appendChild(img);

    // Create some CSS to apply to the shadow dom
    var style = document.createElement('style');
    console.log(style.isConnected);

    style.textContent = '.wrapper {' +
                        'position: relative;' +
                        '}' +

                        '.info {' +
                            'font-size: 0.8rem;' +
                            'width: 200px;' +
                            'display: inline-block;' +
                            'border: 1px solid black;' +
                            'padding: 10px;' +
                            'background: white;' +
                            'border-radius: 10px;' +
                            'opacity: 0;' +
                            'transition: 0.6s all;' +
                           'position: absolute;' +
                            'bottom: 20px;' +
                            'left: 10px;' +
                            'z-index: 3;' +
                        '}' +

                        'img {' +
                            'width: 1.2rem' +
                        '}' +

                        '.icon:hover + .info, .icon:focus + .info {' +
                            'opacity: 1;' +
                        '}';

    // attach the created elements to the shadow dom

    shadow.appendChild(style);
    console.log(style.isConnected);
    shadow.appendChild(wrapper);
    wrapper.appendChild(icon);
    wrapper.appendChild(info);
    }
  }

  // Define the new element
  customElements.define('popup-info', PopUpInfo);

// Create a class for the element
class ExpandingList extends HTMLUListElement {
    constructor() {
        // Always call super first in constructor
        super();

        window.onload = function() {
            var uls = document.querySelectorAll(':root ul');
            var lis = document.querySelectorAll(':root li');

            for (var i = 0; i < uls.length; i++) {
                if (i > 0) {
                    uls[i].style.display = 'none';
                }
            }

            for (var j = 0; j < lis.length; j++) {
                var childText = lis[j].childNodes[0];
                var newSpan = document.createElement('span');

                newSpan.textContent = childText.textContent;
                childText.parentNode.insertBefore(newSpan, childText);
                childText.parentNode.removeChild(childText);
            }

            var spans = document.querySelectorAll(':root span');

            for (var k = 0; k < spans.length; k++) {
                if (spans[k].nextElementSibling) {
                    spans[k].style.cursor = 'pointer';
                    spans[k].parentNode.setAttribute('class', 'closed');
                    spans[k].onclick = showul;
                }
            }

            function showul(e) {
                var nextul = e.target.nextElementSibling;
                if (nextul.style.display == 'block') {
                    nextul.style.display = 'none';
                    nextul.parentNode.setAttribute('class', 'closed');
                 } else {
                    nextul.style.display = 'block';
                    nextul.parentNode.setAttribute('class', 'open');
                }
            }
        };
    }
}

// Define the new element
customElements.define('expanding-list', ExpandingList, { extends: 'ul' });