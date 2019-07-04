class EasyHTTP{
 //make an http get request
  async get(url){
    const response = await fetch(url);
    const resData = await response.json();
    return resData;
  }

  async post(url,data){
    const obj = {
      method : 'POST',
      headers : {
        'Content-type' : 'application/json'
      },
      body: `${JSON.stringify(data)}`
    }
    const response = await fetch(url,obj);
    const resData = await response.json();
    return resData;
  }

  put(url,data){
    const obj = {
      method : 'PUT',
      headers : {
        'Content-type' : 'application/json'
      },
      body: `${JSON.stringify(data)}`
    }
    return new Promise((resolve,reject) => {
      fetch(url,obj)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    })
  }

  
  delete(url){
    const obj = {
      method : 'DELETE',
      headers : {
        'Content-type' : 'application/json'
      }
    }
    return new Promise((resolve,reject) => {
      fetch(url,obj)
        .then(res => res.json())
        .then(() => resolve('Resource Deleted'))
        .catch(err => reject(err));
    })
  }

}