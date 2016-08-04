"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm'); // reference to the child component
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
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
    getInitialState: function(){ // defines the initial state
        return{
            author: { id:'', firstName:'', lastName: ''},
            errors:{},
            dirty: false
        };
    },

    componentWillMount: function(){ // this method runs before the form renders
      var authorId = this.props.params.id; // this is taken from the query string in the URL
      if(authorId){
        //  this.setState({author: AuthorApi.getAuthorById(authorId)});
        this.setState({author: AuthorStore.getAuthorById(authorId)});
      }
    },

    setAuthorState: function(event){ // this function will be called everytime any key is pressed
        this.setState({dirty: true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author: this.state.author});
    },

    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; // clear any previous errors

        if(this.state.author.firstName.length < 3)
        {
            formIsValid = false;
            this.state.errors.firstName = 'First Name must be at least 3 characters.';
        }

        if(this.state.author.lastName.length < 3)
        {
            formIsValid = false;
            this.state.errors.lastName = 'Last Name must be at least 3 characters.';
        }

        this.setState({ errors: this.state.errors});

        return formIsValid;
    },

    saveAuthor: function(event){
        event.preventDefault();

        if(!this.authorFormIsValid()){
            return;
        }

        if(this.state.author.id){
            AuthorActions.updateAuthor(this.state.author);
        }else{
            console.log('Just passed the validation');
            //AuthorApi.saveAuthor(this.state.author);
            AuthorActions.createAuthor(this.state.author);
        }        
        
        this.setState({dirty: false});
        toastr.success('Author saved');
        this.transitionTo('authors');
    },
    render: function(){
        return (
            //it just can be one top level component to return in this function as jsx compiles everything to javascript and it just handles one at the time
          <AuthorForm
             author={this.state.author} 
             onChange={this.setAuthorState}
             onSave={this.saveAuthor} 
             errors={this.state.errors} />
        )
    }
});

module.exports = ManageAuthorPage;