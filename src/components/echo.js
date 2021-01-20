import Echo from 'laravel-echo'
import { io } from 'socket.io-client'
import { jwtHelper } from '../helpers/jwtHelper'

// const socket = io
// window.io = socket
window.io = require('socket.io-client');

// const AppEcho = new Echo({
//     broadcaster: 'socket.io',
//     host: 'http://api.backup.wsdxz.ru' + ':6001' // this is laravel-echo-server host
// })
// window.Test = Echo

let echo = new Echo({
    broadcaster: 'socket.io',
    host: 'backup.wsdxz.ru:6001', // значение должно быть равным authHost из конфига + порт
    // transports: ['websocket', 'polling', 'flashsocket'],
    auth: {
        headers: {
            'Authorization': "Bearer " + jwtHelper.getToken()
        }
    }
});
// console.log(echo)

echo
    .private('test')
    .listen('TestEvent', (e) => {
        alert()
    });

// export default AppEcho