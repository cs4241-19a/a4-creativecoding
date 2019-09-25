import {createGUI} from "./createHTMLModule.js"
import {handleForm} from "../main.js"

function createTree(familyData) {
    $("#instructions").empty()
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
    $("#instructionsPage").removeClass("active")
    $("#customPage").removeClass("active").addClass("active")
    $("#examplePage").removeClass("active")
    $("#instructions").empty()
    $("svg").remove()
    $(".main").remove()
    let form = $("<form>\n" +
        "            <div class=\"form-row\">\n" +
        "                <div class=\"form-group col-5\" id='nameContainer'>\n" +
        "                    <input id='name' type=\"text\" class=\"form-control\" placeholder=\"Name\">\n" +
        "                </div>\n" +
        "                <div class=\"form-group col-2\">\n" +
        "                    <button id='formButton' class=\"btn btn-primary\">Add</button>\n" +
        "                </div>\n" +
        "             </div>\n" +
        "        </form>")
    $('#customForm').append(form)
    $('#formButton').click(function () {
        handleForm($('#name').val(), $("#relation option:selected").text())
    })
}

function createTrumpTree() {
    $(".main").remove()
    $(".form-row").remove()
    $("#graph").removeClass()
    $("#instructionsPage").removeClass("active")
    $("#customPage").removeClass("active")
    $("#examplePage").removeClass("active").addClass("active")
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

export {createTrumpTree, createCustomTree, createTree}