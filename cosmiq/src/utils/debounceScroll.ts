import { scrollCaretIntoCenter } from "@/lib/tiptap-plugins";

// Debounce the scrollCaretIntoCenter function
export const debouncedScroll = debounce(scrollCaretIntoCenter, 50);

// Debounce function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number) {
  let timeoutId: number | undefined;
  return function executedFunction(...args: Parameters<T>): ReturnType<T> | void {
    const later = () => {
      timeoutId = undefined;
      func(...args);
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, wait);
  };
}