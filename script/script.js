import { appointmentDay } from './appointment.js';
import {
  showModalCommerce,
  showModalTraining,
  showModalContact,
  showModalInformation,
  setupCarouselModalListeners,
} from './info.js';
import { formatDate, validateDate } from './validation.js';

function enableFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    enableFullScreen();

    document.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        enableFullScreen();
      }
    });
  }

  const hamburger = document.getElementById('hamburger');
  const menuTablet = document.getElementById('menu-tablet');
  const menu = document.getElementById('menu');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const menuLinks = document.querySelectorAll('.menu-link');

  function openMenu() {
    menu.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  menuTablet.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  closeMenuBtn.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      closeMenu();
    }
  });

  const markers = document.querySelectorAll('.section-marker');
  const main = document.querySelector('.main-mobile');
  const sections = document.querySelectorAll('.section');
  const scrollPrompt = document.querySelector('.scroll-prompt');

  function positionMarkers() {
    markers.forEach((marker, index) => {
      if (index < sections.length) {
        const section = sections[index];
        const position = (section.offsetTop / main.scrollHeight) * 100;
        marker.style.top = `${position}%`;
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionContent = entry.target.querySelector('.section-content');
          if (sectionContent) {
            // Verifica se o elemento existe
            sectionContent.classList.add('visible');
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  function init() {
    positionMarkers();
    sections.forEach((section) => {
      observer.observe(section);
    });

    scrollPrompt.addEventListener('click', () => {
      main.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth',
      });
    });

    window.addEventListener('resize', positionMarkers);
  }

  let isScrolling;
  main.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(70);
    },
    false
  );

  init();

  document.getElementById('about-us').addEventListener('click', async () => {
    await showModalInformation();
  });

  document.getElementById('contact').addEventListener('click', async () => {
    await showModalContact();
  });

  document
    .getElementById('commerce-menu')
    .addEventListener('click', async () => {
      await showModalCommerce();
    });

  document
    .getElementById('trainingBtn-mobile')
    .addEventListener('click', async () => {
      await showModalTraining();
    });

  const el = document.getElementById('dateMobile');
  const formattedToday = validateDate(el);
  el.value = formattedToday;
  el.min = formattedToday;

  const dateFormat = formatDate(el.value);

  el.addEventListener('change', async () => {
    await appointmentDay(dateFormat);
  });

  await appointmentDay(dateFormat);

  await setupCarouselModalListeners();
});
