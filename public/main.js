function createTrumpTree() {
    createTree([{
        name: "Fred Trump",
        class: "node",
        textClass: "nodeText",
        depthOffset: 1,
        marriages: [{
            spouse: {
                name: "Mary Anne Trump",
            },
            children: [
                {
                    name: "Fred Trump Jr."
                },
                {
                    name: "Elizabeth Trump Grau"
                },
                {
                    name: "Donald Trump",
                    class: "node",
                    textClass: "nodeText",
                    depthOffset: 1,
                    marriages: [{
                        spouse: {
                            name: "Ivana Trump",
                        },
                        children: [{
                            name: "Donald Trump Jr.",
                        },
                            {
                                name: "Ivanka Trump",
                            },
                            {
                                name: "Eric Trump",
                            }]
                    },
                        {
                            spouse: {
                                name: "Marla Maples",
                            },
                            children: [{
                                name: "Tiffany Trump",
                            }
                            ],
                        },
                        {
                            spouse: {
                                name: "Melania Knauss-Trump",
                            },
                            children: [{
                                name: "Barron Trump",
                            }
                            ],
                        }]
                },
                {
                    name: "Maryanne Trump Barry",
                },
                {
                    name: "Robert Trump"
                }
            ]
        }],
        extra: {}
    }])
}

function createGUI() {
    let adjustableValues = {
        strokeColor: "black",
        marriageStrokeColor: "green",
        nodeBackground: "white",
        fontColor: "black"
    }
    let gui = new dat.GUI()
    let colors = gui.addFolder("Colors")
    colors.add(adjustableValues, 'strokeColor', ['red', 'blue', 'green', 'white', 'black']).onChange(function (newValue) {
        $(".linage").css({"stroke": newValue})
    })
    colors.add(adjustableValues, 'marriageStrokeColor', ['red', 'blue', 'green', 'white', 'black']).onChange(function (newValue) {
        $(".marriage").css({"stroke": newValue})
    })
    colors.add(adjustableValues, 'nodeBackground', ['red', 'blue', 'green', 'white', 'black']).onChange(function (newValue) {
        $(".node").css({"background-color": newValue})
    })
    colors.add(adjustableValues, 'fontColor', ['red', 'blue', 'green', 'white', 'black']).onChange(function (newValue) {
        $(".nodeText").css({"color": newValue})
    })
}

function createTree(familyData) {
    $("#instructions").remove()
    // todo use two different es6 modules
    //todo use dat.gui to zoom and change offsets (at least six parameters??)
    let data = familyData
    let options = {
        target: '#graph',
        debug: true,
        callbacks: {
            nodeRenderer: function (name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
                let node = ''
                node += '<div '
                node += 'style="height:100%;width:100%;" '
                node += 'class="' + nodeClass + ' btn btn-light" '
                node += 'id="node' + id + '">\n'
                node += textRenderer(name, extra, textClass)
                node += '</div>'
                return node
            }
        },
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        nodeWidth: 100,
        styles: {
            node: 'node',
            linage: 'linage',
            marriage: 'marriage',
            text: 'nodeText'
        }
    }
    dTree.init(data, options)
    $('svg').removeAttr('width').removeAttr('height')
    $('svg').each(function () {
        $(this)[0].setAttribute('width', '100%')
    })
    $('svg').each(function () {
        $(this)[0].setAttribute('viewBox', '0 0 600 600')
    })
    createGUI()
}

function createCustomTree() {
    $("#instructions").remove()
    $form = $("<form>\n" +
        "            <div class=\"form-row\">\n" +
        "                <div class=\"form-group col-5\">\n" +
        "                    <input id='name' type=\"text\" class=\"form-control\" placeholder=\"Name\">\n" +
        "                </div>\n" +
        "                <div class=\"form-group col-5\">\n" +
        "                    <select id='relation' class=\"form-control\">\n" +
        "                        <option>Children</option>\n" +
        "                        <option>Spouse</option>\n" +
        "                    </select>\n" +
        "                </div>\n" +
        "                <div class=\"form-group col-2\">\n" +
        "                    <button id='formButton' class=\"btn btn-primary\">Add</button>\n" +
        "                </div>\n" +
        "             </div>\n" +
        "        </form>")
    $('#customForm').append($form)
    $('#formButton').click(function () {
        handleForm($('#name').val(), $("#relation option:selected").text())
    })
}

let data = []
let children = 0

function handleForm(name, relation) {
    console.log(name + " " + relation)
    if (!data.length > 0) {
        data[0] = {
            name: name,
            class: "node",
            textClass: "nodeText",
            depthOffset: 1,
            marriages: []
        }
        createTree(data)
    } else {
        if (relation === "Spouse") {
            data[0].marriages[0] = {
                spouse: {
                    name: name,
                },
                children: []
            }
        } else if (relation === "Children") {
            data[0].marriages[0].children[children++] = {
                name: name,
                class: "node",
                textClass: "nodeText",
                depthOffset: 1,
                marriages: []
            }
        }
        $("svg").remove()
        $(".main").remove()
        createTree(data)
    }
}
