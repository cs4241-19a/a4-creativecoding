const controlFunction = {

    toggleHelp() {
        window.alert("Help:\n To toggle controls use the GUI on the right-hand side of the page.\nControls:\nrotate: controls rotation speed on the named axis\nscale: controls scale of cube on the named axis\nanimationSpeed: controls speed of the color changes");
    },

    toggleThree() {
        if (document.getElementById("threeConfig").style.display !== "none") {
            document.getElementById("threeConfig").style.display = "none";
        } else {
            document.getElementById("threeConfig").style.display = "flex";
        }
    }
};
export default controlFunction;