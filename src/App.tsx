import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import MiniDrawer from './components/SideBar';
import Landing from './pages/Landing';

function App() {
  return (
  <>

<MiniDrawer/>
<div style={{padding:'5rem'}}>

  <Routes>
<Route path='/' element={<Landing/> } />
    {/* <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
  <Route path="/contact" element={<Contact />} /> */}

  </Routes>
  </div>
  </>
  );
}

export default App;
