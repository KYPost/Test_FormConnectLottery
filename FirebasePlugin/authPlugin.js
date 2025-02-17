//#region - Sign In Anonymously -
// 匿名登入
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function SignInAnonymously(object, fallback) {
    firebase.auth()
        .signInAnonymously()
        .then(() => {
            console.log("Success: Anonymous sign in");
        }).catch(function (error) {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, fallback, error.message);
        });
}
//#endregion

//#region - Email And Password -
//#region - Sign Up -
// Email 註冊
// email: 電子郵件
// password: 密碼
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function CreateUserWithEmailAndPassword(email, password, object, fallback)
{
    firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log("Success: Email & Password sign up");
            }).catch(function (error) {
                console.log("There was an error: " + error.message);
                window.unityInstance.SendMessage(object, fallback, error.message);
            });
}
//#endregion

//#region - Sign In -
// Email 登入
// email: 電子郵件
// password: 密碼
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function SignInWithEmailAndPassword(email, password, object, fallback)
{
    firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (result) {
                console.log("Success: Email & Password sign in");
            }).catch(function (error) {
                console.log("There was an error: " + error.message);
                window.unityInstance.SendMessage(object, fallback, error.message);
            });
}
//#endregion
//#endregion

//#region - Sign In With Google -
// Google登入
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function SignInWithGoogle(object, fallback)
{
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
            .signInWithPopup(provider)
            .then(function (result) {
                console.log("Success: Google sign in");
            }).catch(function (error) {
                console.log("There was an error: " + error.message);
                window.unityInstance.SendMessage(object, fallback, error.message);
            });
}
//#endregion

//#region - Sign In With Facebook -
// Facebook登入
// 需要先在Facebook開發者帳號進行設定
// https://www.letswrite.tw/firebase-auth-google-fb/#facebook-%e7%99%bb%e5%85%a5
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function SignInWithFacebook(object, fallback) {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth()
            .signInWithPopup(provider)
            .then(function (result) {
                console.log("Success: Facebook sign in");
            }).catch(function (error) {
                console.log("There was an error: " + error.message);
                window.unityInstance.SendMessage(object, fallback, error.message);
            });
}
//#endregion

//#region - Sign In With Line -
// Line登入
// 需要先在Firebase專案新增OpenID Connect(付費功能)
// https://ithelp.ithome.com.tw/articles/10312761?sc=pt
// object: 回傳呼叫的物件名
// fallback: 錯誤回傳呼叫的方法名
function SignInWithLine(object, fallback) {
    var provider = new firebase.auth.OAuthProvider('oidc.line');// oidc.上面自定的名稱
    firebase.auth()
            .signInWithPopup(provider)
            .then(function (result) {
                console.log("Success: Line sign in");
            }).catch(function (error) {
                console.log("There was an error: " + error.message);
                window.unityInstance.SendMessage(object, fallback, error.message);
            });
}
//#endregion

//#region - Sign Out -
// 登出
function SignOut() {
    firebase.auth()
        .signOut()
        .then(function (result) {
            console.log("Success: Sign out.");
        }).catch(function (error) {
            console.log("There was an error: " + error.message);
        });
}
//#endregion

//#region - On Auth State Changed -
// 登入狀態改變
// object: 回傳呼叫的物件名
// signInCallback: 登入狀態回傳呼叫的方法名
// signOutCallback: 登出狀態回傳呼叫的方法名
function OnAuthStateChanged(object, signInCallback, signOutCallback) {
    firebase.auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    console.log("User sign in : " + user);
                    window.unityInstance.SendMessage(object, signInCallback, JSON.stringify(user));
                } else {
                    console.log("User sign out.");
                    window.unityInstance.SendMessage(object, signOutCallback);
                }
            });
}
//#endregion
