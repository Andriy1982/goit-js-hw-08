import gallery from "./gallery-items.js";

const listRef = document.querySelector(".js-gallery");
const lighboxRef = document.querySelector(".js-lightbox");
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imgLighboxRef = document.querySelector(".lightbox__image");

const createCardGallery = (item) => {
  const { original, preview, description } = item;
  const itemRef = document.createElement("li");
  itemRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");
  linkRef.href = original;

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.src = preview;
  imgRef.alt = description;
  imgRef.dataset.source = original;

  linkRef.appendChild(imgRef);
  itemRef.appendChild(linkRef);

  return itemRef;
};

const galleryCards = gallery.map((item) => createCardGallery(item));
listRef.append(...galleryCards);

listRef.addEventListener("click", onOpenModal);
btnCloseRef.addEventListener("click", onCloseModal);
lighboxRef.addEventListener("click", (event) => {
  if (event.target !== imgLighboxRef) {
    onCloseModal();
  }
});

function onOpenModal(event) {
  const { target } = event;
  event.preventDefault();
  window.addEventListener("keydown", onPress);
  if (target.nodeName !== "IMG") {
    return;
  }
  lighboxRef.classList.add("is-open");
  addImageOnModal(event);
}
function addImageOnModal(event) {
  const { target } = event;
  imgLighboxRef.src = target.dataset.source;
  imgLighboxRef.alt = target.alt;
}

function onCloseModal() {
  window.removeEventListener("keydown", onPress);
  lighboxRef.classList.remove("is-open");
  imgLighboxRef.src = "";
}

function onPress(event) {
  const { code } = event;
  let activeIndex = gallery.findIndex(
    (el) => el.description === imgLighboxRef.alt
  );
  onPressArrowRigh(code, activeIndex);
  onPressArrowLeft(code, activeIndex);
  onPressEscape(code);
}

function onPressArrowRigh(code, activeIndex) {
  if (code === "ArrowRight" && activeIndex < 8) {
    imgLighboxRef.src = gallery[activeIndex + 1].original;
    imgLighboxRef.alt = gallery[activeIndex + 1].description;
  }
}
function onPressArrowLeft(code, activeIndex) {
  if (code === "ArrowLeft" && activeIndex > 0) {
    imgLighboxRef.src = gallery[activeIndex - 1].original;
    imgLighboxRef.alt = gallery[activeIndex - 1].description;
  }
}
function onPressEscape(code) {
  if (code === "Escape") {
    onCloseModal();
  }
}
