(function() {
  var add_to_element, ajax, find, inject_html, _jsonp;
  find = function(id) {
    return document.getElementById(id);
  };
  _jsonp = [];
  window.callback = function(json) {
    return _jsonp.push(json);
  };
  ajax = function(url, ready) {
    var done, scr;
    scr = document.createElement('script');
    done = false;
    scr.onreadystatechange = scr.onload = function() {
      var okay;
      okay = !this.readyState || this.readyState === 'loaded' || this.readyState === 'complete';
      if (!done && okay) {
        done = true;
        scr.onreadystatechange = scr.onload = null;
        setTimeout(function() {
          return document.body.removeChild(scr);
        });
        return ready(_jsonp.pop());
      }
    };
    scr.onerror = function() {
      return document.body.removeChild(scr);
    };
    scr.src = url;
    return document.body.appendChild(scr);
  };
  inject_html = function(obj) {
    return "<li class=\"module-item\">\n   <p class=\"module-item-title\">\n     File:\n     <a href=\"" + obj['absolute_url'] + "\"> - " + obj['project']['name'] + " - " + obj['name'] + "</a>\n   </p>\n   <p>\n     " + obj['text'] + "\n   </p>\n</li>";
  };
  add_to_element = function(id, query_id, result_id) {
    var on_submit, q_elem, result, submit;
    submit = find(id);
    q_elem = find(query_id);
    result = find(result_id);
    on_submit = function(ev) {
      var slug, url;
      slug = q_elem.value;
      url = 'http://readthedocs.org/api/v1/file/search/?format=jsonp&q=' + slug;
      ajax(url, function(data) {
        var chunk, text;
        if (data) {
          text = [
            (function() {
              var _i, _len, _ref, _results;
              _ref = data.objects;
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                chunk = _ref[_i];
                _results.push(inject_html(chunk));
              }
              return _results;
            })()
          ];
        }
        return result.innerHTML = text.join('');
      });
      ev && ev.preventDefault;
      return false;
    };
    return submit.onsubmit = on_submit;
  };
  this.RTD = {
    search_form: add_to_element
  };
}).call(this);
