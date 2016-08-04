"use strict";

var React = require('react');
var Input = require('../common/textInput');
var Dropdown = require('../common/dropdown');
var CourseForm  = React.createClass({

    propTypes:{ // a=way to provide validation in development mode
        course: React.PropTypes.object.isRequired,
        onSave: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        errors: React.PropTypes.object
    },

    render: function(){
        return (
            <form>
                <h1>Course</h1>                
                <Input  
                    name="title" 
                    label="Title" 
                    value={this.props.course.title}
                    onChange={this.props.onChange} 
                    error={this.props.errors.title} />
                <br/>

                <Dropdown
                    name="author" 
                    label="Author" 
                    value={this.props.course.author}
                    onChange={this.props.onChange} 
                    error={this.props.errors.course.author.name} />                
                    <br/>
                <Input  
                    name="category" 
                    label="Category" 
                    value={this.props.course.category}
                    onChange={this.props.onChange} 
                    error={this.props.errors.category} />
                    <br/>
                <Input  
                    name="length" 
                    label="Length" 
                    value={this.props.course.length}
                    onChange={this.props.onChange} 
                    error={this.props.errors.length} />
                    <br/>

                <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        );
    }
});

module.exports = CourseForm;