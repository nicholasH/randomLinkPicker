


document.addEventListener('DOMContentLoaded', function() {

chrome.bookmarks.getTree(traverseBookmarks);


//var bookmarkTreeNodes = chrome.bookmarks.getTree(function(bookmarkTreeNodes) {console.log(bookmarkTreeNodes);});

})

function traverseBookmarks(bookmarkTreeNodes) {
	
	chrome.storage.sync.get("name", function(n){
		for(var i=0;i<bookmarkTreeNodes.length;i++) {
        //console.log(bookmarkTreeNodes[i].title, bookmarkTreeNodes[i].url ? bookmarkTreeNodes[i].url : "[Folder]");
		
	
			console.log("test"+n)
			if(bookmarkTreeNodes[i].title == n.name){
				console.log("found it"+i);
				getRandomLink(bookmarkTreeNodes[i].children);
				return;
			}
			if(bookmarkTreeNodes[i].children) {
				traverseBookmarks(bookmarkTreeNodes[i].children);
			} 

    }	
			
	})	

}
function getRandomLink(bookmarkTreeNodes){
	ran =  Math.floor(Math.random() * (bookmarkTreeNodes.length));
	console.log(ran)
	ranUrl = bookmarkTreeNodes[ran].url;
	chrome.tabs.create({ url: ranUrl });
	
}
