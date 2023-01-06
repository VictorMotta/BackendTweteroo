import express from "express";
import cors from "cors";

const PORT = 5000;
const usersConnected = [];

const tweets = [];


const app = express();

app.use(express.json());
app.use(cors());



app.post("/sign-up", (req, res) => {
    const user = req.body;
    usersConnected.push(user);
    res.send({ message: "OK" });
});

app.post("/tweets", (req, res) => {
    const tweet = req.body;

    const userConnected = usersConnected.find(item => tweet.username === item.username)


    if (userConnected) {
        const body = {
            username: userConnected.username,
            avatar: userConnected.avatar,
            tweet: tweet.tweet,
        };
        tweets.push(body);
        return res.send({ message: "OK" });
    };

    return res.send("UNAUTHORIZED");
});

app.get("/tweets", (req, res) => {
    if (tweets.length > 10) {
        const firstNumList = tweets.length - 10;
        const lastTweets = tweets.filter((item, i)=> i >= firstNumList);
        return res.send(lastTweets);
    }

    return res.send(tweets);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado com sucesso na porta ${PORT}!!`);
});
