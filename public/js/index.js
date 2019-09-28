let canvas = document.getElementById("myCanvas");
const hydra = new Hydra(canvas);

$(document).ready(function () {

    changeBackground();

    // Register
    $("#register").click(function () {
        let check = true;

        for (let i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        if (!check) return;

        $.ajax({
            url: '/signup',
            type: 'post',
            dataType: 'json',
            data: $('form#theform').serialize(),
            success: function (data) {
                console.log(data);
                if (data.status === "ok") {
                    window.location = "main";
                }
            }
        });

    });


    /*==================================================================[ Validate ]*/
    let input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {
        let check = true;

        for (let i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        let thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        let thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

});

function changeBackground() {
    let ind = Math.floor((Math.random() * 5));

    switch (ind) {
        case 0:
            hydra.shape(2).scale(0.1).scrollY(0, 0.3)
                .add(shape(2).rotate(11).scale(0.1)).repeat(20, 20)
                .modulateScale(osc(2, 0.1).rotate(11))
                .modulateScale(osc(2, 0.2)).scale(0.5)
                .scrollX(0, [0.1, -0.1, 0.2, -0.2].fast(0.2))
                .scrollY(0, 0.1)
                .modulateRotate(osc(2, 0.2), -2)
                .rotate(0, 0.2)
                .modulateScale(voronoi(3, 2).contrast(8), -1)
                .out();
            break;
        case 1:
            hydra.shape(2, 0.3, 0.1)
                .color(4, 2, 1)
                .hue(() => (time / 8) % 1)
                .repeatY(30)
                .mult(osc(5).rotate(-Math.PI / 2))
                .add(solid(.5))
                .modulate(noise())
                .mult(osc(10))
                .diff(solid(1, 1, 0))
                .invert()
                .kaleid(16)
                .modulate(noise(1.1))
                .add(src(o0).scale(1.25).rotate(Math.PI / 2), 0.9)
                .out();
            break;
        case 2:
            hydra.voronoi(4, 3, 1)
                .colorama(2)
                .mask(shape(3.15, 0.2, 0.90, () => a.fft[1] * 0.05))
                .rotate(0, 2.5)
                .add(osc(15).modulate(o0))
                .contrast(4)
                .out();
            break;
        case 3:
            hydra.noise(100, 0.4)
                .pixelate(40, 40)
                .mult(osc(1000, 0.001, 0.8).rotate(Math.PI * 0.5))
                .mult(osc(100, () => (time / 0.005) % 0.005, 0.5).color(0.5, 4, 4))
                .kaleid(2)
                .out();
            break;
        case 4:
            hydra.shape(2).scale(0.1).modulate(noise(3, 1)).rotate(0, 0.2)
                .modulateRotate(osc(2), Math.sin(1 * time)).modulateScale(osc(3, 0.5)
                .rotate(0, 0.5), -0.8).modulateRotate(src(o0), -1).rotate(0, 0.5)
                .blend(src(o0), 1.9).diff(o0, 0.5).rotate(0, -0.1).luma(0.2).out()
    }
}
