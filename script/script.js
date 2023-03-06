$(function () {
    $('.sort').sortable({
        connectWith: '.puzzle__left, .puzzle__rigth, .puzzle__rigth__place',
        containment: '.puzzle',
        
    });

    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    let time;
    let check = true;
    let winCheck = true;
    let stop = false;

    // Рандом

    let shuffledNumbers = numbers.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < shuffledNumbers.length; i++) {
        $('.puzzle__left').append(`<div class="puzzle__left__number pic${shuffledNumbers[i]}"></div>`);
    };


    // Початок відліку
    start = () => {
        time = 59;

        $('.puzzle__left').off('mousedown', start);
        $('.start').css('backgroundColor', '#EC8783')
        $('.start').prop("disabled", true);
        $('.new').css('backgroundColor', '#EC8783')
        $('.new').prop("disabled", true);
        $('.check').css('backgroundColor', '#E74642')
        $('.check').prop("disabled", false);

        if (check) {
            let timer = setInterval(function () {

                if (stop) {
                    clearInterval(timer);
                    stop = false;
                    check = true;
                }

                $('.timer').text(`00:${time}`);

                $('.modal__time').text(`You still have time, you sure? 00:${time}`)
                time--;
                if (time == 0) {
                    $('.timer').text(`1:00`);
                    clearInterval(timer);
                    $('.start').css('backgroundColor', '#EC8783')
                    $('.start').prop("disabled", true);
                    $('.new').css('backgroundColor', '#E74642')
                    $('.new').prop("disabled", false);
                    $('.check').css('backgroundColor', '#EC8783')
                    $('.check').prop("disabled", true);
    
                    check = true;
                    time = 59;
                    // Модалка

                    $('.modal__ask').css('display', 'none');
                    $('.modal').css('display', 'block');
                    $('.modal__lose').css('display', 'flex');
                }
            }, 1000);
        };

        check = false;
    };

    $('.start').click(start);
    $('.puzzle__left').one('mousedown', start);

    // Перевірка


    $('.check').click(function () {
        $('.modal').css('display', 'block');
        $('.modal__ask').css('display', 'flex');
    });

    $('.modal__close').click(function () {
        $('.modal').css('display', 'none');
    });

    $('.modal__check').click(function () {

        stop = true;

        console.log($('.puzzle__left__number'));
        for (let i = 0; i < $('.puzzle__rigth').length; i++) {
            if ($('.puzzle__left__number').eq(i).hasClass(`pic${numbers[i]}`)) {
                winCheck = false;
                break;
            }
        }

        if (winCheck) {
            $('.start').css('backgroundColor', '#EC8783')
            $('.start').prop("disabled", true);
            $('.check').css('backgroundColor', '#EC8783')
            $('.check').prop("disabled", true);
            $('.modal').css('display', 'block');
            $('.modal__ask').css('display', 'none');
            $('.modal__win').css('display', 'flex');
            $('.new').css('backgroundColor', '#E74642')
            $('.new').prop("disabled", false);
        }
        else {
            $('.start').css('backgroundColor', '#EC8783')
            $('.start').prop("disabled", true);
            $('.check').css('backgroundColor', '#EC8783')
            $('.check').prop("disabled", true);
            $('.modal').css('display', 'block');
            $('.modal__ask').css('display', 'none');
            $('.modal__lose').css('display', 'flex');
            $('.new').css('backgroundColor', '#E74642')
            $('.new').prop("disabled", false);
        }

        winCheck = true;

    });


    $('.modal__lose__close').click(function () {
        $('.modal').css('display', 'none');
        $('.modal__lose').css('display', 'none');
    });

    $('.modal__win__close').click(function () {
        $('.modal').css('display', 'none');
        $('.modal__win').css('display', 'none');
    });

    // Нова гра

    $('.new').click(function () {

        $('.puzzle__left').one('mousedown', start);
        $('.timer').text('1:00');

        $('.start').css('backgroundColor', '#E74642')
        $('.start').prop("disabled", false);
        $('.check').css('backgroundColor', '#EC8783')
        $('.check').prop("disabled", true);

        $('.sort').html(' ');
        let shuffledNumbers = numbers.sort((a, b) => 0.5 - Math.random());
        for (let i = 0; i < shuffledNumbers.length; i++) {
            $('.puzzle__left').append(`<div class="puzzle__left__number pic${shuffledNumbers[i]}"></div>`);
        };
    });

});