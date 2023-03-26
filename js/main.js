const list_items = document.querySelectorAll('.list-item');
const lists = document.querySelectorAll('.list');

for (let i = 0; i < list_items.length; i++) {
  const item = list_items[i];

    // on start of dragging item, remove item from list 
    item.addEventListener('dragstart', function() {
      draggedItem = item;
      setTimeout(function() {
        item.style.display = 'none';
      }, 0);
    });
    // on end of dragging card item
    item.addEventListener('dragend', function() {
      setTimeout(function() {
        draggedItem.style.display = 'block';
        draggedItem = null;
      }, 0);
    });
  

  for (let j = 0; j < lists.length; j++) {
    const list = lists[j];
    // dragged over the list container
    list.addEventListener('dragover', function(e) {
      e.preventDefault();
    });

    // dragged into the list container
    list.addEventListener('dragenter', function(e) {
      e.preventDefault();
      //this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
    });

    // drag away from list container
    list.addEventListener('dragleave', function(e) {
     // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    // drop in container, append item to the list container
    list.addEventListener('drop', function(e) {
      this.append(draggedItem);
     // this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });
  }
}

// automatic movement after 5 seconds
setTimeout(function() {
  const secondList = document.querySelectorAll('.list')[2]; // 0,1,2 -> rows of list
  const itemB = document.querySelector('#b');
  
  secondList.appendChild(itemB);
}, 5000);