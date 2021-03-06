export default `<form class='form'>
  <div class='controls'>
    <% var compiled =  _.reduce(items, function(str, v, k){ %>
      <% v["name"] = k; %>
      <% return str + popoverTemplates[v["type"]](v); %>
    <% }, "") %>
    <%= compiled %>
    <hr/>
    <button id="save" class='btn btn-info'>Save</button><button id="cancel" class='btn btn-danger'>Cancel</button>
  </div>
</form>`;
