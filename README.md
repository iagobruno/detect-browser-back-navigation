# detect-browser-back-navigation

Detects when user clicks on the back button.

The main use case is to creating modals, so you can close a modal when the user clicks on the phone back button, like in native mobile apps.

// GIT EXAMPLE

[![npm](https://img.shields.io/npm/v/detect-browser-back-navigation)](https://www.npmjs.com/package/detect-browser-back-navigation)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/detect-browser-back-navigation)
![Module system](https://img.shields.io/badge/module%20system-ESM%2C%20CJS-brightgreen)
![npm type definitions](https://img.shields.io/badge/types-TypeScript-blue)

## Installation

```
npm install detect-browser-back-navigation --save
```

```
yarn add detect-browser-back-navigation
```

## Usage

Just call the default exported function with a callback on the first argument and the callback will fired whe the user clicks on the back button.

```js
import detectBackButton from 'detect-browser-back-navigation';

const unsub = detectBackButton(() => {
    console.log('BACK BUTTON PRESSED!');
});

```

**Note: You must properly unsubscribe when the modal is closed**, to remove event listeners and avoid fire the callback multiple times leading in bugs.

See below an example of how to create a modal in React:

```jsx
import detectBackButton from 'detect-browser-back-navigation';

export default function Modal(props) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            const unsub = detectBackButton(() => close());
            return unsub;
        }
    }, [show]);

    function open() {
        setShow(true);
    }
    function close() {
        setShow(false);
    }

    if (!show) return null;

    return (...);
}
```
> **Tip**: This package also handles stacked back button calls, so you can display multiple modals and the package will callback correctly.

## License

MIT
