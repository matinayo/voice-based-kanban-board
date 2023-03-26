const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

let draggedItem = null; // item being dragged
let id = "b";

for (let i = 0; i < list_items.length; i++) {
	const item = list_items[i];
	
	//console.log(item);
	// on start of dragging item, remove item from list 
	item.addEventListener('dragstart', function () {
		draggedItem = item;
		setTimeout(function () {
			item.style.display = 'none';
		}, 0)
		console.log(draggedItem.id);
	});
	// on end of dragging card item
	item.addEventListener('dragend', function () {
		setTimeout(function () {
			draggedItem.style.display = 'block';
			draggedItem = null;
		}, 0);
	})

	for (let j = 0; j < lists.length; j ++) {
		const list = lists[j];
		// dragged over the list container
		list.addEventListener('dragover', function (e) {
			e.preventDefault();
		});
		
		// dragged into the list container
		list.addEventListener('dragenter', function (e) {
			e.preventDefault();
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
		});

		// drag away from list container
		list.addEventListener('dragleave', function (e) {
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});

		// drop in container, append item to the list container
		list.addEventListener('drop', function (e) {
			console.log('drop');
			this.append(draggedItem);
			this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
		});
	}
}