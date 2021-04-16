/* eslint-disable no-console */

const CARD_POSITIONER_TEST_ID = 'card-positioner';

const triggerInfiniteScroll = async(browser)=>{
	return await browser.executeAsync(async(args, done) => {
		window.scrollTo(0, document.body.scrollHeight);

		done();
	}, '');
};

const isAttachedToEndOfPage = async(browser, cardSelector) => {

	const cardPositionetIsSticky = await browser.executeAsync(async(id, done) => {
		const getCardPositioner = (el) => {
			const parentEl = el.parentElement;

			if (parentEl.getAttribute('data-testid') !== CARD_POSITIONER_TEST_ID) {
				return getCardPositioner(parentEl);
			}

			return parentEl;
		};

		const cardPositioner = getCardPositioner(document.querySelector(id));

		const isSticky = cardPositioner.getAttribute('style').includes('position: sticky');

		done(isSticky);
	}, cardSelector);

	return cardPositionetIsSticky;
};

module.exports = {
	triggerInfiniteScroll,
	isAttachedToEndOfPage
};
