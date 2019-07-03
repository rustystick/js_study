const http = new EasyHTTP;

//Get Users

// const users = http.get('https://jsonplaceholder.typicode.com/users')
//               .then(data => console.log(data))
//               .catch(err=> console.log(err));


const data = {
  name : 'John Doe',
  username : 'johndoe',
  email: 'jd@jd.com'
};


http.delete('https://jsonplaceholder.typicode.com/users/2')
                    .then(data=>console.log(data))
                    .catch(err =>console.log('there is an error' + err));