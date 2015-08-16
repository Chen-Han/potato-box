/**
*
* 1. change all html mark up to react mark up 
* 2. add ability to specify classes based on props, for both box and label
* 3. Create demo tabs with <html> <React Mark up> <js>
* DONE TILL HERE :D
* 4. box-sm box-md box-lg are all responsive
* 5. box size works well when padding is specified (.clear)
**/
var React = require("react/addons");
class PtLabel extends React.Component{
  render(){
    var {children,setTabIndex,index,active,...otherProps} = this.props;
    
    function getClassName(active){
      return "pt-label " + (active?"active":"");
    }
    return (
        <li className={getClassName(active)} {...otherProps}>
          <a>{children}</a>
        </li>
      );
  }
}

class PtLabelList extends React.Component{
  render(){
    var {labels,labelStyle,onTabChange,onLabelClick,activeTab,...otherProps} = this.props;

    function getLabels(labels,labelStyle){
        return labels.map(function(label,index){

          function handleClick(e){
            // console.log(e);
            if(index!==activeTab){
              if(onTabChange) onTabChange(index);
              
            }
            if(onLabelClick) onLabelClick(label,index);
          }

          return (
              <PtLabel key={index} index={index} active={index===activeTab} onClick={handleClick}>{label}</PtLabel>
            );
        });
      }
    function getLabelStyle(labelStyle){
      return "pt-label-list " + (labelStyle || "");
    }
    return (<ul className={getLabelStyle(labelStyle)} {...otherProps}>
        {getLabels(labels)}
      </ul>);
  }
}



class PtPane extends React.Component{
  render(){
    var {active,...otherProps} = this.props;
    var classNames=["pt-pane"];
    if(active){
      classNames.push("active");
    }
    return(
        <div className={classNames.join(" ")} {...otherProps}>{this.props.children}</div>
      );
  }
}

class PtPaneList extends React.Component{
  
  render(){
    var {panes,activeTab,...otherProps} = this.props;

    function getPanes(panes){
      return panes.map(function(pane,index){
        var {label,children,...otherProps} = pane;
        return (<PtPane key={index} label={label} active={activeTab===index} {...otherProps} >
            {children}
          </PtPane>);
      });
    }
    return (
        <div className="pt-pane-list" {...otherProps}>
          {getPanes(panes)}
        </div>
      );
  }
}



class PtBox extends React.Component {

  constructor(props){
    super(props);
    this.state = {activeTab:0};
  }

  render(){
    var self = this;
    
    

    function getBoxStyle(boxStyle,size, className){
      return "pt-box " + boxStyle + " " + (size || "") +" "+ (className||"");
    }


    function getLabelList(tabs,labelStyle){

      function getLabels(tabs){
        return tabs.map(function(tab){
          return tab.label;
        });
      }

      function handleTabChange(idx){
        var oldIdx = self.state.activeTab;
        if(onTabChange)onTabChange(idx,oldIdx);
        self.setState({
          activeTab:idx
        });
      }

      return (
          <PtLabelList labelStyle={labelStyle} labels={getLabels(tabs)} activeTab={activeTab} onLabelClick={onLabelClick} onTabChange={handleTabChange}></PtLabelList>
        );      
    }
    
    function getPaneList(tabs){
      return (
        <PtPaneList panes={tabs} activeTab={activeTab}></PtPaneList>
        );
    }

    var {children,tabs,title,onTabChange,iconClass,size,onLabelClick,boxStyle,labelStyle,className,...otherProps} = this.props;
    /**
    * tabs: [tab ...]
    * tab: {label:"string",children:ReactNode}
    * 
    * 
    **/
    var {activeTab,...otherState} = this.state;
    activeTab = activeTab || 0;
    return (
      <div className={getBoxStyle(boxStyle,size,className)} {...otherProps}>
        <div className="pt-header clear-fix">
          <div className="title">
            
            <h5><i className={iconClass}></i>{title}</h5>
            
          </div>
          {getLabelList(tabs,labelStyle)}
        </div>
        <div className="pt-content">
          {getPaneList(tabs)}
        </div>
      </div>
      );
  }

}

