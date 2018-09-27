/*
*Author: liang jiafu
*E-mail: 15622316910@163.com
*M-date: 2018/5/10 16:28
*M-used:
*/
import Vue from 'vue';
Vue.directive('drag',{
    bind:function (el, binding) {
      console.log(binding.arg);
      let oDiv = el,
        self = this;

      let prev = null,
          next=null,
          prevX = 0,
          prevY = 0,
          nextX = 0,
          nextY = 0,
          maxDist = 0,
          minDist = 0,
          r = 13;

      switch (binding.arg) {
        case 'x':
          oDiv.onmousedown = function (e) {
            maxDist = +oDiv.getAttribute('data-max');
            minDist = +oDiv.getAttribute('data-min');
            let container = document.querySelector('.img-container'),
              minL = 0,//x轴，不需要减去小球半径
              maxL = container.offsetWidth;
            prev = oDiv.previousElementSibling;
            next = oDiv.nextElementSibling;
            if(prev !== null && prev.className.indexOf('l-item') > -1) {
              prevX = prev.offsetLeft;
            } else {
              prevX = minL;
            }
            if(next !== null && next.className.indexOf('l-item') > -1) {
              nextX = next.offsetLeft;
            } else {
              nextX = maxL
            }

            console.log(prev, next, prevX, prevY, nextX, nextY, maxDist);

            let disX = e.clientX - oDiv.offsetLeft;
            document.onmousemove = function (e) {
              let l = e.clientX - disX;

              l > (prevX + maxDist)  && (l = prevX + maxDist );
              l > maxL && (l = maxL );
              l > nextX - minDist && (l = nextX - minDist );

              l < prevX + minDist  && (l=prevX + minDist );
              l < (nextX - maxDist) && (l = nextX - maxDist );
              l < minL && (l=minL);

              oDiv.style.left = l + 'px';
              binding.value({x:oDiv.offsetLeft, y:e.pageY,id:oDiv.id});
            };
            document.onmouseup = function (e) {
              binding.value({x:oDiv.offsetLeft, y:e.pageY,id:oDiv.id});
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
          break;
        case 'y':
          oDiv.onmousedown = function (e) {
            maxDist = +oDiv.getAttribute('data-max');
            minDist = +oDiv.getAttribute('data-min');
            let container = document.querySelector('.img-container'),
              minT = -r,
              maxT = container.offsetHeight - r;
            prev = oDiv.previousElementSibling;
            next = oDiv.nextElementSibling;

            if(prev !== null && prev.className.indexOf('v-item') > -1) {
              prevY = prev.offsetTop;
            } else {
              prevY = minT;
            }

            if(next !== null && next.className.indexOf('v-item') > -1) {
              nextY = next.offsetTop;
            } else {
              nextY = maxT;
            }

            let disY = e.clientY - oDiv.offsetTop;

            document.onmousemove = function (e) {
              let t = e.clientY - disY;

              t > (prevY + maxDist)  && (t = prevY + maxDist );
              t > nextY - minDist && (t = nextY - minDist );
              t > maxT && (t = maxT );

              t < prevY + minDist  && (t=prevY + minDist );
              t < (nextY - maxDist) && (t = nextY - maxDist );
              t < minT && (t=minT);

              //console.log(t,nextY,t > (prevY + maxDist), t > nextY, t > maxT, t < prevY, t < (nextY - maxDist), t < minT);

              oDiv.style.top = t + 'px';
              binding.value({x:e.pageX,y:oDiv.offsetTop,id:oDiv.id});
            };
            document.onmouseup = function (e) {
              binding.value({x:e.pageX,y:oDiv.offsetTop,id:oDiv.id});
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
          break;
        default:
          oDiv.onmousedown = function (e) {
            let disX = e.clientX - oDiv.offsetLeft;
            let disY = e.clientY - oDiv.offsetTop;

            document.onmousemove = function (e) {
              let l = e.clientX - disX;
              let t = e.clientY - disY;
              oDiv.style.left = l + 'px';
              oDiv.style.top = t + 'px';
            };
            document.onmouseup = function (e) {
              binding.value({x:e.pageX,y:e.pageY});
              document.onmousemove = null;
              document.onmouseup = null;
            };
          };
      }
    }
  }
);

