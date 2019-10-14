const express = require("express");
const path = require("path");
const hbs = require("hbs");
const gencode = require("./utils/gencode");
const forcast = require("./utils/forecast");

const app = express();

const pathroutetopublic = path.join(__dirname, "../public");

const viewhbs = path.join(__dirname, "../templete/view");

const hbspartial = path.join(__dirname, "../templete/partial");

app.set("view engine", "hbs");
app.set("views", viewhbs);

// for patial views like header and footer
hbs.registerPartials(hbspartial);
// use for static assests
app.use(express.static(pathroutetopublic));

app.get("", (req, res) => {
  res.render("index", {
    heading: "weather app",
    name: "daya"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    heading: "help",
    helptext: "this a helping text plz help",
    name: "bhai jan"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide a address"
    });
  }
  const add = req.query.address;

  gencode(add, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forcast(latitude, longitude, (error, fdata) => {
      if (error) {
        return res.send({ error });
      } else {
        res.send({
          add,
          forcast: fdata,
          location
        });
      }
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errormsg: "no help found",
    name: "rehan bh"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errormsg: "page not found",
    name: "farhan"
  });
});

app.listen(3000, () => {
  console.log("port 3000 start server");
});
