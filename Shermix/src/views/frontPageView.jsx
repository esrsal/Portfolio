import glass from '/src/images/olena.jpg'
import randomCocktail from '/src/images/emily.jpg'
import video from '/src/images/pexels-anthony-shkraba-7509494 (1080p).mp4'
import "/src/css/front.css";

function FrontPageView(props) {
	return (
		<div>
			<div className="frontPage">
				<video autoPlay loop muted plays-inline className="video">
					<source src={video}></source>
				</video>
				<div>
					<div className="imagePosition">
						<div className="image" onClick={enterCocktailACB}>
							<img className="frontPageImg" src={randomCocktail} alt="Random cocktails" />
							<div className="imageOverlay">
								<div className="imageTitle">Cocktails</div>
							</div>
						</div>
						<div className="image" onClick={enterMocktailACB}>
							<img className="frontPageImg" src={glass} alt="Cocktails by glass" />
							<div className="imageOverlay">
								<div className="imageTitle">Mocktails</div>
							</div>
						</div>
					</div>
				</div>
				<section>
					<div className='front-intro'>
						<h1>This is SherMix </h1>
						<p><h3>Welcome to Shermix - Your Personal Cocktail Discovery Platform!</h3>
							We're a dynamic team of students with a shared passion for mixology and web innovation.
							Our journey with Shermix began with a simple question:
							"What if finding the perfect cocktail could be as exciting as sipping one?"
							At Shermix, we believe that everyone has a mixologist within them,
							waiting to explore the vast and vibrant world of cocktails.
							Our mission is to make this exploration effortless, enjoyable,
							and full of surprises. Whether you're a seasoned cocktail enthusiast or just starting to explore,
							Shermix is your go-to destination.</p>
					</div>
				</section>
			</div>
		</div>
	);

	function enterCocktailACB() {
		window.location.hash = "#/random";
		props.onClickChange();

	}

	function enterMocktailACB() {
		window.location.hash = "#/mocktail";
		props.onClickChangeTo();
	}
}
export default FrontPageView;