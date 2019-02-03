$(document).ready(function () {
    $('#comment_btn').on('click', function () {
        var id = $('h1').data('id'),
            commentText = $('#comment').val();

        if (!commentText) {
            $('#warn').html('评论不能为空！')
            return;
        }
        $.post('/comment', {
            id: id,
            text: commentText
        }, function (result) {

            var html = `<li>
            <p class="comment_content">${result.text}</p>
            <p class="comment_date">${result.date}</p>
            </li>`;
            $('#comment_list').prepend(html);
            $('#comment').val('');
            $('#warn').empty();
        })
    })

    $('.like_icon').on('click', function () {
        $.get('/like', {
            id: $('h1').data('id')
        }, function (result) {

            $('#like_number').html(result.like);
        })
    })

    $('#remove').on('click', function () {

        alert('删除成功');
        $.get('/remove', {
            id: $('h1').data('id')
        }, function (result) {


        })
    })
});