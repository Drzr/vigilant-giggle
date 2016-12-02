<!DOCTYPE html>
<html>
<head>
<script src="https://js.ucode.com/ucode_paper.js"></script><script>
   var pencil; 
    var timer = 1;
    function drawBasic() {
          
         text(Math.floor(Math.random()*100+50), 200, 200)
          
      }
    function onMouseDown(event)
    {
         pencil = path(event.point.x, event.point.y);
         pencil.strokeColor = 'blue';
    }
    function onMouseMove(event){
        if(timer>10){
            circle(Math.random()*300 + 100 ,Math.random()*100 + 90, Math.floor(Math.random()*4 + 4));
            timer = 1;
        }
        
        
    }

    function onMouseUp(event){
       
        
    }
      function onMouseDrag(event) {
          pencil.add(event.point);
        drawRandomCircle(event.point.x, event.point.y);    

      }
    function onFrame(event){
        timer++
        
        
        //circle(Math.random()*300 + 50 ,Math.random()*100 + 10, Math.floor(Math.random()*4 + 4));
    }
    
      function drawRandomCircle(x, y) {
          var r = Math.floor(Math.random()*255);
          var g = Math.floor(Math.random()*255);
          var b = Math.floor(Math.random()*255);
          var a = Math.random()*1
          
       var draw = circle(x + Math.random()*50 - 10, y + Math.random()*100 - 10, Math.floor(Math.random()*4 + 4));
         
      }
      function drawRandomPolygon(x , y ){
        rectangle(x,y,30,20 )  
          
      }
    </script>
</head>

<body>
  <script>  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-29362848-1']);
  _gaq.push(['_setDomainName', 'js.students.ucode.com']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>
</body>
</html>
