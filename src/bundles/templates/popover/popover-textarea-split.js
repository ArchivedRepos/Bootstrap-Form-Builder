export default `<label class='control-label'> <%- label %> </label>
<textarea class="field" data-type="<%- type %>" style='min-height: 200px' id='<%- name %>'><% for ( var i = 0; i < value.length ; i++ ) { %><%- value[i] %><% if (i < value.length - 1) { %><%- "\\n" %><% } %><% } %></textarea>`;
