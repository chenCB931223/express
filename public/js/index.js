$(document).ready(function () {

    $.get(`/api${location.pathname}${location.search}`, function (doc) {

        var data = template('test', doc);

        console.log(data);

        $('#article_mail').html(data);


        $('#info_message').html(`第${doc.page_num}/${doc.pages}`);

        $('#next').attr('href', '/impress/?page_num=' + (Math.floor(doc.page_num) + 1))

        if (doc.page_num == doc.pages) {

            $('#next').attr('href', 'javascript:;');
        }

        $('#prev').attr('href', '/impress/?page_num=' + (Math.floor(doc.page_num) - 1));
        if (doc.page_num == 1) {
            $('#prev').attr('href', 'javascript:;');
        }
    },
        'json')
})