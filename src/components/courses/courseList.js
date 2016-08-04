"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/courseActions');
var toastr = require('toastr');

var CourseList = React.createClass({
    propTypes:{
        courses: React.PropTypes.array.isRequired
    },

deleteCourse: function(id, event){
    event.preventDefault();
    //debugger;
    CourseActions.deleteCourse(id);
    toastr.success('Course Deleted');
},
       render: function(){
        var createCourseRow = function(course){
            return (
                <tr key={course.id}>
                    <td><a href="#" onClick={this.deleteAuthor.bind(this, course.id)}>Delete</a></td>
                    <td><Link to="manageCourse" params={{id: course.id}}>{course.id}</Link></td>
                    <td>{course.title} </td>
                    <td>{course.watchref}</td>
                    <td>{course.author.id} {course.author.name}</td>
                    <td>{course.length}</td>
                    <td>{course.category} {course.lastName}</td>
                </tr>
            );
        };
        return(
            <div> 
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>TITLE</th>
                        <th>WATCHREF</th>
                        <th>AUTHOR</th>
                        <th>LENGHT</th>
                        <th>CATEGORY</th>
                    </thead>
                    <tbody>
                        {this.props.course.map(createCourseRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;