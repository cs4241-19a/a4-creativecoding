$(document).ready(function () {
    $('.sidenav').sidenav();
    $('select').formSelect();
    $(function () {
        const canvas = document.getElementById("drawing_pane");
        canvas.style.width = '88%';
        canvas.style.height = '80vh';
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        // document.querySelectorAll(".fontSelector option").forEach(function(el){
        //     if (el.value != null) el.style.fontFamily = el.value + " !important";
        // })
    });
});

CanvasManager = {
    stickerInfo: {
        "text": "",
        "font": "Arial",
        "size": "150",
        "color": "#000000",
        "email": "",
        "code": ""
    },
    bgImg: document.createElement("img"),
    updateImage: function () {
        const sticker = document.getElementById("drawing_pane");
        const stickerContext = sticker.getContext("2d");

        // Clear old image
        stickerContext.clearRect(0, 0, sticker.width, sticker.height);

        // Fill text 
        stickerContext.save()
        stickerContext.beginPath();
        stickerContext.font = "bold " + this.stickerInfo.size + "px " + this.stickerInfo.font;
        stickerContext.shadowOffsetX = 3;
        stickerContext.shadowOffsetY = 3;
        stickerContext.shadowColor = "rgba(0,0,0,0.3)";
        stickerContext.shadowBlur = 4;
        stickerContext.fillStyle = this.stickerInfo.color;
        stickerContext.textAlign = "center"
        stickerContext.fillText(this.stickerInfo.text, sticker.width / 2, sticker.height / 2);

        // Overlay Image if one is selected !!!!this is slow
        if (this.bgImg.src != null || this.bgImg.src != "") {
            stickerContext.beginPath();
            stickerContext.globalCompositeOperation = "source-in";
            stickerContext.drawImage(this.bgImg, 0, 0);//sticker.width / 2,  sticker.height / 2);
            stickerContext.restore();
        }

    },
    updateText: function (textInput) {
        this.stickerInfo.text = textInput.value;
        this.updateImage();
    },
    updateFont: function (fontInput) {
        this.stickerInfo.font = fontInput.value;
        this.updateImage();
    },
    updateSize: function (sizeInput) {
        this.stickerInfo.size = sizeInput.value;
        this.updateImage();
    },
    updateColor: function (colorInput) {
        this.stickerInfo.color = colorInput.value;
        this.updateImage();
    },
    updateCode: function (codeInput) {
        this.stickerInfo.code = codeInput.value;
    },
    updateImgSrc: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            let loadStart = function (e) {
                M.toast({ html: 'Loading Image', classes: 'rounded' });
            };
            let load = function (e) {
                this.bgImg.src = e.target.result;
            };
            let loadEnd = function (e) {
                M.toast({ html: 'Finished Loading', classes: 'rounded' });
                this.updateImage();
            };
            reader.addEventListener('loadstart', loadStart);
            reader.addEventListener('loadend', loadEnd.bind(this));
            reader.onload = load.bind(this);

            reader.readAsDataURL(input.files[0]);
        }
    },
    updateEmail: function (emailInput) {
        this.stickerInfo.email = emailInput.value;
    },
    send: function () {
        if (!this.isValid) return;
        const httpPost = new XMLHttpRequest();
        httpPost.onreadystatechange = function (err) {
            if (httpPost.readyState == 4 && httpPost.status == 200) {
                M.toast({ html: 'We got your image, we will be in contact with you shortly!', classes: 'rounded' });
            } else {
                console.log(err);
            }
        }
        const sticker = document.getElementById("drawing_pane");
        const imgBase64 = sticker.toDataURL();
        data = JSON.stringify({
            "stickerInfo": this.stickerInfo,
            "imageBase64": imgBase64
        });
        httpPost.open("POST", '/submit', true);
        httpPost.setRequestHeader("Content-Type", "application/json");
        httpPost.send(data);
    },
    isValid: function () {
        if (this.stickerInfo.text === "") {
            alert("You need to enter in sticker text")
            return false;
        }
        else if (this.stickerInfo.email === "") {
            alert("You need to enter in an email")
            return false;
        }
        return true;
    }
}