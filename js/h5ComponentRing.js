// 环图组建
var H5componentRing = function(name,cfg){

  if(cfg.data.legth>1){
      // ------step1环形图应该有一个数据
      //如果多组数据，将他并未一组
      cfg.data = cfg.data[0];
  }
  //------step2, 重置参数，利用H5ComponnetPie，构建dom结构和js逻辑，也可定义他的样式
  cfg.type = 'pie';
  var component = new H5componentPie(name,cfg);
    //------step2,(2) 修建组建样式，重定义，得以支持新样式
    component.addClass('H5_component_ring');
    var mask = $('<div class="mask"></div>');

    //把新建好的mask层遮盖到组建当中
    component.append(mask);

    var text = component.find('.text');
    //这么做是为了将text的样式清空，并且重新定义样式
    text.attr('style','');
    if(cfg.data[0][2]){
        text.css('color',cfg.data[0][2]);
    }
    mask.append(text);
    return component;

}