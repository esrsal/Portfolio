import "/src/css/header.css";

function HeaderView() {
  return (
    <div>
      <div className="header-container">
        <a href="/" className="logo">SHERMIX</a>
      </div>
      <div className="header-motto">We Turn Your Ingredients into Cocktail Masterpieces</div>
    </div>
  );
}

export default HeaderView;