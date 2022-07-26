
import PersonalDetails from "./components/PersonalDetails";
import PreviousAddress from "./components/PreviousAddress";

import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
 
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<PersonalDetails />} />
    <Route path="/address/:id" element={<PreviousAddress />} />
  </Routes>
   
   </BrowserRouter>
  )
}

export default App;
