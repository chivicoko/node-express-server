const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', (req, res) => {
  const visitorName = req.query.visitor_name || 'Visitor';
  res.send(`Hello, ${visitorName}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
