window.addEventListener("DOMContentLoaded", function(event) {
  let index = window.search_index;
  let currentQuery = null;
  let leaderKeyPressedAt = null;
  let leaderKeyTimeoutMS = 200;

  searchForm = document.getElementById("search-form");
  searchInput = document.getElementById("search-input");
  search_results = document.getElementById("search-results");

	document.addEventListener('keydown', function(e) {
    // `CTRL + /` or `CTRL + K` will toggle the search flow
		if (e.ctrlKey && (e.which === 191 || e.which === 75)) {
			toggleSearchFormVisibility(); // toggle visibility of search box
		}

		// `ESC` closes the search box
		if (e.keyCode == 27 && searchForm.style.display === "block") {
      hideSearchForm();
		}

    // Leader key `,` (188)
    if (e.keyCode == 188) {
      leaderKeyPressedAt = (new Date()).getTime();
    }

    // F (70)
    if (e.keyCode == 70) {
      if (leaderKeyPressedAt !== null) {
        let pressedAt = (new Date()).getTime();
        if ((pressedAt-leaderKeyPressedAt) < leaderKeyTimeoutMS) {
          if (showSearchForm()) {
            e.preventDefault()
          }
        }
      }
    }

    // DOWN (40) or UP (38) arrow
    if (e.keyCode == 40 || e.keyCode == 38) {
      if (document.activeElement == searchInput) {
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
      if (document.activeElement == searchInput) {
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
  searchForm.addEventListener('focusout', function(e) {
    if (e.relatedTarget === null || !searchForm.contains(e.relatedTarget)) {
      hideSearchForm();
    }
  });

  searchInput.addEventListener('keyup', function(e) {
    if (this.value == currentQuery) {
      return;
    }
    currentQuery = this.value;
    executeSearch(this.value);
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

	function toggleSearchFormVisibility() {
    if (searchForm.style.display === "none") {
      showSearchForm();
    } else {
      hideSearchForm();
    }
	}

  function showSearchForm() {
    if (searchForm.style.display === "none") {
      searchForm.style.display = "block";
      searchInput.value = "";
      searchInput.focus()
      reset_active_search_result();
      return true
    }
    return false
  }

  function hideSearchForm() {
    if (searchForm.style.display === "block") {
      searchForm.style.display = "none";
      searchInput.blur();
      return true
    }
    return false
  }

  function renderSearchResult(doc, active=false) {
    let result = `
        <div class="result ${active ? "active" : ""}">
          <span class="gutter"></span><a href="${doc.permalink}"><span class="title">${doc.raw_text}</span></a>
        </div>
        `;
    return result
  }

  function fuzzySearch(query) {
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

  function executeSearch(query) {
    if (index === null) {
      return
    }

    let innerHTML = "";

    if (query === "") {
      for (let i in index) {
      let active = (i == 0);
        let doc = index[i];
        let result = renderSearchResult(doc, active);
        innerHTML = innerHTML + result;
      }
      search_results.innerHTML = innerHTML;
      return
    }

    // Perform search
    let results = fuzzySearch(query)
    for (let i in results) {
      let active = (i == 0);
      let doc = results[i].document;
      let resultHTML = renderSearchResult(doc, active);
      innerHTML = innerHTML + resultHTML;
    }

    search_results.innerHTML = innerHTML;
  }
}, false);
