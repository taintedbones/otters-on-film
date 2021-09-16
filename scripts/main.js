var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = "hidden-detail";
var TINY_EFFECT_CLASS = "is-tiny";
var ESC_KEY = 27;
var TOTAL_IMAGES = 5;

function setDetails(imageUrl, titleText) {
  "use strict";

  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  detailImage.setAttribute("src", imageUrl);

  var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-url");
}

function titleFromThumb(thumbnail) {
  "use strict";
  return thumbnail.getAttribute("data-image-title");
}

function setDetailsFromThumb(thumbnail) {
  "use strict";
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickhandler(thumb) {
  "use strict";
  thumb.addEventListener("click", function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  "use strict";
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  "use strict";
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
  "use strict";
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function addKeyPressHandler() {
  "use strict";
  document.body.addEventListener("keyup", function (event) {
    event.preventDefault();
    console.log(event.key);
    if (event.key === ESC_KEY) {
      hideDetails();
    }
  });
}

function showPrevImage() {
  "use strict";
  var thumbnails = getThumbnailsArray(); // list of thumbnails HTML objects
  var index = thumbnails.findIndex(compareImgUrls);

  if (index === 0) {
    index = thumbnails.length - 1;
  } else {
    index--;
  }

  setDetailsFromThumb(thumbnails[index]);
}

function showNextImage() {
  "use strict";
  var thumbnails = getThumbnailsArray(); // list of thumbnails HTML objects
  var index = thumbnails.findIndex(compareImgUrls);

  if (index === thumbnails.length - 1) {
    index = 0;
  } else {
    index++;
  }

  setDetailsFromThumb(thumbnails[index]);
}

function compareImgUrls(thumb) {
  var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR); // detail img HTML object
  var detailImageUrl = detailImage.getAttribute("src"); // extract url from HTML object
  return thumb.getAttribute("data-image-url") === detailImageUrl;
}

function initializeEvents() {
  "use strict";
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickhandler);
  addKeyPressHandler();
}

initializeEvents();
