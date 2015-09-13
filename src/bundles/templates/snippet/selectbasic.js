export default `<!-- Select Basic -->
<div class="control-group">
  <label class="control-label" for="<%- id %>"><%- label %></label>
  <div class="controls">
    <select id="<%- id %>" name="<%- id %>" class="<%- inputsize %>"><% _.each(options, function(option) { %>
      <option><%- option %></option><% }); %>
    </select>
  </div>
</div>`;
