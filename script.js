"use strict";

// burger bar -home
let navigation = document.getElementById("navbar");
let burgerbar = document.getElementById("burgerBar");
burgerbar.addEventListener("click", function () {
  burgerbar.classList.toggle("activeBar");
  navigation.classList.toggle("activeNav");
});

// slider -section 5
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

// subscribe button - section 2
let btnsubscribe = document.getElementById("btnsubscribe");
btnsubscribe.addEventListener("click", function () {
  btnsubscribe.innerHTML = "Thank You!";
});

// form -section 7

const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const contactForm = document.getElementById("contact-form");
const errorElement = document.getElementById("error");
const successMsg = document.getElementById("success-msg");
const submitBtn = document.getElementById("submit");

const validate = (e) => {
  e.preventDefault();

  if (name.value.length < 3) {
    errorElement.innerHTML = "Your name should be at least 3 characters long.";
    return false;
  }

  if (!(email.value.includes(".") && email.value.includes("@"))) {
    errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (!emailIsValid(email.value)) {
    errorElement.innerHTML = "Please enter a valid email address.";
    return false;
  }

  if (message.value.length < 15) {
    errorElement.innerHTML = "Please write a longer message.";
    return false;
  }

  errorElement.innerHTML = "";
  successMsg.innerHTML =
    "Thank you! I will get back to you as soon as possible.";

  e.preventDefault();
  setTimeout(function () {
    successMsg.innerHTML = "";
    document.getElementById("contact-form").reset();
  }, 6000);

  return true;
};

const emailIsValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

submitBtn.addEventListener("click", validate);

// fetch- load more - section
let currentPage = 1;
let post = document.getElementById("main-wraper");

function getUsers(page) {
  fetch("https://reqres.in/api/users?page=" + page, {
    METHOD: "GET",
  })
    .then(function (text) {
      if (text.status !== 200) {
        throw text.status;
      }
      return text.json();
    })
    .then(function (answer) {
      answer.data.forEach((item) => {
        let user = document.createElement("p");
        user.classList.add("suname-name");
        user.innerText = `${item.first_name} ${item.last_name}`;
        let avatar = document.createElement("img");
        avatar.src = item.avatar;
        avatar.setAttribute("alrt", "avatar");
        avatar.classList.add("avatar");
        let nameAvatarWraper = document.createElement("div");
        nameAvatarWraper.classList.add("avatarsclass");
        let nameAvatar = document.createElement("div");
        nameAvatar.appendChild(user);
        nameAvatar.appendChild(avatar);
        nameAvatarWraper.appendChild(nameAvatar);
        post.appendChild(nameAvatarWraper);
      });
    })
    // error
    .catch(function (error) {
      if (error == 404) {
        let p = document.createElement("p");
        p.textContent = "page not found";
        p.classList.add("text-for");
        post.appendChild(p);
      }
    });
}
// load more
let loadMore = document.getElementById("more-destination");
loadMore.addEventListener("click", function () {
  currentPage++;
  getUsers(currentPage);
  loadMore.remove();
});

getUsers(currentPage);


// scroll

const navbar = document.querySelector("#nav-flex");

window.onscroll = ()=> {
  this.scrollY > 20 ? navbar.classList.add("scroll") : navbar.classList.remove("scroll");
}


