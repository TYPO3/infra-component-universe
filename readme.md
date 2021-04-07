# Instrastructure Component Universe

Central maintained web component to navigate across TYPO3 Platforms.

## Platform Keys

| Key             | Platform          | Url                            |
|-----------------|-------------------|--------------------------------|
| services        | Business Hub      | https://typo3.com              |
| community       | Community Hub     | https://typo3.org              |
| demo            | Demo              | https://demo.typo3.org         |
| extensions      | Extensions        | https://extensions.typo3.org   |
| documentation   | Documentation     | https://docs.typo3.org         |
| shop            | Shop              | https://shop.typo3.com         |
| mytypo3         | My TYPO3          | https://my.typo3.org           |
| download        | Download Area     | https://get.typo3.org          |

## Usage

1. Import the JavaScript into the Document

    ```javascript
    <script src="https://typo3.azureedge.net/typo3infrastructure/universe/dist/webcomponents-loader.js"></script>
    <script type="module" src="https://typo3.azureedge.net/typo3infrastructure/universe/dist/typo3-universe.js"></script>
    ```

2.  Add the component to your application after the opening `body` tag.
    Ensure you set the platform key, that is assigned to your platform
    to the `active` attribute on the element.

    ```html
    <typo3-universe active="{platformkey}">
        <!-- Fallback to consume the defined space on loading and no component support -->
        <div style="display: block; height: 44px; background-color: #313131;"></div>
    </typo3-universe>
    ```

## Build

```bash
yarn install
yarn build
```
