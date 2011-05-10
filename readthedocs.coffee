find = (id) ->
    document.getElementById(id)

_jsonp = []
window.callback = (json) ->
    _jsonp.push json

ajax = (url, ready) ->
    scr = document.createElement 'script'
    done = no
    scr.onreadystatechange = scr.onload = () ->

        okay = !@readyState || @readyState == 'loaded' || @readyState == 'complete'

        if not done and okay
            done = yes
            scr.onreadystatechange = scr.onload = null
            setTimeout () ->
                document.body.removeChild scr
            ready _jsonp.pop()

    scr.onerror = () ->
        document.body.removeChild scr

    scr.src = url
    document.body.appendChild scr

inject_html = (obj) ->
  """
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

add_to_element = (id, query_id, result_id) ->
    submit = find id
    q_elem = find query_id
    result = find result_id

    on_submit = (ev) ->
        slug = q_elem.value
        url = 'http://readthedocs.org/api/v1/file/search/?format=jsonp&q=#{slug}'
        ajax url, (data) ->
            text = [inject_html chunk for chunk in data.objects] if data
            result.innerHTML = text.join ''

        ev and ev.preventDefault
        no

    submit.onsubmit = on_submit

@RTD = {
    search_form: add_to_element
}
