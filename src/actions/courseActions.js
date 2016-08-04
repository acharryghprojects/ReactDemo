"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var CourseApi = require('../api/courseApi');
var ActionTypes = require('../constants/actionTypes');

var CourseActions = {
    createCourse: function(course){
        var newCourse = CourseApi.saveCourse(course); 

        // wraps the actions and tells the store that an author was created
        Dispatcher.dispatch({ 
            actionType: ActionTypes.CREATE_COURSE,
            course: newCourse
        });
    },

    updateCourse: function(course){
        var updatedCourse = CourseApi.saveCourse(course);      

        // wraps the actions and tells the store that an author was created
        Dispatcher.dispatch({ 
            actionType: ActionTypes.UPDATE_COURSE,
            author: updatedCourse
        });
    },

    deleteCourse: function(id){
        debugger;
        AuthorApi.deleteCourse(id);
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_COURSE,
            id: id
        });
    }
};

module.exports = CourseActions;