import socketio from 'socket.io-client';
const socket = socketio('http://192.168.0.6:3333',{
    autoConnect: false
});

const connect = ({latitude, longitude,techs}) => {
    socket.io.opts.query = {latitude, longitude,techs};
    socket.connect();
    socket.on('message',(text) => {
        console.log(text);
    })
}
const disconnect = () => {
    if(socket.connected) {
        socket.disconnect();
    }
}
const subscribeToNewDevs = (subscribeFunction) => {
    socket.on('new-dev',subscribeFunction);
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
};