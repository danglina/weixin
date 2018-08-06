var leave = true;
$('body').click(function () {
    leave = !leave;
    // 通过控制true and false来判断trigger
    $('.h5_component').trigger(leave ? 'onLeave':'onLoad');
})