// src/App.js
import { useState } from 'react';
import * as Diff from 'diff';

import PromptInputBox from './components/PromptInputBox';
import TextEditor from './components/TextEditor';

import './App.css';

const App = () => {
  const [codePrompt, setCodePrompt] = useState("");
  const [codeResponse, setCodeResponse] = useState("");
  const [codeDiff, setCodeDiff] = useState("");
  
  const handleCodePromptInput = (codeText) => {
    setCodePrompt(codeText);
  };

  const handlePromptSubmit = (promptText) => {
    // Call API to get response
    const modelResponse = fetchApiResponse(promptText);
    //setCodeResponse(modelResponse);
  }

    
    /*
    setCodeResponse(promptText);
    const diffResult = compareCode(codePrompt, promptText);
    setCodeDiff(diffResult);
    */

  const sampleCode = ` 
func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}
}
`
  return (
    <div className="app-container" >
      <div>
        <PromptInputBox onSubmit={handlePromptSubmit}/>
      </div>
      <div className="editors-container">
        <div className="component-container">
          <TextEditor value={sampleCode} editable="true" onInput={handleCodePromptInput}/>
        </div>
        <div className="component-container">
          <TextEditor value={codeResponse} editable="false"/>
        </div>
        <div className="component-container">
          <TextEditor value={codeDiff} editable="false"/>
        </div>
      </div>
    </div>
  );
};

const fetchApiResponse = async (promptText) => {
    // Simulate API call to a Gemini service
    try {
      const response = await fetch("http://localhost:8080/generate", {
        method: "POST",
        body: JSON.stringify({ message: promptText }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error('Error:', error);
    }
};

const compareCode = (before, after) => {
  const lineDiff = Diff.diffLines(before, after);
  let lineResult = lineDiff.map((part, index) => {
    const className = part.added ? 'added' : part.removed ? 'removed' : '';
    return (
      <div key={index} className={className}>
        {part.value}
      </div>
    );
  });
  return lineResult;
};

export default App;
