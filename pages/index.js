import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/fofo.jpg';
import { useState } from 'react';

const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)


const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>pianissimo</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Get song recommendations 🎹</h1>
          </div>
          <div className="header-subtitle">
            <h2>Just input the title, artist, and any extra details of a song so we can do our magic</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="start typing here... write the song name and any other details that might help it" className="prompt-box" value={userInput} onChange={onUserChangedText}
          />;
          <div className="promp-buttons">
            <a 
            className= {isGenerating ? 'generate-button loading' : 'generate-button'} 
            onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://www.buymeacoffee.com/zenyigoma3"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>buy me a coffee</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
