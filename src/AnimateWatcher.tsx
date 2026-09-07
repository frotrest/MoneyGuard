import { useEffect, type DependencyList } from 'react';

export const useAnimateOnScroll = (deps: DependencyList = []): void => {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-animate]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const type = target.dataset.animate;

            if (type && !target.classList.contains(`animate__${type}`)) {
              target.classList.add('animate__animated', `animate__${type}`);
              observer.unobserve(target);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (el.dataset.animate) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
