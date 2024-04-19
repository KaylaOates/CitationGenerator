import './App.css';
import { useState } from 'react';


function App() {
 const [URL, setURL] = useState('');
 const [output, setoutput] = useState('');
 const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-title')(),
  require('metascraper-date')()
]);

 return (
   <div className="App">
   Citation App
   <br></br>
   <label>
       URL
       <input
         value={URL}
         onChange={e => setURL(e.target.value)}
       />
     </label>
     <button onClick={() => {setoutput(URL); setURL('')}}>
       Enter
       </button>
       {output}
     
   </div>
 );
}


export default App;
