import SignInView from "../views/signInView.jsx";
import { reactive, watch } from 'vue';
import { signInUser, signInWithGoogle } from "/src/firebaseModel.js";

const SignIn = {
  props: ['prompt'], // A bit special how props are declared
  setup() {
    const compState = reactive({
      email: "",
      password: "",
      error: "",
    });

    function getSignInUserACB() {
      signInUser({ email: compState.email, password: compState.password });
    }

    function getSignInGoogleACB() {
      signInWithGoogle();
    }

    // Render of component state, returned below
    function renderACB() {
      return (
        <SignInView
          email={compState.email}
          password={compState.password}
          error={compState.error}
          setEmail={setEmailACB}
          setPassword={setPasswordACB}
          setSignIn={getSignInUserACB}
          onClickChange={getSignInGoogleACB}
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

export default SignIn;