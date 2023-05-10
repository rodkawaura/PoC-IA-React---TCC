import { useEffect, useState } from "react";
import './App.css'

function App() {

  const [token, setToken] = useState<any>([])
  const [answer, setAnswer] = useState<any>([])
  const [prompt, setPrompt] = useState<any>([])

  useEffect(() => {
    //authToken
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", "");

    var raw = JSON.stringify({
      "password": "poc-tcc-api"
    });

    fetch("https://api-poc-tcc.azurewebsites.net/api/v1/login", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(data => setToken(data))
      .catch(error => console.log('error', error));
  }, [])

  function submitQuestion() {
    //chat
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("access-token", token.token);

    var raw = JSON.stringify({
      "prompt": prompt
    });

    fetch("https://api-poc-tcc.azurewebsites.net/api/v1/chat", {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(data => setAnswer(data))
      .catch(error => console.log('error', error));
  }

  return (

    <body>
      <div>
        <a>token: {token.token}</a>
        <input name='inputPrompt' value={prompt} onChange={e => setPrompt(e.target.value)}></input>
        <button name='submit' onClick={submitQuestion}>Submit</button>
        <h1>{answer.chatResponse}</h1>

      </div>
    </body>
  )
}

export default App

