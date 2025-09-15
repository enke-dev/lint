// @ts-expect-error -- not scope of the test
// eslint-disable-next-line import/no-unresolved
import { html, LitElement, property } from 'lit';
// @ts-expect-error -- not scope of the test
// eslint-disable-next-line import/no-unresolved
import { customElement } from 'lit/decorators.js';

/**
 * Graphic of a brook used as visual signature.
 *
 * @cssprop --kvlm-brook-color - Color of the brook's stroke.
 * @cssprop --kvlm-brook-opacity - Opacity of the brook.
 * @cssprop --kvlm-brook-stroke-width - Width of the brook's stroke.
 */
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
