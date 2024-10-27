import { useState } from 'react';
import * as Diff from 'diff';

import PromptBox from './components/PromptBox';
import ResponseBox from './components/ResponseBox';
import TextEditor from './components/TextEditor';
import './App.css';

const App = () => {
  const [codePrompt, setCodePrompt] = useState("");
  const [textResponse, setTextResponse] = useState("");
  const [codeResponse, setCodeResponse] = useState("");
  const [codeDiff, setCodeDiff] = useState("");

  const handleCodePromptInput = (codePrompt) => {
    setCodePrompt(codePrompt);
  };

  const handlePromptSubmit = async (promptText) => {
    const promptFinal = `${promptText}, return entire modifies context\n\nCONTEXT:\n${codePrompt}\nOUTPUT INSTRUCTION: Format output in JSON schema {"code":sting, "explanation":string}\n`;

    try {
      const response = await fetch("http://localhost:8080/generate", {
        method: "POST",
        body: JSON.stringify({ message: promptFinal }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      setTextResponse(markdownToHtml(data.explanation));
      setCodeResponse(data.code);

      const diffResult = compareCode(codePrompt, data.code);
      setCodeDiff(diffResult);
    }
    catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container" >
      <div>
        <PromptBox onSubmit={handlePromptSubmit}/>
        <ResponseBox value={textResponse}/>
      </div>
      <div className="editors-container">
        <div className="component-container">
          <TextEditor value={codePrompt} editable="true" onInput={handleCodePromptInput}/>
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

const compareCode = (before, after) => {
  const lineDiff = Diff.diffLines(before, after, { ignoreWhitespace: true });
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

const markdownToHtml = (markdownText) => {
  const htmlText = markdownText
    .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
    .replace(/`(.*?)`/g, '<span style="font-family: monospace; background-color: #f0f0f0;">$1</span>')
    .replace(/\n/g, '<br>');
  return '<p>' + htmlText + '</p>';
};

export default App;
