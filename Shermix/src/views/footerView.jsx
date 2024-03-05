import "/src/css/footer.css";

function FooterView() {

    function aboutUsACB() {
        window.location.hash = "#/aboutus"
    }

    return (
        <div className="main-footer" >
            <div className="rows">
                <ul>
                    <div>SHERMIX |
                        <a onClick={aboutUsACB}> About Us | </a>
                        <a href="https://icons8.com/">Icons by Icons8</a>
                    </div>
                </ul>
                <div>Made with 🧡 &copy;{new Date().getFullYear()}</div>
            </div>
        </div>
    );
}

export default FooterView;