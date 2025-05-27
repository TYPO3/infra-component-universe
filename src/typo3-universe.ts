import { LitElement, html, svg, TemplateResult, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export enum MenuEntryType {
  button = 'button',
  link = 'link',
  spacer = 'spacer'
}

export interface MenuEntry {
  readonly type: MenuEntryType
  readonly label: string,
  readonly href: string,
  readonly icon?: TemplateResult,
}

export interface MenuEntryRaw {
  id: string;
  type: string;
  label?: string;
  href?: string;
  icon?: string;
}

export interface Menu {
  readonly [key: string]: MenuEntry
}

const defaultEntries : Menu = {
  'services': {
    'type': MenuEntryType.link,
    'label': 'Product',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M11.5 10.6c-.2.1-.4.1-.6.1-1.8 0-4.4-6.2-4.4-8.3 0-.8.2-1 .4-1.2-2.1.3-4.7 1.1-5.5 2.1-.2.2-.3.6-.3 1.1C1.1 7.7 4.5 15 7 15c1.1 0 3-1.8 4.5-4.4M10.4 1c2.2 0 4.5.4 4.5 1.6 0 2.6-1.6 5.7-2.5 5.7-1.5 0-3.3-4.1-3.3-6.2 0-.9.4-1.1 1.3-1.1"/></g></svg>`,
    'href': 'https://typo3.com',
  },
  'community': {
    'type': MenuEntryType.link,
    'label': 'Community',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5 9H3.697l-.252.168L2 10.131V3h7v1h1V2.25A.25.25 0 0 0 9.75 2h-8.5a.25.25 0 0 0-.25.25V12l3-2h1V9z"/><path d="M14 6v7.131l-1.445-.964-.252-.167H7V6h7m.75-1h-8.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25H12l3 2V5.25a.25.25 0 0 0-.25-.25z"/><path d="M8 7h5v1H8zM8 9h2v1H8z"/></g></svg>`,
    'href': 'https://typo3.org',
  },
  'spacer-1': {
    'type': MenuEntryType.spacer,
    'label': '',
    'href': '',
  },
  'demo': {
    'type': MenuEntryType.link,
    'label': 'Demo',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5 3.9L11.2 8 5 12.1V3.9m0-1c-.5 0-1 .4-1 1v8.3c0 .6.5 1 1 1 .2 0 .4-.1.6-.2l6.2-4.1c.6-.4.6-1.3 0-1.7L5.6 3c-.2-.1-.4-.1-.6-.1z"/></g></svg>`,
    'href': 'https://demo.typo3.org',
  },
  'extensions': {
    'type': MenuEntryType.link,
    'label': 'Extensions',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M13.408 3.546L7.913 1.087a1.002 1.002 0 0 0-.817 0L1.592 3.545c-.36.161-.592.519-.592.914v7.102a1 1 0 0 0 .594.914l5.496 2.439a1.003 1.003 0 0 0 .812 0l5.504-2.446a1 1 0 0 0 .594-.914V4.459a1 1 0 0 0-.592-.913zM7.504 2l4.89 2.187L7.5 6.449 2.607 4.188 7.504 2zM2 5.01l5 2.31v6.46l-5-2.219V5.01zm6 8.766V7.32l5-2.31v6.545l-5 2.221z"/></g></svg>`,
    'href': 'https://extensions.typo3.org',
  },
  'documentation': {
    'type': MenuEntryType.link,
    'label': 'Documentation',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M13.5 1h-11c-.271 0-.5.223-.5.498v13.004c0 .278.224.498.5.498h11c.271 0 .5-.223.5-.498V1.498A.497.497 0 0 0 13.5 1zM3 2h1v12H3V2zm2 0h8v12H5V2zm1 1h6v1H6V3z" /></g></svg>`,
    'href': 'https://docs.typo3.org',
  },
  'shop': {
    'type': MenuEntryType.link,
    'label': 'Shop',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M5.5 12a.5.5 0 11-.001 1.001A.5.5 0 015.5 12m0-1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11.5 12a.5.5 0 11-.001 1.001A.5.5 0 0111.5 12m0-1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM3.75 2h-2.5a.25.25 0 00-.25.25v.5c0 .138.112.25.25.25H3l1 6v1.75c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-.5a.25.25 0 00-.25-.25H5V9h7.82a.25.25 0 00.237-.171l1.833-5.5A.25.25 0 0014.653 3H4v-.75A.25.25 0 003.75 2zm1.097 6L4.18 4h9.433l-1.334 4H4.847z"/></g></svg>`,
    'href': 'https://shop.typo3.com',
  },
  'mytypo3': {
    'type': MenuEntryType.link,
    'label': 'My TYPO3',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M13 1H3c-.6 0-1 .4-1 1v12c0 .6.4 1 1 1h10c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm0 12.8c0 .1-.1.2-.2.2H3.2c-.1 0-.2-.1-.2-.2V2.2c0-.1.1-.2.2-.2h9.5c.2 0 .3.1.3.2v11.6z"/><path d="M11.2 12c-.8-.3-1.4-.6-2-.8 0-.1-.2-.5-.2-1.2.4-.4.7-1 .7-1.4V7.4c0-.8-.6-1.4-1.5-1.4h-.4c-.8 0-1.5.6-1.5 1.4v1.1c0 .5.3 1.1.7 1.5 0 .7-.2 1.1-.2 1.2-.6.2-1.2.5-2 .8-.5.3-.8.4-.8 2h8c0-1.6-.3-1.8-.8-2zM9.5 4h-3c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h3c.3 0 .5.2.5.5s-.2.5-.5.5z"/></g></svg>`,
    'href': 'https://my.typo3.org',
  },
  'download': {
    'type': MenuEntryType.button,
    'label': 'Get TYPO3',
    'icon': svg`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><g fill="currentColor"><path d="M14.5 9h-3.973l-.874 1H14v3H2v-3h4.346l-.873-1H1.5a.5.5 0 0 0-.5.5v4a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-.5-.5z"/><path d="M10 11h1v1h-1zM12 11h1v1h-1zM11.27 6H4.73a.25.25 0 0 0-.188.414l3.27 3.743a.244.244 0 0 0 .377 0l3.27-3.743A.25.25 0 0 0 11.27 6z"/><path d="M7 2h2v4H7z"/></g></svg>`,
    'href': 'https://get.typo3.org',
  }
};

const menuConverter = {
  fromAttribute(value: string): Menu {
    try {
      const data: MenuEntryRaw[] = JSON.parse(value);
      return data.reduce((acc: Menu, item: any) => {
        return {
          ...acc,
          [item.id]: {
            type: item.type ?? MenuEntryType.link,
            label: item.label ?? '',
            icon: (typeof item.icon === 'string' && item.icon.trim()) ? svg`${unsafeSVG(item.icon)}` : null,
            href: item.href ?? ''
          }
        };
      }, {});
    } catch (err) {
      console.error('Invalid menu JSON in attribute:', err);
      return defaultEntries;
    }
  }
};

@customElement('typo3-universe')
export class Typo3UniverseElement extends LitElement {
  @property() public active: string | undefined;
  @property({ type: Object, converter: menuConverter }) menu: Menu = defaultEntries;
  @property({ type: Boolean, attribute: 'preview', reflect: true }) preview: boolean = false;

  static styles = css`
    :host {
      --universe-zindex: 1;
      --universe-height: 44px;
      --universe-font-size: 14px;
      --universe-maxwidth: 1100px;
      --universe-text-color: #dadada;
      --universe-link-color: #ffffff;
      --universe-link-padding-horizontal: 1rem;
      --universe-link-padding-vertical: .5rem;
      --universe-background-color: #313131;
      --universe-link-color: #ffffff;
      --universe-link-background: #414141;
      --universe-link-hover-color: #ffffff;
      --universe-link-hover-background: #515151;
      --universe-caret-color: #ffffff;
      --universe-button-color: #ffffff;
      --universe-button-background: #ff8700;
      --universe-button-hover-color: #ffffff;
      --universe-button-hover-background: #ee7600;
    }

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    .universe {
      position: relative;
      z-index: var(--universe-zindex);
      font-size: var(--universe-font-size);
      color: var(--universe-text-color);
      background-color: var(--universe-background-color);
      height: var(--universe-height);
      overflow: hidden;
      white-space: nowrap;
    }

    .universe-container {
      display: flex;
      align-items: flex-end;
      max-width: var(--universe-maxwidth);
      margin: 0 auto;
      padding: 0;
      overflow-x: scroll;
    }

    .universe-menu {
      display: flex;
      padding: 0;
      margin: 0;
      width: 100%;
      justify-content: flex-end;
      gap: 1px;
      list-style: none;
    }

    .universe-menu-spacer {
      display: block;
      flex-grow: 1;
    }

    .universe-item {
      --item-background: var(--universe-background-color);
      --item-color: var(--universe-text-color);
      --item-padding-vertical: var(--universe-link-padding-vertical);
      --item-padding-horizontal: var(--universe-link-padding-horizontal);
      color: var(--item-color);
      background: var(--item-background);
      position: relative;
      display: flex;
      gap: .5em;
      overflow: hidden;
      height: var(--universe-height);
      align-items: center;
      padding: var(--item-padding-vertical) var(--item-padding-horizontal);
      text-decoration: none;
    }
    .universe-item:focus {
      z-index: 1;
      outline: none;
    }
    .universe-item:focus-visible {
      box-shadow:
        inset 0 0 0 2px var(--item-background),
        inset 0 0 0 4px var(--item-color);
    }

    .universe-item-icon {
      display: block;
      height: 16px;
      width: 16px;
      overflow: hidden;
      opacity: .75;
    }
    .universe-item-icon svg {
      display: block;
      height: 16px;
      width: 16px;
    }
    [dir="rtl"] .universe-item-icon {
      transform: scaleX(-1);
    }

    .universe-item--active:before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      height: .8em;
      width: .8em;
      transform: translate(-50%, 0);
      border: calc(.4em + 4px) solid transparent;
      border-bottom-color: var(--item-background);
    }

    .universe-item--active:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      height: .8em;
      width: .8em;
      transform: translate(-50%, 0);
      border: .4em solid transparent;
      border-bottom-color: var(--universe-caret-color);
    }

    .universe-item--link {
      --item-color: var(--universe-link-color);
      --item-background: var(--universe-link-background);
    }
    .universe-item--link:focus,
    .universe-item--link:hover {
      --item-color: var(--universe-link-hover-color);
      --item-background: var(--universe-link-hover-background);
    }

    .universe-item--button {
      --item-color: var(--universe-button-color);
      --item-background: var(--universe-button-background);
    }
    .universe-item--button:focus,
    .universe-item--button:hover {
      --item-color: var(--universe-button-hover-color);
      --item-background: var(--universe-button-hover-background);
    }

    :host([preview]) {
      --universe-maxwidth: 1440px;
      --universe-text-color: #fff;
      --universe-divider-color: #555;
      --universe-link-color: #fff;
      --universe-link-padding-horizontal: .9375rem;
      --universe-link-padding-vertical: .625rem;
      --universe-background-color: #313130;
      --universe-link-color: #fff;
      --universe-link-background: #313130;
      --universe-link-hover-color: #fff;
    }

    :host([preview]) .universe-menu {
      justify-content: flex-start;
    }

    :host([preview]) .universe-menu-item {
      border-right: 1px solid var(--universe-divider-color);
    }

    :host([preview]) .universe-menu-item:has(+ .universe-menu-spacer),
    :host([preview]) .universe-menu-item + .universe-menu-spacer,
    :host([preview]) .universe-menu-spacer ~ .universe-menu-item {
      border-right: unset;
    }

    :host([preview]) .universe-menu-spacer ~ .universe-menu-item .universe-item {
      --item-padding-horizontal: 10px;
    }

    :host([preview]) .universe-menu-spacer ~ .universe-menu-item .universe-item:hover {
      --item-background: unset;
      text-decoration: underline;
    }

    :host([preview]) .universe-item {
      gap: .25rem;
    }

    :host([preview]) .universe-item-icon {
      opacity: .56;
    }

    :host([preview]) .universe-item--active:before,
    :host([preview]) .universe-item--active:after {
      content: unset;
    }

    :host([preview]) .universe-item--link.universe-item--active,
    :host([preview]) .universe-item--link.universe-item--active:hover {
      --item-background: var(--universe-text-color);
      --item-color: var(--universe-background-color);
    }
  `;

  protected render(): TemplateResult {
    return html`
      <div class="universe">
        <div class="universe-container">
          <ul class="universe-menu">
            ${Object.entries(this.menu).map(([identifier, entry]) => {
              if ('type' in entry && entry.type === 'spacer') {
                return html`<li class="universe-menu-spacer" aria-hidden="true"></li>`;
              }

              return html`
                <li class="universe-menu-item">
                  <a href=${entry.href} class=${classMap({
                    'universe-item': true,
                    'universe-item--button': entry.type === MenuEntryType.button,
                    'universe-item--link': entry.type === MenuEntryType.link,
                    'universe-item--spacer': entry.type === MenuEntryType.spacer,
                    'universe-item--active': identifier === this.active
                  })}>
                    ${entry.icon ? html`<span class="universe-item-icon" aria-hidden="true">${entry.icon}</span>` : nothing}
                    <span class="universe-item-text">${entry.label}</span>
                  </a>
                </li>`;
            })}
          </ul>
        </div>
      </div>
    `;
  }
}
