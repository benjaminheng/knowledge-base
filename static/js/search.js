window.addEventListener("DOMContentLoaded", function(event) {
  console.log('domcontentloaded');

  var is_initialized = false; // Will be set to true once search index is initialized.
  let index = null;

  search_form = document.getElementById("search-form");
  search_input = document.getElementById("search-input");

	search_form.addEventListener('focusin', function(e) {
		search_init(); // try to load the search index
	});

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
            }
          });

          // Search as each character is typed
					search_input.addEventListener('keyup', function(e) {
						search(this.value);
					});
				});
      }).catch((error) => {
        console.log("initialization error: " + error);
      });
		}
	}

  function search(term) {
    if (index === null) {
      return
    }
    let results = index.search(term);
    // TODO: show results
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
