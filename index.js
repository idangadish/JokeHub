import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(port, () =>{
    console.log(`listening to port ${port}`);
})

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/jokes", (req, res) => {
    res.render("all-jokes.ejs",{ AllJokes: jokes});
});

app.get("/add", (req, res) => {
    res.render("add-joke.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/submit", (req, res) => {
   const newJoke = {
        question: req.body.title,
        answer: req.body.content,
        name: req.body.name
    };

    jokes.push(newJoke);
    res.redirect("/add");
});

app.get("/edit/:index", (req, res)=> {
    const jokeIndex = req.params.index;
    const joke = jokes[jokeIndex];

    if(!joke){
        return res.send("Joke not found!")
    }

    res.render("add-joke.ejs", { joke, jokeIndex, isSubmited: false });

})

app.post("/edit/:index", (req, res)=> {
    const jokeIndex = req.params.index;

    jokes[jokeIndex] = {
        question: req.body.title,
        answer: req.body.content,
        name: req.body.name
    };
   
    res.redirect("/jokes");

});

app.post("/delete/:index", (req, res) => {
    const jokeIndex = parseInt(req.params.index);
   if (jokeIndex < 0 || jokeIndex >= jokes.length) {
        return res.send("Joke not found!");
    }


    jokes = jokes.filter((_, index) => index !== jokeIndex);
    res.redirect("/jokes");
    
});


let jokes = [
    { question: "Why did the chicken cross the road?", answer: "To get to the other side!", name: "Alice" },
    { question: "What do you call a fake noodle?", answer: "An Impasta!", name: "Bob" },
    { question: "Why don’t scientists trust atoms?", answer: "Because they make up everything!", name: "Charlie" }
];
