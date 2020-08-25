import gallery from "./gallery-items.js";

// console.log(gallery[0].description);

const listRef = document.querySelector(".js-gallery");
const lighboxRef = document.querySelector(".js-lightbox");
const btnCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imgLighboxRef = document.querySelector(".lightbox__image");

// console.log(btnCloseRef);
console.log(imgLighboxRef);

// itemRef.append(linkRef, imgRef);

// console.log(itemRef);

// listRef.appendChild(itemRef);

const createCardGallery = (item) => {
  //   const listRef = document.querySelector(".js-gallery");
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

// console.log(listRef);

listRef.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.target.dataset.source);
  imgLighboxRef.src = event.target.dataset.source;
  //   console.log(event.currentTarget);
  event.preventDefault();
  //   console.dir(event);

  //   console.log(event.target.nodeName);
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lighboxRef.classList.add("is-open");
});

btnCloseRef.addEventListener("click", () => {
  lighboxRef.classList.remove("is-open");
  // imgLighboxRef.src = Очистить ссілку
});

lighboxRef.addEventListener("click", (event) => {
  console.log(event.target);
  console.log(event.currentTarget);
  if (event.target !== imgLighboxRef) {
    lighboxRef.classList.remove("is-open");
  }
});
