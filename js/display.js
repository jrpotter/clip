(function(){
	//Sends selected back to background page for copying to clipboard
	chrome.extension.onMessage.addListener(function(request, sender, sendMessage){
		if(request.method == 'getHTML') {
			
			//Creates document fragment containing all contained nodes
			var selection = window.getSelection().getRangeAt(0);
			var content = selection.cloneContents();
		
			//Adds to selected the selected nodes
			var selected = '';
			for(var i = 0, el; el = content.childNodes[i]; i++){
				if(el.outerHTML == undefined)  //Must be a text object
					selected += el.textContent;
				else selected += el.outerHTML
			}

			//The chrome API ignores symbols like < and >; replace to HTML equivalent
			selected = selected.replace(/</g, '&lt');
			selected = selected.replace(/>/g, '&gt');

			//Sends to background page to copy to clipboard
			sendMessage({html: selected});
		}
	});
}());
