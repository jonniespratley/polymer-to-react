# Polymer to React
This document should aid in the transition from Polymer 1.x to P/React 0.16.x.


## Getting Started
If you were to wanting to get started creating a new component or app.


### Polymer

```
$ npm i -g polymer-cli
$ polymer init
```

### P/React

```
$ npm i -g create-react-app
$ create-react-app my-app
```



## Creating Components
Here is how some of the component lifecycle methods look.


### Example Polymer 1.6.x Component
The following is a bare bones Polymer web component.

```html
<link rel="import" href="../polymer/polymer.html"/>
<dom-module id="my-simple-polymer-component">
  <template>
    <style>
      :host {
        display: block;
      }
      :host .my-simple-polymer-component span {
        color: blue;
      }
    </style>
    <div class="my-simple-polymer-component">
      <header>
        Hello <span>{{name}}</span>
      </header>
      <content></content>
      <ul>
        <template is="dom-repeat" items="[[items]]">
          <li on-click="handleClick">{{$index}} - {{item}}</li>
        </template>
      </ul>
    </div>
  </template>
  <script>
    document.addEventListener('WebComponentsReady', function() {
      Polymer({
        is: 'my-simple-polymer-component',
        properties: {
          name: {
            type: String,
            notify: true
          },
          items: {
            type: Array
          }
        },
        created: function() {
          console.log(this.tagName, 'created', this);
        },
        ready: function() {
          console.log(this.tagName, 'ready', this);
        },
        attached: function() {
          console.log(this.tagName, 'attached', this);
        },
        detached: function() {
          console.log(this.tagName, 'detached', this);
        },
        handleClick: function(e) {
          console.log(this.tagName, 'click', this);
        }
      });
    });
  </script>
</dom-module>
```

### Example P/React 0.16.x Component
The following is a bare bones React component.

```js
import React from 'react';

class MySimpleReactComponent extends React.Component {
  constructor(props){
    super(props);
    this.displayName = 'MySimpleReactComponent';
		this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount(){
    console.log(this.displayName, 'componentWillMount', this);
  }
  componentDidMount(){
    console.log(this.displayName, 'componentDidMount', this);
  }
  componentWillUnmount(){
    console.log(this.displayName, 'componentWillUnmount', this);
  }
	handleClick(e){
    console.log(this.displayName, 'click', this);
  }
  render(){
    const {children, name, items} = this.props;
    return (
      <div className='MySimpleReactComponent'>
        <header>
          Hello <span>{name}</span>
        </header>
        {children}
        <ul>
          {items && items.map((item, index) => (
             <li onClick={this.handleClick}>{index} - {item}</li>
          ))}
        </ul>
        <style>{`
          .MySimpleReactComponent {
            display: block;
            padding: 1rem;
						background: white;
          }
          .MySimpleReactComponent span{
            color: blue;
          }
        `}</style>
      </div>
    );
  }
}
```


#### Usage

```js
<MySimpleReactComponent 
	name='Jonnie'
	items={['Item 1', 'Item 2', 'Item 3']}/>
```





---

## Component Helpers
When using Polymer one will become familiar with using elements like `dom-repeat`, `dom-if`, `content`, etc.

So how does that translate into React? Well is quite simple, since eveything in React is JavaScript you can simply use JavaScript in your JSX templates.


### `dom-repeat` => `map`


In polymer you use the `dom-repeat` element.

```html
<ul>
  <template is="dom-repeat" items="[[items]]">
    <li>{{index}} - {{item}}</li>
  </template>
</ul>
```

In react you use the `map` method on an array.

```js
const list = (items) => (
  <ul>
    {items.length > 0 && items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);
```


### `dom-if` => `boolean`
The `dom-if` element is a boolean which will render if value is true.

```html
<template is="dom-if" if="[[name]]">
  <span>{{name}}</span>
</template>
```

In react since everything is JavaScript you can just use the `&&` operator.
```js
{name && <span>{name}</span>}
```

### `template` => JSX
Fundamentally, JSX just provides syntactic sugar for the `React.createElement()` function.


You can pass any JavaScript expression as a prop, by surrounding it with {}

```js
<App name={'Test'}/>
<App name='Test'/>
```

### `content` => `children`
In polymer you would use the `content` element where you want children elements to be injected.

```html
<div>
  <content></content>
</div>
```
In react you use the `children` property that contains the child components to inject.

```js
<div>
  {this.props.children}
</div>
```


## Resources

- React Documentation - https://reactjs.org/docs/react-component.html
- Preact Documentation - https://preactjs.com/guide/api-reference
