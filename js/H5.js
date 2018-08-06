// 基本图文组建对象
var H5 = function () {
    this.id=( 'h5_'+Math.random()).replace('.','_');
    //隐藏是为了后面加载做准备
    this.el = $('<div class="h5" id="'+this.id+'"></div>').hide();
    this.page= [];
    $('body').append(this.el);
    // /* 新增一个页
    //  @parme {string}name 组建名称会加到addClass;
    //  @parme {string} text 业内默认文本
    //  @return ｛h5｝对象可以重复使用h5对象支持的方法
    // * */
     this.addPage = function (name,text) {
         var page = $('<div class="h5_page section"></div>');
         if(name != undefined){
             page.addClass('h5_page_'+name);
         };
         if(text != undefined){
             page.text(text.text);
         }

         this.el.append(page);
         this.page.push(page);
         //给每一页添加一个footer  先判断这个类型存不存在，在直接执行这个函数
         if(typeof this.whenAddPage ==='function'){
            this.whenAddPage();
         }
         return this ;
     }
    // 新增一个组建

     this.addComponent = function (name,cfg) {
         var cfg = cfg || {};
         cfg =$.extend({
             type:'base'
         },cfg)// 默认里面什么都么有传所附给的值；
         var component;   //定义变量存储组建元素
          var  page = this.page.slice(-1)[0];
         switch (cfg.type){
             case 'base' :
                 component = new H5componentbase(name,cfg);
             break;
             case 'polyline' :
                 component = new H5componentPolyline(name,cfg);
                 break;
             case 'pie' :
                 component = new H5componentPie(name,cfg);
                 break;
             case 'bar' :
                 component = new H5componentBar(name,cfg);
                 break;
             case 'bar_v' :
                 component = new H5componentBar_v(name,cfg);
                 break;
              case 'radar' :
                 component = new H5componentRadar(name,cfg);
                 break;
             case 'ring' :
                 component = new H5componentRing(name,cfg);
                 break;
             case 'point' :
                 component = new H5componentPoint(name,cfg);
                 break;
             default:
         }

         component.text(cfg.text);
          page.append(component);
        return this;
     };
     // h5对象初始化重现
     this.loader = function (firstPage) {
         // 当他加载时触发的事件
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
    this.loader = typeof H5_loading_ ==='function'? H5_loading_ : this.loader;
     console.log('jjj'+this.loader)
     return this;
}