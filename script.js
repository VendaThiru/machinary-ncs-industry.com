// ======== NAVBAR TOGGLE ========

// Hamburger Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.getElementById('menu-icon');
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle menu when hamburger icon is clicked
  menuIcon.addEventListener('click', function() {
    navbar.classList.toggle('active');
    
    // Change hamburger icon to X when menu is open
    if (navbar.classList.contains('active')) {
      menuIcon.innerHTML = '&times;'; // X symbol
    } else {
      menuIcon.innerHTML = '&#9776;'; // Hamburger symbol
    }
  });

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navbar.classList.remove('active');
      menuIcon.innerHTML = '&#9776;'; // Reset to hamburger icon
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = navbar.contains(event.target);
    const isClickOnMenu = menuIcon.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnMenu && navbar.classList.contains('active')) {
      navbar.classList.remove('active');
      menuIcon.innerHTML = '&#9776;'; // Reset to hamburger icon
    }
  });

  // Handle window resize - close menu if screen becomes wide
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      navbar.classList.remove('active');
      menuIcon.innerHTML = '&#9776;';
    }
  });

  // Active nav link highlighting based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// Smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



// scroll image

document.addEventListener('DOMContentLoaded', function(){
  const slider = document.getElementById('ncsIndustrySlider');
  const prevBtn = document.getElementById('ncsScrollPrev');
  const nextBtn = document.getElementById('ncsScrollNext');
  const SCROLL_DISTANCE = slider.clientWidth * 0.7;

  nextBtn.addEventListener('click', ()=>{ slider.scrollBy({ left: SCROLL_DISTANCE, behavior:'smooth' }); });
  prevBtn.addEventListener('click', ()=>{ slider.scrollBy({ left: -SCROLL_DISTANCE, behavior:'smooth' }); });

  slider.addEventListener('scroll', ()=>{
    prevBtn.disabled = slider.scrollLeft === 0;
    prevBtn.style.opacity = prevBtn.disabled ? 0.5 : 1;
    const atEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;
    nextBtn.disabled = atEnd;
    nextBtn.style.opacity = atEnd ? 0.5 : 1;
  });

  slider.dispatchEvent(new Event('scroll'));

  // Auto-scroll
  setInterval(()=>{
    if(slider.scrollLeft + slider.clientWidth >= slider.scrollWidth){
      slider.scrollTo({ left: 0, behavior:'smooth' });
    } else {
      slider.scrollBy({ left: SCROLL_DISTANCE, behavior:'smooth' });
    }
  }, 3000);
});

//    MANUFACTURING CAPABILITIES SECTION 

// Manufacturing Capabilities Enhanced Interactions

document.addEventListener('DOMContentLoaded', function() {
  
  // Add smooth scroll to button
  const exploreBtn = document.querySelector('.capabilities-button .btn-primary');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', function(e) {
      // Uncomment if using smooth scroll to specific section
      // e.preventDefault();
      // const targetId = this.getAttribute('href');
      // document.querySelector(targetId).scrollIntoView({
      //   behavior: 'smooth'
      // });
    });
  }

  // Intersection Observer for scroll animations
  const cards = document.querySelectorAll('.capability-card');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const cardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    cardObserver.observe(card);
  });

  // Add tilt effect on mouse move (optional - for desktop)
  if (window.innerWidth > 768) {
    cards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });

      card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  // Add ripple effect on card click
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Button pulse effect
  if (exploreBtn) {
    setInterval(() => {
      exploreBtn.style.animation = 'pulse 1s ease';
      setTimeout(() => {
        exploreBtn.style.animation = '';
      }, 1000);
    }, 5000);
  }

});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
  .capability-card {
    position: relative;
    overflow: hidden;
  }

  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      box-shadow: 0 0 15px rgba(77, 101, 243, 0.4);
    }
    50% {
      box-shadow: 0 0 30px rgba(77, 101, 243, 0.8);
    }
  }

  .capability-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);


// INDUSTRIES WE SERVE SECTION

