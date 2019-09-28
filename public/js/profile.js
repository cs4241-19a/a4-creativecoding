let id;
let user;

$(function () {
    let socket = io();
    $('form').submit(function () {
        socket.emit('chat', {msg: $('#m').val(), user: $("#user-name").text()});
        $('#m').val('');
        return false;
    });
    socket.on('chat', function (msg) {
        $('#messages').append($('<li>').text(msg.user + ": " + msg.msg));
        window.scrollTo(0, document.body.scrollHeight);
    });
});

$.getJSON("loggeduser", function (data) {
    // Make sure the data contains the username as expected before using it
    if (data.hasOwnProperty('username')) {
        $("#user-name").text(data.username.username.toLocaleLowerCase());
        id = data.username._id;

        // Get sessions
        $.getJSON("sessions?&id=" + id, function (data) {
            console.log(data);
            for (let row of data) {
                $("#content").append("<br><h2>" + row.name + "</h2><br>");
                $("#content").append("<textarea id='" + row._id + "'>" + row.hydra + "</textarea><br>");

                let r1 = $('<input/>').attr({
                    type: "button",
                    id: row._id,
                    call: "delete",
                    value: "delete"
                });

                let r2 = $('<input/>').attr({
                    type: "button",
                    id: row._id,
                    call: "put",
                    value: "update"
                });

                $("#content").append(r1);
                $("#content").append(r2);

                $("input").click(function (e) {
                    console.log(e);
                    if ($(this).attr("call") == "delete") {
                        // delete
                        deleteSession($(this).attr("id"));
                    } else {
                        //update
                        updateSession($(this).attr("id"), $("#" + $(this).attr("id")).val());
                    }
                });
            }
        });
    }
});

$(".list-group a").click(function (e) {
    e.preventDefault();
    $(".toggle").hide();
    let toShow = $(this).attr('href');
    $(toShow).show();
});

function deleteSession(id) {
    $.ajax({
        url: '/?&id=' + id,
        type: 'DELETE',
        success: function () {
            console.log('SUCCESS');
            // refresh
            window.location = "profile.html";
        }
    });

}

function updateSession(id, body) {
    $.ajax({
        type: 'PUT',
        url: '/',
        contentType: 'application/json',
        data: JSON.stringify({"id": id, "hydra": body}), // access in body
    }).done(function () {
        console.log('SUCCESS');
    });
}