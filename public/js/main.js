(()=>{
  $.get('public/data/data.json', function(data){
    let moba = '';
    data.map(function(value, key){

      moba +=get_tmp(value);
    });
    $('.eating-list').html(moba);
  })
})();

var get_tmp = (option) => {
  let tmp = '';
  tmp = '<li><span>'+ option.name +'</span><span>'+ option.address +'</span></li>';
  return tmp;
};

var getJSON = function (url) {
  var promise = new Promise(function (resolve, reject) {
    /*var client = new XMLHttpRequest();
     client.open('GET', url);
     client.onreadystatechange = handler;
     client.responseType = 'json';
     client.setRequestHeader('Accept', 'application/json');
     client.send();
     function handler() {
     if (client.readyState !== 4) {
     return;
     }
     if (client.status == 200) {
     resolve(client.response);
     } else {
     reject('123')
     }
     }*/
    $.get(url, function (data) {
      resolve(data)
    })
  });
  return promise;
};

//promis 的拼接请求
getJSON('/public/data/data.json')
  .then(function (data) {
    console.log(data);
    return data[0].name;
  })
  .then(function (post) {
    getJSON('/public/data/' + post + '.json').then(function (d) {
      console.log(d);
    })
  });