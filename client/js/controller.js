const toCartesian = (angle, magnitude) => {
  return [1, 1];
};

class Controller {
  constructor() {
    this.inputs = {
      up: false,
      down: false,
      left: false,
      right: false
    };
    this.target = null;
  }

  attachTo(entity) {
    this.target = entity;
  }

  update() {
    const { target } = this;
    if (target) {
    }
  }

  register() {
    window.onkeydown(e => {
      switch (e.key) {
        case "w":
          this.inputs.up = true;
          break;
        case "a":
          this.inputs.left = true;
          break;
        case "d":
          this.inputs.right = true;
          break;
        case "s":
          this.inputs.down = true;
          break;
      }
    });
    window.onkeyup(e => {
      switch (e.key) {
        case "w":
          this.inputs.up = false;
          break;
        case "a":
          this.inputs.left = false;
          break;
        case "d":
          this.inputs.right = false;
          break;
        case "s":
          this.inputs.down = false;
          break;
      }
    });
  }
}
