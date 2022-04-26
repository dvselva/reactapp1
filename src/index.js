import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AboutComponent from './AboutComponent';
import ServicesComponent from './ServicesComponent';
import NavbarComponent from './NavbarComponent';
import ContactsComponent from './ContactsComponent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="about" element={<AboutComponent />} />
        <Route path="services" element={<ServicesComponent />} />
        <Route path="contactus" element={<ContactsComponent />} />
      </Routes>
    </BrowserRouter>,


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
