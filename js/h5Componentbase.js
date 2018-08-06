// 基本图文组建方法
  var H5componentbase = function(name,cfg){
  var cfg= cfg || {};
  // 把当前组建类型添加到样式中进行标记
  var cls =  ' H5_component_'+cfg.type;
  var id = ( 'H5_c'+Math.random()).replace('.','_')//用replace方法将.给替换掉_
  var component = $('<div class="h5_component '+cls+' H5_component_name_'+ name + '" id=" '+id+ '"></div>');
       //如果他满足条件就会怎样
       //  cfg.text && component.tcenterext(cfg.text);
        cfg.width && component.width(cfg.width/2);
        cfg.height && component.height(cfg.height/2);
        cfg.css && component.css(cfg.css);//放在背景之前以免被覆盖掉
        cfg.bg && component.css('background',"url("+cfg.bg+")");
        //这是      控制图片随着盒子的     增大而增大的
        cfg.bgSize && component.css('background-size',cfg.bgSize);
        cfg.bgs && component.css('background',cfg.bgs);

        if(cfg.center===true){
            // 这样是为了让他水平居中
            component.css({
                marginLeft: (cfg.width/4*-1)+'px',
                left:'50%'
            })
        }

        // 自定义的参数


      if(typeof cfg.onclick === 'function'){
            component.on('click',cfg.onclick);
      }
      component.on('onLeave',function () {
          //这个定时是在有delay的情况下，加的延迟
          setTimeout(function () {
              component.addClass(cls+'_leave')
                  .removeClass(cls+'_load');
              cfg.animateOut && component.animate(cfg.animateOut);
          },cfg.delay || 0)

          return false;
      })
      component.on('onLoad',function () {
          setTimeout(function () {
          component.addClass(cls+'_load')
                   .removeClass(cls+'_leave');
          cfg.animateIn && component.animate(cfg.animateIn);},cfg.delay || 0)
          return false;
      });
      return component;

  }