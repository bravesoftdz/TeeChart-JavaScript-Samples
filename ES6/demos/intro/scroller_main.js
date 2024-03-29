import { Chart } from '../../src/teechart.js';
import { Scroller } from '../../src/teechart.js';
import { Area } from '../../src/teechart.js';
import { Format } from '../../src/teechart.js';
import { Annotation } from '../../src/teechart.js';
import { ToolTip } from '../../src/teechart.js';
import { CursorTool } from '../../src/teechart.js';
import { SeriesAnimation } from '../../src/teechart.js';
import { FadeAnimation } from '../../src/teechart.js';
import { DateFormat } from '../../src/date.format.js';
import { Demo } from '../demo.js';


var Chart1;
var scroller;
var textColor ='141476';

draw();

function draw() {

  //init chart
  Chart1=new Chart("canvas");
  
  Demo.changeTheme(Chart1, "minimal");
  
  Chart1.panel.margins.top = 12;
  
  var vals = [1.234,1.233,1.235,1.241,1.241,1.244,1.239,1.220,1.222,1.224,1.228,1.242,1.241,1.239,1.244,1.238,1.233,1.250,1.253,
              1.250,1.249,1.240,1.241,1.248,1.240,1.247,1.246,1.247,1.257,1.268,1.265,1.263,1.262,1.268,1.267,1.264,1.271,1.274,
			  1.265,1.275,1.279,1.285,1.292,1.301,1.304,1.317,1.325,1.323,1.321,1.309,1.312,1.308,1.303,1.300,1.301,1.306,1.298,
			  1.302,1.301,1.306,1.314,1.312,1.308,1.300,1.300,1.305,1.312,1.330,1.321,1.319,1.317,1.316,1.312,1.313,1.307,1.306,
			  1.309,1.302,1.297,1.290,1.300,1.290,1.289,1.284,1.282,1.286,1.288,1.289,1.290,1.292,1.290,1.297,1.304,1.310,1.311,
			  1.306,1.308,1.315,1.316,1.321,1.325,1.306,1.302,1.308,1.314,1.323,1.324,1.330,1.330,1.338,1.335,1.334,1.335,1.341,
			  1.338,1.333,1.342,1.328,1.316,1.316,1.324,1.321,1.320,1.340,1.351,1.348,1.342,1.342,1.352,1.345,1.350,1.345,1.347,
			  1.355,1.358,1.357,1.365,1.369,1.376,1.377,1.362,1.367,1.366,1.354,1.350,1.351,1.360,1.353,1.351,1.348,1.348,1.356,
			  1.341,1.337,1.335,1.318,1.322,1.328,1.322,1.314,1.317,1.319,1.313,1.322,1.314,1.315,1.319,1.310,1.317,1.304,1.308,
			  1.303,1.307,1.304,1.320,1.303,1.295,1.293,1.298,1.293,1.296,1.305,1.311,1.316,1.321,1.320,1.323,1.321,1.318,1.331,
			  1.319,1.321,1.319,1.318,1.314,1.317,1.316,1.320,1.320,1.329,1.323,1.324,1.321,1.325,1.329,1.317,1.312,1.314,1.303,
			  1.300,1.300,1.298,1.302,1.304,1.297,1.307,1.307,1.305,1.299,1.309,1.318,1.316,1.319,1.323,1.323,1.338,1.334,1.341,
			  1.344,1.351,1.347,1.347,1.347,1.353,1.337,1.338,1.327,1.321,1.315,1.319,1.319,1.319,1.310,1.313,1.303,1.296,1.302,
			  1.293,1.320,1.321,1.321,1.321,1.327,1.323,1.327,1.328,1.332,1.330,1.341,1.340,1.340,1.338,1.341,1.335,1.341,1.355,
			  1.360,1.363,1.350,1.345,1.344,1.339,1.346,1.346,1.346,1.353,1.347,1.347,1.350,1.350,1.350,1.339,1.336,1.351,1.346,
			  1.346,1.330,1.325,1.382,1.338,1.343,1.340,1.352,1.350,1.351,1.367,1.367,1.368,1.364,1.361];
			  
  var dates = [13420512,13421376,13423968,13424832,13425696,13426560,13427424,13428288,13430016,13430880,
               13432608,13433472,13436064,13436928,13437792,13438656,13439520,13442112,13442976,13443840,
			   13444704,13445568,13448160,13449024,13450752,13451616,13454208,13455072,13455936,13456800,
			   13457664,13460256,13461120,13461984,13462848,13463712,13466304,13467168,13468032,13468896,
			   13469760,13470624,13472352,13474080,13474944,13475808,13478400,13479264,13480128,13480992,
			   13481856,13484448,13485312,13486176,13487040,13487904,13490496,13491360,13492224,13493088,
			   13493952,13496544,13497408,13498272,13499136,13502592,13503456,13504320,13505184,13506048,
			   13508640,13509504,13510368,13511232,13512096,13515552,13516416,13518144,13520736,13521600,
			   13522464,13523328,13524192,13526784,13527648,13528512,13529376,13530240,13532832,13533696,
			   13534560,13535424,13536288,13538880,13539744,13540608,13541472,13542336,13544928,13545792,
			   13546656,13548384,13550976,13551840,13552704,13553568,13554432,13557024,13557888,13558752,
			   13559616,13560480,13563072,13565664,13566528,13569120,13570848,13571712,13572576,13575168,
			   13576032,13576896,13577760,13578624,13581216,13582080,13582944,13583808,13584672,13587264,
			   13588128,13588992,13589856,13590720,13593312,13594176,13595040,13595904,13596768,13599360,
			   13600224,13601088,13601952,13602816,13605408,13606272,13607136,13608000,13608864,13611456,
			   13612320,13613184,13614048,13614912,13617504,13618368,13619232,13620096,13620960,13623552,
			   13624416,13625280,13626144,13627008,13629600,13630464,13631328,13632192,13633056,13635648,
			   13636512,13637376,13638240,13639104,13641696,13642560,13643424,13644288,13648608,13649472,
			   13650336,13651200,13653792,13654656,13655520,13656384,13657248,13659840,13660704,13661568,
			   13662432,13663296,13665888,13666752,13667616,13668480,13669344,13671936,13672800,13674528,
			   13675392,13677984,13678848,13679712,13680576,13681440,13684032,13684896,13685760,13686624,
			   13687488,13690080,13690944,13691808,13692672,13693536,13696128,13696992,13697856,13698720,
			   13699584,13702176,13703040,13703904,13704768,13705632,13708224,13709088,13709952,13710816,
			   13711680,13714272,13715136,13716000,13716864,13717728,13721184,13722048,13722912,13723776,
			   13726368,13727232,13728096,13728960,13729824,13732416,13733280,13734144,13735008,13735872,
			   13738464,13739328,13740192,13741056,13741920,13744512,13745376,13746240,13747968,13750560,
			   13751424,13752288,13753152,13754016,13756608,13757472,13758336,13759200,13760064,13762656,
			   13763520,13764384,13766112,13768704,13769568,13770432,13771296,13772160,13774752,13775616,
			   13776480,13777344,13778208,13780800,13781664,13782528,13783392,13784256,13786848,13787712,
			   13789440,13790304,13792896,13793760,13794624,13795488,13796352,13798944,13799808,13800672];
  

  var rate = new Area();
  rate.title = "USD to Euro";
  rate.data.values = vals; 
  var avgDates = new Array();

  
  for (let t=0; t < rate.count(); t++) {
	  avgDates[t] = new Date(dates[t] * 100000);
  }
  rate.data.x = avgDates;
  //rate.data.x = dates;
  Chart1.addSeries(rate);//.format.gradient.visible=true;

  //config some series appearance characteristics
  Chart1.series.items[0].pointer.width = 10;
  Chart1.series.items[0].pointer.height = 10;
  Chart1.series.items[0].pointer.style = "ellipse";
  Chart1.series.items[0].pointer.format.stroke.size = 4;
  Chart1.series.items[0].pointer.format.stroke.fill = "white";
  Chart1.series.items[0].pointer.format.shadow.visible = false;
  Chart1.series.items[0].format.stroke.size = 1;
  Chart1.series.items[0].format.shadow.visible = false;
  Chart1.series.items[0].format.stroke.fill="rgba(255,165,0,0.8)";
  Chart1.series.items[0].format.fill="rgba(255,165,0,0.5)";
  
  Chart1.panel.format.gradient.visible=false;
  Chart1.panel.format.shadow.visible=false;
  Chart1.panel.format.fill="rgba(255,255,255,1)";
  Chart1.panel.format.stroke.fill="rgba(255,255,255,1)";
  
  //Axes
  Chart1.axes.left.title.text = "$ 000s";
  Chart1.axes.left.labels.roundFirst = true;
  Chart1.axes.left.title.visible = false;  
  Chart1.axes.bottom.labels.roundFirst = true;
  Chart1.axes.bottom.title.text = "Bottom Axis";
  Chart1.axes.bottom.title.format.font.fill = "rgba(0,0,0,0.6)";
  Chart1.axes.bottom.title.format.font.setSize(20);
  Chart1.axes.bottom.title.visible = false;
  Chart1.axes.bottom.labels.dateFormat = "dd/mm/yy";
  Chart1.axes.left.setMinMax(1.20, 1.41);
  Chart1.axes.left.grid.format.stroke.size = 0.5;
  Chart1.axes.left.ticks.visible=false;
  Chart1.axes.bottom.grid.visible=false;
  Chart1.axes.left.format.stroke.fill = "rgba(0,0,0,0.0)";
  Chart1.axes.bottom.format.stroke.size = 0.5;
  Chart1.axes.bottom.setMinMax(rate.data.x[116].getTime(), rate.data.x[180].getTime());
  Chart1.walls.visible=false;

  //Title
  Chart1.title.visible = false;
  Chart1.title.text="Sales figures";
  
  //Legend
  Chart1.legend.visible = false;
  // annotation (alternative title)
  let a1 = new Annotation(Chart1);
  a1.format.fill = "rgba(0,0,0,0.0)";
  a1.format.stroke.fill = "rgba(0,0,0,0.0)";
  a1.format.font.style = "20px Tahoma";
  a1.format.font.fill = "rgba(255,85,0,0.8)";
  a1.text = "US Dollar against the Euro";
  
  // annotation (alternative title)
  let a2 = new Annotation(Chart1);
  a2.format.fill = "rgba(0,0,0,0.0)";
  a2.format.stroke.fill="rgba(0,0,0,0.0)";
  a2.format.font.style = "12px Arial";
  a2.format.font.fill = "rgba(255,115,0,0.9)";
  a2.text = "  2012 - 2013 Source: Steema Software SL";

  Chart1.draw();  //get positions
  
  a1.position.x = Chart1.axes.bottom.calc((Chart1.axes.bottom.minimum+Chart1.axes.bottom.maximum)/2) -140;
  a1.position.y = 8;
  Chart1.tools.add(a1);
  a2.position.x = Chart1.axes.bottom.calc((Chart1.axes.bottom.minimum+Chart1.axes.bottom.maximum)/2) -140;
  a2.position.y = 30;
  Chart1.tools.add(a2);  
  
  //tooltip
  let tip=new ToolTip(Chart1);
  tip.render = "dom";
  tip.domStyle = "padding-left:8px; padding-right:8px; padding-top:0px; padding-bottom:4px; margin-left:5px; margin-top:0px; ";
  tip.domStyle = tip.domStyle + "background-color:#FCFCFC; border-radius:4px 4px; color:#FFF; ";
  tip.domStyle = tip.domStyle + "border-style:solid;border-color:#A3A3AF;border-width:1px; z-index:1000;";
  
  Chart1.tools.add(tip);

  tip.onhide=function() { let scaling=0; let poindex=-1; }
  
  tip.ongettext=function( tool, text, series, index) { 
    var s = '<font face="verdana" color="black" size="1"><strong>' + series.title + '</strong></font>';
	    s = s + '<br/><font face="verdana" color="orange" size="1">Series point: <strong>' +  DateFormat.format(series.data.x[index]) + '</strong></font>';
        s =	s +'<br/><font face="verdana" color="darkorange" size="1"><b>Value: $' + series.data.values[index].toFixed(2) + '/€</b></font>';  
	return s;
  }

  //animation
  let animation = new SeriesAnimation();
  animation.duration = 1000;
  animation.kind = "each";
  let fadeAnimation = new FadeAnimation();
  fadeAnimation.duration = 500;
  fadeAnimation.fade.series = true;
  fadeAnimation.fade.marks = true;
  animation.mode = "linear"; 
  fadeAnimation.mode = "linear";
  animation.items.push(fadeAnimation);
  
  animation.animate(Chart1);
  
  Chart1.zoom.enabled = false;
  Chart1.scroll.mouseButton = 0;
  Chart1.scroll.direction = "horizontal";
  var t = new CursorTool(Chart1);
  t.direction="vertical";
  Chart1.tools.add(t);
  
  //scroller
  scroller = new Scroller("canvas2", Chart1);
  scroller.onChanging = function(s,min,max) {
    var mi = new Date(min).toDateString(),
        ma = new Date(max).toDateString();
    document.getElementById("dataRange").innerHTML = '<font face="arial" size="2">Showing data from ' + mi + ' to ' + ma + '</font>';
  }
  scroller.panel.transparent = true;
  scroller.panel.format.shadow.visible = false;
  scroller.panel.format.round.x = 0;
  scroller.panel.format.round.y = 0;
  
  scroller.panel.format.gradient.visible = true;
  if (Chart1.panel.format.gradient.colors.length>1)
    scroller.panel.format.gradient.colors = [Chart1.panel.format.gradient.colors[0],Chart1.panel.format.gradient.colors[1]];
  else
    scroller.panel.format.gradient.colors = ["white"];
  scroller.panel.format.gradient.direction = "topbottom";
  scroller.panel.format.stroke.fill = "rgba(255,165,0,0.5)";
  scroller.panel.format.stroke.size = 0;

  Chart1.ondraw=function() {
    resizeScroller(scroller);
  }
}

