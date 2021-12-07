window.addEventListener("DOMContentLoaded", function(event) {
  let index = window.search_index;
  let currentQuery = null;

  search_form = document.getElementById("search-form");
  search_input = document.getElementById("search-input");
  search_results = document.getElementById("search-results");

	document.addEventListener('keydown', function(e) {
    // `CTRL + /` or `CTRL + K` will toggle the search flow
		if (e.ctrlKey && (e.which === 191 || e.which === 75)) {
			search_toggle_visibility(); // toggle visibility of search box
		}

		// `ESC` closes the search box
		if (e.keyCode == 27 && search_form.style.display === "block") {
				search_toggle_visibility();
		}

    // DOWN (40) or UP (38) arrow
    if (e.keyCode == 40 || e.keyCode == 38) {
      if (document.activeElement == search_input) {
        e.preventDefault();
        let activeResult = document.querySelector("#search-results > .result.active");
        if (activeResult != null) {

          let nextResult = null;
          if (e.keyCode == 40) {
            nextResult = activeResult.previousElementSibling;
          } else if (e.keyCode == 38) {
            nextResult = activeResult.nextElementSibling;
          }

          if (nextResult != null) {
            activeResult.classList.remove("active");
            nextResult.classList.add("active");

            // Determine if element is not visible
            let search_results_div = document.querySelector("#search-results");

            if (e.keyCode == 38) { // up
              let topBoundary = search_results_div.getBoundingClientRect().top;
              if (nextResult.getBoundingClientRect().top < topBoundary) {
                nextResult.scrollIntoView({behavior: "auto", block: "nearest", inline: "start"});
              }
            } else if (e.keyCode == 40) { // down
              let bottomBoundary = search_results_div.getBoundingClientRect().bottom;
              if (nextResult.getBoundingClientRect().bottom > bottomBoundary) {
                nextResult.scrollIntoView({behavior: "auto", block: "nearest", inline: "start"});
              }
            }
          }
        }
      }
    }

    // Use Enter (13) to move to the first result
    if (e.keyCode == 13) {
      if (document.activeElement == search_input) {
        e.preventDefault();
        let activeResult = document.querySelector("#search-results > .result.active > a");
        if (activeResult != null) {
          activeResult.click();
        }
      }
		}
	});

  // Close search box when user clicks outside the form. The form must has
  // `tabindex="0"` set for it to be an eligible `e.relatedTarget`.
  search_form.addEventListener('focusout', function(e) {
    if (e.relatedTarget === null || !search_form.contains(e.relatedTarget)) {
      search_toggle_visibility();
    }
  });

  search_input.addEventListener('keyup', function(e) {
    if (this.value == currentQuery) {
      return;
    }
    currentQuery = this.value;
    search_term(this.value);
  });

  function reset_active_search_result() {
    let activeResult = document.querySelector("#search-results > .result.active");
    let firstResult = document.querySelector("#search-results").firstElementChild;
    if (firstResult == activeResult) {
      return
    }
    if (activeResult != null) {
      activeResult.classList.remove("active");
    }
    if (firstResult != null) {
      firstResult.classList.add("active");
      firstResult.scrollIntoView({behavior: "auto", block: "nearest", inline: "start"});
    }
  }

	function search_toggle_visibility() {
    if (search_form.style.display === "none") {
      search_form.style.display = "block";
      search_input.value = "";
      search_input.focus()
      reset_active_search_result();
    } else {
      search_form.style.display = "none";
      search_input.blur()
    }
	}

  function render_search_result(doc, active=false) {
    let result = `
        <div class="result ${active ? "active" : ""}">
          <span class="gutter"></span><a href="${doc.permalink}"><span class="title">${doc.raw_text}</span></a>
        </div>
        `;
    return result
  }

  function fuzzy_search(query) {
    let results = [];
    // TODO
    for (let i in index) {
      let doc = index[i];

      let raw_text = doc.raw_text.toLowerCase();
      let startIndex = raw_text.indexOf(query.toLowerCase())
      if (startIndex !== -1) {
        results.push({
          "document": doc,
          "highlights": [],
        });
      }
    }
    return results
  }

  function search_term(query) {
    if (index === null) {
      return
    }

    let innerHTML = "";

    if (query === "") {
      for (let i in index) {
      let active = (i == 0);
        let doc = index[i];
        let result = render_search_result(doc, active);
        innerHTML = innerHTML + result;
      }
      search_results.innerHTML = innerHTML;
      return
    }

    // Perform search
    let results = fuzzy_search(query)
    for (let i in results) {
      let active = (i == 0);
      let doc = results[i].document;
      let resultHTML = render_search_result(doc, active);
      innerHTML = innerHTML + resultHTML;
    }

    search_results.innerHTML = innerHTML;
  }

	// Load script based on https://stackoverflow.com/a/55451823
	function load_script(url) {
		return new Promise(function(resolve, reject) {
			let script = document.createElement("script");
			script.onerror = reject;
			script.onload = resolve;
			if (document.currentScript) {
				document.currentScript.parentNode.insertBefore(script, document.currentScript);
			}
			else {
				document.head.appendChild(script)
			}
			script.src = url;
		});
	}

	function fetch_JSON(path, callback) {
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function() {
			if (httpRequest.readyState === 4) {
				if (httpRequest.status === 200) {
					var data = JSON.parse(httpRequest.responseText);
						if (callback) callback(data);
				}
			}
		};
		httpRequest.open('GET', path);
		httpRequest.send();
	}
}, false);
