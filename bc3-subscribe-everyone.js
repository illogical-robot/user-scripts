// ==UserScript==
// @name Basecamp 3: Subscribe everyone button (Chrome)
// @author Corbin Davenport
// @include https://3.basecamp.com/*
// @version 1.0
// @grant none
// ==/UserScript==

function subscribeEveryone() {
	// Check all people who aren't already subscribed
	$("div[data-controller='checkbox-group'").find("input[id='subscriptions_']").prop("checked", true)
	// Select 'Send new peopel the to-do right now' radio button
	$("#notify_true").prop("checked", true)
	// Click 'Save changes' button
	$("input[type='submit']").trigger("click")
}

function injectSubscribeButton() {
	if ($("#add-everyone-button").length) {
		// The button already exists, so don't do anything
	} else {
		var subscribeLink = $(".thread__subscribers a").attr("href") + "#addeveryone"
		var button = '<a class="btn btn--small" id="add-everyone-button" href="' + subscribeLink + '">Add everyone</a>'
		$(".perma-toolbar span:first").prepend(button)
	}
}

function init() {
	if ($(".perma-toolbar").length && $(".todo__header").length) {
		// If the user is on a todo page and the toolbar exists
		injectSubscribeButton()
	} else if (window.location.href.includes("subscription/edit#addeveryone")) {
		// If the user is on a subscribe page and the "Add everyone" button was clicked
		subscribeEveryone()
	}
}

init()

// Select the node that will be observed for mutations
var targetNode = document.documentElement || document.body;

// Options for the observer (which mutations to observe)
var config = { childList: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
	for(var mutation of mutationsList) {
		init()
	}
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
