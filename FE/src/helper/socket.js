import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import tokenService from "~/services/token.service";
var stompClient = null;
function connect() {
    let Sock = new SockJS('http://localhost:8080/chat');
    let headers = {
        "Content-Type": "application/json",
        "Authorization": `${tokenService.getLocalAccessToken()}`,
        "Access-Control-Allow-Origin": "http://localhost:3000/"
    }
    stompClient = Stomp.over(Sock);
    stompClient.connect(headers, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe(`/user/12/queue/friend/request`, onMessageReceived);
    });

}
function onConnected(state) {

    stompClient.subscribe('/topic/posts/2/comment');
    //userId của người dùng hiện tại
    // stompClient.subscribe('/user/12/queue/friendRequest', onTest);
}
function disconnect() {
    if (stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}
const onMessageReceived = (payload) => {
    console.log(payload)
    var payloadData = JSON.parse(payload.body);
    //sample message: {code: 0, message: 'Friend request sent!'}
    console.log(payloadData.data)
    return payloadData.data
}



export { connect, disconnect, stompClient }
