// import SerialPort from "serialport";
// import fetch from "node-fetch";
import  {App} from './app.js'
// const serialPort = new SerialPort("/dev/ttyS0", { baudRate: 9600 });

const setId = async (newId) => {
  console.log(newId);
  App(newId)
  // await fetch(`http://localhost:5000/auth/token`);
};

setId("1234");

//! put back
// const getChunk = () => {
//     let buffer = ''
//     serialPort.on('data', (chunk) => {
//         console.log({chunk})
//       buffer += chunk
//         const answer = buffer.split(/\r?\n/)
//         console.log('end', {answer})
//         if(answer[0].length > 10) {
//             setId(answer[0])
//             buffer = ''
//         }
//     })
// }

// serialPort.open(() => {

//   getChunk()

// })
