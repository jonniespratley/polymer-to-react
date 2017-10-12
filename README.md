# Polymer to React
This document should aid in the transition from Polymer 1.x to React 0.16.x.


## Getting Started
If you were to wanting to get started creating a new component or app.


```
$ npm i -g polymer-cli
$ polymer init
```



## Creating Components
Here is how some of the component lifecycle methods look.


### Example Polymer Component
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
        Welcome <span>{{name}}</span>
      </header>
      <content></content>
      <ul>
        <template is="dom-repeat" items="[[items]]">
          <li>{{$index}} - {{item}}</li>
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
        }
      });
    });
  </script>
</dom-module>
```

### Example React Component
The following is a bare bones React component.

```js
import React from 'react';

class MySimpleReactComponent extends React.Component {
  constructor(props){
    super(props);
    this.displayName = 'MySimpleReactComponent';
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
  render(){
    const {children, name} = this.props;
    return (
      <div className='MySimpleReactComponent'>
        <div>Hello <span>{name}</span></div>
        {children}
        <style>{`
          .MySimpleReactComponent {
            display: block;
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



## Component Helpers
When using Polymer one will become familar with using elements like `dom-repeat`, `dom-if`, etc.

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

```html
<template is="dom-if" if="[[name]]">
  <span>{{name}}</span>
</template>
```

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
