import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const basePromptPrefix =
`
I want you to act as a song recommender. I will provide you with a song and you output 10 songs that are similar to the given song. Do not choose songs that are same name or artist. Do not write any explanations or other words, just reply with the list of 10 songs that are similar to the one I am provding.

My song is: 

`;
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: ` ${basePromptPrefix}${req.body.userInput}`,
        temperature: 0.7,
        max_tokens: 250,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({ output: basePromptOutput});
};

export default generateAction;