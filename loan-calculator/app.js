//Listen for submit button

document.querySelector("#loan-form").addEventListener('submit', (e)=>{
  //hide results
  document.querySelector('#result').style.display = 'none';

  document.querySelector('#loading').style.display = 'block';
  
  setTimeout(calculateResults,2000);

  //show loader

  e.preventDefault();

});

function calculateResults(){
  //UI Vars
  const amount = document.querySelector('#amount');
  const interest = document.querySelector('#interest');
  const years = document.querySelector('#years');
  const monthlyPayment = document.querySelector('#monthly-payment');
  const totalPayment = document.querySelector('#total-payment');
  const totalInterest = document.querySelector('#total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100 /12;
  const calculatedPayment = parseFloat(years.value) * 12;

  //compute monthly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayment);
  const monthly = (principal * x *calculatedInterest)/(x-1)

  if(isFinite(monthly)){
    //show result
    document.querySelector('#result').style.display = 'block';
    //hide loader
    document.querySelector('#loading').style.display = 'none';
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly*calculatedPayment).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayment)-principal).toFixed(2);
  }else{
    createError('please check number');
  }

}

function createError(err){
  //show result
  document.querySelector('#result').style.display = 'none';
  //hide loader
  document.querySelector('#loading').style.display = 'none';
  const errorDiv = document.createElement('div');
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');
  errorDiv.className = 'alert alert-danger';
  errorDiv.appendChild(document.createTextNode(err));
  card.insertBefore(errorDiv,heading);
  setTimeout(()=>{document.querySelector('.alert').remove()},3000);

}