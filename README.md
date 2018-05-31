# MyTodos

### Getting started.

First, make sure you have Node, nvm, and npm installed.

You'll want to be on Node `>= 6.0.0` and npm `>=3.0.0`
`nvm install 6`
or
`nvm use 6` (if you already have it Node `>=6.0.0` installed)

Then, install project dependencies:

`npm install`  

Once the dependencies are installed, you can start the server, and the development watch process all at the same time:

`npm start`

### Structure

All of the app files are located inside the `src` directory. Inside `src`, the directory is split into two sub-directories, `client` for the front end components and `server` for the backend.

We're using npm to handle running of the scripts and Webpack to handle the compilation of our Javascript. You can see everything that is happening by following the scripts in `package.json` which will lead you to webpack, `webpack.congif.js`. Understanding how it works is not strictly required.

### Requirements

This application has two parts, a server, and a client. The server has a few CRUD endpoints that respond with JSON, but some of them have some show stopping bugs, and some of them aren't implemented. You'll need to hunt down and fix the bugs, and implement the missing server functionality in order to arrive at a fully functional client. The server itself is implemented with [Express](https://expressjs.com/). `Express` is minimalist web framework for Node.js. It's similar to `Sinatra` for Ruby. There is no actual database for the todos, instead they're stored in memory. We did this for simplicity, and there's no need to make this more complex than that.

The client is mostly functional, but lacking a few features you'll find in the [design spec](https://github.com/giantmachines/todo-app-react/blob/master/todo.png). The first is the summary bar, above the todo input. This bar should summarize how many active tasks you have remaining, and a button to complete all active tasks. There are no specifications for when all tasks are completed, so I'll leave that to your judgement.

Second, we'd like to introduce an archive feature for todos. This should exist alongside the delete feature, but gives the users a way to clear their completed tasks without deleting them. One major aspect of this feature is that you can only archive completed tasks. There are no specifications for what an archived task looks like or how it behaves, so I'll leave that to your judgement.

Lastly, we'd like to implement [react-router](https://github.com/ReactTraining/react-router) into our app. Clicking the filter options (`All`, `Active`, `Completed`, `Archived`) in our navbar should filter the shown todos by the corresponding traits. Where `react-router` comes into play is that the URL should display the filtered option so users can come back to that specific page already filtered. For example, going to `localhost:3000/active` should display only active todos.

The client is implemented in [React](https://facebook.github.io/react/), and [Sass](http://sass-lang.com/) for styling. There's a handful of established patterns, so even if you're not familiar with React, you should be able to follow along. You’re more than welcome to use the documentation and whatever other resources you can.

However, other than styling the client, implementing the new features, and fixing up the server, there aren't any hard requirements. You're welcome to approach this problem however you'd like.
