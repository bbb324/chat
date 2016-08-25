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

/*实时查询数据库并返回*/
$('.mmm').on('input propertychange', search);
$('.mmm').on('keydown', getEnter);
var st = '';
function search(e) {
  $.post('searchdata', {"name": this.value}, function (d) {

    for (var i = 0; i < d.length; i++) {
      st += '<li>' + d[i] + '</li>'
    }
    $('.comp').html('');
    $('.comp').html(st);
    st = '';
  })
}
/*查询显示*/
function getEnter() {
  if (event.keyCode == 13) {
    var st = '<div class="insertion">' + this.value + '</div>';
    $('.ins')[0].insertBefore($(st)[0], $('.mmm')[0]);
    $('.mmm')[0].value = '';
    console.log('enter')
  }
  if (event.which == 8) {
    if (this.value == '') {
      console.log(this.previousSibling);
      if (this.previousSibling != null) {
        this.previousSibling.remove();
      }
    } else {
      console.log('not null')
    }
  }
}