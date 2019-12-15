
function getTextNodesIn(elem, opt_fnFilter) {
  var textNodes = [];
  if (elem) {
    for (var nodes = elem.childNodes, i = nodes.length; i--;) {
      var node = nodes[i], nodeType = node.nodeType;
      if (nodeType == 3) {
        if (!opt_fnFilter || opt_fnFilter(node, elem)) {
          textNodes.push(node);
        }
      }
      else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
        textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
      }
    }
  }
  return textNodes;
}

function kipcsak_light(e) {
  e.textContent = e.textContent.replace(/[ií]/g,"ü").replace(/[IÍ]/g,"Ü")
}
function kipcsak_medium(e) {
  e.textContent = e.textContent.replace(/[eéií]/g,"ü").replace(/[EIÉÍ]/g,"Ü")
}
function kipcsak_hard(e) {
  e.textContent = e.textContent.replace(/[aáeéiíoóőuóú]/g,"ü").replace(/[AEIOUÁÉÍÖÜÓÚŐ]/g,"Ü")
}

function replaceAllTag(tagname) {
  for (elem of document.getElementsByTagName(tagname)) {
    for (text of getTextNodesIn(elem)) { 
      kipcsakFunction(text)
    }
  }
}

function replaceAllClass(classname) {
  for (tag of document.getElementsByClassName(classname)) {
    for (e of getTextNodesIn(tag)) { 
      kipcsakFunction(e)
    }
  }
}

var kipcsakFunction = kipcsak_hard

for (h of ["h1","h2","h3","h4","h5"]) {
  replaceAllTag(h)
}

for (cl of["ajanlo","oversized"]) {
  replaceAllClass(cl)
}