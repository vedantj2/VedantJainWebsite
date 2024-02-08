import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

import { Application } from '@splinetool/runtime';


const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);
app.load('https://prod.spline.design/vm9V0AlqpEOJWKYt/scene.splinecode');


const content1 = document.querySelector('.content1')
const content2 = document.querySelector('.content2')
const content3 = document.querySelector('.content3')
const content4 = document.querySelector('.content4')

const path1 = document.querySelector('.path2')
const path2 = document.querySelector('.path3')
const path3 = document.querySelector('.path4')
const path4 = document.querySelector('.path5')

const path1Length = path1.getTotalLength()
const path2Length = path2.getTotalLength()
const path3Length = path3.getTotalLength()
const path4Length = path4.getTotalLength()

path1.style.strokeDasharray = path1Length
path1.style.strokeDashoffset = calcDashoffset(window.innerHeight * 0.8, content1, path1Length)
path2.style.strokeDasharray = path2Length
path2.style.strokeDashoffset = path2Length
path3.style.strokeDasharray = path3Length
path3.style.strokeDashoffset = path3Length

path4.style.strokeDasharray = path4Length
path4.style.strokeDashoffset = path4Length

function calcDashoffset(scrollY, element, length) {
  const ratio = (scrollY - element.offsetTop) / element.offsetHeight
  const value = length - (length * ratio)
  return value < 0 ? 0 : value > length ? length : value
}

function scrollHandler() {
  const scrollY = window.scrollY + (window.innerHeight * .4)
  path1.style.strokeDashoffset = calcDashoffset(scrollY, content1, path1Length)
  path2.style.strokeDashoffset = calcDashoffset(scrollY, content2, path2Length)
  path3.style.strokeDashoffset = calcDashoffset(scrollY, content3, path3Length)
  path4.style.strokeDashoffset = calcDashoffset(scrollY, content4, path4Length)
}

window.addEventListener('scroll', scrollHandler)


window.addEventListener('DOMContentLoaded', setup);

function setup() {
  const options = {
    rootMargin: '0px 0px -200px 0px'
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      } else {
        return;
      }
    })
  }, options);

  const h1 = document.querySelector('.H1');
  observer.observe(h1);

  const h2 = document.querySelector('.H2');
  observer.observe(h2);

  const paras = document.querySelectorAll('P');
  paras.forEach(p => observer.observe(p));
}

// cards
const cards = document.querySelectorAll('.card');

// Function to maintain scroll position
function maintainScroll(card) {
  const scrollY = window.scrollY; // Get the current scroll position
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: 'instant' }); // Scroll back to the original position instantly
  });
}

cards.forEach((card, index) => {
  card.addEventListener("click", (e) => {
    // Prevent default behavior if cards are within a link
    e.preventDefault();

    const state = Flip.getState(cards);
    const isCardActive = card.classList.contains("active");

    cards.forEach((otherCard, otherIdx) => {
      otherCard.classList.remove("active", "is-inactive");
      if (!isCardActive && index !== otherIdx) {
        otherCard.classList.add("is-inactive");
      }
    });

    if (!isCardActive) {
      card.classList.add('active');
      maintainScroll(card); // Call function to maintain scroll position
    }

    Flip.from(state, {
      duration: 1,
      ease: "expo.out",
      absolute: true,
      onComplete: () => maintainScroll(card) // Ensure scroll position is maintained after animation
    });
  });
});
