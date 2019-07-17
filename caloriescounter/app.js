// Storage Controller
const StorageCtrl = (()=>{



  // Public methods
  return {
    storeItem: (item)=>{
      let items;
      
      // Check if any items in ls
      if(localStorage.getItem('items') === null){
        items = [];
        //push new item
        items.push(item);
        // Set ls
      }else{
        // Get what is already in ls
        items = JSON.parse(localStorage.getItem('items'));
        //push new item
        items.push(item);
      }
      localStorage.setItem('items', JSON.stringify(items));
    },
    getItemsFromStorage: ()=>{
      let items;
      if(localStorage.getItem('items') === null){
        items =[];
      }else{
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: (updatedItem)=>{
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index)=>{
        if(updatedItem.id === item.id){
          items.splice(index,1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: (id)=>{
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach((item, index)=>{
        if (id === item.id){
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearLocalStorage: ()=>{
      localStorage.removeItem('items');
    }
  }
})();

// Item Controller
const ItemCtrl = (()=>{
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id;
    this.name = name;
    this.calories = calories;
  }

  //Data Structure / State
  const state ={
    // items: [
    //         {id: 0, name: 'Steak Dinner', calories: 1200},
    //         {id: 1, name: 'Cookies', calories: 400},
    //         {id: 2, name: 'Eggs', calories: 30}
    //         ],
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCaloreis: 0
  }

  //Public Methods
  return{
    getItems: ()=>{
      return state.items
    },
    addItem: (name, calories)=>{
      let Id;
      //create ID
      if(state.items.length > 0){
        Id = state.items[state.items.length-1].id + 1; 
      }else{
        Id = 0;
      }
      caloriesI = parseInt(calories)
      // Create new item
      newItem = new Item(Id, name, caloriesI);
      // Add to Items array
      state.items.push(newItem);
      return newItem;
    },
    getTotalCalories: ()=>{
      let total = 0;
      state.items.forEach((item)=>{
        total+=item.calories;
      });
      state.totalCalories = total;
      return state.totalCalories;
    },
    getItembyId: (id)=>{
      let found = null;
      //Loop through items
      state.items.forEach((item)=>{
        if (item.id === id){
          found = item;
        }
      })
      return found;
    },
    updateItem: (name, calories)=>{
      // Calories to number
      calories = parseInt(calories);
      let found = null;
      state.items.forEach((item)=>{
        if (item.id === state.currentItem.id){
          item.name = name;
          item.calories = calories;
          found = item;
        }
      });
      return found;
    },
    deleteItem: (id)=>{
      // Get ids
      let ids = state.items.map((item)=>{
        return item.id;
      });

      const index = ids.indexOf(id);

      //remove item 
      state.items.splice(index,1);
    },
    clearAllItems: ()=>{
      state.items=[];
    },
    setCurrentItem: (item)=>{
      state.currentItem = item;
    },
    getCurrentItem: ()=>{
      return state.currentItem;
    },
    logData : ()=>{
      return state;
    }
  }

})();


// UI Controller

const UICtrl = (()=>{
  const UISelectors ={
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }
  
  //Public Methods
  return{
    populateItemList: (items) => {
      let html ='';
      items.forEach((item)=>{
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
      </li>`;
      });

      //Insert list item
      document.querySelector(UISelectors.itemList).innerHTML=html;
    },
    getItemInput: ()=>{
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories:document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    getSelectors: ()=>{
      return UISelectors;
    },
    addListItem: (item)=>{
      //show the list 
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Add id
      li.id = `item-${item.id}`;
      // Add html
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`
      //  Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
      // Clear
    },
    updateListItem: (item)=>{
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Convert nodelist to array
      listItems = Array.from(listItems);
      listItems.forEach((listItem)=>{
        const itemId = listItem.getAttribute('id');
        if(itemId === `item-${item.id}`){
          document.querySelector(`#${itemId}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>`;
        }
      });

    },
    deleteListItem: (id)=>{
      document.querySelector(`#item-${id}`).remove();
    },
    clearAllItems: ()=>{
      Array.from(document.querySelectorAll(UISelectors.listItems)).forEach((item)=>{item.remove();})
    },
    
    clearInput: ()=>{
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value ='';
    },
    clearEditState: ()=>{
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    hideList: ()=>{
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCalories: (totalCalories)=>{
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    addItemToForm: ()=>{
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value =ItemCtrl.getCurrentItem().calories;
    },
    setEditState: ()=>{
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'block';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    }
  }
})();

// App Controller

const App = ((ItemCtrl, UICtrl, StorageCtrl)=>{
  //Load event listeners
  const loadEventListeners = function(){
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();
    // Add Item Event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    // Disable submit on enter
    document.addEventListener('keypress', (e)=>{
      if(e.keyCode === 13){
        e.preventDefault();
        return false;
      }
    })
    // Edit icon click event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

    // Back event
    document.querySelector(UISelectors.backBtn).addEventListener('click',(e)=>{UICtrl.clearEditState(); e.preventDefault();});

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  }

  // Add item submit
  const itemAddSubmit = (e)=>{
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();
    // Check for name and calories input
    if(input.name && input.calories){
      // Add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // Add item to the UI list
      UICtrl.addListItem(newItem);
      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Store in localstorage
      StorageCtrl.storeItem(newItem);
      UICtrl.clearInput();
    } 

    e.preventDefault();
  }

  const itemEditClick = (e) => {
    if(e.target.classList.contains('edit-item')){
      // Get list item id (item-0)
      const listId = e.target.parentElement.parentElement.id;
      // Break into an array
      const listIdArry = listId.split('-');
      const id = parseInt(listIdArry[1]);

      // Get Item
      const itemToEdit = ItemCtrl.getItembyId(id);
      
      ItemCtrl.setCurrentItem(itemToEdit);
      UICtrl.addItemToForm();
      UICtrl.setEditState();
    }

    e.preventDefault();
  }

  const itemUpdateSubmit = (e) => {
    // get Item Input
    const input = UICtrl.getItemInput();
    // Update item
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);
    // Update UI
    const totalCalories = ItemCtrl.getTotalCalories();
    UICtrl.showTotalCalories(totalCalories);
    UICtrl.updateListItem(updatedItem);
    // Update Local Storage
    StorageCtrl.updateItemStorage(updatedItem);
    UICtrl.clearEditState();


    e.preventDefault();
  }


  const itemDeleteSubmit = (e)=>{
    // GEt current item
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete from data structure
    ItemCtrl.deleteItem(currentItem.id);
    // Delete from UI

    UICtrl.deleteListItem(currentItem.id);

    // Delete from ls
    StorageCtrl.deleteItemFromStorage(currentItem.id);
    App.init();

    e.preventDefault();
  }

  const clearAllItemsClick = (e)=>{
    // deletes all items from state/datastructure
    ItemCtrl.clearAllItems();
    UICtrl.clearAllItems();
    StorageCtrl.clearLocalStorage();
    App.init();

    e.preventDefault();
  }


  //Public methods
  return{
    init: function(){
      // set initial state
      UICtrl.clearEditState();
      // Fetch items from state
      const items = ItemCtrl.getItems();

      //check if any items
      if(items.length ===0){
        UICtrl.hideList();
      }else{
        UICtrl.populateItemList(items);
      }

      // Populate list with item


      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories);


      //Load EVENT lISTENER
      loadEventListeners();

    }
  }
})(ItemCtrl, UICtrl, StorageCtrl);

//Initialize App

App.init();