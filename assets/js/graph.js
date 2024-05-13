var width = window.innerWidth - 40;
var height = window.innerHeight - 40;
var groupSelected;
var serverSelected;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});


var layer = new Konva.Layer();
stage.add(layer);

layer.on('click', function (e) {
    // get the element that was clicked on
    var element = e.target;
    if (element.attrs.name !== 'connector') {
        serverSelected = serverList.filter(s => s.group._id == element.parent._id)[0];
        document.getElementById('servername').textContent = 'Server name: ' + serverSelected.name;
        groupSelected = element.parent;
        document.getElementById("serverMenu").style.display = 'flex';
    }
    else {
        console.log("this is an connector")
        console.log(element);
    }
});

function updateConnector(s) {
    var q = s;
    edges.forEach(e => {
        var idParts = e.attrs.id.split('-');
        if (idParts[0] == q.name || idParts[1] == q.name) {
            var s = serverList.find(t => t.name == idParts[0]);
            var sn = serverList.find(t => t.name == idParts[1]);
            var sx = s.getX() + 45 + width/3;
            var sy = s.getY() + height/2 - 10;
            var snx = sn.getX() + 45 + width/3;
            var sny = sn.getY() + height/2 - 10;
            e.points([ sx, sy, snx, sny]);
            var label_element = layer.findOne('#' + e.attrs.id + '-weight');
            label_element.x((sx + snx)/2);
            label_element.y((sy + sny)/2);
        }
    });
}