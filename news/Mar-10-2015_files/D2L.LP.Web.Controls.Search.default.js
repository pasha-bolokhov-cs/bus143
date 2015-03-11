
D2L.Control.Search=D2L.Control.extend({Construct:function(){arguments.callee.$.Construct.call(this);this.stateGroup="Search";this.options=[];this.isExpanded=false;this.doSearch=false;this.onSearch="";this.m_host=null;this.m_isSuggestedSearch=false;this.primaryTextType=3},IntegrateControlMin:function(deserializer){arguments.callee.$.IntegrateControlMin.call(this,deserializer);this.doSearch=deserializer.GetBoolean();this.isExpanded=deserializer.GetBoolean();this.onSearch=deserializer.GetMember();var hasPrimaryText=
deserializer.GetMember();if(hasPrimaryText)this.primaryTextType=deserializer.GetMember();if(deserializer.HasMember()){var hostControlId=deserializer.GetObjectMin(D2L.Control.Id);this.m_host=UI.GetControl(hostControlId.ID(),hostControlId.SID())}else this.m_host=this;if(this.m_host&&this.m_host.RegisterSearch)this.m_host.RegisterSearch(this);var primaryTextInput=UI.GetControl(this.GetMappedId()+"_primary_text");if(primaryTextInput){this.primaryTextOption=new D2L.Control.Search.SearchText(-1,"primary",
primaryTextInput.GetMappedId(),this.GetMappedId()+"_primary_fields");var me=this;UI.GetWindowEventManager().InstallKpel(primaryTextInput.GetDomNode(),function(obj,evt){me.PrimaryKeyPress(evt)})}if(!this.isExpanded)this.RemoveSearchOptionTitles();D2L.Util.Aria.SetRole(this.GetDomNode(),"search")},RemoveSearchOptionTitles:function(){var selects=this.GetDomNode().getElementsByTagName("select");var inputs=this.GetDomNode().getElementsByTagName("input");for(var i=0;i<selects.length;i++){var element=selects[i];
if(element&&element.title&&element.title!=""){element["d2ltitle"]=element.title;element.removeAttribute("title")}}for(var i=0;i<inputs.length;i++){var element=inputs[i];if(element&&element.title&&element.title!=""){element["d2ltitle"]=element.title;element.removeAttribute("title")}}},AddSearchOptionTitles:function(){var selects=this.GetDomNode().getElementsByTagName("select");var inputs=this.GetDomNode().getElementsByTagName("input");for(var i=0;i<selects.length;i++){var element=selects[i];if(element&&
element.d2ltitle&&element.d2ltitle!=""&&element.title!==undefined){element.title=element.d2ltitle;element.d2ltitle=""}}for(var i=0;i<inputs.length;i++){var element=inputs[i];if(element&&element.d2ltitle&&element.d2ltitle!=""&&element.title!==undefined){element.title=element.d2ltitle;element.d2ltitle=""}}},Search:function(overridePrimaryText){var me=this;var dRet=ValidationManager.Validate("Search");dRet.Register(function(pass){if(!pass){if(!me.isExpanded)me.ToggleSearch();return}if(me.onSearch.length>
0){var func=new Function(me.onSearch);if(!func())return}if(me.primaryTextOption){var hasSelectedFields=me.primaryTextOption.HasSelectedFields();if(!hasSelectedFields){UI.Error(new D2L.LP.Text.LangTerm("Framework.Search.jsErrorSearchOptionSearch"));return}}me.doSearch=true;var sg=StateManager.GetStateGroup(me.stateGroup);if(sg)sg.SetIsActive(true);if(me.m_host)me.m_host.OnSearchChanged(me);if(overridePrimaryText){me.SetIsSuggestedSearch(true);me.SetSearchText(new D2L.LP.Text.PlainText(overridePrimaryText))}Nav.Go(new D2L.NavInfo)})},
OnSearchChanged:function(){},GetIsExpanded:function(){return this.isExpanded},GetPrimaryText:function(){return this.primaryTextOption},GetState:function(serializer,stateType){if(stateType=="expanded")serializer.AddMember("IsExpanded",this.GetIsExpanded());else{serializer.AddMember("DoSearch",this.doSearch);serializer.AddMember("IsSuggestedSearch",this.GetIsSuggestedSearch());if(this.doSearch){if(this.primaryTextOption){serializer.AddMember("PrimaryTextValue",this.primaryTextOption.GetValue());serializer.AddMember("PrimaryTextFields",
this.primaryTextOption.GetSelectedFields())}var optionData=[];for(var i=0;i<this.options.length;i++)optionData.push(new D2L.Control.Search.SearchOptionInfo(this.options[i].type,this.options[i].GetId(),D2L.Serialization.JsonSerializer.Serialize(this.options[i])));serializer.AddMember("OptionData",optionData)}}},PrimaryKeyPress:function(e){if(e.GetKey()==D2L.KeyPressEvent.Key.Enter){this.Search();return false}else return true},Clear:function(noNavigation){var me=this;var DoClear=function(){me.doSearch=
false;me.isExpanded=false;var sg=StateManager.GetStateGroup(me.stateGroup);if(sg)sg.Clear();if(me.host&&me.host!==null){me.host.OnSearchChanged(me);me.host.isSearchExpanded=false}};if(!noNavigation){var ni=new D2L.NavInfo;ni.OnNavigate.RegisterMethod(function(){DoClear()});Nav.Go(ni)}else DoClear()},SetIsSuggestedSearch:function(isSuggestedSearch){this.m_isSuggestedSearch=isSuggestedSearch},GetIsSuggestedSearch:function(){return this.m_isSuggestedSearch},ToggleSearch:function(showImg,hideImg){var searchOptions=
UI.GetById(this.GetMappedId()+"_searchOptions");var searchLink=UI.GetControl(this.GetMappedId()+"_searchOptionsToggle");var img;if(this.isExpanded){if(this.primaryTextOption){var hasSelectedFields=this.primaryTextOption.HasSelectedFields();if(!hasSelectedFields){UI.Error(new D2L.LP.Text.LangTerm("Framework.Search.jsErrorSearchOptionHide"));return}}this.RemoveSearchOptionTitles();searchOptions.style.display="none";searchLink.SetText(new D2L.LP.Text.LangTerm("Framework.Search.lblShowSearchOptions"));
if(showImg!==null){img=UI.GetControl(this.GetMappedId()+"_searchOptionsToggleImg");if(img){img.SetImage(new D2L.Images.ImageTerm("Framework.Search.actShowSearchOptions"));img.SetAlt(new D2L.LP.Text.LangTerm("Framework.Search.altShowSearchOptions"))}}}else{this.AddSearchOptionTitles();searchOptions.style.display="block";searchLink.SetText(new D2L.LP.Text.LangTerm("Framework.Search.lblHideSearchOptions"));if(hideImg!==null){img=UI.GetControl(this.GetMappedId()+"_searchOptionsToggleImg");if(img){img.SetImage(new D2L.Images.ImageTerm("Framework.Search.actHideSearchOptions"));
img.SetAlt(new D2L.LP.Text.LangTerm("Framework.Search.altHideSearchOptions"))}}}this.isExpanded=!this.isExpanded;var tEvent=new D2L.TransformEvent(searchOptions);tEvent.Bubble();if(this.isExpanded)(new D2L.DisplayVisibleEvent(searchOptions)).Bubble()},AddOption:function(option){this.options[this.options.length]=option},SetSearchText:function(text){var primaryTextInput=UI.GetControl(this.GetMappedId()+"_primary_text");if(primaryTextInput)primaryTextInput.SetText(text)},SetPrimarySearchFieldIsChecked:function(fieldName,
isChecked){if(this.primaryTextOption)this.primaryTextOption.SetPrimarySearchFieldIsChecked(fieldName,isChecked)},SetPrimaryTagSearchFieldIsChecked:function(isChecked){if(this.primaryTextOption)this.primaryTextOption.SetPrimaryTagSearchFieldIsChecked(isChecked)}});D2L.Control.Search.AdaptSearch=function(searchId){var searchControl=UI.GetControl(searchId);if(searchControl!=null)searchControl.Search()};D2L.Control.Search.OptionType={Boolean:1,DateRange:2,DropDownList:3,Text:4,PrimaryText:5,Custom:6};
D2L.Control.Search.SearchOptionInfo=D2L.Class.extend({Construct:function(type,id,serializedData){arguments.callee.$.Construct.call(this);this.m_type=type;this.m_id=id;this.m_serializedData=serializedData},Serialize:function(serializer){serializer.AddMember("Type",this.m_type);serializer.AddMember("Id",this.m_id);serializer.AddMember("SerializedData",this.m_serializedData,undefined,true)}});
D2L.Control.Search.SearchBoolean=D2L.Class.extend({Construct:function(index,field,bothRb,onRb,offRb){arguments.callee.$.Construct.call(this);this.index=index;this.type=D2L.Control.Search.OptionType.Boolean;this.field=field;this.bothRb=bothRb;this.onRb=onRb;this.offRb=offRb},Serialize:function(serializer){serializer.AddMember("Field",this.field);var state=0;if(this.onRb.IsSelected())state=0;else if(this.offRb.IsSelected())state=1;else state=2;serializer.AddMember("State",state)},GetId:function(){return this.field}});
D2L.Control.Search.SearchText=D2L.Class.extend({Construct:function(index,name,valueId,cbName){arguments.callee.$.Construct.call(this);this.index=index;this.type=D2L.Control.Search.OptionType.Text;this.name=name;this.cbName=cbName;this.valueId=valueId},Serialize:function(serializer){serializer.AddMember("Name",this.name);serializer.AddMember("Value",this.GetValue());serializer.AddMember("SelectedFields",this.GetSelectedFields())},GetId:function(){return this.name},GetValue:function(){return UI.GetById(this.valueId).value},
HasSelectedFields:function(){var cbs=UI.GetControls(this.cbName);if(cbs.length==1)return true;else for(var i=0;i<cbs.length;i++)if(cbs[i].IsChecked())return true;return false},GetSelectedFields:function(){var ret=[];var cbs=UI.GetControls(this.cbName);if(cbs.length==1)ret.push(cbs[0].GetValue());else for(var i=0;i<cbs.length;i++)if(cbs[i].IsChecked())ret.push(cbs[i].GetValue());return ret},SetPrimarySearchFieldIsChecked:function(fieldName,isChecked){var cbs=UI.GetControls(this.cbName);if(cbs.length>
1)for(var i=0;i<cbs.length;i++)if(cbs[i].GetValue()==fieldName)cbs[i].SetIsChecked(isChecked)},SetPrimaryTagSearchFieldIsChecked:function(isChecked){var cbs=UI.GetControls(this.cbName);if(cbs.length>1)for(var i=0;i<cbs.length;i++)if(cbs[i].GetValue().indexOf("__searchTagField")>=0)cbs[i].SetIsChecked(isChecked)}});
D2L.Control.Search.SearchDropDownList=D2L.Class.extend({Construct:function(index,field,cbId,dlId){arguments.callee.$.Construct.call(this);this.index=index;this.type=D2L.Control.Search.OptionType.DropDownList;this.field=field;this.cbId=cbId;this.dlId=dlId},Serialize:function(serializer){serializer.AddMember("Field",this.field);if(UI.GetControl(this.cbId).IsChecked())serializer.AddMember("Value",UI.GetControl(this.dlId),"GetState")},GetId:function(){return this.field}});
D2L.Control.Search.SearchDateRange=D2L.Class.extend({Construct:function(index,field,name){arguments.callee.$.Construct.call(this);this.index=index;this.type=D2L.Control.Search.OptionType.DateRange;this.field=field;this.name=name},Serialize:function(serializer){serializer.AddMember("Field",this.field);serializer.AddMember("Value",UI.GetControl(this.name),"GetState")},GetId:function(){return this.field}});if(window["D2L"]!==undefined&&D2L.LP.Web.Packaging!==undefined)D2L.LP.Web.Packaging.Register("D2L.LP.Web.Controls.Search.default");
