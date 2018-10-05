import Cookies from "js-cookie"

function APICall(url = "", method = "GET", data = {}) {
    return fetch(url, {
        method: method,
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    });
}

function getToken() {
    return APICall("/api/auth/get-current-token/", "POST");
}

function sendMessage(message_channel, content) {
    return APICall(message_channel, "POST", {"content": content,});
}

const VerbAPI = {
    APICall: APICall,
    getToken: getToken,
    sendMessage: sendMessage,
};

export default VerbAPI;
