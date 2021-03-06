import $ from 'jquery';
import _ from 'underscore';
import { temp as _tempTemplate } from '../templates/templates';
import PubSub from '../helper/pubsub';
import SnippetView from './snippet';

export default SnippetView.extend({
  initialize: function(){
    PubSub.on("newTempPostRender", this.postRender, this);
    this.constructor.__super__.initialize.call(this);
    this.tempTemplate = _.template(_tempTemplate);
  }
  , className: "temp"
  , render: function() {
    return this.$el.html(this.tempTemplate({text: this.constructor.__super__.render.call(this).html()}));
  }
  , postRender: function(mouseEvent){
    this.tempForm  = this.$el.find("form")[0];
    this.halfHeight = Math.floor(this.tempForm.clientHeight/2);
    this.halfWidth  = Math.floor(this.tempForm.clientWidth/2);
    this.centerOnEvent(mouseEvent);
  }
  , events:{
    "mousemove": "mouseMoveHandler",
    "mouseup" : "mouseUpHandler"
  }
  , centerOnEvent: function(mouseEvent){
    var mouseX     = mouseEvent.pageX;
    var mouseY     = mouseEvent.pageY;
    this.tempForm.style.top = (mouseY - this.halfHeight) + "px";
    this.tempForm.style.left = (mouseX - this.halfWidth) + "px";
    // Make sure the element has been drawn and
    // has height in the dom before triggering.
    PubSub.trigger("tempMove", mouseEvent);
  }
  , mouseMoveHandler: function(mouseEvent) {
    mouseEvent.preventDefault();
    this.centerOnEvent(mouseEvent);
  }
  , mouseUpHandler: function(mouseEvent){
    mouseEvent.preventDefault();
    PubSub.trigger("tempDrop", mouseEvent, this.model);
    this.remove();
  }
});
