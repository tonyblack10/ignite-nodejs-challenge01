import { parse } from 'csv-parse';
import fs from 'node:fs';

const parser = parse({
  delimiter: ',',
  fromLine: 2,
});

const readStream = fs.createReadStream("./data.csv");

async function uploadCsv() {
  const rows = readStream.pipe(parser);

  for await (const row of rows) {
    const [title, description] = row;

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
  }
}

uploadCsv()
