const { bootstrapExperience } = require('../../e2e/utils/bootstrap');
const { scrollTo } = require('../../e2e/utils/scroll');
const { touchCard } = require('../../e2e/utils/touch');
const { scrollCardBy } = require('../../e2e/utils/cardActions/scroll');
const { isAtSnapPoint } = require('../../e2e/utils/snapPoints');
const { isCardContentLoaded } = require('../../e2e/utils/cardContent');
const { expect } = require('chai');
const { getUrlFixture } = require('../../e2e/utils/fixtureUrl');
const experience = require('./homepage.json');

describe('homepage experience', function() {
	let config,
		fixture;
	const fixtureUrl = getUrlFixture({
		siteUrl: 'https://playground.marfeel.com/templates/article-skeleton.html',
		requestHostname: 'playground.marfeel.com',
		technology: 'web',
		experienceUrl: '/experiences/homepage/homepage.json'
	});

	// Setup
	before(async () => {
		config = experience;
		fixture = {
			url: fixtureUrl,
			articleTitle: 'Article example'
		};

		await bootstrapExperience(browser, config, fixture);
	});

	it('card should render on scroll', async function() {
		await scrollTo(browser, 400);

		const firstCard = await browser.$(config.cards.homepage.cardSelector);

		const firstCardExists = await firstCard.waitForExist({ timeout: 5000 });

		expect(firstCardExists).equal(true);
	});

	it('card should have right content', async function() {
		const rightContentLoaded = await isCardContentLoaded(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.content);

		expect(rightContentLoaded).equal(true);
	});

	it('card should be displayed in viewport at initial snap point', async()=>{
		await scrollTo(browser, 800);

		const firstCard = await browser.$(config.cards.homepage.cardSelector);

		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();

		expect(firstCardIsInViewport).equal(true);

		const isAtInitialSnapPoint = await isAtSnapPoint(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.initial);

		expect(isAtInitialSnapPoint).equal(true);
	});

	// fix minimise
	// it("minimise card and should be at minimised snap point", async ()=>{
	// 	await dragCardBy(browser, config.cards.homepage.cardSelector, 200)

	// 	const isAtMinimisedSnapPoint = await isAtSnapPoint(browser,
	// 		config.cards.homepage.cardSelector,
	// 		config.cards.homepage.snapPoints.minimised)

	// 	expect(isAtMinimisedSnapPoint).equal(true);
	// });

	it('activate card by click', async()=>{
		await touchCard(browser, config.cards.homepage.cardSelector);

		const isAtActiveSnapPoint = await isAtSnapPoint(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.active);

		expect(isAtActiveSnapPoint).equal(true);
	});

	it("close card by click when opened", async ()=>{
		/*
		* This test expects to run from a state with flowcard already active
	    */

		// Assure card is already in viewport
		const firstCard = await browser.$(config.cards.homepage.cardSelector);
		const firstCardIsInViewport = await firstCard.isDisplayedInViewport();
		expect(firstCardIsInViewport).equal(true);

		// Assure card is already active
		const isFlowcardActiveBeforeClosing = await isAtSnapPoint(browser,
			config.cards.homepage.cardSelector,
			config.cards.homepage.snapPoints.active)

		expect(isFlowcardActiveBeforeClosing).equal(true);

		await scrollCardBy(browser, config.cards.homepage.cardSelector, 800)

		// await browser.waitUntil(async (cardSelector) => {
		// 	const flowcardElement = document.querySelector(`${cardSelector} [data-testid="sticky-close-icon"]`)
		// 	var TouchSimulate = require('touch-simulate')
		// 	var touch = new TouchSimulate(flowcardElement, {
		// 		point: true
		// 	})

		// 	touch.start() // fire touchstart at center of element
		// 		.moveRight(150, false) // move right 150px, no touchend event
		// 		.wait(100) // wait 100ms
		// 		.moveDown(150, false)
		// 		.wait(100)
		// 		.moveLeft(150, false)
		// 		.wait(100)
		// 		.moveUp(150) // move up 150px and fire touchend
		// }, {
		// 	timeout: 5000,
		// 	interval: 500,
		// 	timeoutMsg: `Failed my awesome method`
		// });

		// browser.touchAction('//UITextbox', [
		// 	'press',
		// 	{ action: 'moveTo', x: 200, y: 0},
		// 	'release'
		// ])

		// await closeCard(browser, config.cards.homepage.cardSelector)

		// isAtMinimisedSnapPoint = await isAtSnapPoint(browser,
		// 	config.cards.homepage.cardSelector,
		// 	config.cards.homepage.snapPoints.minimised)

		// expect(isAtMinimisedSnapPoint).equal(true);
   });
});
