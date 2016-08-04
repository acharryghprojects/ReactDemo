"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
    render: function(){
        return (
            <div className="jumbotron">
            <h1>Linklaters first React application</h1>
            <p>This website contains implementations of React, Flux for ultra reponsive websites </p>
            <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
});

module.exports = Home;