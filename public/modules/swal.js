const greet = function() {
    return swal({
        title: 'Welcome!',
        text: 'This is an audio visualization project.\n' +
            'There are 3 sample songs (try the default first!).\n\n' +
            'GUI control on the upper right, which includes: \n' +
            '\xa0\xa0\xa0\xa0position (3 parameters)\n' +
            '\xa0\xa0\xa0\xa0camera (3 parameters)\n' +
            '\xa0\xa0\xa0\xa0spotlight (3 parameters)',
        icon: 'success',
        button: true
    })
}

const changeMusicWarn = function() {
    return swal({
        title: "Are you sure?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
}
const changeMusicSuccess = function() {
    return swal("Your song has been changed!", {
        icon: "success",
    })
}
const changeMusicCancel = function() {
    return swal("Song change canceld :)")
}

export { greet, changeMusicWarn, changeMusicSuccess, changeMusicCancel }