/* Displays the startup instructions */
function startup () {
  window.alert('Hi welcome, to Andrew\'s Paint app, you can draw stuff!\n' +
        'Open File: allows you to load an image file to edit\n' +
       'Save File: allows you to save your creation to your local computer\n' +
       'Clear: clears the canvas\n' +
       'Fill: fills the canvas with your currently selected color\n' +
       'Brush Styles: lets you choose the linecap parameter of the canvas contex\n' +
       '-Butt, square, and round\n' +
       'Brush Sizes: lets you pick a brush size:\n' +
       '-normal, big, bigger, or biggest\n' +
       'Colors: lets you choose a predefined color and shows it\n' +
       '- clicking your selected color lets you select a custom color\n' +
       '\nYou can draw on the canvas by clicking and moving the mouse around!');
}

/* opens the instructions */
function openInfo () {
  window.alert('Open File: allows you to load an image file to edit\n' +
       'Save File: allows you to save your creation to your local computer\n' +
       'Clear: clears the canvas' +
       'Fill: fills the canvas with your currently selected color' +
       'Brush Styles: lets you choose the linecap parameter of the canvas contex\n' +
       '-Butt, square, and round\n' +
       'Brush Sizes: lets you pick a brush size:\n' +
       '-normal, big, bigger, or biggest\n' +
       'Colors: lets you choose a predefined color and shows it\n' +
       '- clicking your selected color lets you select a custom color\n' +
       '\nYou can draw on the canvas by clicking and moving the mouse around!');
}

export { openInfo, startup };
