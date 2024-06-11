window.emitter = mitt();

/* ─────────────────────────────────────────────────────────────────────────────
 *  # Add data-event attributes                                               
 * ─────────────────────────────────────────────────────────────────────────────
 */

const eventEmitAttr      = 'emit';
const eventAttr          = 'emit-on';
const eventEmitValueAttr = 'emit-data';

function getDefaultEvent(element) {
  switch (element.tagName.toLowerCase()) {
    case 'form': return 'submit';
    default:     return 'click';
  }
}

function addEventAttributeEmitter() {
  document.querySelectorAll(`[${eventEmitAttr}]`).forEach(element => {
    const emit = element.getAttribute(eventEmitAttr);
    const event = element.getAttribute(eventAttr) || getDefaultEvent(element);
    const emitValue = element.getAttribute(eventEmitValueAttr);

    function handleEvent(e) {
      if (typeof e.preventDefault === 'function') {
        e.preventDefault();
      }

      window.emitter.emit(emit, emitValue);
    }

    if (!element._eventAdded__) {
      element.addEventListener(event, handleEvent);
      element._eventAdded__ = true;
    }
  });
}

function isEventMutationType(mutation) {
  return mutation.type === 'childList' || 
    (mutation.type === 'attributes' && (
          mutation.attributeName === eventEmitAttr ||
          mutation.attributeName === eventAttr     ||
          mutation.attributeName === eventEmitValueAttr
      )
    )
}

// Mutations listener
const observer = new MutationObserver(function (mutations) {
  for (const mutation of mutations) {
    if (isEventMutationType(mutation)) {
      addEventAttributeEmitter();
      break;
    }
  }
});

// On load listener
window.addEventListener('load', function () {
  addEventAttributeEmitter();

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  });
});

