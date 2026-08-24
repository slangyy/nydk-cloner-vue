import { onBeforeUnmount } from "vue";

interface WheelNavigationOptions {
  readonly threshold?: number;
  readonly idleDelay?: number;
}

interface WheelNavigation {
  handleWheel: (event: WheelEvent) => void;
}

export function useWheelNavigation(
  showPrevious: () => void,
  showNext: () => void,
  options: WheelNavigationOptions = {},
): WheelNavigation {
  const threshold = options.threshold ?? 28;
  const idleDelay = options.idleDelay ?? 180;
  let accumulatedDelta = 0;
  let isGestureHandled = false;
  let idleTimer: number | undefined;

  function resetGesture(): void {
    accumulatedDelta = 0;
    isGestureHandled = false;
    idleTimer = undefined;
  }

  function handleWheel(event: WheelEvent): void {
    event.preventDefault();

    if (idleTimer !== undefined) {
      window.clearTimeout(idleTimer);
    }
    idleTimer = window.setTimeout(resetGesture, idleDelay);

    if (isGestureHandled) {
      return;
    }

    const rawDelta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
      ? event.deltaY
      : event.deltaX;
    const deltaMultiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? window.innerHeight
        : 1;
    accumulatedDelta += rawDelta * deltaMultiplier;

    if (Math.abs(accumulatedDelta) < threshold) {
      return;
    }

    isGestureHandled = true;
    if (accumulatedDelta < 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  onBeforeUnmount(() => {
    if (idleTimer !== undefined) {
      window.clearTimeout(idleTimer);
    }
  });

  return { handleWheel };
}
