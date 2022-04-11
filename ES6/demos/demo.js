import { Theme } from '../src/teechart-extras.js';
import { Chart } from '../src/teechart.js';

class Demo {

  // sets the aTheme to the aChart
  static changeTheme(chart, aTheme) {
    Theme.applyTheme(chart, aTheme);

    for (var i = 0; i < chart.series.count(); i++) {
      if ((chart.series.items[i].pointer) && (chart.series.items[i].pointer.format))
        chart.series.items[i].pointer.format.stroke.fill = "white";
    }
  }

  // sets the aPalette to the aChart
  // when aChart isn't defined, it searches for all the charts in the document and applies the aPalette to all
  static changePalette(aChart, aPalette) {
    if ((aPalette === undefined) && (typeof aChart === 'string')) {
      aPalette = aChart;
      aChart = undefined;
    }

    var target = [];

    if (aChart && (aChart instanceof Chart))
	{      
       Theme.applyPalette(aChart,aPalette);
       target.push(aChart);
	}
    else {
      $(target).each(function () {
        var chart = $(this)[0];
		Theme.applyPalette(chart, aPalette);
      })
    }

  }

  static changeThemeToDefault() {
    changeTheme("minimal");
    changePalette("seaWash");
  }

  static changeBackground(aTheme) {
    if (aTheme === "dark")
      changeBackgroundToDark();
    else
      changeBackgroundToWhite();
  }

  static changeBackgroundToDark() {
    document.body.style.backgroundColor = "#0C0C0C";
    document.body.style.color = "white";
    document.getElementById("theme").style.backgroundColor = "#0C0C0C";
    document.getElementById("palette").style.backgroundColor = "#0C0C0C";
    document.getElementById("canvasPanel").style.backgroundColor = "#0C0C0C";
    document.getElementById("optionPanel").style.backgroundColor = "#0C0C0C";
  }

  static changeBackgroundToWhite() {
    document.body.style.backgroundColor = "rgb(212, 212, 212)";
    document.body.style.color = "black";
    document.getElementById("theme").style.backgroundColor = "#ffffff";
    document.getElementById("palette").style.backgroundColor = "#ffffff";
    document.getElementById("canvasPanel").style.backgroundColor = "#ffffff";
    document.getElementById("optionPanel").style.backgroundColor = "#ffffff";
  }

  static resize(element) {
    if (element != null) {
      var w = 0, xContent, canvas, chart;

      if (element instanceof HTMLCanvasElement) {
        canvas = element;

        if (canvas.chart instanceof Chart) {
          chart = canvas.chart;

          xContent = $(canvas).closest('.x_content')[0];
          w = parseFloat(window.getComputedStyle(xContent, null).width) | w;

          /*var parent = element.canvas.parentElement;
          if ((xContent !== parent) && (parent.style)) {
            parent.style.width = w + "px";
          }*/

          canvas.width = w;
          chart.bounds.width = w;
          chart.draw();
        }
      }
    }
  }

  static resizeAll() {
    $('canvas').each(function () {
      Demo.resize(this);
    })
  }

  static showHide(element) {
    var selectorsDiv = $(element).closest('.x_panel').children('.x_content')[0];
    var icon = $(element).children('i')[0];

    if (selectorsDiv.style.display === "none") {
      selectorsDiv.style.display = "block";
      icon.classList.add('fa-chevron-up');
      icon.classList.remove('fa-chevron-down');
    }
    else {
      selectorsDiv.style.display = "none";
      icon.classList.add('fa-chevron-down');
      icon.classList.remove('fa-chevron-up');
    }
  }

  static resizeWithTextArea(canvas) {
    var xContentStyle = window.getComputedStyle(canvas.closest('.x_content'), null);
    var w = parseFloat(xContentStyle.width);
    w -= parseFloat(xContentStyle.paddingLeft) + parseFloat(xContentStyle.paddingRight) + parseFloat(xContentStyle.borderLeftWidth) + parseFloat(xContentStyle.borderRightWidth);

    var siblingStyle = window.getComputedStyle($(canvas).siblings('div').children('textarea')[0].parentElement, null);
    var h = Math.max(parseFloat(siblingStyle.height), 200);
    w -= parseFloat(siblingStyle.width) + 10;
    var chart = $(canvas)[0].chart;
    if (chart) {
      chart.canvas.width = w;
      chart.bounds.width = w;
      chart.canvas.height = h;
      chart.bounds.height = h;
      chart.draw();
    }
  }

  static resizeAllWithTextAreas() {
    $('canvas').each(function () {
      Demo.resizeWithTextArea(this);
    })
  }

  static withTextAreas() {
    var result = false;

    $('canvas').each(function () {
      if ($(this).siblings('div').children('textarea').length > 0)
        result = true;
    });

    return result;
  }
}

$(function () {
  var textAreas = Demo.withTextAreas();

  if (textAreas)
    Demo.resizeAllWithTextAreas();
  else
    Demo.resizeAll();

  $(window).on('resize', function () {
    if ((navigator.userAgentData && navigator.userAgentData.platform && !/iPad|iPhone|iPod/.test(navigator.userAgentData.platform)) ||
        (navigator.platform && !/iPad|iPhone|iPod/.test(navigator.platform)))
      if (textAreas)
        Demo.resizeAllWithTextAreas();
      else
        Demo.resizeAll();
  })

  // Resize the charts when resizing the textareas
  if (textAreas) {
    var $textareas = $('textarea');
    $textareas.data('width', $textareas.width());
    $textareas.data('height', $textareas.height());

    $textareas.mousedown(function () {
      $(this).data('resizing', true);
    });

    $(window).on('mouseup', function () {
      $('textarea').data('resizing', false);
    });

    $textareas.mousemove(function () {
      var $this = $(this);
      if ($this.data('resizing') &&
        (($this.width() !== $this.data('width')) || ($this.height() !== $this.data('height')))) {
          Demo.resizeWithTextArea($this.parent().siblings('canvas')[0]);
      }
      $this.data('width', $this.width());
      $this.data('hright', $this.height());
    });
  }
})

export { Demo }
