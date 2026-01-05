const someInlineHtml = /* html */ `
<div>
<p>This is mis-indented.</p>
    <span unclosed>
</div>
      <br />
`;

// @ts-expect-error -- not scope of the test
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
html`
<div>
<p>This is mis-indented.</p>
    <span unclosed>
</div>
      <br />
`;