var tabs = [{
  label:"l1",
  children:(<h3>Hello World!</h3>),
  onLabelClick:function(index){
    console.log("This tab is clicked! "+ index);
  }
},{
  label:"l2",
  children:(<h3>Hello World 2!</h3>)
},{
  label:"l3",
  children:(<h3>Hello World 3s!</h3>)
}];


function handleTabChange(index){
  console.log("Tab is changing " + index);
}
function handleLabelClick(index){
  console.log("This label is clicked " + index);
}





var boxes = 
[{
  title:"Default Label, Danger",
  boxStyle:"box-danger",
  tabs:[{
    label:"HTML",
    children:(<pre className="prettyprint">
      &lt;PtBox title="Your Title" boxStyle="box-danger" tabs=YourArrayOfTabs&gt;&lt;/PtBox&gt;
    </pre>)
  },{
    label:"CSS",
    children:"See style.less for more detail"
  },{
    label:"JS",
    children:(<pre className="prettyprint">
        See js file for more detail
      </pre>)
  }]
},{
  title:"Clear Box",
  boxStyle:"clear",
  tabs:[{
    label:"HTML",
    children:(<pre className="prettyprint">
      &lt;PtBox title="Your Title" boxStyle="box-clear" tabs=YourArrayOfTabs&gt;&lt;/PtBox&gt;
      </pre>)
  },{
    label:"CSS",
    children:"See style.less for more detail"
  },{
    label:"JS",
    children:(<pre className="prettyprint">
        See js file for more detail
      </pre>)
  }]
},{
  title:"Clear Label, Success,box-md",
  boxStyle:"box-success",
  labelStyle:"label-clear",
  size:"box-md",
  tabs:[{
    label:"HTML",
    children:(<pre className="prettyprint">TO DO...</pre>)
  },{
    label:"CSS",
    children:"set a size prop makes the height fixed, overflow:auto"
  },{
    label:"JS",
    children:(<pre className="prettyprint">
        See js file for more detail
      </pre>)
  }]
},{
  title:"Icon Label,warning,box-lg",
  boxStyle:"box-warning",
  labelStyle:"label-icon",
  size:"box-lg",
  tabs:[{
    label:(<i className="fa fa-html5"></i>),
    children:(<pre className="prettyprint">TO DO...</pre>)
  },{
    label:(<i className="fa fa-css3"></i>),
    children:(<pre className="prettyprint">Sets content height to be fixed</pre>)
  },{
    label:(<i className="fa fa-code"></i>),
    children:(<pre className="prettyprint"> See js file for more detail</pre>)
  }]
},{
  title:"Box with event handlers",
  tabs:[{
    label:"HTML",
    children:(<pre className="prettyprint">
      {`<PtBox title={box.title} tabs={[{
        label:"myLabel1",
        children:"Custom React Node here"
      }]} 
        onTabChange={onTabChange}
        onLabelClick={onLabelClick}></PtBox>`}
        </pre>)
  },{
    label:"CSS",
    children:"See style.less for more detail"
  },{
    label:"JS",
    children:(<pre className="prettyprint">
        {`
        function onTabChange(newIndex,oldIdx){
          //do some thing
        }
        function onLabelClick(index){
          //do some thing
        }

        `}
      </pre>)
  }],
  onTabChange:function(newIndex,oldIdx){
    console.log("label changed from index" + oldIdx + " to " + newIndex);
  },
  onLabelClick:function(index){
    console.log("Label #" + index + " is clicked!!");
  }
}];


boxes.forEach(function(box,index){
  React.render(
      (<PtBox {...box}></PtBox>),
      document.getElementById("box"+index)
    );
})