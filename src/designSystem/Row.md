row example:

```jsx
const Grid = require('./designSystem').default;
const Row = require('./Row').default;
const Column = require('./Column').default;
rowStyles = { marginBottom: '20px' };
columnStyles = { backgroundColor: '#97d8ba', border: '1px solid white', textAlign: 'center' };

<Row style={rowStyles} maxColumns={10}>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>One</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Two</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Three</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Four</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Five</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Six</p></Column>
    <Column sizes={{ sm: 2 }} style={columnStyles}><p>Seven</p></Column>
</Row>
```