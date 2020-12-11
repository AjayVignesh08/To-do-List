const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.set("view engine", "ejs");
app.use(express.static("public"));
const  items = ["Wake up at 5 AM", "Study JavaScript", "Start Office Work"];
const workItems = [];
app.get("/", function(req, res) {
const  day = date.getDate();
  res.render('list', {
    listTitle: day,
    newLists: items
  });
})

app.post("/", function(req, res) {
  if (req.body.button === "Work") {
    const workItem = req.body.listname;
    workItems.push(workItem);
    res.redirect("/work")
  } else {
    const item = req.body.listname;
    items.push(item);
    res.redirect("/")
  }
})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    newLists: workItems
  })
})

app.get("/about",function(req,res){
  res.render("about");
})
app.listen(3000, function() {
  console.log("Server Started Successfully");
})
