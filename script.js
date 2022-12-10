'use strict';

// burger bar
let navigation = document.getElementById("navbar");
let burgerbar = document.getElementById("burgerBar");
burgerbar.addEventListener('click', function(){
    burgerbar.classList.toggle('activeBar');
    navigation.classList.toggle('activeNav');
})


// slider
let data = [
  {
    id: 1,
    imageUrl: "images/Rectangle.png",
    title:
      "''It's no secret that Bali is the perfect destination for water lovers - if you're one of them, then don't lose this ticket to get the best watersport package here in Bali''",
  },
  {
    id: 2,
    imageUrl: "images/Rectangle.png",
    title:
      "''Don't miss Balinese massage! It's a combination of gentle stretches, acupressure, reflexology, and aromatherapy to stimulate the flow of blood and bring a sense of wellbeing''",
  },
  {
    id: 3,
    imageUrl: "images/Rectangle.png",
    title:
      "''Traveling means something different for everyone, but one thing most people have in common is their love for trying new cuisine. Fortunately, if you’re planning on visiting Bali, there are plenty of eats and drinks that are worth the journey, wherever your tastes may lie.''",
  },
];

const arrowLeft = document.getElementById("arrow-left");
const arrowRight = document.getElementById("arrow-right");
const sliderContent = document.getElementById("slider-content");
let sliderIndex = 0;
let dotItem = document.getElementsByClassName("dot");

//div
function createDivTag() {
  const divTag = document.createElement("div");
  divTag.classList.add("slide");

  return divTag;
}

function createImgTag(item) {
  const imgTag = document.createElement("div");
  imgTag.style.background = `url(${item.imageUrl})`;
  imgTag.classList.add("bg-imagee");

  return imgTag;
}
// title
function createTitleTag(item) {
  const titleTag = document.createElement("h3");
  titleTag.innerText = item.title;
  titleTag.classList.add("titleOnPic");
  return titleTag;
}

// dots
function createDots() {
  const dotsParent = document.createElement("div");
  dotsParent.classList.add("dotParent");

  data.forEach((Element) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-id", Element.id - 1);
    dotsParent.appendChild(dot);
    dot.addEventListener("click", function (event) {
      let id = event.target.getAttribute("data-id");
      sliderIndex = id;
      slide();
    });
  });

  return dotsParent;
}

function slide() {
  sliderContent.innerHTML = " ";
  const slideItem = createDivTag(data[sliderIndex]);
  const imgTag = createImgTag(data[sliderIndex]);
  const titleTag = createTitleTag(data[sliderIndex]);
  const dotsElement = createDots();

  slideItem.appendChild(imgTag);
  slideItem.appendChild(titleTag);
  sliderContent.appendChild(slideItem);
  sliderContent.appendChild(dotsElement);
  dotItem[sliderIndex].classList.add("activeDot");
}

function arrowLeftClick() {
  if (sliderIndex == 0) {
    sliderIndex = data.length - 1;
    slide();
    return;
  }
  sliderIndex--;
  slide();
}

function arrowRightClick() {
  if (sliderIndex == data.length - 1) {
    sliderIndex = 0;
    slide();
    return;
  }
  sliderIndex++;
  slide();
}

arrowLeft.addEventListener("click", arrowLeftClick);
arrowRight.addEventListener("click", arrowRightClick);

setInterval(() => {
  arrowRightClick();
}, 5000);

slide();
