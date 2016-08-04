"use strict";

var React = require('react')
var Dropdown = require('react-bootstrap-dropdown');

// a callback function will be called if dropdown item select
function select(item){
    alert(item.text+","+item.value);
}

var aBasicItemModel = [
    {
        text: "{this.props.name}",
        value: "{this.props.id}"
    }
];

var Dropdown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onSelect: React.PropTypes.func.isRequired,        
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },
render: function(){
    var wrapperClass = 'form-group';
        if(this.props.error && this.props.error.length > 0){
            wrapperClass += " " + 'has-error';
        }

    return (
        <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
            <Dropdown
            title="MyDropdown"
            items={aBasicItemModel}
            onSelect={select} />,
            document.getElementById("example")
        </div>
    );
}
});