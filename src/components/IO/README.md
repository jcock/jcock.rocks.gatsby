# USAGE

## In page

- Import IO
- Import component you want to animate in
- Wrap the component in IO as shown

```js
// Layout.js

import Footer from '../Footer';
import IO from '../IO';

...

<IO rootMargin="-50px">{({ isVisible }) => <Footer isVisible={isVisible} />}</IO>
```

## In component

- Import css
- Set component to receive props
- Set className based off of IO props with default

```js
// Footer.js

import style from './Footer.module.css';

const { isVisible } = this.props;

...

<footer className={isVisible ? style.isVisible : style.footer}>...</footer>
```

## In CSS

- Set default style
- Set prop style with composes: defaultstyle

``` css
// Footer.module.css

.footer {
  opacity: 0;
  transition: opacity var(--timingBase) ease-in-out;
}

.isVisible {
  composes: footer;
  opacity: 1;
}
```
