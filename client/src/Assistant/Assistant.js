import {React, useEffect, useState} from 'react';
import Header from '../Header';
import "./Assistant.css";
import axios from 'axios';

function Assistant() {
  const [formData, setFormdata] = useState({
    prompt: ""
  })

  const [chats, setChats] = useState([])
  const [responses, setResponses] = useState([])
  const handleChange = (event) => {
   
    const {name, value} = event.target;
    setFormdata({
      ...formData,
      [name] : value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChats([...chats, formData.prompt]);

    await axios.post('/gemini_prompt', {prompt:formData.prompt}).then(res => {
      setResponses([...responses, res.data.result])
      console.log(responses)
      console.log(chats)
    });

  }

  // useEffect(() => {

  // })

  

  console.log(responses)
  console.log(chats)

  return (
    <div>
        <Header />
        <div className ='Assistant-whole' >
        {/* <p>{chats}</p> */}
        {chats.length ? <div>
          {chats.map((item,i) => {
            return(<div>
              <p>user: {item} || gemini : {responses[i]}</p>
            </div>)
          })}
        </div> : <div> 

        </div>}
        <form onSubmit={handleSubmit}>
          <input placeholder='Enter your prompt here' name='prompt' size={190} className='Assistant-prompt' onChange={handleChange}></input>
          <button type='submit' className='Assistant-sendButton'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
  <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
</svg> </button>
        </form>
        </div>
    </div>
  )
}

export default Assistant