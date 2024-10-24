import React, { useState } from "react";
import "./PromptInputBox.css";

const PromptInputBox = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    onSubmit(prompt);
  };

  return (
    <div className="prompt-inputbox-container">
      <textarea
        id="prompt"
        rows="5"
        className="prompt-inputbox-textarea"
        placeholder="Type your LLM prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="prompt-submit-button" onClick={handleSubmit}>
        Submit Prompt
      </button>
    </div>
  );
}

export default PromptInputBox;
