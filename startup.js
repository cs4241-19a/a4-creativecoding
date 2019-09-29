
module.exports = function(){
    addClicks();
    initModal();
    checkBrowser();
    setLangSwitch();
    setCloudSwitch();
    setControls();
    console.log("module loaded: Startup.js");
};


//Displays the clicked post to the front of the screen
function addClicks(){
    $( "#post-list" ).on( "click", ".clickable-post", function () {

        let postTitle = $(this).find(".post-title").html();
        let postBody = $(this).find(".post-body").html();
        let modal  = document.getElementById("myModal");
        modal.style.display = "block";

        let titleElt = modal.getElementsByClassName("post-title-holder")[0];
        titleElt.innerHTML = postTitle;

        let bodyElt = modal.getElementsByClassName("post-body-holder")[0];
        bodyElt.innerHTML = postBody;
        bodyElt.style.display = "inline-block";
    });

    $("#entry-section").on( "click", ".my-post", function(){
        let clickedId = $(this).find(".post-id").html();
        $(".clickable-post").find(".post-id").each(function(index, value){
            if(value.innerHTML == clickedId){
                $(this).parent().click();
            }
        });
    });
}


//intitializes the modal which shows the post data
function initModal(){
    // Get the modals
    var modal = document.getElementById("myModal");
    var editModal = document.getElementById("editModal");

    // Get the <span> element that closes the modal
    var span1 = modal.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span1.onclick = function() {
        modal.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}


//sends an alert if the user is browsing on firefox
function checkBrowser(){
    if ((navigator.userAgent.indexOf("Firefox") != -1)){
        alert("HEY YOU! WELCOME TO ODD BLOG!\n\nUnfortunately Firefox does not support wingdings, so we reccomend you visit us on Google Chrome or Microsoft Edge\n\n(https://a3-dandaman2.glitch.me/)");
    }
}


function setLangSwitch(){
    $("#langSwitcher").change(function(){
        if($(".englisher").length > 0){
            let words = $(".englisher");
            words.addClass("wingdinger");
            words.removeClass("englisher");
        }else{
            let words = $(".wingdinger");
            words.addClass("englisher");
            words.removeClass("wingdinger");
        }
    });
}

function setCloudSwitch(){
    $("#cloudSwitcher").click(function(){
        if($("#post-tab").is(":visible")){
            $("#post-tab").hide();
            $("#cloud-tab").show();
            $("#searchBar").hide();//.css("visibility", "hidden");
            $("#screenshotMenu").show();
            $(this).html("Blogify");
        }else{
            $("#cloud-tab").hide();
            $("#post-tab").show();
            $("#searchBar").show();//.css("visibility", "visible");
            $("#screenshotMenu").hide();
            $(this).html("Cloudify");
        }
    });
}

function setControls(){
    $("#helpBtn").on("click", function(){
        let helpTitle = "<i style = 'font-size: 30px'>The Odd Blog Word Cloud</i>";
        let helpBody = "This word cloud generator takes information from the Odd Blog database, and creates resulting word-based visualizations.<br><br>" +
            "<b><u style = 'font-size: 25px'>Controls:</u></b><br><br>" + "<b> > Poster</b>: Filter posts by selecting the desired poster's name. 'All' will use all post on the site, regardless of who posted them.<br>"+
            "<b> > d3 Color Category</b>: Changes the wordcloud's color scale using one of the built-in d3 colorscales!<br>" +
            "<b> > Cycle Speed</b>: Changes the rate at which new word clouds are cycled through.<br>" +
            "<b> > Num Words</b>: Changes the number of words to be used in each wordcloud. <br>    Note: If the max number is greater than the amount of words on the site, it will simply use as many as available.<br>"+
            "<b> > Save Image</b>: Saves an image of the current wordcloud, downloading it to your browser's download location.<br><br>" +
            "<u><b>And of Course!</b></u><br>You can add words to the cloud by posting, and change the font by using Odd Blog's toggle in the top left corner of the screen!";
        let modal  = document.getElementById("myModal");
        modal.style.display = "block";

        let titleElt = modal.getElementsByClassName("post-title-holder")[0];
        titleElt.innerHTML = helpTitle;

        let bodyElt = modal.getElementsByClassName("post-body-holder")[0];
        bodyElt.innerHTML = helpBody;
        bodyElt.style.display = "inline-block";
    });
}
  


