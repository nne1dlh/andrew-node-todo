const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var passwd = '123abc';

// bcrypt.genSalt(5, (err, salt) => {
//     bcrypt.hash(psswd, salt, (err, hash) => {
//         console.log(hash);
//     });
// });
var hashedPw = "$2a$05$HJDIHTZio1RwJ4yZyW57R.WszcnVrQEmRt77ci9OL/YJaVZ4G8TfG";

bcrypt.compare(passwd, hashedPw, (err, res) => {
    console.log(res);
})
 





// var data = {
//     id: 10
// };

// var token = jwt.sign(data, '123abc');
// console.log(token);

// var decode = jwt.verify(token, '123abc');
// console.log("string decoded", decode);

// var message = 'I and user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var dataP = {
//     id: 4
// };
// var token = {
//     data: dataP,
//     hash: SHA256(JSON.stringify(dataP) + 'somesecret').toString()
// }

// //man in middle
// // token.data.id =5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resHash ===token.hash) {
//     console.log('Data was not changed');
// } else {
//     console.log('Data was changed do not trust');
// }
