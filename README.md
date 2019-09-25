## Interactive Family Tree Application

http://a4-retat.glitch.me

With the Interactive Family Tree application it's possible to look at and create family trees or other tree diagrams with a simple user interface.

![Application Instructions](https://i.imgur.com/bITYojF.png)

The goal is to visualize family trees in a pleasant way and to make interacting with them and creating them easy.
The challenges were the creation of a family tree because I underestimated the difficulty to show the many possible relations in a family and
to visualize it with d3js. That's why currently only two generation are supported in the custom family tree option and the website sometimes needs to reload to work again.<br>
I developed the application with the WebStorm IDE and therefore used eslint because it was really easy to setup. It uses the standard
JS rules and I changed the environment to browser, es6 and jquery. The exact configuration is viewable in the .eslintrc.json file.
![Application Custom Family Tree](https://i.imgur.com/vOL4jgw.png)

## Technical Achievements
- **Tech Achievement 1**: I used the dTree library for for visualizing data trees with multiple parents that's built on top of D3
- **Tech Achievement 2**: As a backend server I used the koa web framework for node.js
- **Tech Achievement 3**: I use the helmet and compression middleware
- **Tech Achievement 4**: For a better structure I'm using two ES6 modules with similar functions
### Design/Evaluation Achievements
- **Design Achievement 1**: To make sure the applications looks and feels nice to use I used many bootstrap 4 components
- **Design Achievement 2**: It's possible to adjust multiple parameters of the tree by using the controls from dat.gui
- **Design Achievement 3**: I validated the css and html
