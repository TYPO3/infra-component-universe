import { LitElement, html, svg, TemplateResult, nothing, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

export enum MenuEntryType {
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
    'label': 'TYPO3',
    'href': 'https://typo3.com',
  },
  'community': {
    'type': MenuEntryType.link,
    'label': 'Community',
    'href': 'https://typo3.community',
  },
  'project': {
    'type': MenuEntryType.link,
    'label': 'Project',
    'href': 'https://typo3.org',
  },
  'news': {
    'type': MenuEntryType.link,
    'label': 'News & Events',
    'href': 'https://news.typo3.com',
  },
  'spacer-1': {
    'type': MenuEntryType.spacer,
    'label': '',
    'href': '',
  },
  'extensions': {
    'type': MenuEntryType.link,
    'label': 'Extensions',
    'href': 'https://extensions.typo3.org',
  },
  'documentation': {
    'type': MenuEntryType.link,
    'label': 'Documentation',
    'href': 'https://docs.typo3.org',
  },
  'shop': {
    'type': MenuEntryType.link,
    'label': 'Shop',
    'href': 'https://shop.typo3.com',
  },
  'mytypo3': {
    'type': MenuEntryType.link,
    'label': 'My TYPO3',
    'href': 'https://my.typo3.org',
  },
  'download': {
    'type': MenuEntryType.link,
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

  static styles = css`
    :host {
      --universe-zindex: 1;
      --universe-height: 44px;
      --universe-font-size: 14px;
      --universe-maxwidth: 1430px;
      --universe-text-color: #fff;
      --universe-divider-color: #555;
      --universe-link-color: #fff;
      --universe-link-padding-horizontal: .9375rem;
      --universe-link-padding-vertical: .625rem;
      --universe-background-color: #313131;
      --universe-link-hover-color: #fff;
      --universe-link-background: #414141;
      --universe-link-hover-background: #515151;
      --universe-caret-color: #ffffff;
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
      gap: 1px;
      list-style: none;
    }

    .universe-menu-spacer {
      display: block;
      flex-grow: 1;
    }

    .universe-menu-item {
      border-right: 1px solid var(--universe-divider-color);
    }

    .universe-menu-item:has(+ .universe-menu-spacer),
    .universe-menu-item + .universe-menu-spacer,
    .universe-menu-spacer ~ .universe-menu-item {
      border-right: unset;
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
      gap: .25rem;
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

    .universe-item-icon {
      display: block;
      height: 16px;
      width: 16px;
      overflow: hidden;
      opacity: .56;
    }
    .universe-item-icon svg {
      display: block;
      height: 16px;
      width: 16px;
    }
    [dir="rtl"] .universe-item-icon {
      transform: scaleX(-1);
    }

    .universe-menu-spacer ~ .universe-menu-item .universe-item {
      --item-padding-horizontal: 10px;
    }

    .universe-menu-spacer ~ .universe-menu-item:last-child .universe-item {
      padding-right: .9375rem;
    }
    :host-context([dir="rtl"]) .universe-menu-spacer ~ .universe-menu-item:last-child .universe-item {
      padding-right: .625rem;
      padding-left: .9375rem;
    }

    .universe-menu-spacer ~ .universe-menu-item .universe-item:hover {
      --item-background: unset;
      text-decoration: underline;
    }

    .universe-item--link {
      --item-color: var(--universe-link-color);
      --item-background: var(--universe-background-color);
    }
    .universe-item--link:focus,
    .universe-item--link:hover {
      --item-color: var(--universe-link-hover-color);
      --item-background: var(--universe-link-background);
    }

    .universe-item--link.universe-item--active,
    .universe-item--link.universe-item--active:hover {
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