function oneWeek(){
	  Chart1.axes.bottom.setMinMax(Chart1.series.items[0].data.x[148].getTime(), Chart1.series.items[0].data.x[152].getTime());
	  Chart1.draw();
	  scroller.draw();
}
function oneMonth(){
	  Chart1.axes.bottom.setMinMax(Chart1.series.items[0].data.x[138].getTime(), Chart1.series.items[0].data.x[159].getTime());
	  Chart1.draw();
	  scroller.draw();
}
function threeMonth(){
	  Chart1.axes.bottom.setMinMax(Chart1.series.items[0].data.x[116].getTime(), Chart1.series.items[0].data.x[180].getTime());
	  Chart1.draw();
	  scroller.draw();
}
function allTime(){
	  Chart1.axes.bottom.setMinMax(Chart1.series.items[0].data.x[0].getTime(), Chart1.series.items[0].data.x[299].getTime());
	  Chart1.draw();
	  scroller.draw();
}

function resizeScroller(aScroller) {
  if (aScroller != null) {
    var chart = aScroller.target;
    var parentStyle = window.getComputedStyle(chart.canvas.parentElement, null);
    var w = Math.floor(chart.canvas.parentElement.offsetWidth-(parseFloat(parentStyle.paddingLeft)+parseFloat(parentStyle.paddingRight)+parseFloat(parentStyle.borderLeftWidth)+parseFloat(parentStyle.borderRightWidth)));
    w -= Math.floor(chart.canvas.width - chart.chartRect.getRight()) - 5;
	var h = 100;
    var l = chart.chartRect.x;
    aScroller.canvas.setAttribute('width', w + "px");
    aScroller.canvas.setAttribute('height', h + "px");
    aScroller.setBounds(l, 0, w - l - 5, h);

    aScroller.draw();
  }
}
