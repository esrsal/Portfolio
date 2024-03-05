import "/src/css/login.css";

function RegisterPage(props) {
    return (
        <div>
            <div className="create">Create an Account</div>
            <div className="register">
                <div >
                    <p> <input onChange={props.setEmail} type="email" placeholder="Email" value={props.email} /></p>
                    <p><input onChange={props.setPassword} type="password" placeholder="Password" value={props.password} /></p>
                    <p><button class="button" onClick={props.registerNow}>Create</button></p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;