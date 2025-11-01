import { useEffect } from 'react';
import { analytics } from '../lib/analytics';

export function useSectionView(section: string) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            analytics.view(section);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector(`[data-section="${section}"]`);
    if (element) {
      observer.observe(element);
    } else {
      analytics.view(section);
    }

    return () => observer.disconnect();
  }, [section]);
}
