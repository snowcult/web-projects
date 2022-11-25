// varables
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const twitterButton = document.querySelector('#twitter');
const nextQuote = document.querySelector('.new-quote');
const loader = document.querySelector('#loader');
const copyText = document.querySelector('#copy-text');

function showLoadingSpinner() {
	quoteContainer.hidden = true;
	loader.hidden = false;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// get quote from api
async function getQuote() {
	showLoadingSpinner();
	// proxy origin
	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

	// quote url
	const apiUrl =
		'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();
		//checking author field
		if (data.quoteAuthor === '') {
			quoteAuthor.innerHTML = 'Unknown!';
		} else quoteAuthor.innerHTML = data.quoteAuthor;
		// reduce font
		if (data.quoteText.length > 60) {
			quoteText.classList.add('long-quote');
		} else {
			quoteText.classList.remove('long-remove');
		}

		quoteText.innerHTML = data.quoteText;
		console.log(data);
		removeLoadingSpinner();
	} catch (error) {
		const count = Math.round(Math.random() * 20);
		if (count < 10) {
			getQuote();
		}
		console.log('no quote from server', error);
	}
}

function tweetQuote() {
	const quote = quoteText.innerHTML;
	const author = quoteAuthor.innerHTML;

	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);
nextQuote.addEventListener('click', getQuote);

// clipboard
copyText.addEventListener('click', () => {
	let input = `${quoteText.innerHTML} - ${quoteAuthor.innerHTML}`;

	// to copy clipboard
	navigator.clipboard.writeText(input);
});
getQuote();
