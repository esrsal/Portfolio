import "/src/css/login.css";

function SignInView(props) {
    return (
        <div>
            <div className="create">Sign In</div>
            <div className="register">
                <div>
                    <p><input onChange={props.setEmail} type="email" placeholder="Email" value={props.email} /></p>
                    <p><input onChange={props.setPassword} type="password" placeholder="Password" value={props.password} /></p>
                    <p><button onClick={props.setSignIn}>Sign in</button></p>
                    <p><button onClick={signInGoogleACB}>Sign in with Google</button></p>
                </div>
            </div>
        </div>
    );

    function signInGoogleACB() {
        props.onClickChange();
    }
}

export default SignInView;