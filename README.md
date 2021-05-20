# EventHub

🚌 This is a minimalist event hub that you can use in node or in the browser.



## Install

Todo...



## Documentation

### Get Started

> It is recommended to use the `kebab-case` event name

```js
const hub = new EventHub()

hub.on('custom-send',(message)=>{
  console.log(message)
})

hub.emit('custom-send','Hello, EventHub!')
// => Hello, EventHub!
```



### Instance Methods

#### on(event,handler)

- **Arguments:**
  * `{string | Array<string>} event`
  * `{Function} handler`

* **Usage:**

  Listen for a custom event on the current Instance. Events can be triggered by `instance.emit`. The handler will receive all the additional arguments passed into these event-triggering methods.



#### once(event,handler)

- **Arguments:**
  * `{string} event`
  * `{Function} handler`

* **Usage:**

  Listen for a custom event, but only once. The listener will be removed once it triggers for the first time.



#### off([event,handler])

- **Arguments:**
  * `{string | Array<string>} event`
  * `{Function} [handler]`

* **Usage:**

  Remove custom event listener(s).

  - If no arguments are provided, remove all event listeners;
  - If only the event is provided, remove all listeners for that event;
  - If both event and handler are given, remove the listener for that specific handler only.



#### emit(event,...args)

- **Arguments:**

  - `{string} event`
  - `...args`

  Trigger an event on the current instance. Any additional arguments will be passed into the listener’s handler function.



## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/molvqingtai/event-hub/blob/main/LICENSE) file for details

