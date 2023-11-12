// content.js

const constructRequest = (headline) => {
  const requestData = {
    inputs: headline,
    parameters: {
        temperature: 0.50,
        max_tokens: 500,
        top_p:0.95,
        repeat_penalty:1.2, 
        top_k:150,
        echo: false
    }
  };

  return requestData;

}

const cleanRhyme = (text) => {
  let splitText = text.split(':');
  return splitText[1];
}

const changeHeadline = (requestData, element) => {

  chrome.runtime.sendMessage(requestData, response => {
    element.innerText = response["generated_text"];
  })

}

const replaceText = () => {

    let topHeadlineElement = document.body.querySelectorAll('#topnews h2.hdg3');
    let headlineElements = document.body.querySelectorAll('#topnews h3.hdg3');

    let allElements = [];

    allElements.push(topHeadlineElement[0]);

    headlineElements.forEach((element) => {
      allElements.push(element)
    });

    allElements.forEach((element) => {
      changeHeadline(constructRequest(element.innerText) , element);
    });
}

// Call the replaceText function
replaceText();

