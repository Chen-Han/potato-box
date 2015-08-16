var React = require("react");
var PtBox = require("src/pt-box.js");
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
  title:"Clear Box, box-sm",
  boxStyle:"box-clear",
  size:"box-sm",
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