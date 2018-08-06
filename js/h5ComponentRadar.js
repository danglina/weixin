// 雷达图组建
var H5componentRadar = function(name,cfg){
  var component = new H5componentbase(name,cfg);

    // 加入 一个画布-------背景层
    var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
    var  w = cfg.width;
    var  h = cfg.height;
    var  step = cfg.data.length;
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    component.append(cns);
    var r = w/2;

    ctx.beginPath();
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.stroke();

    //计算圆周坐标，（计算多边形原点坐标）
    //  已知圆心坐标（a，b）。半径 r：角度：deg;
     // rad = (2*Math.PI/360) * 360/step) * i ;
     // x = a + Math.sin(rad)*r
     // y = b + Math.cos(rad)*r
    //绘制网格背景
    var isBlue =false;
    for(var s = 10;s>0;s--){
        ctx.beginPath();
        for(var i =0;i<step;i++){
            var rad = (2*Math.PI/360) * (360/step) * i ;
            var  x = r + Math.sin(rad)*r *(s/10);
            var y = r + Math.cos(rad)*r*(s/10);
            ctx.lineTo(x,y);
        }
        ctx.fillStyle= (isBlue= !isBlue)? '#99c0ff':'#f1f9ff' ;
        ctx.closePath();
        ctx.fill()
    }

    //绘制伞骨
    for(var i =0;i<step;i++){
        var rad = (2*Math.PI/360) * (360/step) * i ;
        var  x = r + Math.sin(rad)*r;
        var y = r + Math.cos(rad)*r;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);

        //输出项目文字
         var text = $('<div class="text"></div>');
         text.text(cfg.data[i][0]);
         //通过下面语法将text里面的内容一次展现出来，给css样式加上延迟
         text.css('transition','all 1s '+i*.1+'s')
         if(x>w/2){
             text.css({
                 //因为画布时400*400设置的
                 'left':(x/2)+5,
                       })
         }else {
             text.css({
                 //因为画布时400*400设置的
                 'right':(w-x)/2+5,
             })
         }

        if(y>h/2){
            text.css({
                'top':(y/2)+5
            })
        }else {
            text.css({
                'bottom':(h-y)/2+5
            })
        }
        if(cfg.data[i][2]){
             text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);

         component.append(text)

    }
    ctx.strokeStyle= '#e0e0e0'
  ctx.stroke();
//----------------------------------------------------
    //数据开发
    // 加入 一个画布-------数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    var  step = cfg.data.length;
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    component.append(cns);

    ctx.strokeStyle = '#f00'
    var draw =function (per) {
        if(per>=1){
            component.find('.text').css('opacity',1)
        };
        if(per <= 1){
            component.find('.text').css('opacity',0)
        }
        ctx.clearRect(0,0,w,h);//清除整个画布的东西，避免循环叠加
     //输出数据的折线
        for(var i =0;i<step;i++){
            var rad = (2*Math.PI/360) * (360/step) * i ;
            var rate= cfg.data[i][1]*per;
            var  x = r + Math.sin(rad) * r *rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.lineTo(x,y);
        }
        ctx.closePath();
        ctx.stroke();
        //输出数据的点
        ctx.fillStyle= '#ff7676'
        for(var i =0;i<step;i++){
            var rad = (2*Math.PI/360) * (360/step) * i ;
            var rate= cfg.data[i][1]*per;
            var  x = r + Math.sin(rad) * r *rate;
            var y = r + Math.cos(rad) * r * rate;
            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }

        }

    component.on('onLoad',function () {
        //折线统计图进场动画
        var  s = 0;
        for(var i=0;i<100;i++){
            setTimeout(function () {
                s+= 0.01;//因为是被分层100份，分的分数越多动画效果会比较缓慢
                draw(s);
            },i*10+500);//定时时间也是跟图形变化比例来的
        }

    });
    component.on('onLeave',function () {
        //折线统计图进场动画
        var  s = 1;
        for(var i=0;i<100;i++){
            setTimeout(function () {
                //出场是倒着出去的,  设计的技巧很好
                s-= 0.01;//因为是被分层100份，分的分数越多动画效果会比较缓慢
                draw(s);
            },i*10);//定时时间也是跟图形变化比例来的
        }

    })








    return component;

}