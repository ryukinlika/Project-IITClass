
export class Login {

    constructor(
        public username: string,
        public password: string
    ) { }

}

let myLogin = new Login('william@gmail.com', 'plshelpme');
console.log('My hero is called ' + myLogin.username);