document.addEventListener('DOMContentLoaded', function() {
  
  const slider = document.getElementById('ncsIndustrySlider');
  const prevBtn = document.getElementById('ncsScrollPrev');
  const nextBtn = document.getElementById('ncsScrollNext');

  if (!slider || !prevBtn || !nextBtn) return;

  // Calculate scroll amount based on card width
  function getScrollAmount() {
    const card = slider.querySelector('.ncs-item-box');
    if (!card) return 300;
    
    const cardWidth = card.offsetWidth;
    const gap = 20; // 2rem gap
    return cardWidth + gap;
  }

  // Scroll to the next set of items
  function scrollNext() {
    const scrollAmount = getScrollAmount();
    slider.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }

  // Scroll to the previous set of items
  function scrollPrev() {
    const scrollAmount = getScrollAmount();
    slider.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });
  }

  // Update button states based on scroll position
  function updateButtonStates() {
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    const currentScroll = slider.scrollLeft;

    // Disable prev button at start
    if (currentScroll <= 1) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = '0.3';
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = '1';
    }

    // Disable next button at end
    if (currentScroll >= maxScroll - 1) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = '0.3';
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = '1';
    }
  }

  // Event listeners
  nextBtn.addEventListener('click', scrollNext);
  prevBtn.addEventListener('click', scrollPrev);
  slider.addEventListener('scroll', updateButtonStates);

  // Initial button state
  updateButtonStates();

  // Update on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      updateButtonStates();
    }, 250);
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for a swipe
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left - scroll right
        scrollNext();
      } else {
        // Swiped right - scroll left
        scrollPrev();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    // Check if slider is in viewport
    const rect = slider.getBoundingClientRect();
    const isInViewport = (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    if (isInViewport) {
      if (e.key === 'ArrowLeft') {
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        scrollNext();
      }
    }
  });

  // Auto-scroll functionality (optional - uncomment to enable)
  /*
  let autoScrollInterval;
  const autoScrollDelay = 5000; // 5 seconds

  function startAutoScroll() {
    autoScrollInterval = setInterval(function() {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const currentScroll = slider.scrollLeft;

      if (currentScroll >= maxScroll - 1) {
        // Reset to start
        slider.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
      } else {
        scrollNext();
      }
    }, autoScrollDelay);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  // Start auto-scroll
  startAutoScroll();

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoScroll);
  slider.addEventListener('mouseleave', startAutoScroll);

  // Pause on touch
  slider.addEventListener('touchstart', stopAutoScroll);
  */

  // Intersection Observer for animation on scroll into view
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Animate cards sequentially
        const cards = entry.target.querySelectorAll('.ncs-item-box');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe the industry section
  const industrySection = document.querySelector('.ncs-industry-section');
  if (industrySection) {
    sectionObserver.observe(industrySection);
  }

  // Add initial animation styles
  const cards = document.querySelectorAll('.ncs-item-box');
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

});

