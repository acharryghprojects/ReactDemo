"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm'); // reference to the child component
var CourseActions = require('../../actions/courseActions');
var CourseApi = require('../../api/courseApi');
var toastr = require('toastr');

var ManageCoursePage = React.createClass({
mixins:[ // allows you to share functionlity from other components
    Router.Navigation 
],

statics:{
    willTransitionFrom: function(transition, component){
        if(component.state.dirty && !confirm('Leave without saving?')){
            transition.abort();
        }
    }
},
    getInitialState: function(){
        return{
            course: { 
                id: "",
			    title: "",
			    watchHref: "",
			    author: {  
                    id: "",
                    name: ""
			    },
                length: "",
                category: ""
            },
                errors:{},
                dirty: false
        };
    },

    componentWillMount: function(){ // this method runs before the form renders
      var courseId = this.props.params.id; // this is taken from the query string in the URL
      if(courseId){       
        this.setState({course: CourseApi.getCoursesById(courseId)});
      }
    },

    setCourseState: function(event){ // this function will be called everytime any key is pressed
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;
        return this.setState({course: this.state.course});
    },

    courseFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if(this.state.course.title.length < 3)
        {
            formIsValid = false;
            this.state.errors.title = 'Title must be at least 3 characters.';
        }

        if(this.state.course.author.count < 1 )
        {
            formIsValid = false;
            this.state.errors.author = 'author must be selected.';
        }
         if(this.state.course.category.length < 3)
        {
            formIsValid = false;
            this.state.errors.title = 'Course must be at least 3 characters.';
        }
         if(this.state.course.length.length < 10)
        {
            formIsValid = false;
            this.state.errors.length = 'Lenght must be higher than 10 hours.';
        }

        this.setState({ errors: this.state.errors});

        return formIsValid;
    },

    saveCourse: function(event){
        event.preventDefault();

        if(!this.courseFormIsValid()){
            return;
        }

        if(this.state.course.id){
            CourseActions.updateCourse(this.state.course);
        }else{
            console.log('Just passed the validation');            
            CourseActions.createCourse(this.state.course);
        }        
        
        this.setState({dirty: false});
        toastr.success('Course saved');
        this.transitionTo('course');
    },
    render: function(){
        return (
            //it just can be one top level component to return in this function as jsx compiles everything to javascript and it just handles one at the time
          <AuthorForm
             course={this.state.course} 
             onChange={this.setCourseState}
             onSave={this.saveCourse} 
             errors={this.state.errors} />
        )
    }
});

module.exports = ManageCoursePage;