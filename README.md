# EventHub

[![version](https://img.shields.io/github/v/release/molvqingtai/event-hub)](https://www.npmjs.com/package/@resreq/event-hub) [![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black&color=blue)](https://deno.land/x/event_hub) [![download](https://img.shields.io/npm/dt/@resreq/event-hub)](https://www.npmjs.com/package/@resreq/event-hub) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

🚌 This is a minimalist event hub.

## Install

```shell
npm i @resreq/event-hub
```

**or**

```shell
yarn add @resreq/event-hub
```

**If you use the [Deno](https://deno.land/)**

Please add to `import_map.json`.

```js
import EventHub from 'https://esm.sh/@resreq/event-hub'
```

## Documentation

### Get Started

```js
import EventHub from '@resreq/event-hub'

const hub = new EventHub()

hub.on('custom-send', (message) => {
  console.log(message) // => Hello, EventHub!
})

hub.emit('custom-send', 'Hello, EventHub!')
```

### Instance Methods

**Event**

Event name type.

```typescript
type Event = string | symbol
```

#### on(event,handler)

- **Arguments:**
  - `{Event | Event[]} event`
  - `{Function} handler`

* **Usage:**

  Listen for a custom event on the current Instance. Events can be triggered by `instance.emit`. The handler will receive all the additional arguments passed into these event-triggering methods.

#### once(event,handler)

- **Arguments:**
  - `{Event} event`
  - `{Function} handler`

* **Usage:**

  Listen for a custom event, but only once. The listener will be removed once it triggers for the first time.

#### off([event,handler])

- **Arguments:**
  - `{Event | Event[]} event`
  - `{Function} [handler]`

* **Usage:**

  Remove custom event listener(s).

  - If no arguments are provided, remove all event listeners;
  - If only the event is provided, remove all listeners for that event;
  - If both event and handler are given, remove the listener for that specific handler only.

#### emit(event,...args)

- **Arguments:**

  - `{Event} event`

  - `{any} ...args`

* **Usage:**

  Trigger an event on the current instance. Any additional arguments will be passed into the listener’s handler function.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/molvqingtai/event-hub/blob/main/LICENSE) file for details
