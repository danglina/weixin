var H5_loading_  =function (images,firstPage){

var id = this.id;

 if(this._images === undefined){//第一次进入
    this._images = (images || []).length;
    this._load = 0;

    window[id] = this;//把当前对象储存在window对象，
                         // 用来完成某个图片加载完成后的回调
     for(x in images){
         // window[id]= this;      //指向new出来的还对象
         var item = images[x];
         var img = new Image;//js中创建图片方法
         img.onload = function () {
             debugger

             window[id].loader(1);
         };
         img.src = item;
     }
     $('#rate').text('0%');
     return this;
 }else{
     this._load++;
     var now_rate = (this._load/this._images*100) >>0;
     $('#rate').text(now_rate+'%');

     if(this._load<this._images){
         debugger

         return this
     }
     window[id]  =null;

 }
    this.el.fullpage({
        onLeave:function (index,nextindex,direction) {
            $(this).find('.h5_component').trigger('onLeave');
        },
        afterLoad:function (anotherlink,index) {
            $(this).find('.h5_component ').trigger('onLoad');
        }
    })
    this.page[0].find('.h5_component ').trigger('onLoad')
    this.el.show();
    if(firstPage){
        //家这个属性是立刻加载到某一页
        $.fn.fullpage.moveTo(firstPage)
    }
}