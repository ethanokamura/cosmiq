import { Editor } from '@tiptap/react';

export const scrollCaretIntoCenter = (editor: Editor) => {
  if (!editor.view) {
    return;
  }

  const { state, view } = editor;
  const { from, to } = state.selection;

  if (from === to) {
    requestAnimationFrame(() => {
      try {
        const startPos = view.coordsAtPos(from);
        const endPos = view.coordsAtPos(to);
        const caretTopRelativeToViewport = (startPos.top + endPos.bottom) / 2;

        const proseMirrorElement = view.dom;

        if (proseMirrorElement) {
          const containerHeight = proseMirrorElement.clientHeight;
          const currentScrollTop = proseMirrorElement.scrollTop;
          const caretTopInDocument = caretTopRelativeToViewport + currentScrollTop;
          const scrollOffset = caretTopInDocument - containerHeight / 2;
          const scrollHeight = proseMirrorElement.scrollHeight;
          const maxScrollTop = scrollHeight - containerHeight;

          const clampedScrollOffset = Math.max(0, Math.min(scrollOffset, maxScrollTop));

          proseMirrorElement.scrollTo({
            top: clampedScrollOffset,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        console.error("Error during scrollCaretIntoCenter:", error);
      }
    });
  }
};