// QUALITY ASSURANCE SECTION Animations
document.addEventListener('DOMContentLoaded', function() {
  
  const qualityFeatures = document.querySelectorAll('.quality-feature');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const featureObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        featureObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  qualityFeatures.forEach((feature, index) => {
    // Add initial animation state
    feature.style.opacity = '0';
    feature.style.transform = 'translateX(-30px)';
    feature.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    // Observe for animation
    featureObserver.observe(feature);
  });

  // Add animation styles via JavaScript
  const style = document.createElement('style');
  style.textContent = `
    .quality-feature.visible {
      opacity: 1 !important;
      transform: translateX(0) !important;
    }
    
    .quality-card {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.8s ease forwards;
      animation-delay: 0.3s;
    }
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

});


// ================= FOOTER JAVASCRIPT =================

// Automatically update the current year in the footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
  }
});

// Optional: Smooth scroll for internal footer links
document.querySelectorAll('.footer a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Optional: Add animation on scroll (if you want footer to animate when it comes into view)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const footerObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('footer-visible');
    }
  });
}, observerOptions);

const footer = document.querySelector('.footer');
if (footer) {
  footerObserver.observe(footer);
}

// Optional CSS for animation (add to your CSS file)
/*
.footer {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.footer.footer-visible {
  opacity: 1;
  transform: translateY(0);
}
*/

// About

// ================= ABOUT SECTION JAVASCRIPT =================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== Scroll Animation Observer ==========
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };
  
  // Create intersection observer for fade-in animations
  const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        // Optional: stop observing after animation
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe about sections
  const aboutTop = document.querySelector('.about-top');
  const aboutBottom = document.querySelector('.about-bottom');
  const historyContent = document.querySelector('.history-content');
  const imageWrapper = document.querySelector('.about-image-wrapper');
  
  if (aboutTop) fadeInObserver.observe(aboutTop);
  if (aboutBottom) fadeInObserver.observe(aboutBottom);
  if (historyContent) fadeInObserver.observe(historyContent);
  if (imageWrapper) fadeInObserver.observe(imageWrapper);
  
  
  // ========== Parallax Effect on Scroll (Optional) ==========
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const aboutTopSection = document.querySelector('.about-top');
    
    if (aboutTopSection) {
      const yPos = scrolled * 0.3;
      aboutTopSection.style.transform = `translateY(${yPos}px)`;
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  
  // ========== Typing Effect for Heading (Optional) ==========
  function typeWriterEffect(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  // Uncomment to enable typing effect on the h1
  /*
  const aboutHeading = document.querySelector('.about-top h1');
  if (aboutHeading) {
    const originalText = aboutHeading.textContent;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          typeWriterEffect(aboutHeading, originalText, 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(aboutHeading);
  }
  */
  
  
  // ========== Read More / Less Functionality (Optional) ==========
  // If you want to add a "Read More" button for long content
  function initReadMore() {
    const historyContent = document.querySelector('.history-content');
    const paragraphs = historyContent.querySelectorAll('p');
    
    // If there are more than 2 paragraphs, hide the rest initially
    if (paragraphs.length > 2) {
      const hiddenParagraphs = Array.from(paragraphs).slice(2);
      
      // Create Read More button
      const readMoreBtn = document.createElement('button');
      readMoreBtn.className = 'read-more-btn';
      readMoreBtn.textContent = 'Read More';
      readMoreBtn.style.cssText = `
        background: linear-gradient(135deg, #4D8BFF 0%, #3a6fd9 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 50px;
        font-size: 1.4rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 20px;
        transition: all 0.3s ease;
      `;
      
      // Hide extra paragraphs initially
      hiddenParagraphs.forEach(p => {
        p.style.display = 'none';
        p.classList.add('hidden-paragraph');
      });
      
      // Toggle functionality
      let isExpanded = false;
      readMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        hiddenParagraphs.forEach(p => {
          p.style.display = isExpanded ? 'block' : 'none';
        });
        
        readMoreBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
      });
      
      // Hover effect
      readMoreBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(77, 139, 255, 0.4)';
      });
      
      readMoreBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
      
      // Append button to history content
      historyContent.appendChild(readMoreBtn);
    }
  }
  
  // Uncomment to enable Read More functionality
  // initReadMore();
  
  
  // ========== Counter Animation for Stats (if you add them later) ==========
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = Math.floor(target);
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start);
      }
    }, 16);
  }
  
  // Example usage (if you add stat counters):
  /*
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector('.stat-number');
        const target = parseInt(counter.dataset.target);
        animateCounter(counter, target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
  });
  */
  
});


// ========== Additional CSS for Animations (Add to your CSS file) ==========
/*
.about-top,
.about-bottom,
.history-content,
.about-image-wrapper {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.about-top.animate-in,
.about-bottom.animate-in,
.history-content.animate-in,
.about-image-wrapper.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.history-content.animate-in {
  transition-delay: 0.2s;
}

.about-image-wrapper.animate-in {
  transition-delay: 0.3s;
}
*/

// WHY CHOOSE US SECTION

// ================= WHY CHOOSE US SECTION JAVASCRIPT =================

document.addEventListener('DOMContentLoaded', function() {
  
  // ========== Scroll Animation for Features ==========
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Animate each feature item when it comes into view
  const featureObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay for each item
        setTimeout(() => {
          entry.target.classList.add('feature-visible');
        }, index * 150);
        
        featureObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all feature items
  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach(item => {
    item.classList.add('feature-hidden');
    featureObserver.observe(item);
  });
  
  
  // ========== Section Header Animation ==========
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  const sectionHeader = document.querySelector('.why-us .section-header');
  if (sectionHeader) {
    sectionHeader.classList.add('section-hidden');
    sectionObserver.observe(sectionHeader);
  }
  
  
  // ========== Counter Animation for Numbers (if you add stats) ==========
  function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      element.textContent = current + '+';
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  
  // Example usage (if you add stat counters):
  /*
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count);
        animateValue(counter, 0, target, 2000);
        statsObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.stat-counter').forEach(counter => {
    statsObserver.observe(counter);
  });
  */
  
  
  // ========== Parallax Effect on Background ==========
  let ticking = false;
  
  function updateParallax() {
    const whySection = document.querySelector('.why-us');
    if (!whySection) return;
    
    const rect = whySection.getBoundingClientRect();
    const scrolled = window.pageYOffset;
    
    // Only apply parallax when section is in view
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const yPos = (scrolled - whySection.offsetTop) * 0.3;
      const bgElement = whySection.querySelector('::before');
      if (whySection.style) {
        whySection.style.backgroundPositionY = `${yPos}px`;
      }
    }
    
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  
  
  // ========== Feature Item Click Analytics (Optional) ==========
  featureItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      const featureName = this.querySelector('h3').textContent;
      console.log(`Feature clicked: ${featureName}`);
      
      // Optional: Add a subtle pulse effect on click
      this.style.animation = 'pulse 0.5s ease';
      setTimeout(() => {
        this.style.animation = '';
      }, 500);
    });
  });
  
  
  // ========== Dynamic Badge Color Change on Scroll ==========
  const badge = document.querySelector('.section-badge');
  if (badge) {
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const hue = 210 + (scrollPercent * 0.5); // Subtle color shift
      badge.style.filter = `hue-rotate(${hue - 210}deg)`;
    });
  }
  
  
  // ========== Hover Sound Effect (Optional - requires audio file) ==========
  /*
  const hoverSound = new Audio('path/to/hover-sound.mp3');
  hoverSound.volume = 0.2;
  
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      hoverSound.currentTime = 0;
      hoverSound.play().catch(e => console.log('Audio play prevented'));
    });
  });
  */
  
  
  // ========== Mobile Touch Feedback ==========
  if ('ontouchstart' in window) {
    featureItems.forEach(item => {
      item.addEventListener('touchstart', function() {
        this.style.transform = 'scale(0.98)';
      });
      
      item.addEventListener('touchend', function() {
        this.style.transform = '';
      });
    });
  }
  
});


// ========== Additional CSS for Animations (Add to your CSS file) ==========
/*
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
}

.feature-hidden {
  opacity: 0;
  transform: translateY(30px);
}

.feature-visible {
  animation: fadeInUp 0.6s ease forwards;
}

.section-hidden {
  opacity: 0;
  transform: translateX(-30px);
}

.section-visible {
  animation: fadeInLeft 0.8s ease forwards;
}
*/

// cONTATCT US JS CODE

// ===================== CONTACT FORM JS =====================

// Select elements
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('successMessage');

// Input fields
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

// Email validation regex
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Show success message function
function showSuccess() {
  successMsg.classList.add('show');
  successMsg.style.display = "block";

  setTimeout(() => {
    successMsg.classList.remove('show');
    successMsg.style.display = "none";
  }, 5000);
}

// Real-time error border removal
document.querySelectorAll('#contactForm input, #contactForm textarea').forEach(input => {
  input.addEventListener('input', function () {
    this.style.borderColor = "#e0e0e0";
  });
});

// Form submit listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Validation checks
  if (fullName.value.trim() === "") {
    fullName.style.borderColor = "#d9534f";
    fullName.focus();
    return;
  }

  if (!emailPattern.test(email.value.trim())) {
    email.style.borderColor = "#d9534f";
    email.focus();
    return;
  }

  if (message.value.trim() === "") {
    message.style.borderColor = "#d9534f";
    message.focus();
    return;
  }

  // FORM IS VALID — Show success message
  showSuccess();

  // Reset the form
  form.reset();
});


// ===================== SMOOTH SCROLL FOR ANCHORS =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


// BLOG

// Fade-in animation on scroll
const blogHero = document.querySelector(".blog-hero");

blogHero.style.opacity = "0";
blogHero.style.transform = "translateY(40px)";
blogHero.style.transition = "0.9s ease-out";

function animateHero() {
  const rect = blogHero.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    blogHero.style.opacity = "1";
    blogHero.style.transform = "translateY(0)";
    window.removeEventListener("scroll", animateHero);
  }
}

window.addEventListener("scroll", animateHero);
animateHero();



// MAP

// Smooth fade-in when map enters viewport
const mapSection = document.querySelector(".map-section");

function revealMap() {
  const rect = mapSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    mapSection.style.opacity = "1";
    mapSection.style.transform = "translateY(0)";
    window.removeEventListener("scroll", revealMap);
  }
}

mapSection.style.opacity = "0";
mapSection.style.transform = "translateY(40px)";
mapSection.style.transition = "0.8s ease-out";

window.addEventListener("scroll", revealMap);
revealMap();



// mission vission ceritificate
// Smooth scroll for view buttons
document.querySelectorAll('.view-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetUrl = this.getAttribute('href');
        
        // Ripple effect on click
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = ripple.style.height = '0px';
        ripple.style.left = (e.clientX - rect.left) + 'px';
        ripple.style.top = (e.clientY - rect.top) + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        this.appendChild(ripple);
        
        // Navigate after animation
        setTimeout(() => {
            if(targetUrl && targetUrl !== '#') {
                window.open(targetUrl, '_blank');
            }
        }, 300);
    });
});

// Card intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.cert-card, .card').forEach(card => {
    observer.observe(card);
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.innerHTML = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
