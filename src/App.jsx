import React, {useEffect} from 'react'
import Form from './components/Form'
import {createStorage} from './libraries/storageMethods'

export const KeyAppContext = React.createContext('');

const App = () => {
  //constants
  const KEYAPP = import.meta.env.KEY_APP
  
  // Load the Todos already inserted
  useEffect(() => {
    createStorage(KEYAPP)
  })


  // Return the App component.
  return (
    <div className="container">
      <div className="flex flex-col mt-6">
        <div id="header" className="flex justify-center mb-3">
          <p className="font-sans font-medium text-white text-lg">
            TO-DO LIST
          </p>
        </div>
        <div id="main">
          <KeyAppContext.Provider value={KEYAPP}>
            <Form />
          </KeyAppContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;