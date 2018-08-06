// 散点图组建方法
var H5componentPoint = function(name,cfg){
  var component = new H5componentbase(name,cfg);
   var base = cfg.data[0][1]//以第一个数据为基础 比例按100%进行缩放
 //这里所有点都差在component组建里
  $.each(cfg.data,function (idx,item) {
      var point = $('<div class="point point_'+idx+' "></div>');
      var name = $('<div class="name">'+item[0]+'</div>')
      var rate = $('<div class="per">'+(item[1]*100)+'%'+'</div>')
       name.append(rate)
      point.append(name);
       var per = (item[1]/base*100)+'%';
       console.log(per);
       point.width(per).height(per);
       if(item[2]){
           point.css('background-color',item[2]);
       };
       // 这里要小心，他后悔等于0.导致if（）条件句会运行错误
       if(item[3] !==undefined && item[4] !==undefined){
           point.css('left',item[3]).css('top',item[4]);
       }
      component.append(point);
  })
    return component;

}