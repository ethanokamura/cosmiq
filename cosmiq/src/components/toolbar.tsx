import { type Editor } from "@tiptap/react";
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaHeading, FaListUl, FaListOl, FaFileCode, FaUndo, FaRedo, FaPlus } from "react-icons/fa";
import { FaRegCircleXmark } from "react-icons/fa6";
import Tooltip from "./tooltip";

type Props = {
  editor: Editor | null;
}

export default function ToolBar({ editor } : Props) {

  if (!editor) {
    return null
  }

  return (
    <div className="toolbar">
      <Tooltip hintText="Heading 1">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
          >
          <FaHeading size={14}/>
          <span className="text-xs">1</span>
        </button>
      </Tooltip>
      <Tooltip hintText="Heading 2">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          <FaHeading size={14}/>
          <span className="text-xs">2</span>
        </button>
      </Tooltip>
      <Tooltip hintText="Heading 3">
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          <FaHeading size={14}/>
          <span className="text-xs">3</span>
        </button>
      </Tooltip>
      <Tooltip hintText="Bold">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
            .chain()
            .focus()
            .toggleBold()
            .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
          >
          <FaBold size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Italic">
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
          >
          <FaItalic size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Strike-through">
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
          >
          <FaStrikethrough size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Clear Styling">
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <FaRegCircleXmark size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Unordered-List">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
          <FaListUl size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Ordered-List">
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FaListOl size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Inline Code">
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <FaCode size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Code Block">
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <FaFileCode size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Page Break">
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <FaPlus size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Undo">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
          }
          >
          <FaUndo size={14}/>
        </button>
      </Tooltip>
      <Tooltip hintText="Redo">
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
          }
          >
          <FaRedo size={14}/>
        </button>
      </Tooltip>
    </div>
  )
}