import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import TempSnippetView from './temp-snippet';
import PubSub from '../helper/pubsub';

import { renderform as _renderForm } from '../templates/templates';

export default Backbone.View.extend({
  tagName: "fieldset"
  , initialize: function(){
    this.collection.on("add", this.render, this);
    this.collection.on("remove", this.render, this);
    this.collection.on("change", this.render, this);
    PubSub.on("mySnippetDrag", this.handleSnippetDrag, this);
    PubSub.on("tempMove", this.handleTempMove, this);
    PubSub.on("tempDrop", this.handleTempDrop, this);
    this.$build = $("#build");
    this.renderForm = _.template(_renderForm);
    this.formMarkup = '';
    this.render();
  }

  , render: function(){
    //Render Snippet Views
    this.$el.empty();
    var that = this;
    var containsFile = false;
    _.each(this.collection.renderAll(), function(snippet){
      that.$el.append(snippet);
    });
    this.formMarkup = _.map(this.collection.renderAllClean(), e => e.html()).join('\n');
    $("#render").val(that.renderForm({
      multipart: this.collection.containsFileType(),
      text: this.formMarkup
    }));
    this.$el.appendTo("#build form");
    this.delegateEvents();
  }

  , getBottomAbove: function(eventY){
    var myFormBits = $(this.$el.find(".component"));
    var topelement = _.find(myFormBits, function(renderedSnippet) {
      if (($(renderedSnippet).offset().top + $(renderedSnippet).height()) > eventY  - 90) {
        return true;
      }
      else {
        return false;
      }
    });
    if (topelement){
      return topelement;
    } else {
      return myFormBits[0];
    }
  }

  , handleSnippetDrag: function(mouseEvent, snippetModel) {
    $("body").append(new TempSnippetView({model: snippetModel}).render());
    this.collection.remove(snippetModel);
    PubSub.trigger("newTempPostRender", mouseEvent);
  }

  , handleTempMove: function(mouseEvent){
    $(".target").removeClass("target");
    if(mouseEvent.pageX >= this.$build.offset().left &&
        mouseEvent.pageX < (this.$build.width() + this.$build.offset().left) &&
        mouseEvent.pageY >= this.$build.offset().top &&
        mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)){
      $(this.getBottomAbove(mouseEvent.pageY)).addClass("target");
    } else {
      $(".target").removeClass("target");
    }
  }

  , handleTempDrop: function(mouseEvent, model, index){
    if(mouseEvent.pageX >= this.$build.offset().left &&
       mouseEvent.pageX < (this.$build.width() + this.$build.offset().left) &&
       mouseEvent.pageY >= this.$build.offset().top &&
       mouseEvent.pageY < (this.$build.height() + this.$build.offset().top)) {
      var index = $(".target").index();
      $(".target").removeClass("target");
      this.collection.add(model,{at: index+1});
    } else {
      $(".target").removeClass("target");
    }
  }
});
