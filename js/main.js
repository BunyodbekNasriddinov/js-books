let elBody = document.querySelector("body");
let elList = document.querySelector(".js-list");
let elForm = document.querySelector(".js-form");
let elSelect = document.querySelector(".js-select");
let elSearch = document.querySelector(".js-search");
let elModeBtn = document.querySelector(".js-mode");
let elScrollBtn = document.querySelector(".js-scroll");
let elRadios = document.querySelectorAll(".js-radio");

function createCardListItem(array, node) {
  elList.innerHTML = "";

  for (item of array) {
    let newItemLi = document.createElement("li");
    node.appendChild(newItemLi);

    newItemLi.setAttribute(
      "class",
      "col-12 col-md-4 col-lg-3 rounded shadow p-3"
    );
    newItemLi.innerHTML = `
    <div class="d-flex justify-content-between">
      <h2 class="h5 text-primary">${item.author}</h2>
        <span class="h4 text-success">
          <button class="bg-transparent border-0 js-favorite">
            <img 
              class="me-1 js-favorite-img"
              data-poc-id = "${item.id}"
              src="./images/favorite-icon.png"
              width="35" 
              height="35"
              ></button>
                ${item.id}
        </span>
      </div>
      <div class="d-flex justify-content-between">
      <ul class="list-unstyled mt-3 w-75">
      <li class="p-1 text-warning fw-semibold">Pages: ${item.pages}</li>
      <li class="p-1 text-primary fw-semibold">Language: ${item.language}</li>
      <li class="p-1 text-success fw-semibold">Title: ${item.title}</li>
      <li class="p-1 text-danger fw-semibold">Country: ${item.country}</li>
      <li class="p-1 text-light fw-semibold"> <a class="btn btn-primary" href="${item.link}" target="_blank">Link</a></li>
      </ul>
      <img
      class="offset-1 mt-5"
      width="90"
      height="100"
      src="./images/${item.imageLink}"
      alt="Pokemon ${item.name} image"
      style="object-fit: fill;"
      />
    </div>`;
  }
}

createCardListItem(books, elList);

function sortArray(arr, key, reverse) {
  return arr.sort((a, b) => {
    if (typeof a[key] === "number") {
      a = a[key];
      b = b[key];
      if (reverse) return b - a;
      return a - b;
    }
    if (typeof a[key] === "string") {
      a = a[key].toLowerCase().charCodeAt(0);
      b = b[key].toLowerCase().charCodeAt(0);
      if (reverse) return b - a;
      return a - b;
    }
  });
}

function changeTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.querySelector("body").classList.add("dark");
    elModeBtn.children[0].src = "./images/mode-icon.png";
  } else {
    document.querySelector("body").classList.remove("dark");
    elModeBtn.children[0].src = "./images/mode-icon-dark.png";
  }
}

window.addEventListener("scroll", () => {
  if (window.scrollY >= 700) {
    elScrollBtn.classList.remove("d-none");
  } else {
    elScrollBtn.classList.add("d-none");
  }
});

let theme = false;

elModeBtn.addEventListener("click", () => {
  theme = !theme;

  let bg = theme ? "dark" : "light";
  localStorage.setItem("theme", bg);
  changeTheme();
});

changeTheme();

function createOption(node, optinions) {
  node.innerHTML = "";

  let allOption = document.createElement("option");

  allOption.value = "all";
  allOption.textContent = "All";
  node.appendChild(allOption);

  optinions.forEach((item) => {
    let newOption = document.createElement("option");
    newOption.value = item;
    newOption.textContent = item;
    node.appendChild(newOption);
  });
}

let booksLanguage = [];
books.forEach((el) => booksLanguage.push(el.language));
booksLanguage = new Set(booksLanguage);

elRadios.forEach((radio) => {
  radio.addEventListener("input", () => {
    if (radio.value === "name") {
      createOption(elSelect, ["a-z", "z-a"]);
    }
    if (radio.value === "year") {
      createOption(elSelect, ["1-9", "9-1"]);
    }
    if (radio.value === "pages") {
      createOption(elSelect, ["1-9", "9-1"]);
    }
    if (radio.value === "lang") {
      elSelect.innerHTML = "";

      let allOption = document.createElement("option");
      allOption.value = "all";
      allOption.textContent = "All";

      elSelect.appendChild(allOption);

      booksLanguage.forEach((lang) => {
        let newOption = document.createElement("option");
        newOption.value = lang;
        newOption.textContent = lang;

        elSelect.appendChild(newOption);
      });
    }

    elSelect.addEventListener("change", () => {
      if (elSelect.value === "all") {
        createCardListItem(books, elList);
      }
      if (radio.value === "name") {
        if (elSelect.value == "a-z")
          createCardListItem(sortArray(books, "author"), elList);
        if (elSelect.value == "z-a")
          createCardListItem(sortArray(books, "author", true), elList);
      }
      if (radio.value === "year") {
        if (elSelect.value == "1-9")
          createCardListItem(sortArray(books, "year"), elList);
        if (elSelect.value == "9-1")
          createCardListItem(sortArray(books, "year", true), elList);
      }
      if (radio.value === "pages") {
        if (elSelect.value == "1-9")
          createCardListItem(sortArray(books, "pages"), elList);
        if (elSelect.value == "9-1")
          createCardListItem(sortArray(books, "pages", true), elList);
      }

      booksLanguage.forEach((lang) => {
        if (elSelect.value === lang)
          createCardListItem(
            books.filter((book) => book.language === lang),
            elList
          );
      });
    });
  });
});

let searchbooks = [];

elForm.addEventListener("input", (evt) => {
  evt.preventDefault();
  let elSearchVal = elSearch.value;

  books.forEach((el) => {
    if (
      el.author.toLowerCase().includes(elSearchVal.toLowerCase()) ||
      el.author.toUpperCase().includes(elSearchVal.toUpperCase()) ||
      el.country.toLowerCase().includes(elSearchVal.toLowerCase()) ||
      el.language.toLowerCase().includes(elSearchVal.toLowerCase()) ||
      el.language.toUpperCase().includes(elSearchVal.toUpperCase()) ||
      el.pages.toString().includes(elSearchVal) ||
      el.title.toLowerCase().includes(elSearchVal.toLowerCase()) ||
      el.title.toUpperCase().includes(elSearchVal.toUpperCase()) ||
      el.year.toString().includes(elSearchVal) ||
      el.country.toLowerCase().includes(elSearchVal.toLowerCase())
    )
      searchbooks.push(el);
  });

  createCardListItem(searchbooks, elList);
  searchbooks = [];
});
