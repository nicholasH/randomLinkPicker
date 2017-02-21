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

// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get( "name", function(items) {
	  
	console.log("item "+items.name);
    document.getElementById('currentFolder').value = items.name;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);