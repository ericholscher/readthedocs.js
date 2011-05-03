var project_slug = "read-the-docs"
var url = "http://readthedocs.org/api/v1/project/" + project_slug + "/?format=jsonp";
$.ajax({
  url: url,
  dataType: 'jsonp',
  success:function(data){
      if (data.absolute_url){
        alert("Project exists, with url: " + data['absolute_url']);
      };
  }
});
