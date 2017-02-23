// Simple demo of Ajax loading. A primitive but classic technique: write to the
// innerHTML property of the target element.

function handleDOMContentLoaded() {
  const contentHolder = document.getElementById("content");
  const contentNavButtons = document.getElementsByClassName("js-nav-button");

  // not all browsers support NodeList.forEach, so "borrow" the one from Array
  Array.prototype.forEach.call(contentNavButtons, button => {
    button.addEventListener("click", event => {
      loadContent({
        source: button.dataset.source,
        target: contentHolder
      });
    });
  });
}

function loadContent(options) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", options.source);

  xhr.addEventListener("load", event => {
    if (event.target.status == 200) {
      const htmlText = event.target.responseText;
      options.target.innerHTML = htmlText;
    } else if (event.target.status == 404) {
      options.target.innerHTML = "<p>The desired content was not found.</p>";
    }
  });

  xhr.addEventListener("error", event => {
    options.target.innerHTML = "<p>There was an error loading this content.</p>";
    console.log(`Error loading ${options.source}: ${event}`); // might provide better data
  });

  xhr.send();
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
