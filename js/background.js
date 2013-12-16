+function(){
	/*
	 * Must be in background page
	 * Disallowed on any other pages
	*/
	function clipboard(text){
		var copyDiv = document.createElement('div');
		document.body.appendChild(copyDiv);

		//Sets text for copying
		copyDiv.innerHTML = text;

		//Sets focus for selection purposes
		copyDiv.focus();
		document.execCommand('SelectAll');

		//Copys to clipboard
		document.execCommand('Copy');

		//Cleans up
		document.body.removeChild(copyDiv);
	}

	//Takes in data
	//Browser actions are not supported in content scripts
	chrome.browserAction.onClicked.addListener(function(){
		chrome.tabs.getSelected(null, function(tab){
			chrome.tabs.sendMessage(tab.id, {method: 'getHTML'}, function(response){
				clipboard(response.html);
			});
		});
	});
}();
