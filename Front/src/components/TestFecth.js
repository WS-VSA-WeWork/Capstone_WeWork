import { OPENAI_API_KEY } from "@env";

// export const testDavinci=(quenstion)=>{

//   const data =JSON.stringify({
//     "model":"text-davinci-003",
//     "prompt":"question",
//     "max_tokens":500,
//     "temperature":0,
//     "top_p":1,
//     "stream":false,
//     "frequency_penalty":0,
//     "presence_penalty":0,
//     "logprobs":null,
//   })
//   return fetch('https://api.openai.com/v1/completions', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer`+ $OPENAI_API_KEY,
//     },
//     body: data
//   }).then(response=>response.json())

export const testTurbo = (question) => {
  const data = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "" },
      { role: "user", content: question }, // 수정: quenstion → question
    ],
  });

  return fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    },
    body: data,
  })
    .then((response) => response.text())
    .then((text) => {
      console.log(text); // 실제로 수신된 텍스트를 콘솔에 출력
      return JSON.parse(text);
    });
};

// export const testTurbo = (question) => {
//   const data = JSON.stringify({
//     model: "gpt-3.5-turbo",
//     messages: [
//       { role: "system", content: "" },
//       { role: "user", content: question }, // 수정: quenstion → question
//     ],
//   });

//   return fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//       Authorization: "Bearer " + APP_OPEN_API_KEY,
//     },
//     body: data,
//   }).then((response) => response.json());
// };
