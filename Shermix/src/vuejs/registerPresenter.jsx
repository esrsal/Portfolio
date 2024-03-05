import RegisterPage from "../views/registerView";
import { reactive, watch } from 'vue';
import { register } from "/src/firebaseModel.js";

const Register = {
  props: ['prompt'], // A bit special how props are declared
  setup() {
    const compState = reactive({
      email: "",
      password: "",
      error: "",
    });

    function registerUserACB() {
      register({ email: compState.email, password: compState.password });
    }

    // Render of component state, returned below
    function renderACB() {
      return (
        <RegisterPage
          email={compState.email}
          password={compState.password}
          setEmail={setEmailACB}
          setPassword={setPasswordACB}
          registerNow={registerUserACB}
        />
      );
      function setEmailACB(evtEmail) { compState.email = evtEmail.target.value; }
      function setPasswordACB(evtPassword) { compState.password = evtPassword.target.value; }
    }

    // Renders the object, read on the function watch & reactive, test the functions 
    // side effect in component state 
    watch(function checkACB() {
      return [compState.email, compState.password];
    }, function effectACB() {
    });
    return renderACB;
  },
};

export default Register;