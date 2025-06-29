import {
  showModalTraining,
  showModalContact,
  showModalInformation,
} from './info.js';

async function enableFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

function detectDeviceType() {
  const ua = navigator.userAgent;

  if (/iPad|Tablet|PlayBook|Silk/i.test(ua)) return 'tablet';
  if (/Android|iPhone|iPod/i.test(ua)) return 'mobile';

  return 'desktop';
}

async function heroDesktop() {
  const header = document.querySelector('.header-desktop');
  const hero = document.querySelector('.hero-desktop');

  if (header && hero) {
    const headerHeight = header.offsetHeight;
    const viewportHeight = window.innerHeight;
    hero.style.height = `${viewportHeight - headerHeight}px`;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const deviceType = detectDeviceType();

  if (deviceType === 'mobile' || deviceType === 'tablet') {
    await initMobileLayout();
    await enableFullScreen();

    document.addEventListener('click', async () => {
      if (!document.fullscreenElement) {
        await enableFullScreen();
      }
    });
  }

  if (deviceType === 'desktop') {
    await heroDesktop();
    layoutDesktop();

    window.addEventListener('resize', () => {
      heroDesktop();
      layoutDesktop();
    });
  }
});

async function initMobileLayout() {
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

  hamburger?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  menuTablet?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  closeMenuBtn?.addEventListener('click', closeMenu);
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

    scrollPrompt?.addEventListener('click', () => {
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
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {}, 70);
    },
    { passive: true }
  );

  init();

  document
    .getElementById('about-us')
    ?.addEventListener('click', showModalInformation);
  document
    .getElementById('contact')
    ?.addEventListener('click', showModalContact);
  document
    .getElementById('trainingBtn-mobile')
    ?.addEventListener('click', showModalTraining);
}

document.querySelector('.scroll-prompt')?.addEventListener('click', () => {
  document.querySelector('.main-desktop')?.scrollBy({
    top: window.innerHeight,
    behavior: 'smooth',
  });
});

function layoutDesktop() {
  const header = document.querySelector('.header-desktop');
  const footer = document.querySelector('.footer-desktop');
  const main = document.querySelector('.main-desktop');
  const sections = document.querySelectorAll('.section-desktop');

  if (header && footer && main) {
    const headerHeight = header.offsetHeight;
    const footerHeight = footer.offsetHeight;
    const totalHeight = window.innerHeight;

    const mainHeight = totalHeight - headerHeight - footerHeight;

    main.style.height = `${mainHeight}px`;
    main.style.marginTop = `${headerHeight}px`;
    main.style.marginBottom = `${footerHeight}px`;

    sections.forEach((section) => {
      section.style.height = `${mainHeight}px`;
    });
  }

  document
    .getElementById('history-desktop')
    ?.addEventListener('click', showModalInformation);

  document
    .getElementById('contact-desktop')
    ?.addEventListener('click', showModalContact);

  document
    .getElementById('trainingBtn-desktop')
    ?.addEventListener('click', showModalTraining);
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.car-desktop-container');

  containers.forEach((container) => {
    const slides = container.querySelectorAll('.car-desktop-slide');
    const tooltip = container.querySelector('.tooltip-card');

    slides.forEach((slide) => {
      const description = slide.querySelector('.car-desktop-slide-h5');

      slide.addEventListener('mouseenter', (e) => {
        if (!description || !tooltip) return;

        tooltip.textContent = description.textContent.trim();
      });

      slide.addEventListener('mouseleave', () => {
        if (!tooltip) return;
        tooltip.textContent = '';
      });
    });
  });
});
