import express from "express";
import cors from "cors";

const PORT = 5000;
const usersConnected = [];

const tweets = [];




const app = express();

app.use(express.json());
app.use(cors());





app.get("/tweets", (req, res) => {

    const {page} = req.query;
    console.log(page);

    // page = 1 > pega os primeiros 10
    // page = 2 > pega do 11 até o 20
    const pageInicial = ((Number(page) - 1) * 10);
    const pageFim = (Number(page) * 10);



    if(page < 1){
        return res.status(400).send("Informe uma página válida!");
    }

    if (tweets.length > 10) {
        if(page > 1){
            const tweetsPages = tweets.slice(pageInicial, pageFim);
            return res.send(tweetsPages)
        }
        const tweetsPagesFirstTen = tweets.slice(0, 10);
        return res.send(tweetsPagesFirstTen);
    }

    return res.send(tweets);
});


app.get("/tweets/:user", (req, res) => {
    const { user } = req.params;

    const tweetSpecificUser = tweets.filter(item => item.username === user);

    res.send(tweetSpecificUser);
});


app.post("/sign-up", (req, res) => {
    const user = req.body;

    if(!user.username || !user.avatar){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    if(!(typeof user.username === "string") || !(typeof user.avatar === "string")){
        return res.sendStatus(400);
    }

    usersConnected.push(user);
    res.status(201).send({ message: "OK" }); 
});



app.post("/tweets", (req, res) => {
    const tweet = req.body;
    const user = req.headers.user; 

    if(!user || !tweet.tweet){
        return res.status(400).send("Todos os campos são obrigatórios!");
    }


    if(!(typeof tweet.tweet === "string")){
        return res.sendStatus(400);
    }


    const userConnected = usersConnected.find(item => item.username === user)

   

    if (userConnected) {
        const body = {
            username: userConnected.username,
            avatar: userConnected.avatar,
            tweet: tweet.tweet,
        };
        tweets.push(body);
        return res.status(201).send({ message: "OK" });
    };

    return res.sendStatus(401);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso na porta ${PORT}!!`);
});
