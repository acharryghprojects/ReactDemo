"use strict";

var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitilizeActions = require('./actions/initializeActions');

InitilizeActions.initApp();

Router.run(routes, function(Handler){
    React.render(<Handler/>, document.getElementById('app'));
});