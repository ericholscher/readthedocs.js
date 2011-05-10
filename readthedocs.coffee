inject_html = (obj) ->
  html = """
           <li class="module-item">
              <p class="module-item-title">
                File:
                <a href="#{obj['absolute_url']}"> - #{obj['project']['name']} - #{obj['name']}</a>
              </p>
              <p>
                #{obj['text']}
              </p>
           </li>
  """

add_to_element = (id) ->
  $("#" + id).submit (event)->
    project_slug = $('#query')[0].value
    url = "http://readthedocs.org/api/v1/file/search/?q=" + project_slug + "&format=jsonp";
    $.ajax
      url: url,
      dataType: 'jsonp',
      success: (data)->
          if data?
              text = ""
              for obj in data.objects
                  text += inject_html(obj)
                  $("#result").html(text)
    return false

$(document).ready ->
  add_to_element "rtd_query"
