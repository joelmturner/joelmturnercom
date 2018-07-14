grid example:

```jsx
const styles = {background: '#97d8ba', padding: '1em'};
const renderDivs = require('./../Utils.story.js').renderDivs;
const Grid = require('./Grid').default;
const Row = require('./Row').default;

<Grid>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        { renderDivs(36, styles) }
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        { renderDivs(3, styles) }
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        { renderDivs(18, styles) }
    </Row>
</Grid>
```