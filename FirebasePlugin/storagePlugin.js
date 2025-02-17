//#region - Upload File -
// 上傳雲端並回傳檔案URL
// path: 雲端路徑+檔名(含檔案類型)
// file: 檔案的base64字串
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function UploadFile(path, file, object, callback)
{
    firebase.storage()
            .ref(path)
            .putString(file, 'base64')
        .then((snapshot) => {               
                console.log("Success: file was uploaded to " + path);
                ReturnFileURL(path, object, callback);
            }).catch((error => {
                console.error("There was an error: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
            }));
}
function ReturnFileURL(path, object, callback)
{
    firebase.storage()
        .ref(path)
        .getDownloadURL()
        .then((url) => {
            // 將網址轉換成cors託管網址
            var corsURL = 'https://corsproxy.io/?' + encodeURIComponent(url);
            // 回傳
            window.unityInstance.SendMessage(object, callback, url);
        }).catch((error) => {
            console.error("There was an error: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
        });
}
//#endregion

//#region - Download File -
// 下載雲端檔案
// path: 雲端路徑+檔名(含檔案類型)
// object: 回傳呼叫的物件名
// callback: 回傳呼叫的方法名
function DownloadFile(path, object, callback)
{
    firebase.storage()
            .ref(path)
            .getDownloadURL()
            .then((url) => {
                var corsURL = 'https://corsproxy.io/?' + encodeURIComponent(url);
                var xhr = new XMLHttpRequest();
                xhr.responseType = 'arraybuffer';
                xhr.onload = function (event) {
                    var data = xhr.response;
                    window.unityInstance.SendMessage(object, callback, arrayBufferToBase64(data));
                };
                xhr.open('GET', corsURL);
                xhr.send();
            }).catch((error) => {
                console.error("There was an error: " + JSON.stringify(error, Object.getOwnPropertyNames(error)));
            });
}

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
//#endregion
