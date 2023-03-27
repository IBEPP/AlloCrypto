import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMessage, faHeart, faHandshake, faShare, faEllipsis} from '@fortawesome/free-solid-svg-icons'

library.add(faMessage, faHeart, faHandshake, faShare, faEllipsis)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

