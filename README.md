## Piano

http://a4-jameskajon.glitch.me

This project is two octaves of a piano. The keys can be pressed by clicking or by using bindings on the keyboard. 
The goal in building this was to learn about the Web Audio API and learn more about svg. The main challenge I faced was not being happy with my graphics.
After many modifications I added the color and eventually got used to it.
My js linter is the built in one in WebStorm. My style is pretty consistent however I do switch between double and single quotes

## Technical Achievements
- **Tech Achievement 1**: I used closures extensively. At one point I have a tipple nested one. This helped me organise my code better and made it many time shorter
- **Tech Achievement 2**: I created a system to easily handel constantly adding and removing unique event listeners to objects. 
This was a challenge at first because to remove an event, you need to know what kind it is and also pass in the exact callback.
My callback however was dynamically created each time. I fixed this with a closure as well.

### Design/Evaluation Achievements
- **Design Achievement 1**: I followed best practices for accessibility, including providing alt attributes for images and using semantic HTML. There are no `<div>` elements in my document.
- **Design Achievement 2**: Linked music with color so the user can identify the notes better.
- **Design Achievement 3**: I made another svg beside the piano one to show key bindings in a clear and concise way

