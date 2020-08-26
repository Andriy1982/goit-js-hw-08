import gallery from "./gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const lighboxRef = document.querySelector(".js-lightbox");
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imgLighboxRef = document.querySelector(".lightbox__image");

const createCardGallery = (item) => {
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = item.original;

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.src = item.preview;
  imgRef.alt = item.description;
  imgRef.dataset.source = item.original;

  linkRef.appendChild(imgRef);
  itemRef.appendChild(linkRef);

  return itemRef;
};

const galleryCards = gallery.map((item) => createCardGallery(item));
listRef.append(...galleryCards);

listRef.addEventListener("click", onOpenModal);
btnCloseRef.addEventListener("click", onCloseModal); // imgLighboxRef.src = Очистить ссілку
lighboxRef.addEventListener("click", (event) => {
  if (event.target !== imgLighboxRef) {
    onCloseModal();
  }
});

function onOpenModal(event) {
  event.preventDefault();
  window.addEventListener("keydown", onPress);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lighboxRef.classList.add("is-open");
  addImageOnModal(event);
}
function addImageOnModal(event) {
  imgLighboxRef.src = event.target.dataset.source;
  imgLighboxRef.alt = event.target.alt;
}

function onCloseModal() {
  window.removeEventListener("keydown", onPressEscape);
  lighboxRef.classList.remove("is-open");
}

function onPress(event) {
  let activeIndex = gallery.findIndex(
    (el) => el.description === imgLighboxRef.alt
  );
  onPressArrowRigh(event, activeIndex);
  onPressArrowLeft(event, activeIndex);
  onPressEscape(event);
}

function onPressArrowRigh(event, activeIndex) {
  if (event.code === "ArrowRight" && activeIndex < 8) {
    imgLighboxRef.src = gallery[activeIndex + 1].original;
    imgLighboxRef.alt = gallery[activeIndex + 1].description;
  }
}
function onPressArrowLeft(event, activeIndex) {
  if (event.code === "ArrowLeft" && activeIndex > 0) {
    imgLighboxRef.src = gallery[activeIndex - 1].original;
    imgLighboxRef.alt = gallery[activeIndex - 1].description;
  }
}
function onPressEscape(event) {
  if (event.code === "Escape") {
    onCloseModal();
  }
}
