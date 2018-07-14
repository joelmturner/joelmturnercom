Column example:

```jsx
const styles = {background: '#97d8ba', padding: '1em'};
const renderDivs = require('./../Utils.story.js').renderDivs;
const Grid = require('./Grid').default;
const Row = require('./Row').default;
const Column = require('./Column').default;

<Grid>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={1} style={styles}>1</Column>
        <Column span={1} style={styles}>2</Column>
        <Column span={1} style={styles}>3</Column>
        <Column span={1} style={styles}>4</Column>
        <Column span={1} style={styles}>5</Column>
        <Column span={1} style={styles}>6</Column>
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={2} style={styles}>1</Column>
        <Column span={2} style={styles}>2</Column>
        <Column span={2} style={styles}>3</Column>
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={3} style={styles}>1</Column>
        <Column span={3} style={styles}>2</Column>
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={4} style={styles}>1</Column>
        <Column span={2} style={styles}>2</Column>
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={5} style={styles}>1</Column>
        <Column span={1} style={styles}>2</Column>
    </Row>
    <Row maxColumns={6} style={{gridGap: '.25em', marginBottom: '1em'}}>
        <Column span={6} style={styles}>1</Column>
    </Row>
</Grid>
```