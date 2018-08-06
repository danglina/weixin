// 柱图组建
var H5componentPolyline = function(name,cfg){
  var component = new H5componentbase(name,cfg);

  //  -------------- 绘制表格-------------------------
    // 加入 一个画布，（将来做网格线背景）
    var cns = document.createElement('canvas');
  var ctx = cns.getContext('2d');
    var  w = cfg.width;
    var  h = cfg.height;
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    component.append(cns);
    // 水平网格线，100份-->10分
     var  step = 10;
     ctx.beginPath();
     ctx.lineWidth= 1;
     ctx.strokeStyle = '#AAA';
     //将ctx对象包到全局对象里面了
    //---垂直网格根据数目去分
     window.ctx = ctx;
     for(var i= 0;i<step+1;i++){
       var y = (h/step) * i ;
       ctx.moveTo(0,y);
       ctx.lineTo(w,y);
     }
     //因为要画在线上给length+1
    //垂直网线
     step = cfg.data.length+1;
     var  text_w = (w/step) >> 0 ;//>> 0  的作用是省略小数偷懒做法
     for(var i= 0;i<step+1+1;i++){
         var x =(w/step)*i;
         ctx.moveTo(x,0);
         ctx.lineTo(x,h);
         //-------动态添加元素， 一定要判断在有的情况  创建数据
         if(cfg.data[i]){
             var text = $('<div class="text"></div>');
             text.text(cfg.data[i][0]);
             text.css({
                 'width':text_w/2,
                 'left':x/2 - text_w/4 +  text_w/2,
             })
             component.append(text);
         }
     }
     ctx.stroke();

     //------------绘制折线数据----------------------------
    // 分成   两个部分做   的东西   会比较清醒
    // 加入画布---
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height= ctx.height= h;
    component.append(cns);
    //------------绘制折线及对应的阴影------
    // ========@param｛floot｝per 会根据0 - 1的值绘制数据，到最佳状态
     //========= @return ｛dom｝compoenent 元素
    var draw =function (per) {
        // 清空画布
        ctx.clearRect(0,0,w,h)//参数分别是左上角，右下角
        //-----绘制数据
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff8878';
        var x = 0;
        var y = 0;
        var row_w = (w / (cfg.data.length + 1));
        // ----------（1）画点
        for (i in cfg.data) {
            var item = cfg.data[i];
            //利用平移原理（数学上的）
            var x = row_w * i + row_w;
            var y = h - (item[1]*per*h);
            ctx.moveTo(x, y);
            ctx.arc(x, y, 5, 0, 2 * Math.PI);
        }
        // -----------------（2）连线
        //移动画笔到第一个点位
        //高度距离是从下网上算的，用1-item[1]来取反
        ctx.moveTo(row_w, y = h - (cfg.data[0][1]*per*h));//确定起始点是正确的
        // 通过循环一次画出折线
        for (i in cfg.data) {
            var item = cfg.data[i];
            //利用平移原理（数学上的）
            var x = row_w * i + row_w;
            var y = h - (item[1]*per*h);
            ctx.lineTo(x, y);
        }
        //为了去掉杵着西安以外的折线
        ctx.stroke();
        ctx.width = 1;
        ctx.fillStyle = 'rgba(211, 101, 156, 0)';
        //--------（4）绘制阴影
        ctx.lineTo(x, h);
        ctx.lineTo(row_w, h);
        ctx.fillStyle = 'rgba(211, 101, 156, 0.47)';
        ctx.fill();
        //--------（3）-写数据
        for (i in cfg.data) {
            var item = cfg.data[i];
            //利用平移原理（数学上的）
            var x = row_w * i + row_w;
            var y = h - (item[1]*per*h);
            ctx.moveTo(x, y);
            //用正则方式，给他加颜色
            ctx.fillStyle = item[2] ? item[2] : '#595959'
            ctx.fillText((100 * item[1]) + '%', x - 10, y - 10)
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
                s-= 0.01;//因为是被分层100份，分的分数越多动画效果会比较缓慢
                draw(s);
            },i*10);//定时时间也是跟图形变化比例来的
        }

    })






    return component;

}