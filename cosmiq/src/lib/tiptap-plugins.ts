import { Editor } from "@tiptap/core";

let scrollTimeout: any;

export function scrollCaretIntoCenter(editor: Editor) {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const { from } = editor.state.selection;
    const start = editor.view.coordsAtPos(from);
  
    const container = document.getElementById("editor-scroll-container");
    if (!container) return;
  
    const containerRect = container.getBoundingClientRect();
    const offsetY = start.top - containerRect.top;
  
    const scrollTop = container.scrollTop;
    const containerHeight = container.clientHeight;
  
    const targetScroll = scrollTop + offsetY - containerHeight / 2;
  
    container.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }, 50);
}
