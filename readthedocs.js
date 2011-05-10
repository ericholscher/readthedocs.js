/* Generated JS from readthedocs.coffee */

var add_to_element, inject_html;
inject_html = function(obj) {
  var html;
  return html = "<li class=\"module-item\">\n   <p class=\"module-item-title\">\n     File:\n     <a href=\"" + obj['absolute_url'] + "\"> - " + obj['project']['name'] + " - " + obj['name'] + "</a>\n   </p>\n   <p>\n     " + obj['text'] + "\n   </p>\n</li>";
};
add_to_element = function(id) {
  return $("#" + id).submit(function(event) {
    var project_slug, url;
    project_slug = $('#query')[0].value;
    url = "http://readthedocs.org/api/v1/file/search/?q=" + project_slug + "&format=jsonp";
    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(data) {
        var obj, text, _i, _len, _ref, _results;
        if (data != null) {
          text = "";
          _ref = data.objects;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            obj = _ref[_i];
            text += inject_html(obj);
            _results.push($("#result").html(text));
          }
          return _results;
        }
      }
    });
    return false;
  });
};
$(document).ready(function() {
  return add_to_element("rtd_query");
});
