/*! RESOURCE: /scripts/angular_1.5.8/angular-sanitize.js */
(function(window, angular) {
  'use strict';
  var $sanitizeMinErr = angular.$$minErr('$sanitize');
  var bind;
  var extend;
  var forEach;
  var isDefined;
  var lowercase;
  var noop;
  var htmlParser;
  var htmlSanitizeWriter;

  function $SanitizeProvider() {
    var svgEnabled = false;
    this.$get = ['$$sanitizeUri', function($$sanitizeUri) {
      if (svgEnabled) {
        extend(validElements, svgElements);
      }
      return function(html) {
        var buf = [];
        htmlParser(html, htmlSanitizeWriter(buf, function(uri, isImage) {
          return !/^unsafe:/.test($$sanitizeUri(uri, isImage));
        }));
        return buf.join('');
      };
    }];
    this.enableSvg = function(enableSvg) {
      if (isDefined(enableSvg)) {
        svgEnabled = enableSvg;
        return this;
      } else {
        return svgEnabled;
      }
    };
    bind = angular.bind;
    extend = angular.extend;
    forEach = angular.forEach;
    isDefined = angular.isDefined;
    lowercase = angular.lowercase;
    noop = angular.noop;
    htmlParser = htmlParserImpl;
    htmlSanitizeWriter = htmlSanitizeWriterImpl;
    var SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      NON_ALPHANUMERIC_REGEXP = /([^\#-~ |!])/g;
    var voidElements = toMap("area,br,col,hr,img,wbr");
    var optionalEndTagBlockElements = toMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
      optionalEndTagInlineElements = toMap("rp,rt"),
      optionalEndTagElements = extend({},
        optionalEndTagInlineElements,
        optionalEndTagBlockElements);
    var blockElements = extend({}, optionalEndTagBlockElements, toMap("address,article," +
      "aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5," +
      "h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,section,table,ul"));
    var inlineElements = extend({}, optionalEndTagInlineElements, toMap("a,abbr,acronym,b," +
      "bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s," +
      "samp,small,span,strike,strong,sub,sup,time,tt,u,var"));
    var svgElements = toMap("circle,defs,desc,ellipse,font-face,font-face-name,font-face-src,g,glyph," +
      "hkern,image,linearGradient,line,marker,metadata,missing-glyph,mpath,path,polygon,polyline," +
      "radialGradient,rect,stop,svg,switch,text,title,tspan");
    var blockedElements = toMap("script,style");
    var validElements = extend({},
      voidElements,
      blockElements,
      inlineElements,
      optionalEndTagElements);
    var uriAttrs = toMap("background,cite,href,longdesc,src,xlink:href");
    var htmlAttrs = toMap('abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,' +
      'color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,' +
      'ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,' +
      'scope,scrolling,shape,size,span,start,summary,tabindex,target,title,type,' +
      'valign,value,vspace,width');
    var svgAttrs = toMap('accent-height,accumulate,additive,alphabetic,arabic-form,ascent,' +
      'baseProfile,bbox,begin,by,calcMode,cap-height,class,color,color-rendering,content,' +
      'cx,cy,d,dx,dy,descent,display,dur,end,fill,fill-rule,font-family,font-size,font-stretch,' +
      'font-style,font-variant,font-weight,from,fx,fy,g1,g2,glyph-name,gradientUnits,hanging,' +
      'height,horiz-adv-x,horiz-origin-x,ideographic,k,keyPoints,keySplines,keyTimes,lang,' +
      'marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mathematical,' +
      'max,min,offset,opacity,orient,origin,overline-position,overline-thickness,panose-1,' +
      'path,pathLength,points,preserveAspectRatio,r,refX,refY,repeatCount,repeatDur,' +
      'requiredExtensions,requiredFeatures,restart,rotate,rx,ry,slope,stemh,stemv,stop-color,' +
      'stop-opacity,strikethrough-position,strikethrough-thickness,stroke,stroke-dasharray,' +
      'stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,' +
      'stroke-width,systemLanguage,target,text-anchor,to,transform,type,u1,u2,underline-position,' +
      'underline-thickness,unicode,unicode-range,units-per-em,values,version,viewBox,visibility,' +
      'width,widths,x,x-height,x1,x2,xlink:actuate,xlink:arcrole,xlink:role,xlink:show,xlink:title,' +
      'xlink:type,xml:base,xml:lang,xml:space,xmlns,xmlns:xlink,y,y1,y2,zoomAndPan', true);
    var validAttrs = extend({},
      uriAttrs,
      svgAttrs,
      htmlAttrs);

    function toMap(str, lowercaseKeys) {
      var obj = {},
        items = str.split(','),
        i;
      for (i = 0; i < items.length; i++) {
        obj[lowercaseKeys ? lowercase(items[i]) : items[i]] = true;
      }
      return obj;
    }
    var inertBodyElement;
    (function(window) {
      var doc;
      if (window.document && window.document.implementation) {
        doc = window.document.implementation.createHTMLDocument("inert");
      } else {
        throw $sanitizeMinErr('noinert', "Can't create an inert html document");
      }
      var docElement = doc.documentElement || doc.getDocumentElement();
      var bodyElements = docElement.getElementsByTagName('body');
      if (bodyElements.length === 1) {
        inertBodyElement = bodyElements[0];
      } else {
        var html = doc.createElement('html');
        inertBodyElement = doc.createElement('body');
        html.appendChild(inertBodyElement);
        doc.appendChild(html);
      }
    })(window);

    function htmlParserImpl(html, handler) {
      if (html === null || html === undefined) {
        html = '';
      } else if (typeof html !== 'string') {
        html = '' + html;
      }
      inertBodyElement.innerHTML = html;
      var mXSSAttempts = 5;
      do {
        if (mXSSAttempts === 0) {
          throw $sanitizeMinErr('uinput', "Failed to sanitize html because the input is unstable");
        }
        mXSSAttempts--;
        if (window.document.documentMode) {
          stripCustomNsAttrs(inertBodyElement);
        }
        html = inertBodyElement.innerHTML;
        inertBodyElement.innerHTML = html;
      } while (html !== inertBodyElement.innerHTML);
      var node = inertBodyElement.firstChild;
      while (node) {
        switch (node.nodeType) {
          case 1:
            handler.start(node.nodeName.toLowerCase(), attrToMap(node.attributes));
            break;
          case 3:
            handler.chars(node.textContent);
            break;
        }
        var nextNode;
        if (!(nextNode = node.firstChild)) {
          if (node.nodeType == 1) {
            handler.end(node.nodeName.toLowerCase());
          }
          nextNode = node.nextSibling;
          if (!nextNode) {
            while (nextNode == null) {
              node = node.parentNode;
              if (node === inertBodyElement) break;
              nextNode = node.nextSibling;
              if (node.nodeType == 1) {
                handler.end(node.nodeName.toLowerCase());
              }
            }
          }
        }
        node = nextNode;
      }
      while (node = inertBodyElement.firstChild) {
        inertBodyElement.removeChild(node);
      }
    }

    function attrToMap(attrs) {
      var map = {};
      for (var i = 0, ii = attrs.length; i < ii; i++) {
        var attr = attrs[i];
        map[attr.name] = attr.value;
      }
      return map;
    }

    function encodeEntities(value) {
      return value.
      replace(/&/g, '&amp;').
      replace(SURROGATE_PAIR_REGEXP, function(value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
      }).
      replace(NON_ALPHANUMERIC_REGEXP, function(value) {
        return '&#' + value.charCodeAt(0) + ';';
      }).
      replace(/</g, '&lt;').
      replace(/>/g, '&gt;');
    }

    function htmlSanitizeWriterImpl(buf, uriValidator) {
      var ignoreCurrentElement = false;
      var out = bind(buf, buf.push);
      return {
        start: function(tag, attrs) {
          tag = lowercase(tag);
          if (!ignoreCurrentElement && blockedElements[tag]) {
            ignoreCurrentElement = tag;
          }
          if (!ignoreCurrentElement && validElements[tag] === true) {
            out('<');
            out(tag);
            forEach(attrs, function(value, key) {
              var lkey = lowercase(key);
              var isImage = (tag === 'img' && lkey === 'src') || (lkey === 'background');
              if (validAttrs[lkey] === true &&
                (uriAttrs[lkey] !== true || uriValidator(value, isImage))) {
                out(' ');
                out(key);
                out('="');
                out(encodeEntities(value));
                out('"');
              }
            });
            out('>');
          }
        },
        end: function(tag) {
          tag = lowercase(tag);
          if (!ignoreCurrentElement && validElements[tag] === true && voidElements[tag] !== true) {
            out('</');
            out(tag);
            out('>');
          }
          if (tag == ignoreCurrentElement) {
            ignoreCurrentElement = false;
          }
        },
        chars: function(chars) {
          if (!ignoreCurrentElement) {
            out(encodeEntities(chars));
          }
        }
      };
    }

    function stripCustomNsAttrs(node) {
      if (node.nodeType === window.Node.ELEMENT_NODE) {
        var attrs = node.attributes;
        for (var i = 0, l = attrs.length; i < l; i++) {
          var attrNode = attrs[i];
          var attrName = attrNode.name.toLowerCase();
          if (attrName === 'xmlns:ns1' || attrName.lastIndexOf('ns1:', 0) === 0) {
            node.removeAttributeNode(attrNode);
            i--;
            l--;
          }
        }
      }
      var nextNode = node.firstChild;
      if (nextNode) {
        stripCustomNsAttrs(nextNode);
      }
      nextNode = node.nextSibling;
      if (nextNode) {
        stripCustomNsAttrs(nextNode);
      }
    }
  }

  function sanitizeText(chars) {
    var buf = [];
    var writer = htmlSanitizeWriter(buf, noop);
    writer.chars(chars);
    return buf.join('');
  }
  angular.module('ngSanitize', []).provider('$sanitize', $SanitizeProvider);
  angular.module('ngSanitize').filter('linky', ['$sanitize', function($sanitize) {
    var LINKY_URL_REGEXP =
      /((ftp|https?):\/\/|(www\.)|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"\u201d\u2019]/i,
      MAILTO_REGEXP = /^mailto:/i;
    var linkyMinErr = angular.$$minErr('linky');
    var isDefined = angular.isDefined;
    var isFunction = angular.isFunction;
    var isObject = angular.isObject;
    var isString = angular.isString;
    return function(text, target, attributes) {
      if (text == null || text === '') return text;
      if (!isString(text)) throw linkyMinErr('notstring', 'Expected string but received: {0}', text);
      var attributesFn =
        isFunction(attributes) ? attributes :
        isObject(attributes) ? function getAttributesObject() {
          return attributes;
        } :
        function getEmptyAttributesObject() {
          return {};
        };
      var match;
      var raw = text;
      var html = [];
      var url;
      var i;
      while ((match = raw.match(LINKY_URL_REGEXP))) {
        url = match[0];
        if (!match[2] && !match[4]) {
          url = (match[3] ? 'http://' : 'mailto:') + url;
        }
        i = match.index;
        addText(raw.substr(0, i));
        addLink(url, match[0].replace(MAILTO_REGEXP, ''));
        raw = raw.substring(i + match[0].length);
      }
      addText(raw);
      return $sanitize(html.join(''));

      function addText(text) {
        if (!text) {
          return;
        }
        html.push(sanitizeText(text));
      }

      function addLink(url, text) {
        var key, linkAttributes = attributesFn(url);
        html.push('<a ');
        for (key in linkAttributes) {
          html.push(key + '="' + linkAttributes[key] + '" ');
        }
        if (isDefined(target) && !('target' in linkAttributes)) {
          html.push('target="',
            target,
            '" ');
        }
        html.push('href="',
          url.replace(/"/g, '&quot;'),
          '">');
        addText(text);
        html.push('</a>');
      }
    };
  }]);
})(window, window.angular);;