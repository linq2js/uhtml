const {document} = require('basichtml').init();

const {render, html, svg} = require('../cjs');

const {body} = document;

const fragment = () => html`<p>1</p><p>2</p>`;
const variousContent = content => html`${content}`;

render(body, html`this is a test`);
render(body, html`this is a ${
  [1, 2].map(n => html`${n}`)
} test`);
render(body, html`this is a ${
  [1, 2].map(n => svg`${n}`)
} test`);

(function twice(i) {
  render(body, html`this is a ${
    (i ? [1, 2, 3] : [1, 2]).map(n => svg`${n}`)
  } test`);
  if (i--) twice(i);
}(1));

render(body, html`this is a ${'test'}`);
render(body, html`this is a ${true}`);
render(body, html`this is a ${1} ${2} ${3}`);
render(body, html`this is a ${1}`);

let div = document.createElement('div');
render(div, html.node`this is a test`);
render(div, html.for(body)`this is a test`);
render(div, html.for(body, 1)`this is a test`);
render(div, () => html.for(body)`this is a test`);
render(div, () => html.for(body, 1)`this is a test`);
(function twice(i) {
  render(div, () => html.for(body)`this is a test`);
  render(div, () => html.for(body, 1)`this is a test`);
  if (i--) twice(i);
}(1));

render(div, html`<div test="${123}" onclick=${() => {}} .disabled=${true} .contentEditable=${false} null=${null} />`);

render(document.createElement('div'), html`<textarea>${'test'}</textarea>`);
render(document.createElement('div'), html`<style>${'test'}</style>`);

const sameWire = content => html`<div>${content}</div>`;
render(div, sameWire([fragment()]));
render(div, sameWire([]));
render(div, sameWire([fragment()]));

render(div, html`<style>${'text only'}</style>`);

render(div, variousContent([
  html`<p />`,
  html`<p />`
]));
render(div, variousContent([
  html`<p />`,
  html`<p />`,
  html`<p />`
]));
render(div, variousContent([
  html`<p />`
]));

render(div, html`<style>${html`text only`}</style>`);
render(div, variousContent('text'));
render(div, variousContent(null));
render(div, variousContent(void 0));
render(div, variousContent([true]));
render(div, variousContent([1]));
render(div, variousContent(['one']));

const reference = {};
render(div, html`<div ref=${reference}>test</div>`);
console.assert(reference.hasOwnProperty('current'));

const withHandler = handler => html`<div onClick=${handler} />`;
render(div, withHandler(Object));
render(div, withHandler(Object));
render(div, withHandler(String));
render(div, withHandler(null));
render(div, withHandler([Object, false]));

const withAttribute = value => html`<div test=${value} />`;
render(div, withAttribute(null));
render(div, withAttribute('test'));
render(div, withAttribute('test'));
render(div, withAttribute(null));
render(div, withAttribute('test'));

const withText = value => html`<textarea>${value}</textarea>`;
render(div, withText('test'));
render(div, withText('test'));
render(div, withText(null));
render(div, withText('test'));

render(div, html`${document.createDocumentFragment()}`);

const wire1 = html`<p /><p />`;
const wire2 = html`<div /><div />`;
const wire = what => html`${what}`;
render(div, wire([wire1, fragment(), wire2]));
render(div, wire([wire2, fragment(), wire1]));

render(div, html`<two /><holes />`);
render(div, html`<one />`);

try {
  render(div, html`<p test="is ${'really'} broken" ${"isn't it"}></p>`);
  console.assert(false, 'broken template is not breaking');
} catch (OK) {}

render(div, sameWire('test'));
render(div, sameWire('test'));
render(div, sameWire(document.createElement('p')));

render(body, html`<h1>test</h1>`);
render(body, html`<h2>test</h2><h3>test</h3>`);
render(body, html`${fragment()}`);
render(body, html`${fragment()}`);
render(body, html`${[fragment()]}`);
render(body, html`<h1 data-test="${123}">${'content'}</h1>`);
render(body, html`<div test="${123}" onclick=${() => {}} .disabled=${true} .contentEditable=${false} null=${null} />`);
render(body, variousContent([
  html`<p />`,
  html`<p />`
]));
render(body, variousContent([
  html`<p />`,
  html`<p />`,
  html`<p />`
]));
render(body, variousContent([
  html`<p />`
]));