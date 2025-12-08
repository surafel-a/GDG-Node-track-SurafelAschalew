import http from 'http';

let students = [];

const server = http.createServer((req, res) => {

  // GET request to /
  if(req.method === 'GET' && req.url === '/'){
    res.statusCode = 200;
    return res.end('Welcome to the Home Page')
  }
  // GET request to /students
  else if(req.method === 'GET' && req.url === '/students'){
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify(students));
  }
  // POST request to /students
  else if(req.method === 'POST' && req.url === '/students'){
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const jsonData = JSON.parse(body);
        students.push(jsonData);

        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(jsonData));
      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    })

    return;
  }
  // PUT request to /students/:id
  else if(req.method === 'PUT' && req.url.startsWith('/students/')) {
    const id = parseInt(req.url.split('/')[2]); // id from URL
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const jsonData = JSON.parse(body); 
        const index = students.findIndex(item => item.id === id);

        if (index === -1) {
          res.writeHead(404, { 'content-type': 'application/json' });
          return res.end(JSON.stringify({ error: 'Student not found' }));
        }

        students[index] = jsonData;

        res.writeHead(200, { 'content-type': 'application/json' });
        return res.end(JSON.stringify(students[index]));

      } catch (error) {
        res.writeHead(400, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });

    return; 
  }
  // DELETE request to /students/:id
  else if(req.method === 'DELETE' && req.url.startsWith('/students/')) {
    const id = parseInt(req.url.split('/')[2]); 
    const index = students.findIndex(item => item.id === id);

    if (index === -1) {
      res.writeHead(404, { 'content-type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Student not found' }));
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({
      message: 'Student deleted successfully',
      student: deletedStudent
    }));
  }

})

server.listen(4000, () => {
  console.log('Server running on port 4000');
})