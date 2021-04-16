module.exports.scrollCardBy = async(browser, cardSelector, scrollByY)=>{
	await browser.executeAsync(async(cardSelectorBrowser, done) => {
		const cardElement = document.querySelector(`${cardSelectorBrowser}`);
		cardElement.parentElement.scrollBy(10, 10);

		done();
	}, cardSelector);
};