window.uc = window.uc || {
  loadScript: function(script) {
    var element = document.createElement('script');
    element.async = false;
    element.src = script;
    element.type = 'text/javascript';
    (document.getElementsByTagName('head')[0]||document.body).appendChild(element);
  },
  loadScriptFromURL: function(script) {
    uc.loadScript(('https:' == document.location.protocol ? 'https://' : 'http://') + script);
  }
};
window.uc.paper = {
  addColorToPath: function(path, color, fillColor) {
    path.strokeColor = color || 'black';
    if (fillColor)
      path.fillColor = fillColor;
  },
  createBasicCanvas: function(canvasId) {
    var element = document.createElement('canvas');
    element.id = canvasId;
    element.width = '600';
    element.height = '400';
    element.resize = 'resize';
    element.style.border = '1px solid black';
    document.body.appendChild(element);
    return element;
  }
};
function path() {
  var path;
  if (typeof(arguments[0]) === 'boolean')
    path = new paper.Path({closed: Array.prototype.shift.apply(arguments)});
  else
    path = new paper.Path();
  for (var i = 0; i < arguments.length - 1 && typeof(arguments[i]) === 'number' && typeof(arguments[i+1]) === 'number'; i += 2)
    path.add(point(arguments[i], arguments[i+1]));
  uc.paper.addColorToPath(path, arguments[i], arguments[i+1]);
  return path;
}
function line(x, y, x2, y2, color) {
  var path = new paper.Path();
  uc.paper.addColorToPath(path, color);
  path.moveTo(point(x, y));
  path.lineTo(point(x2, y2));
  return path;
}
function point(x, y) {
  return new paper.Point(x, y);
}
function rectangle(x, y, width, height, color, fillColor) {
  var rectanglePath = new paper.Shape.Rectangle(x, y, width, height);
  uc.paper.addColorToPath(rectanglePath, color, fillColor);
  return rectanglePath;
}
function roundedRectangle(x, y, width, height, cornerRadius, color, fillColor) {
  var rectanglePath = new paper.Shape.Rectangle(new paper.Rectangle(x, y, width, height), cornerRadius);
  uc.paper.addColorToPath(rectanglePath, color, fillColor);
  return rectanglePath;
}
function circle(x, y, radius, color, fillColor) {
  var circlePath = new paper.Shape.Circle(point(x, y), radius);
  uc.paper.addColorToPath(circlePath, color, fillColor);
  return circlePath;
}
function polygon() {
  Array.prototype.unshift.call(arguments, true);
  return path.apply(null, arguments);
}
function regularPolygon(x, y, numberSides, radius, color, fillColor) {
  var polygonPath = new paper.Path.RegularPolygon(point(x, y), numberSides, radius);
  uc.paper.addColorToPath(polygonPath, color, fillColor);
  return polygonPath;
}
function text(content, x, y, size, color, fillColor) {
  var textPoint = new paper.PointText(point(x, y));
  uc.paper.addColorToPath(textPoint, color, fillColor);
  textPoint.justification = 'center';
  textPoint.fontSize =  size || 30;
  textPoint.content = content;
  return textPoint;
}
function importRasterFromId(image_id) {
  return new paper.Raster(image_id);
}

uc.loadScriptFromURL('js.ucode.com/paper-full.min.js');

window.onload = function() {
  if (typeof(drawBasic) === 'function') {
    var canvasId = 'paper_canvas';
    var canvas = document.getElementById(canvasId) || uc.paper.createBasicCanvas(canvasId);
    paper.setup(canvas);
    drawBasic();
    if (typeof(onFrame) === 'function')
      paper.view.onFrame = onFrame;
    else
      paper.view.draw();
    var tool;
    if (typeof(onMouseMove) === 'function') (tool || (tool = new paper.Tool())).onMouseMove = onMouseMove;
    if (typeof(onMouseDown) === 'function') (tool || (tool = new paper.Tool())).onMouseDown = onMouseDown;
    if (typeof(onMouseDrag) === 'function') (tool || (tool = new paper.Tool())).onMouseDrag = onMouseDrag;
    if (typeof(onMouseUp) === 'function') (tool || (tool = new paper.Tool())).onMouseUp = onMouseUp;
    if (typeof(onKeyDown) === 'function') (tool || (tool = new paper.Tool())).onKeyDown = onKeyDown;
    if (typeof(onKeyUp) === 'function') (tool || (tool = new paper.Tool())).onKeyUp = onKeyUp;
  }
};
