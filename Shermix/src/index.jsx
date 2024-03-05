// This file is based on the index.jsx file provided by the teachers/written during the DH2642 labs
import "/src/teacherFetch.js";  // Protection against fetch() in infinite re-render
import { makeRouter } from "./vuejs/VueRoot.jsx";

// (1) ------------ application state (model) -----------
import model from "/src/CocktailModel.js";

// Make the app update when the model changes
import { reactive, watch } from "vue";
const reactiveModel = reactive(model);

// (2) ----------  display (mount) the root component in the browser page. Pass model(1) as prop. ---------
// http://localhost:8080/vue.html

import { createApp, h } from "vue";
window.React = { createElement: h };  // Needed in the project because it works with both React and Vue

import VueRoot from "./vuejs/VueRoot.jsx";
import connectToFirebase from "./firebaseModel.js";
const app = createApp(<VueRoot model={reactiveModel} />);
app.use(makeRouter(reactiveModel));

app.mount('#root'); // Mounts the app in the page DIV with the id "root"
// to see the DIV, look at vue.html in the developer tools Sources
// vue.html, with the content <div id="root"></div> is configured in vite.config.js
reactiveModel.getAllIngredients();

// ------ for debug purposes ----------
window.myModel = reactiveModel;

connectToFirebase(reactiveModel, watch);