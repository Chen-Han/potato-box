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


module.export = PtBox;