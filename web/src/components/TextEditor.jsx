// src/components/TextEditor.jsx

import React, { useState, useRef, useEffect } from "react";
import "./TextEditor.css";

const TextEditor = ({ value, editable, onChange }) => {
  const editorRef = useRef(null);
  
  const handleInput = () => {
    const text = editorRef.current.innerText;
    onChange(text);
  };

  return (
    <div
      className="text-editor"
      contentEditable={editable}
      onInput={handleInput}
      ref={editorRef}
      suppressContentEditableWarning={true}
    >
      {value}
    </div>
  );
};

export default TextEditor;
