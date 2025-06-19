import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactRoot from '/src/Presenter/root.jsx'; 
import model from '/src/Model/model.js';  
import '/src/Css/index.css';
import { observable, configure , reaction} from "mobx";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

configure({ enforceActions: "never" }); 

const reactiveModel= observable(model);

if(true){
  root.render(
    <React.StrictMode>
      <ReactRoot model={model} />
    </React.StrictMode>
  );
}


