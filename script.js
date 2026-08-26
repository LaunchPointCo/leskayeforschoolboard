document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll Reveal ── */
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('vis');
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r, .reveal-s')
    .forEach((el) => obs.observe(el));


  /* ── Nav scroll state ── */
  const nav = document.querySelector('.site-nav');
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── Mobile menu ── */
  const ham = document.querySelector('.nav-hamburger');
  const links = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (ham && links) {
    ham.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      ham.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    if (overlay) overlay.addEventListener('click', close);
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  }
  function close() {
    ham.classList.remove('open');
    links.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }


  /* ── Smooth anchor scroll ── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const off = nav ? nav.offsetHeight + 20 : 20;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - off,
          behavior: 'smooth',
        });
      }
    });
  });


  /* ── Active nav link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a:not(.nav-cta-link)').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html'))
      a.classList.add('active');
  });


  /* ── Hero parallax ── */
  const hero = document.querySelector('.hero');
  if (hero) {
    const content = hero.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight && content) {
        content.style.transform = `translateY(${y * 0.06}px)`;
        content.style.opacity = Math.max(1 - y * 0.001, 0);
      }
    }, { passive: true });
  }
});

// Carousel Logic
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    if (!track) return;
    
    const slides = track.querySelectorAll('.carousel-slide');
    const btnPrev = carousel.querySelector('.carousel-prev');
    const btnNext = carousel.querySelector('.carousel-next');
    const btnPausePlay = carousel.querySelector('.carousel-pause-play');
    
    let iconPause, iconPlay;
    if (btnPausePlay) {
      iconPause = btnPausePlay.querySelector('.icon-pause');
      iconPlay = btnPausePlay.querySelector('.icon-play');
    }
    
    let currentIndex = 0;
    let isPlaying = true;
    let slideInterval;
    
    function showSlide(index) {
      slides[currentIndex].classList.remove('active');
      currentIndex = (index + slides.length) % slides.length;
      slides[currentIndex].classList.add('active');
    }
    
    function nextSlide() { showSlide(currentIndex + 1); }
    function prevSlide() { showSlide(currentIndex - 1); }
    
    function startSlideshow() {
      slideInterval = setInterval(nextSlide, 4000);
      isPlaying = true;
      if (iconPause) iconPause.style.display = 'inline-block';
      if (iconPlay) iconPlay.style.display = 'none';
    }
    
    function pauseSlideshow() {
      clearInterval(slideInterval);
      isPlaying = false;
      if (iconPause) iconPause.style.display = 'none';
      if (iconPlay) iconPlay.style.display = 'inline-block';
    }
    
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        nextSlide();
        if (isPlaying) { pauseSlideshow(); startSlideshow(); }
      });
    }
    
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        prevSlide();
        if (isPlaying) { pauseSlideshow(); startSlideshow(); }
      });
    }
    
    if (btnPausePlay) {
      btnPausePlay.addEventListener('click', () => {
        if (isPlaying) pauseSlideshow();
        else startSlideshow();
      });
    }
    
    startSlideshow();
  });
});

