$(document).ready(function() {
    var carousel = $("#carousel").waterwheelCarousel({
        flankingItems: 3,
        movingToCenter: function($item) {
            $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
        },
        movedToCenter: function($item) {
            $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
        },
        movingFromCenter: function($item) {
            $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
        },
        movedFromCenter: function($item) {
            $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
        },
        clickedCenter: function($item) {
            $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
        }
    });

    $('#prev').bind('click', function() {
        carousel.prev();
        return false
    });

    $('#next').bind('click', function() {
        carousel.next();
        return false;
    });

    $('#reload').bind('click', function() {
        newOptions = eval("(" + $('#newoptions').val() + ")");
        carousel.reload(newOptions);
        return false;
    });

});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjYXJvdXNlbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgIHZhciBjYXJvdXNlbCA9ICQoXCIjY2Fyb3VzZWxcIikud2F0ZXJ3aGVlbENhcm91c2VsKHtcclxuICAgICAgICBmbGFua2luZ0l0ZW1zOiAzLFxyXG4gICAgICAgIG1vdmluZ1RvQ2VudGVyOiBmdW5jdGlvbigkaXRlbSkge1xyXG4gICAgICAgICAgICAkKCcjY2FsbGJhY2stb3V0cHV0JykucHJlcGVuZCgnbW92aW5nVG9DZW50ZXI6ICcgKyAkaXRlbS5hdHRyKCdpZCcpICsgJzxici8+Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBtb3ZlZFRvQ2VudGVyOiBmdW5jdGlvbigkaXRlbSkge1xyXG4gICAgICAgICAgICAkKCcjY2FsbGJhY2stb3V0cHV0JykucHJlcGVuZCgnbW92ZWRUb0NlbnRlcjogJyArICRpdGVtLmF0dHIoJ2lkJykgKyAnPGJyLz4nKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG1vdmluZ0Zyb21DZW50ZXI6IGZ1bmN0aW9uKCRpdGVtKSB7XHJcbiAgICAgICAgICAgICQoJyNjYWxsYmFjay1vdXRwdXQnKS5wcmVwZW5kKCdtb3ZpbmdGcm9tQ2VudGVyOiAnICsgJGl0ZW0uYXR0cignaWQnKSArICc8YnIvPicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbW92ZWRGcm9tQ2VudGVyOiBmdW5jdGlvbigkaXRlbSkge1xyXG4gICAgICAgICAgICAkKCcjY2FsbGJhY2stb3V0cHV0JykucHJlcGVuZCgnbW92ZWRGcm9tQ2VudGVyOiAnICsgJGl0ZW0uYXR0cignaWQnKSArICc8YnIvPicpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY2xpY2tlZENlbnRlcjogZnVuY3Rpb24oJGl0ZW0pIHtcclxuICAgICAgICAgICAgJCgnI2NhbGxiYWNrLW91dHB1dCcpLnByZXBlbmQoJ2NsaWNrZWRDZW50ZXI6ICcgKyAkaXRlbS5hdHRyKCdpZCcpICsgJzxici8+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3ByZXYnKS5iaW5kKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNhcm91c2VsLnByZXYoKTtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0pO1xyXG5cclxuICAgICQoJyNuZXh0JykuYmluZCgnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICBjYXJvdXNlbC5uZXh0KCk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnI3JlbG9hZCcpLmJpbmQoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgbmV3T3B0aW9ucyA9IGV2YWwoXCIoXCIgKyAkKCcjbmV3b3B0aW9ucycpLnZhbCgpICsgXCIpXCIpO1xyXG4gICAgICAgIGNhcm91c2VsLnJlbG9hZChuZXdPcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbn0pOyJdLCJmaWxlIjoiY2Fyb3VzZWwuanMifQ==
