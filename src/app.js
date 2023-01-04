import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/tweets", (request, response) => {
    const tweets = {
        username: "bobesponja",
        avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
        tweet: "eu amo o hub",
    };

    response.send(tweets);
});

app.listen(5000, () => {
    console.log("Servidor iniciado com sucesso!");
});
