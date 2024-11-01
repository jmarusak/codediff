import { useState } from "react";
import "./PromptBox.css";

const PromptBox = ({ onSubmit, onPaste, onCopy }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    onSubmit(prompt);
  };
  const handlePaste = () => {
    onPaste();
  };
  const handleCopy = () => {
    onCopy();
  };

  return (
    <div className="prompt-inputbox-container">
      <textarea
        id="prompt"
        rows="1"
        className="prompt-inputbox-textarea"
        placeholder="Type your GPT prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="prompt-button" onClick={handleSubmit}>
        Submit Prompt
      </button>
      <button className="prompt-button" onClick={handlePaste}>
        Paste Context 
      </button>
      <button className="prompt-button" onClick={handleCopy}>
        Copy Response 
      </button>
    </div>
  );
};

export default PromptBox;
