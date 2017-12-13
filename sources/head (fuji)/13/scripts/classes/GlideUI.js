/*! RESOURCE: /scripts/classes/GlideUI.js */
var GlideUI = Class.create({
  initialize: function() {
    this.topWindow = getTopWindow() || window;
    this.outputMessagesTag = "output_messages";
    this.outputMsgDivClass = ".outputmsg_div";
    CustomEvent.observe(GlideUI.UI_NOTIFICATION_SYSTEM, this._systemNotification.bind(this));
    CustomEvent.observe(GlideUI.UI_NOTIFICATION_INFO, this._systemNotification.bind(this));
    CustomEvent.observe(GlideUI.UI_NOTIFICATION_ERROR, this._systemNotification.bind(this));
    CustomEvent.observe(GlideUI.UI_NOTIFICATION_SYSTEM_EVENT, this._eventNotification.bind(this));
  },
  setMsgTags: function(msgTag, msgDivClass) {
    this.outputMessagesTag = msgTag;
    this.outputMsgDivClass = msgDivClass;
  },
  display: function(htmlTextOrOptions) {
    alert('GlideUI.display() needs to be implemented in an overriding class');
  },
  fireNotifications: function() {
    var spans = $$('span.ui_notification');
    for (var i = 0; i < spans.length; i++) {
      var span = spans[i];
      this.fire(new GlideUINotification({
        xml: span
      }));
    }
  },
  fire: function(notification) {
    this.topWindow.CustomEvent.fireTop(GlideUI.UI_NOTIFICATION + '.' + notification.getType(), notification);
  },
  _systemNotification: function(notification) {
    var options = {
      text: notification.getText(),
      type: notification.getType()
    }
    if (!options.text)
      return;
    this.display(options);
  },
  _eventNotification: function(notification) {
    var type = notification.getAttribute('event');
    if (type == 'refresh_nav' && window.gsftReloadNav != undefined)
      gsftReloadNav();
  },
  addOutputMessage: function(options) {
    options = Object.extend({
      msg: '',
      id: '',
      type: 'info'
    }, options || {});
    var divs = this._getOutputMessageDivs();
    if (!divs)
      return false;
    var newMsg;
    if (typeof options.id == 'undefined' || options.id == '')
      newMsg = GlideUI.OUTPUT_MESSAGE_TEMPLATE.evaluate(options);
    else
      newMsg = GlideUI.OUTPUT_MESSAGE_TEMPLATE_WITH_ID.evaluate(options);
    divs.container.insert(newMsg);
    divs.messages.show();
    return true;
  },
  clearOutputMessages: function(closeImg) {
    var divs;
    if (closeImg) {
      closeImg = $(closeImg);
      divs = {
        messages: closeImg.up(),
        container: closeImg.up().select(this.outputMsgDivClass)[0]
      }
    } else
      divs = this._getOutputMessageDivs();
    if (!divs)
      return false;
    divs.messages.hide();
    divs.container.innerHTML = '';
    return true;
  },
  _getOutputMessageDivs: function() {
    var divs = {};
    divs.messages = $(this.outputMessagesTag);
    if (!divs.messages)
      return null;
    divs.container = divs.messages.select(this.outputMsgDivClass)[0];
    if (!divs.container)
      return null;
    return divs;
  },
  toString: function() {
    return 'GlideUI';
  }
});
GlideUI.UI_NOTIFICATION = 'glide:ui_notification';
GlideUI.UI_NOTIFICATION_SYSTEM = GlideUI.UI_NOTIFICATION + '.system';
GlideUI.UI_NOTIFICATION_INFO = GlideUI.UI_NOTIFICATION + '.info';
GlideUI.UI_NOTIFICATION_ERROR = GlideUI.UI_NOTIFICATION + '.error';
GlideUI.UI_NOTIFICATION_SYSTEM_EVENT = GlideUI.UI_NOTIFICATION + '.system_event';
GlideUI.OUTPUT_MESSAGE_TEMPLATE = new Template(
  '<div class="outputmsg outputmsg_#{type} notification notification-#{type}">' +
  '<img class="outputmsg_image" src="images/outputmsg_#{type}_24.gifx" />' +
  '#{msg}' +
  '</div>'
);
GlideUI.OUTPUT_MESSAGE_TEMPLATE_WITH_ID = new Template(
  '<div class="outputmsg outputmsg_#{type} notification notification-#{type}" id="#{id}">' +
  '<img class="outputmsg_image" src="images/outputmsg_#{type}_24.gifx" />' +
  '#{msg}' +
  '</div>'
);
window.g_GlideUI = new GlideUI();
GlideUI.get = function() {
  return window.g_GlideUI;
};;