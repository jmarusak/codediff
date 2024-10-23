// src/components/TextEditor.jsx

import React, { useState, useRef, useEffect } from "react";
import "./TextEditor.css";

const TextEditor = ({ placeholder = "Start typing...", onChange }) => {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (onChange) {
      onChange(content);
    }
  }, [content, onChange]);

  const handleInput = () => {
    const text = editorRef.current.innerText;
    setContent(text);
  };

  const handleFocus = () => {
    if (editorRef.current.innerText === placeholder) {
      editorRef.current.innerText = "";
    }
  };

  const handleBlur = () => {
    if (editorRef.current.innerText.trim() === "") {
      editorRef.current.innerText = placeholder;
    }
  };

  return (
    <div
      className="text-editor"
      contentEditable={true}
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      ref={editorRef}
      suppressContentEditableWarning={true}
    >
      {placeholder}
    </div>
  );
};

export default TextEditor;
