(()=>{
  $.get('public/data/data.json', function(data){
    let moba = '';
    data.map(function(value, key){

      moba +=get_tmp(value);
    })
    $('.eating-list').html(moba);
  })
})();

var get_tmp = (option) => {
  let tmp = '';
  tmp = '<li><span>'+ option.name +'</span><span>'+ option.address +'</span></li>';
  return tmp;
}