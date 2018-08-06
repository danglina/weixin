// 饼图图组建
var H5componentPie = function(name,cfg){
 var component = new H5componentbase(name,cfg);

  // 加入 一个画布-------背景层
    var  w = cfg.width;
    var  h = cfg.height;
    var  step = cfg.data.length;

    //---背景层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    $(cns).css('z-index',1)
    component.append(cns);

    //先加入一底图层
    var r = w/2;
    ctx.beginPath();
    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;
    ctx.arc(r,r,r,0,2*Math.PI);
    ctx.fill();
    ctx.stroke();

//----------------------------------
//     绘制一个数据层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    $(cns).css('z-index',2)
    component.append(cns);

     var  colors = ['red','pink','blue','orange','#87d5e6'];
     var sAngel = 1.5*Math.PI;//设置开始角度，12点位置
     var eAngle = 0; //结束角度
     var aAngle = Math.PI*2;//100%的结束角度 2PI = 360;

    var   step= cfg.data.length;
    for(var i =0 ;i<step;i++){

        var item = cfg.data[i];
        var  color = item[2] || (item[2] = colors.pop());
        eAngle = sAngel  + aAngle * item[1];

        ctx.beginPath();
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth = .1;

        ctx.moveTo(r,r);
        ctx.arc(r,r,r,sAngel,eAngle);
        ctx.fill();
        ctx.stroke();
        //重新定位起始位置
        sAngel =eAngle;

        // 加入所有多的项目文本及百分比
        var text = $('<div class="text"></div>');
        var per = $('<div class="per"></div>');
        text.text(cfg.data[i][0]);
        per.text(cfg.data[i][1]*100 +'%');
        text.append(per);

        var x = r + Math.sin(.5*Math.PI-sAngel)*r;
        var y= r + Math.cos(.5*Math.PI-sAngel)*r;

        if(x>w/2){
            text.css('left',x/2+6);
        }else {
            text.css('right',(w-x)/2+6);
        }
        if(y>h/2){
            text.css('top',y/2+6);
        }else {
            text.css('bottom',(h-y)/2+6);
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2]);
        }
        text.css('opacity',0);
        component.append(text)
    }


    //-------------------------------
    //加入一个蒙版层
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    $(cns).css('z-index',3)
    component.append(cns);

    ctx.fillStyle='#eee';
    ctx.strokeStyle='#eee';
    ctx.lineWidth = 1;

    //动画生长过程
    var draw =function (per) {
        if(per>=1){
            component.find('.text').css('opacity',1);
        }
        if(per <= 1){
            component.find('.text').css('opacity',0);
        }
        ctx.clearRect(0,0,w,h);

        ctx.beginPath();

        ctx.moveTo(r,r);
         if(per<=0){
             ctx.arc(r,r,r,0,2*Math.PI *per);
         }else
         {  ctx.arc(r,r,r,sAngel, sAngel + 2*Math.PI *per,true);}
        ctx.fill();
        ctx.stroke();
        }
    // draw(0);
    component.on('onLoad',function () {
        //饼状图动画
        var  s = 0;
        for(var i=0;i<100;i++){
            setTimeout(function () {
                s+= 0.01;//因为是被分层100份，分的分数越多动画效果会比较缓慢
                draw(s);
            },i*10+500);//定时时间也是跟图形变化比例来的
        }

    });
    component.on('onLeave',function () {
        //饼图进场动画
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