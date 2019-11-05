# Instrastructure Component Universe

Central maintaned webcomponent to navigate across TYPO3 Platforms.

## Platform Keys

| Key             | Platform          | Url                            |
|-----------------|-------------------|--------------------------------|
| services        | Business Hub      | https://typo3.com              |
| community       | Community Hub     | https://typo3.org              |
| extensions      | Extensions        | https://extensions.typo3.org   |
| documentation   | Documentation     | https://docs.typo3.org         |
| download        | Download Area     | https://get.typo3.org          |

## Usage

1. Import the JavaScript into the Document

    ```javascript
    <script src="webcomponents-loader.js"></script>
    <script type="module" src="typo3-universe.js"></script>
    ```

2.  Add the component to your application after the opening `body` tag.
    Ensure you set the platform key, that is assigned to your platform
    to the `active` attribute on the element.

    ```html
    <typo3-universe active="{platformkey}"></typo3-universe>
    ```

## Build

```bash
yarn install
yarn build
```
