import { onBeforeUnmount, onMounted, ref, shallowRef, type Ref, type ShallowRef } from "vue";

export function useReveal(): {
  target: ShallowRef<HTMLElement | null>;
  isVisible: Ref<boolean>;
} {
  const target = shallowRef<HTMLElement | null>(null);
  const isVisible = ref(false);
  let observer: IntersectionObserver | null = null;

  onMounted(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || !target.value) {
      isVisible.value = true;
      return;
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          isVisible.value = true;
          observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(target.value);
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return { target, isVisible };
}
