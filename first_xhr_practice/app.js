document.querySelector('#button1').addEventListener('click',loadCustomer);
document.querySelector('#button2').addEventListener('click',loadCustomers);
const outputField = document.querySelector('#customer')
const outputField2 = document.querySelector('#customers')

function loadCustomer(){
  const xhr = new XMLHttpRequest();

  // OPEN
  xhr.open('GET', 'customer.JSON', true);
  xhr.onload = function(){
    if(this.status === 200){
      const customer = JSON.parse(this.responseText);
      const output = `
      <ul>
        <li> ID: ${customer.id}</li>
        <li> Company: ${customer.company}</li>
        <li> Phone: ${customer.phone}</li>
      </ul>
      `
    outputField.innerHTML = output;
    }

  }
  xhr.send();

}
function loadCustomers(){
  const xhr = new XMLHttpRequest();

  // OPEN
  xhr.open('GET', 'customers.JSON', true);
  xhr.onload = function(){
    if(this.status === 200){
      const customers = JSON.parse(this.responseText);
      let output = ''
      customers.forEach((customer)=>{
        output += `
          <ul>
            <li> ID: ${customer.id}</li>
            <li> Company: ${customer.company}</li>
            <li> Phone: ${customer.phone}</li>
          </ul>
        `;
      });
      outputField2.innerHTML = output;

    }

  }
  xhr.send();

}