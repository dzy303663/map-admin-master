(function() {
    function o(w, v, i) {
        return w.getAttribute(v) || i
    }
    function j(i) {
        return document.getElementsByTagName(i)
    }
    function l() {
        var i = j("script"),
            w = i.length,
            v = i[w - 1];
        return {
            l: w,
            z: o(v, "zIndex", 0),//这里作为背景设置index:-1  
            o: o(v, "opacity", 0.5),
            c: o(v, "color", "15,136,235"),//两点之间连线的颜色  
            n: o(v, "count", 299)//整个屏幕里面散点的数量  
        }
    }
    function k() {//这里设置了canvas的宽和高为屏幕的宽和高  
        r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function b() {
        e.clearRect(0, 0, r, n);
        var w = [f].concat(t);
        var x, v, A, B, z, y;
        t.forEach(function (i) {
            i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
            for (v = 0; v < w.length; v++) {
                x = w[v];
                if (i !== x && null !== x.x && null !== x.y) {
                    B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
                    y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                }
            }
            w.splice(w.indexOf(i), 1)
        }), m(b)
    }
    var u = document.createElement("canvas"),
        s = l(),
        c = "c_n" + s.l,
        e = u.getContext("2d"),
        r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function (i) {
                window.setTimeout(i, 1000 / 45)
            }, a = Math.random, f = {
                x: null,
                y: null,
                max: 20000
            };
    u.id = c;
    u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
    console.log(document.getElementsByTagName("body"))
    document.getElementsByTagName("body")[0].appendChild(u);//将canvas元素插入的body里  
    k(), window.onresize = k;
    window.onmousemove = function (i) {
        i = i || window.event, f.x = i.clientX, f.y = i.clientY
    }, window.onmouseout = function () {
        f.x = null, f.y = null
    };
    for (var t = [], p = 0; s.n > p; p++) {
        var h = a() * r,
            g = a() * n,
            q = 2 * a() - 1,
            d = 2 * a() - 1;
        t.push({
            x: h,
            y: g,
            xa: q,
            ya: d,
            max: 6000
        })
    }
    setTimeout(function () { 
        b()
    }, 100)
})();
let a={}
 export default{
    a
 } ;

///////////////////////////////////////////////////////
// (function () {
//   var canvasEl = document.getElementById('canvas');
//   var ctx = canvasEl.getContext('2d');
//   var mousePos = [0, 0];

//   var easingFactor = 5.0;
//   var backgroundColor = '#000';
//   var nodeColor = '#fff';
//   var edgeColor = '#fff';

//   var nodes = [];
//   var edges = [];

//   function constructNodes() {
//     for (var i = 0; i < 100; i++) {
//       var node = {
//         drivenByMouse: i == 0,
//         x: Math.random() * canvasEl.width,
//         y: Math.random() * canvasEl.height,
//         vx: Math.random() * 1 - 0.5,
//         vy: Math.random() * 1 - 0.5,
//         radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3
//       };

//       nodes.push(node);
//     }

//     nodes.forEach(function (e) {
//       nodes.forEach(function (e2) {
//         if (e == e2) {
//           return;
//         }

//         var edge = {
//           from: e,
//           to: e2
//         }

//         addEdge(edge);
//       });
//     });
//   }

//   function addEdge(edge) {
//     var ignore = false;

//     edges.forEach(function (e) {
//       if (e.from == edge.from && e.to == edge.to) {
//         ignore = true;
//       }

//       if (e.to == edge.from && e.from == edge.to) {
//         ignore = true;
//       }
//     });

//     if (!ignore) {
//       edges.push(edge);
//     }
//   }

//   function step() {
//     nodes.forEach(function (e) {
//       if (e.drivenByMouse) {
//         return;
//       }

//       e.x += e.vx;
//       e.y += e.vy;

//       function clamp(min, max, value) {
//         if (value > max) {
//           return max;
//         } else if (value < min) {
//           return min;
//         } else {
//           return value;
//         }
//       }

//       if (e.x <= 0 || e.x >= canvasEl.width) {
//         e.vx *= -1;
//         e.x = clamp(0, canvasEl.width, e.x)
//       }

//       if (e.y <= 0 || e.y >= canvasEl.height) {
//         e.vy *= -1;
//         e.y = clamp(0, canvasEl.height, e.y)
//       }
//     });

//     adjustNodeDrivenByMouse();
//     render();
//     window.requestAnimationFrame(step);
//   }

//   function adjustNodeDrivenByMouse() {
//     nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor;
//     nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor;
//   }

//   function lengthOfEdge(edge) {
//     return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2));
//   }

//   function render() {
//     ctx.fillStyle = backgroundColor;
//     ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

//     edges.forEach(function (e) {
//       var l = lengthOfEdge(e);
//       var threshold = canvasEl.width / 8;

//       if (l > threshold) {
//         return;
//       }

//       ctx.strokeStyle = edgeColor;
//       ctx.lineWidth = (1.0 - l / threshold) * 2.5;
//       ctx.globalAlpha = 1.0 - l / threshold;
//       ctx.beginPath();
//       ctx.moveTo(e.from.x, e.from.y);
//       ctx.lineTo(e.to.x, e.to.y);
//       ctx.stroke();
//     });
//     ctx.globalAlpha = 1.0;

//     nodes.forEach(function (e) {
//       if (e.drivenByMouse) {
//         return;
//       }

//       ctx.fillStyle = nodeColor;
//       ctx.beginPath();
//       ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI);
//       ctx.fill();
//     });
//   }

//   window.onresize = function () {
//     canvasEl.width = document.body.clientWidth;
//     canvasEl.height = canvasEl.clientHeight;

//     if (nodes.length == 0) {
//       constructNodes();
//     }

//     render();
//   };

//   window.onmousemove = function (e) {
//     mousePos[0] = e.clientX;
//     mousePos[1] = e.clientY;
//   }

//   window.onresize(); // trigger the event manually.
//   window.requestAnimationFrame(step);
// }).call(this);
