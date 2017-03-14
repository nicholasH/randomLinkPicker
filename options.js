// Saves options to chrome.storage
function save_options() {
  var sfn = document.getElementById('selectFolderName');
  var folderName = sfn.options[sfn.selectedIndex].value;
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
// populates the folder options from folders in the bookmark bar 
// todo make find all folders 
async function restore_options() {
  chrome.storage.sync.get( "name", function(items) {
	  
	console.log("item "+items.name);
    document.getElementById('currentFolder').value = items.name;
	
	var select = document.getElementById("selectFolderName");
	
	getArray().then(v => {
		for(var i = 0;i <= v.length;i++){
			if(v[i].id !="0"){
				var el = document.createElement("option");
				el.textContent =v[i].title;
				el.value = v[i].title;
				select.appendChild(el);
			}

		}
	});
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',save_options);
	
	
function getFolders(x) {
	var folderArray = [];
  return new Promise(resolve => {
	  
	  chrome.bookmarks.getTree(function traverseBookmarks(bookmarkTreeNodes) {
		  
		for(var i=0;i<bookmarkTreeNodes.length;i++) {
		
			if(bookmarkTreeNodes[i].children) {
				traverseBookmarks(bookmarkTreeNodes[i].children);
				folderArray.push(bookmarkTreeNodes[i]);
		} 
		resolve(folderArray);
			
	} 
	  });  
  });
}

async function getArray() {
  var a = await getFolders();
  return await a ;
}





