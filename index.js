const axios = require("axios");
const async = require("async");
const fs = require("fs");
const faker = require("faker");

const arr = [...Array(1000).keys()].map(_ => faker.name.firstName());

const main = () => {
  axios({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    data: {
      title: "Malu",
      body: "Made It Again",
      userId: 3
    }
  }).then(result => console.log(result.data));
};

async.eachSeries(arr, async name => {
  const data = {
    title: name,
    body: "Made It Again",
    userId: 1
  };
  axios({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    data
  })
    .then(result => {
      console.log(result.data);
      fs.appendFile("posts.txt", JSON.stringify(data) + "\n", err => {
        console.log("Appended!");
      });
    })
    .catch(err => {
      console.error(err.message);
      fs.appendFile("logs.txt", err.message + "\n", err => {
        console.log("Added Error");
      });
    });
});
// main();
