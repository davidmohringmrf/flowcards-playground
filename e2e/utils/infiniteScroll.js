/* eslint-disable no-console */

const CARD_POSITIONER_TEST_ID = 'card-positioner';

const triggerInfiniteScroll = async(browser)=>{
	await browser.executeAsync(async(args, done) => {
		window.scrollTo(0, document.body.scrollHeight);

		done();
	}, '');
};

const isAttachedToEndOfPage = async(browser, cardSelector) => {

	const cardPositionetIsSticky = await browser.executeAsync(async(id, cardPositionerTestId, done) => {
		const getCardPositioner = (el) => {
			const parentEl = el.parentElement;

			if (parentEl.getAttribute('data-testid') !== cardPositionerTestId) {
				return getCardPositioner(parentEl);
			}

			return parentEl;
		};
		const card = document.querySelector(id);
		const cardPositioner = getCardPositioner(card);

		const isSticky = cardPositioner.getAttribute('style').includes('position: sticky');

		done(isSticky);
	}, cardSelector, CARD_POSITIONER_TEST_ID);

	return cardPositionetIsSticky;
};

module.exports = {
	triggerInfiniteScroll,
	isAttachedToEndOfPage
};
