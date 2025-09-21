// @ts-expect-error -- not scope of the test
// eslint-disable-next-line import/no-unresolved
import { html, LitElement, property } from 'lit';
// @ts-expect-error -- not scope of the test
// eslint-disable-next-line import/no-unresolved
import { customElement } from 'lit/decorators.js';

@customElement('test-component')
export class TestComponent extends LitElement {
  @property({ type: String })
  propWritable = 'default';

  readonly propUnused: string;

  render() {
    return html`
      <!-- Missing accessibility features -->
      <button></button>
      <!-- Missing closing tag -->
      <span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
  'test-mismatch': TestComponent;
  }
}
