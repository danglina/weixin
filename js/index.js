$(function () {
    $('#h5').fullpage({
            sectionsColor:['#7dff2e','#ff8cd0','#2553FF'],
            onLeave:function (index,nextindex,direction) {
                $('#h5').find('.page').eq(index-1).trigger('onLeave');

                },
             afterLoad:function (anotherlink,index) {
                 $('#h5').find('.page').eq(index-1).trigger('onLoad');
             }
        });
    $('.page').on('onLeave',function () {
        console.log($(this).attr('id'),'===>>','onLave')
        $(this).find('.component').trigger('onLeave');
    });
    $('.page').on('onLoad',function () {
        console.log($(this).attr('id'),'===>>','onLoad')
        $(this).find('.component').trigger('onLoad')
    });
    $('.component').on('onLeave',function () {
      $(this).fadeOut();
      return false;
    })
    $('.component').on('onLoad',function () {
        $(this).fadeIn();
        return false;
    });
})