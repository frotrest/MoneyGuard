import { useEffect } from 'react';

export const useAnimateOnScroll = (deps = []) => {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const type = entry.target.dataset.animate;
            if (type && !entry.target.classList.contains(`animate__${type}`)) {
              entry.target.classList.add(
                'animate__animated',
                `animate__${type}`
              );
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      const type = el.dataset.animate;
      if (type) observer.observe(el);
    });

    return () => observer.disconnect();
  }, deps);
};
