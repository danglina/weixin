// 柱图--垂直组建
var H5componentBar_v = function(name,cfg){
    //stage2 (1)duicommponent的初始化
  var component = new H5componentBar(name,cfg);

    //stage2 (2) 对柱状图放入width进行确定，计算
     var width = (100/cfg.data.length) >>0;
     component.find('.line').width(width + '%');

     $.each(component.find('.rate'),function () {
        var w = $(this).css('width')
        //stage2 (3) 对柱状图放入width进行确定，计算
        //对rate初始化
        $(this).height(w).width('');
    })

    $.each(component.find('.per'),function () {
        //stage2 (4)重整dom，将rate，添加到rate区，
        // 与色块区同级，
        $(this).appendTo($(this).prev());
    })


    return component;

}