import { createInstructions } from './modules/createHTMLModule.js'
import { createTree, createCustomTree, createTrumpTree } from './modules/createTreeModule.js'

$('#instructionsPage').click(createInstructions)
$('#examplePage').click(createTrumpTree)
$('#customPage').click(createCustomTree)

const data = []
let marriageCounter = 0

function handleForm (name, relation) {
  if (!data.length > 0) {
    $('#nameContainer').after('<div class="form-group col-5">\n' +
            "                    <select id='relation' class=\"form-control\">\n" +
            '                        <option>Children</option>\n' +
            '                        <option>Spouse</option>\n' +
            '                    </select>\n' +
            '                </div>\n')
    data[0] = {
      name: name,
      class: 'node',
      textClass: 'nodeText',
      depthOffset: 1,
      marriages: []
    }
    createTree(data)
  } else {
    if (relation === 'Spouse') {
      data[0].marriages[marriageCounter++] = {
        spouse: {
          name: name
        },
        children: []
      }
    } else if (relation === 'Children') {
      data[0].marriages[marriageCounter - 1].children.push({
        name: name,
        class: 'node',
        textClass: 'nodeText',
        depthOffset: 1,
        marriages: []
      })
    }
    $('svg').remove()
    $('.main').remove()
    createTree(data)
  }
}
export { handleForm }
