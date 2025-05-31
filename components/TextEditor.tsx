"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}
export default function RichTextEditor({
  content,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
      Image.configure({
        allowBase64: true,
        HTMLAttributes: {
          class:
            "w-full max-w-[100%] sm:w-[80%] md:w-[60%] lg:w-[40%] mx-auto block h-auto rounded-md",
        },
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          "w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto border rounded-md p-2 sm:p-4 prose prose-sm sm:prose lg:prose-lg dark:prose-invert bg-white dark:bg-gray-900 min-h-[200px] focus:outline-none",
        spellCheck: "false",
        autocorrect: "off",
        autocapitalize: "off",
        translate: "no",
        "data-placeholder": "Start writing...",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
