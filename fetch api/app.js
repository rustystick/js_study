document.getElementById('button1').addEventListener('click', getText);
document.getElementById('button2').addEventListener('click', getJSON);


function getText (){
  fetch('text.txt')
  .then(function(response){
    return response.text();
  })
  .then(function(data){
    document.getElementById('output').innerHTML += `${data}<br>`;
  })
}

function getJSON (){
  fetch('json.json')
  .then(function(res){
    return res.json();
  })
  .then(function(res){
    res.forEach((post)=>{
      document.getElementById('output').innerHTML += `${post.title}<br>`;
    })
  })
}