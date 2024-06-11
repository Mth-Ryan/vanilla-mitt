# vanilla-mit

Emit global events with mitt from html elements. vanilla-mit adds a mit instance to the window namespace 
and allows any DOM element to emit events that can be listened to by any part of your page.

### Example:

Opening and closing a dialog using global events.

```html
<!DOCTYPE html>
<html>

<head>
  <title>Hello world!</title>

  <script src="https://unpkg.com/vanilla-mitt@1.0.0/dist/index.min.js"></script>
</head>

<body>
  <h1>Hello world!</h1>

  <button emit="dialog:open" emit-data="dialog">
    Click me!
  </button>

  <button emit="dialog:open" emit-data="dialog" emit-on="mouseover">
    Hover me!
  </button>

  <dialog id="dialog">
    <h2>Hello world</h2>
    <button emit="dialog:close" emit-data="dialog">
      Close
    </button>
  </dialog>

  <script>
    window.emitter.on('dialog:open', id => {
      document.querySelector(`dialog#${id}`).showModal();
    });

    window.emitter.on('dialog:close', id => {
      document.querySelector(`dialog#${id}`).close();
    });
  </script>
</body>

</html>
```
