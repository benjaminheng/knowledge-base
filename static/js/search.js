window.addEventListener("DOMContentLoaded", function(event) {
  console.log('domcontentloaded');

  var is_initialized = false; // Will be set to true once search index is initialized.
  let index = window.search_index;
  let lookup = {}; // Map of permalink -> document

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
	});

  search_input.addEventListener('keyup', function(e) {
    search_term(this.value);
  });

	function search_toggle_visibility() {
    if (search_form.style.display === "none") {
      search_form.style.display = "block";
      search_input.value = "";
      search_input.focus()
    } else {
      search_form.style.display = "none";
      search_input.blur()
    }
	}

  function render_search_result(doc) {
    // TODO: set gutter content during keyboard navigation
    let result = `
        <div class="result">
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
        let doc = index[i];
        let result = render_search_result(doc)
        innerHTML = innerHTML + result;
      }
      search_results.innerHTML = innerHTML
      return
    }

    // Perform search
    let results = fuzzy_search(query)
    for (let i in results) {
      let doc = results[i].document;
      let resultHTML = render_search_result(doc);
      innerHTML = innerHTML + resultHTML;
    }

    search_results.innerHTML = innerHTML
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
