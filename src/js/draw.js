
   function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

      /**
       * Redraw the complete canvas.
       */
      function redraw() {
          // Clears the canvas
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          for (var i = 0; i < clickX.length; i += 1) {
              if (!clickDrag[i] && i == 0) {
                  ctx.beginPath();
                  ctx.moveTo(clickX[i], clickY[i]);
                  ctx.stroke();
              } else if (!clickDrag[i] && i > 0) {
                  ctx.closePath();

                  ctx.beginPath();
                  ctx.moveTo(clickX[i], clickY[i]);
                  ctx.stroke();
              } else {
                  ctx.lineTo(clickX[i], clickY[i]);
                  ctx.stroke();
              }
          }
      }

      /**
       * Draw the newly added point.
       * @return {void}
       */
      function drawNew() {
          var i = clickX.length - 1
          if (!clickDrag[i]) {
              if (clickX.length == 0) {
                  ctx.beginPath();
                  ctx.moveTo(clickX[i], clickY[i]);
                  ctx.stroke();
              } else {
                  ctx.closePath();

                  ctx.beginPath();
                  ctx.moveTo(clickX[i], clickY[i]);
                  ctx.stroke();
              }
          } else {
              ctx.lineTo(clickX[i], clickY[i]);
              ctx.stroke();
          }
      }

      function mouseDownEventHandler(e) {
          paint = true;
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (paint) {
              addClick(x, y, false);
              drawNew();
          }
      }

      function touchstartEventHandler(e) {
          paint = true;
          if (paint) {
              addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
              drawNew();
          }
      }

      function mouseUpEventHandler(e) {
          ctx.closePath();
          paint = false;
      }

      function mouseMoveEventHandler(e) {
          var x = e.pageX - canvas.offsetLeft;
          var y = e.pageY - canvas.offsetTop;
          if (paint) {
              addClick(x, y, true);
              drawNew();
          }
      }

      function touchMoveEventHandler(e) {
          if (paint) {
              addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
              drawNew();
          }
      }

      function setUpHandler(isMouseandNotTouch, detectEvent) {
          removeRaceHandlers();
          if (isMouseandNotTouch) {
              canvas.addEventListener('mouseup', mouseUpEventHandler);
              canvas.addEventListener('mousemove', mouseMoveEventHandler);
              canvas.addEventListener('mousedown', mouseDownEventHandler);
              mouseDownEventHandler(detectEvent);
          } else {
              canvas.addEventListener('touchstart', touchstartEventHandler);
              canvas.addEventListener('touchmove', touchMoveEventHandler);
              canvas.addEventListener('touchend', mouseUpEventHandler);
              touchstartEventHandler(detectEvent);
          }
      }

      function mouseWins(e) {
          setUpHandler(true, e);
      }

      function touchWins(e) {
          setUpHandler(false, e);
      }

      function removeRaceHandlers() {
          canvas.removeEventListener('mousedown', mouseWins);
          canvas.removeEventListener('touchstart', touchWins);
      }




