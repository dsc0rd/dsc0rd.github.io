const express = require('express');

const app = express();

const port = 3001;
//Route setup
app.get('/', (req, res) => {
  res.send('root');
})

app.get('/run', callGissat);


//Start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`)
});

function callGissat(req, res) {
  const {
    spawn
  } = require('child_process');

  let prm = []

  if(!(req.query.c===""||req.query.c===undefined))
    prm.push(req.query.c)

  if(!(req.query.a===""||req.query.a===undefined))
    prm.push(req.query.a)

  let pc = spawn("gs", prm);

  pc.stdout.on('data', (d)=>{
    console.log(d);
    res.send({
      title: {...prm},
      content: d.toString()
    })
  })

  pc.stderr.on('data', (d)=>{
    console.log(`stderr: ${d}`);
  })
  
  pc.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
