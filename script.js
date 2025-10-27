document.addEventListener("DOMContentLoaded", function() {
  const track = document.querySelector('#menu .slider-track');
  const slides = Array.from(document.querySelectorAll('#menu .slider-item'));
  const prevBtn = document.querySelector('#menu .prev');
  const nextBtn = document.querySelector('#menu .next');
  const titleElement = document.getElementById('current-menu-title');

  const titles = [
    "Signature Bar Menu",
    "Indonesian Menu",
    "Beer & Cocktails Menu",
    "Drinks Menu",
    "Coffee Menu",
    "Juice & Smoothies Menu"
  ];

  let index = 1;

  // Clone first & last slide untuk loop halus
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);
  firstClone.id = "first-clone";
  lastClone.id = "last-clone";
  track.appendChild(firstClone);
  track.insertBefore(lastClone, slides[0]);

  const allSlides = document.querySelectorAll('#menu .slider-item');
  let slideWidth = slides[0].clientWidth;
  track.style.transform = `translateX(-${slideWidth * index}px)`;

  // Fungsi geser slider
  function moveToSlide() {
    track.style.transition = "transform 0.6s ease";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  // Update judul menu sesuai slide
  function updateMenuTitle() {
    let realIndex;
    if (allSlides[index].id === "first-clone") realIndex = 0;
    else if (allSlides[index].id === "last-clone") realIndex = titles.length - 1;
    else realIndex = index - 1;
    titleElement.textContent = titles[realIndex];
  }

  // Tombol Next
  nextBtn.addEventListener('click', () => {
    if (index >= allSlides.length - 1) return;
    index++;
    moveToSlide();
    updateMenuTitle();
  });

  // Tombol Prev
  prevBtn.addEventListener('click', () => {
    if (index <= 0) return;
    index--;
    moveToSlide();
    updateMenuTitle();
  });

  // Reset index saat mencapai clone
  track.addEventListener('transitionend', () => {
    if (allSlides[index].id === "first-clone") {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }
    if (allSlides[index].id === "last-clone") {
      track.style.transition = "none";
      index = allSlides.length - 2;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }
    updateMenuTitle();
  });

  // Update slideWidth saat resize
  window.addEventListener('resize', () => {
    slideWidth = slides[0].clientWidth;
    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth * index}px)`;
  });

  // Inisialisasi judul pertama
  updateMenuTitle();
});

// Smooth scroll untuk tombol main-content
document.addEventListener("DOMContentLoaded", function() {
  const menuBtn = document.querySelector('.main-buttons a[href="#food"]');
  const eventsBtn = document.querySelector('.main-buttons a[href="#events"]');

  const menuSection = document.getElementById('menu');
  const eventsSection = document.getElementById('events');

  // Smooth scroll function
  function smoothScroll(target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  menuBtn.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll(menuSection);
  });

  eventsBtn.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScroll(eventsSection);
  });
});
