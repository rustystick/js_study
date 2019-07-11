// Storage Controller

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
    items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookies', calories: 400},
            {id: 2, name: 'Eggs', calories: 30}
            ],
    currentItem: null,
    totalCaloreis: 0
  }

  //Public Methods
  return{
    logData: function(){
      return state;
    }
  }

})();


// UI Controller

const UICtrl = (()=>{
  
  //Public Methods
  return{

  }
})();

// App Controller

const App = ((ItemCtrl, UICtrl)=>{

  //Public methods
  return{
    init: function(){
      console.log('init ran')
    }
  }
})(ItemCtrl, UICtrl);

//Initialize App

App.init();