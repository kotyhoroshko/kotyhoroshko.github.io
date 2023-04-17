let page = 0;
const body = document.querySelector('body')
let portfolio = document.querySelector(".portfolio");
    portfolio.addEventListener("click", showMore);

document.addEventListener("DOMContentLoaded", function () {
  initDarkMode();
  createObserver();
});

function getPhotos(page) {
  fetch(`https://picsum.photos/v2/list?page=${page}&limit=9`)
    .then((response) => response.json())
    .then((json) => addPhotos(json))
    .then((response) => (response ? false : console.log("Getting photos")))
    .catch((error) => console.log(error));
}

function addPhotos(photos) {
    let inner = "";
  for (let index = 1; index < photos.length; index++) {
    inner += `
        <li class="card rounded-3">
        <img src="${photos[index].download_url}"
            class="card-img-top" alt="Photo of ${photos[index].author}"
        >
        <div class="card-body ">
            <h5 class="card-title">
                ${photos[index].id}.${photos[index].author}
            </h5>
            <p class="card-text mb-0">${loremIpsumRnd()}</p>
            <button type="button" class="btn show-more ps-0 border-0">Show more...</button>
        </div>
        <div class="card-actions">
          <button type="button" class="btn btn-save">Save to collection</button>
          <button type="button" class="btn btn-share">Share</button>
        </div>    
      </li>
    `;
  }
  portfolio.insertAdjacentHTML("beforeend", inner);
  checkCardTextLines();
}

function loremIpsumRnd() {
  let lorem = `
   Lorem ipsum dolor sit amet consectetur elit.
   Enim accusamus possimus officia fuga? Maiores molestias minima, quis reiciendis.
   Enim exercitationem excepturi accusamus possimus officia fuga?
   Maiores molestias minima, molestiae similique vol deserunt!
   Temporibus id odio voluptatum!
   Blanditiis. Enim voluptas exercitationem excepturi accusamus possimus officia fuga?`;
  lorem = lorem.slice(0, Math.random() * (lorem.length - 10) + 10);
  return lorem;
}

function createObserver() {
  let options = {
    root: null,
    rootMargin: "100px",
    threshold: 1,
  };
  let observer = new IntersectionObserver(getMorePhotos, options);
  let mainContent = document.querySelector(".main-content");
  let target = document.createElement("div");
  mainContent.append(target);
  observer.observe(target);
}

function getMorePhotos(entries) {
  if (entries[0].isIntersecting) {
    page++;
    getPhotos(page);
  }
}

function checkCardTextLines() {
  let cardTexts = document.querySelectorAll(".card-text");
  let lineHeight =
    cardTexts[0].style.lineHeight ||
    document.defaultView
      .getComputedStyle(cardTexts[0], null)
      .getPropertyValue("line-height");
  lineHeight = parseFloat(lineHeight);
  for (let index = 0; index < cardTexts.length; index++) {
    let height = cardTexts[index].offsetHeight;
    let lines = height / lineHeight;
    if (lines > 2) {
      clampText(cardTexts[index], height, lineHeight);
    }
  }
}

function clampText(node, height, lineHeight) {
  node.parentElement.classList.add("clamped");
  node.style.height = lineHeight * 2 + "px";
  node.dataset.height = height + "px";
}

function showMore(e) {
  if (e.target.classList.contains("show-more")) {
    let card = e.target.parentElement;
    let cardText = card.querySelector(".card-text");
    cardText.style.height = cardText.dataset.height;
    card.classList.remove("clamped");
  }
}

function initDarkMode() {
  const currentTheme = localStorage.getItem('themeMode')
  const switcher = document.querySelector('#darkModeSwitcher')
  if(currentTheme) {
    if (currentTheme == 'dark') {
      body.classList.add('dark-mode')
      switcher.checked = true
    }
  }
  else if ( window.matchMedia('(prefers-color-scheme: dark)').matches ) {
    body.classList.add('dark-mode')
    localStorage.setItem('themeMode', 'dark')
  }
  switcher.addEventListener('change', switchDarkMode)
}

function switchDarkMode() {
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode')
    localStorage.setItem('themeMode', 'light')
  }
  else {
    body.classList.add('dark-mode')
    localStorage.setItem('themeMode', 'dark')
  }
}
