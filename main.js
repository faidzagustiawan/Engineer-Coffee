document.addEventListener('DOMContentLoaded', () => {

  // --- LOGIKA HEADER & MENU MOBILE ---
  const header = document.getElementById('main-header');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

  if (menuToggleBtn) {
    let isMenuOpen = false;

    const toggleMenu = () => {
      isMenuOpen = !isMenuOpen;
      menuIcon.classList.toggle('hidden', isMenuOpen);
      closeIcon.classList.toggle('hidden', !isMenuOpen);
      mobileMenu.classList.toggle('menu-open', isMenuOpen);
    };

    menuToggleBtn.addEventListener('click', toggleMenu);

    mobileMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        if (isMenuOpen) {
          toggleMenu();
        }
      });
    });
  }

  // Efek Header saat scroll
  if (header) {
    let isScrolled = false;
    const handleScroll = () => {
      // Periksa apakah kelas sudah ada sebelum toggle untuk efisiensi
      const shouldBeScrolled = window.scrollY > 50;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        // Gunakan classList.add/remove untuk kejelasan daripada toggle yang banyak
        if (isScrolled) {
          header.classList.remove('bg-amber-950/80');
          header.classList.add('bg-amber-900/95', 'backdrop-blur-md', 'shadow-2xl');
        } else {
          header.classList.remove('bg-amber-900/95', 'backdrop-blur-md', 'shadow-2xl');
          header.classList.add('bg-amber-950/80');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
  }


  // --- LOGIKA ANIMASI SAAT ELEMEN TERLIHAT (REVEAL ON SCROLL) ---
  const revealableElements = document.querySelectorAll('.revealable, .revealable-x-left, .revealable-x-right');

  if (revealableElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px', // Memicu animasi 100px sebelum elemen mencapai dasar viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Hentikan pengamatan setelah elemen terlihat untuk efisiensi
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealableElements.forEach(el => {
      observer.observe(el);
    });
  }

});