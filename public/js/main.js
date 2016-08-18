(()=>{
  $.get('public/data/data.json', function(data){
    data.map(function(value, key){
      get_tmp(value);
    })
  })
})();

(value) => {

}