
D2L.LP.Web.UI.Html.Dom.AddClassInitializer("d2l-homepage",function(panel){var cleanWidgetFrames=function(iframe){try{var doc=iframe.contentWindow.document;doc.body.style.backgroundColor="#fff";var links=doc.getElementsByTagName("a");for(var j=0;j<links.length;j++){var hasHref=D2L.LP.Web.UI.Html.Dom.HasAttribute(links[j],"href");if(!hasHref)continue;if(!D2L.LP.Web.UI.Html.Dom.HasAttribute(links[j],"target"))links[j].target="_parent";links[j].href=links[j].href.replace("&d2l_body_type=3","");links[j].href=
links[j].href.replace("?d2l_body_type=3&","?");links[j].href=links[j].href.replace("?d2l_body_type=3","")}var forms=doc.getElementsByTagName("form");for(var k=0;k<forms.length;k++)if(!D2L.LP.Web.UI.Html.Dom.HasAttribute(forms[k],"target"))forms[k].target="_top"}catch(e){}};var legacyWidgetWrappers=D2L.LP.Web.UI.Html.Dom.GetElementsByClassName("d2l-widget-iframe-wrapper",panel);for(var i=0;i<legacyWidgetWrappers.length;i++)(function(legacyWidgetWrapper){var iframe=D2L.LP.Web.UI.Html.Dom.GetFirstElementByClassName("d2l-iframe",
legacyWidgetWrapper);if(iframe===undefined||iframe===null)return;D2L.LP.Web.UI.Common.Controls.IFrame.AddOnLoadHandler(iframe,function(){cleanWidgetFrames(iframe)})})(legacyWidgetWrappers[i]);var cancelClickEvent=function(evt){D2L.LP.Web.UI.Html.Dom.CancelEventBubble(evt)};var headingLinks=D2L.LP.Web.UI.Html.Dom.GetElementsByClassName("d2l-homepage-heading-link",panel);for(var j=0;j<headingLinks.length;j++)D2L.LP.Web.UI.Html.Dom.AddEventListener("click",headingLinks[j],cancelClickEvent)});
if(window["D2L"]!==undefined&&D2L.LP.Web.Packaging!==undefined)D2L.LP.Web.Packaging.Register("D2L.PlatformTools.Homepage.default");