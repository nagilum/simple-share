/**
 * @file
 * A rediculously simple URL sharing plugin with next to no install.
 */

'use strict';

(function () {
  var availableNetworks = {
    'facebook': {
      title: 'Facebook',
      shareURL: '',
      iconURL: ''
    },
    'twitter': {
      title: 'Twitter',
      shareURL: '',
      iconURL: ''
    },
    'reddit': {
      title: 'reddit',
      shareURL: '',
      iconURL: ''
    }
  };

  // Wait for the DOM to load and the trigger the search for elements.
  if (document.addEventListener)
    document.addEventListener('DOMContentLoaded', cycleAndPrepareElements);
  else if (document.attachEvent)
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'complete')
        cycleAndPrepareElements();
    });
  else
    cycleAndPrepareElements();

  /**
   * Find all elements with the 'simple-share' class and apply the share plugin.
   */
  function cycleAndPrepareElements() {
    var elements = document.getElementsByClassName('simple-share');

    for (var i = 0; i < elements.length; i++) {
      var url = '',
          networks = [],
          addIcon = true,
          addText = false;

      for (var j = 0; j < elements[i].attributes.length; j++) {
        switch (elements[i].attributes[j].name) {
          case 'data-url':
            url = elements[i].attributes[j].value;
            break;

          case 'data-networks':
            var tempNetworks = elements[i].attributes[j].value.split(',');

            for (var k = 0; k < tempNetworks.length; k++)
              if (availableNetworks[tempNetworks[k]])
                networks.push(availableNetworks[tempNetworks[k]]);

            break;

          case 'data-no-icons':
            addIcon = false;
            break;

          case 'data-add-text':
            addText = true;
            break;
        }
      }

      // Use the current window's URL if none is given.
      if (url === '' ||
        !url)
        url = window.location.href;

      // Add all available networks if none are given.
      if (networks.length === 0)
        for (var key in availableNetworks)
          networks.push(availableNetworks[key]);

      // Cycle each added network and add an anchor tag with an icon-image
      // inside, ready for sharing via click.
      for (var j = 0; j < networks.length; j++) {
        var anchor = document.createElement('a');

        anchor.setAttribute('href', networks[j].shareURL);
        anchor.setAttribute('title', networks[j].title);
        anchor.setAttribute('class', 'simple-share-button network-' + networks[j].title.toLowerCase());
        anchor.onclick = elementClickHandler;

        if (addText)
          anchor.innerHTML = networks[j].title;

        if (addIcon) {
          var image = document.createElement('img');
          image.setAttribute('src', networks[j].iconURL);
          anchor.appendChild(image);
        }

        elements[i].appendChild(anchor);
      }
    }
  }

  /**
   * Click handler for each share link.
   */
  function elementClickHandler(e) {
    e.preventDefault();
  }
})();
