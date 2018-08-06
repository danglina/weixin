// 柱图组建
var H5componentBar = function(name,cfg){
  var component = new H5componentbase(name,cfg);
  $.each(cfg.data,function (idx,item) {
      var line = $('<div class="line"></div>');//最外面的筐子
      var name = $('<div class="name"></div>');
      var rate = $('<div class="rate"></div>');
      var per= $('<div class="per"></div>');//百分比的筐子
      var width = item[1]*100 +'%';
      var bgstyle = '';
      //动态添加颜色，如果存在就添加到style样式里面
      if(item[2]){
          bgstyle = 'style="background-color:'+item[2]+'"'
      }
      rate.css('width',width);
      rate.html('<div class="bg"'+bgstyle+' ></div>')
      per.text(width);
      name.text(item[0]);
      line.append(name).append(rate).append(per);
      component.append(line)

  })
    return component;

}