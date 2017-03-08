// Saves options to chrome.storage
function save_options() {
  var folderName = document.getElementById('folderName').value;
  console.log("folername "+folderName);
  chrome.storage.sync.set({
    name: folderName,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
	document.getElementById('currentFolder').value = folderName;
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// get folder stored in chrome.storage.
// populates the folder options
function restore_options() {
  chrome.storage.sync.get( "name", function(items) {
	  
	console.log("item "+items.name);
    document.getElementById('currentFolder').value = items.name;
	
	var select = document.getElementById("selectFolderName");
	var options  = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {console.log(bookmarkTreeNodes);});

	console.log(options);
	
	
	
	
	
	
	for(var i = 0; i < options.length; i++) {
		var opt = options[i];
		var el = document.createElement("option");
		el.textContent = opt;
		el.value = opt;
		select.appendChild(el);
	}
	
	
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);