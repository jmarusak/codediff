// src/App.js
import React from 'react';
import Chatbot from './components/Chatbot';
import TextEditor from './components/TextEditor';
import './App.css';

const App = () => {
  const handleChange = (newContent) => {
    console.log("Editor content:", newContent);
  };

  const sampleCode = ` 
package main\n

func main() {\n
    fs := http.FileServer(http.Dir("./static"))\n\r
    http.Handle("/", fs)

	port := os.Getenv("PORT")
	if port == "" {\r\n
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	log.Printf("Listening on port %s", port)
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
}
`;

  return (
    <div className="app-container">
      <div className="component-container">
        <Chatbot />
      </div>
      <div className="component-container">
        <TextEditor placeholder={sampleCode} onChange={handleChange} />
      </div>
      <div className="component-container">
        <TextEditor placeholder="Type something here..." onChange={handleChange} />
      </div>
    </div>
  );
};

export default App;
