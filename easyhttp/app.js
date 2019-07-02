const http = new easyHTTP();

//get Post

//http.get('https://jsonplaceholder.typicode.com/posts', function(err, post){
//  console.log(post)})


const data = {
  title: 'Custom Post',
  body: 'this is a custom post'
};

// http.post('https://jsonplaceholder.typicode.com/posts',data, (err, post)=>{
//   if(err){
//     console.log(err + '404');
//    }else{
//       console.log(post);
//     }
// });

// http.put('https://jsonplaceholder.typicode.com/posts/1', data, (err,post)=>{
//   if (err){
//     console.log(err);
//   }else{
//     console.log(post);
//   }
// })



http.delete('https://jsonplaceholder.typicode.com/posts/1', function(err, post){
 console.log(post)})