class ExampleApplication extends React.Component {
  render() {
    var elapsed = Math.round(this.props.elapsed  / 100);
    var seconds = elapsed / 10 + (elapsed % 10 ? '' : '.0' );
    var message =
      `React has been successfully running for ${seconds} seconds.`;

    return <p>{message}</p>;
  }
}

var start = new Date().getTime();
// setInterval(() => {
//   React.render(
//     <ExampleApplication elapsed={new Date().getTime() - start} />,
//     document.getElementById('container')
//   );
// }, 50);


class PtLabel extends React.Component{
  
  render(){
    var {children,setTabIndex,index,active,...otherProps} = this.props;
    var style = {
      backgroundColor:active?"yellow":"orange"
    }
    return (
        <li {...otherProps} style={style}>{children}</li>
      );
  }
}

class PtLabelList extends React.Component{
  

  render(){
    var {labels,onTabChange,activeTab,...otherProps} = this.props;

    function getLabels(labels){
        return labels.map(function(label,index){

          function handleClick(e){
            console.log(e);
            if(index!==activeTab){
              onTabChange(index);
            }
          }

          return (
              <PtLabel key={index} index={index} active={index===activeTab} onClick={handleClick}>{label}</PtLabel>
            );
        });
      }
    
    return (<ul className="pt-label-list" {...otherProps}>
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
    var {children,tabs,title,iconClass,...otherProps} = this.props;
    /**
    * tabs: [tab ...]
    * tab: {label:"string",children:ReactNode}
    * 
    * 
    **/
    var {activeTab,...otherState} = this.state;

    function setTabIndex(idx){
      console.log(idx);
      self.setState({
        activeTab:idx
      });
    }


    function getLabelList(tabs){
      function getLabels(tabs){
        return tabs.map(function(tab){
          return tab.label;
        });
      }
      return (
          <PtLabelList labels={getLabels(tabs)} activeTab={activeTab} onTabChange={setTabIndex}></PtLabelList>
        );      
    }
    
    function getPaneList(tabs){
      return (
        <PtPaneList panes={tabs} activeTab={activeTab}></PtPaneList>
        );
    }

    return (
      <div className="pt-box" {...otherProps}>
        <div className="pt-header">
          <div className="title">
            
            <h1><i className={iconClass}></i>{title}</h1>
          </div>
          <div className="labels">
          {getLabelList(tabs)}
          </div>
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
},{
  label:"l2",
  children:(<h3>Hello World 2!</h3>)
},{
  label:"l3",
  children:(<h3>Hello World 3s!</h3>)
}];
React.render(
    <PtBox title={"hello ni hao!"} iconClass={"glyphicon glyphicon-user"} tabs={tabs}></PtBox>,
    document.getElementById('container')
  );