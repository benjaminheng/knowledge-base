window.addEventListener("DOMContentLoaded", function(event) {
  console.log('domcontentloaded');

  var is_initialized = false; // Will be set to true once search index is initialized.
  let index = null;
  let lookup = {}; // Map of permalink -> document

  search_form = document.getElementById("search-form");
  search_input = document.getElementById("search-input");
  search_results= document.getElementById("search-results");

	search_form.addEventListener('focusin', function(e) {
		search_init(); // try to load the search index
	});

	document.addEventListener('keydown', function(e) {
    // `CTRL + /` or `CTRL + K` will toggle the search flow
		if (e.ctrlKey && (e.which === 191 || e.which === 75)) {
			search_toggle_visibility(); // toggle visibility of search box
		}

		// `ESC` closes the search box
		if (e.keyCode == 27 && search_form.style.visibility === "visible") {
				search_toggle_visibility();
		}
	});

	function search_toggle_visibility() {
    if (search_form.style.visibility === "hidden") {
      search_form.style.visibility = "visible";
      search_input.value = "";
      search_input.focus()
    } else {
      search_form.style.visibility = "hidden";
      search_input.blur()
    }
	}

	function search_init() {
    // Init only once
		if (!is_initialized) {
			load_script(window.location.origin + '/js/lunr.js').then(() => {
				search_input.value = "";
				is_initialized = true;
				fetch_JSON('/index.json', function(data){

          // Build Lunr index
          index = lunr(function() {
            this.ref("permalink");

            // If you added more searchable fields to the search index, list them here.
            this.field("title");
            this.field("content");

            for (var doc of data) {
              this.add(doc);
              lookup[doc.permalink] = doc;
            }
          });

          // Search as each character is typed
					search_input.addEventListener('keyup', function(e) {
						search_term(this.value);
					});
				});
      }).catch((error) => {
        console.log("initialization error: " + error);
      });
		}
	}

  function search_term(term) {
    if (index === null) {
      return
    }

    if (term === "") {
      search_results.innerHTML = "";
      return
    }

    let results = index.search(term);
    console.log("results =", results);
    let top5 = results.slice(0, 5);
    let innerHTML = "";
    for (let idx in top5) {
      let doc = lookup[top5[idx].ref]
      // TODO: add section hierarchy
      let item = `
      <div class="result">
        <a href="${doc.permalink}">
          <span class="title">${doc.title}</span>
        </a>
      </div>
      `;
      innerHTML = innerHTML + item;
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
