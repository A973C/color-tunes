// Generated by CoffeeScript 1.3.3

var ColorTunes;

ColorTunes = (function() {

  function ColorTunes() {}

  ColorTunes.getColorMap = function(canvas, sx, sy, w, h, nc) {
    var index, indexBase, pdata, pixels, x, y, _i, _j, _ref, _ref1;
    if (nc == null) {
      nc = 8;
    }
    pdata = canvas.getContext("2d").getImageData(sx, sy, w, h).data;
    pixels = [];
    for (y = _i = sy, _ref = sy + h; _i < _ref; y = _i += 1) {
      indexBase = y * w * 4;
      for (x = _j = sx, _ref1 = sx + w; _j < _ref1; x = _j += 1) {
        index = indexBase + (x * 4);
        pixels.push([pdata[index], pdata[index + 1], pdata[index + 2]]);
      }
    }
    return (new MMCQ).quantize(pixels, nc);
  };

  ColorTunes.colorDist = function(a, b) {
    var square;
    square = function(n) {
      return n * n;
    };
    return square(a[0] - b[0]) + square(a[1] - b[1]) + square(a[2] - b[2]);
  };

  ColorTunes.launch = function(image, canvas) {
    return $(image).on("load", function() {
      var bgColor, bgColorMap, bgPalette, color, dist, fgColor, fgColor2, fgColorMap, fgPalette, maxDist, rgbToCssString, _i, _j, _len, _len1;
      canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
      bgColorMap = ColorTunes.getColorMap(canvas, 0, 0, image.width * 0.5, image.height, 4);
      bgPalette = bgColorMap.cboxes.map(function(cbox) {
        return {
          count: cbox.cbox.count(),
          rgb: cbox.color
        };
      });
      bgPalette.sort(function(a, b) {
        return b.count - a.count;
      });
      bgColor = bgPalette[0].rgb;
      fgColorMap = ColorTunes.getColorMap(canvas, 0, 0, image.width, image.height, 10);
      fgPalette = fgColorMap.cboxes.map(function(cbox) {
        return {
          count: cbox.cbox.count(),
          rgb: cbox.color
        };
      });
      fgPalette.sort(function(a, b) {
        return b.count - a.count;
      });
      maxDist = 0;
      for (_i = 0, _len = fgPalette.length; _i < _len; _i++) {
        color = fgPalette[_i];
        dist = ColorTunes.colorDist(bgColor, color.rgb);
        if (dist > maxDist) {
          maxDist = dist;
          fgColor = color.rgb;
        }
      }
      maxDist = 0;
      for (_j = 0, _len1 = fgPalette.length; _j < _len1; _j++) {
        color = fgPalette[_j];
        dist = ColorTunes.colorDist(bgColor, color.rgb);
        if (dist > maxDist && color.rgb !== fgColor) {
          maxDist = dist;
          fgColor2 = color.rgb;
        }
      }
      rgbToCssString = function(color) {
        return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
      };
      $(".playlist").css("background-color", "" + (rgbToCssString(bgColor)));
      $(".playlist-indicator").css("border-bottom-color", "" + (rgbToCssString(bgColor)));
      $(".album-title, .album-tracks, .track-title").css("color", "" + (rgbToCssString(fgColor)));
      $(".album-divider").css("border-color", "" + (rgbToCssString(fgColor)));
      return $(".album-artist").css("color", "" + (rgbToCssString(fgColor2)));
    });
  };

  return ColorTunes;

})();
