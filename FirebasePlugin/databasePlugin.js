//#region - Post -
// 上傳資料
// 會覆蓋掉相同路徑的資料
// path: 資料庫路徑
// value: 資料的JSON字串
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function PostData(path, value, object, successCallback, failedCallback) {

    firebase.database().ref(path)
        .set(value)
        .then(() => {
            console.log("Success: " + path + " was posted.");
            window.unityInstance.SendMessage(object, successCallback);
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Get -
// 獲取資料
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function GetData(path, object, successCallback, failedCallback) {
    firebase.database().ref(path)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                var result = snapshot.val();
                console.log(result);
                window.unityInstance.SendMessage(object, successCallback, JSON.stringify(result));
            } else {
                console.log("No data available");
                window.unityInstance.SendMessage(object, successCallback, "");
            }
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Get All Child -
function GetData(path, object, successCallback, failedCallback) {
    firebase.database().ref(path)
        .once('value')
        .then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    var result = child.val;
                    console.log(result);
                    window.unityInstance.SendMessage(object,
                                                     successCallback,
                                                     JSON.stringify(result));
                });
            } else {
                console.log("No data available");
                window.unityInstance.SendMessage(object, successCallback, "");
            }
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Push -
// 上傳資料
// 不會覆蓋相同路徑的資料
// path: 資料庫路徑
// value: 資料的JSON字串
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function PushData(path, value, object, successCallback, failedCallback) {
    // Write the new post's data in the user's post list.

    firebase.database().ref(path)
        .push()
        .set(value)
        .then(() => {
            console.log("Success: " + path + " was pushed.");
            window.unityInstance.SendMessage(object, successCallback);
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Update -
// 更新資料
// path: 資料庫路徑
// value: 資料的JSON字串
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function UpdateData(path, value, object, successCallback, failedCallback) {
    firebase.database().ref(path)
        .update(value)
        .then(() => {
            console.log("Success: " + path + " was updated.");
            window.unityInstance.SendMessage(object, successCallback);
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Delete -
// 刪除資料
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function DeleteData(path, object, successCallback, failedCallback) {
    firebase.database().ref(path)
        .remove()
        .then(() => {
            console.log("Success: " + path + " was removed.");
            window.unityInstance.SendMessage(object, successCallback);
        }).catch((error) => {
            console.log("There was an error: " + error.message);
            window.unityInstance.SendMessage(object, failedCallback);
        });
}
//#endregion

//#region - Value Change Listener -
// 監聽資料有無改變
// 初始設定時，會回傳一次
// 當有改變時，回傳整份資料
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function ListenForValueChanged(path, object, successCallback, failedCallback) {
    try {
        firebase.database().ref(path).on("value", (snapshot) => {
            window.unityInstance.SendMessage(object, successCallback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, failedCallback);
    }
}
//#endregion

//#region - Child Added Listener -
// 監聽資料的子物件有無添加
// 初始設定時，會分次回傳所有子物件
// 當有子物件添加時，回傳添加的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function ListenForChildAdded(path, object, successCallback, failedCallback) {
    try {
        firebase.database().ref(path).on("child_added", (snapshot) => {
            window.unityInstance.SendMessage(object, successCallback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, failedCallback);
    }
}
//#endregion

//#region - Child Change Listener -
// 監聽資料的子物件有無改變
// 初始設定時，會分次回傳所有子物件
// 當有子物件改變時，回傳改變的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function ListenForChildChanged(path, object, successCallback, failedCallback) {
    try {
        firebase.database().ref(path).on("child_changed", (snapshot) => {
            window.unityInstance.SendMessage(object, successCallback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, failedCallback);
    }
}
//#endregion

//#region - Child Removed Listener -
// 監聽資料的子物件有無移除
// 初始設定時，會分次回傳所有子物件
// 當有子物件移除時，回傳移除的子物件
// path: 資料庫路徑
// object: 回傳呼叫的物件名
// successCallback: 執行成功完成時，回傳呼叫的方法名
// failedCallback: 執行失敗時，回傳呼叫的方法名
function ListenForChildRemoved(path, object, successCallback, failedCallback) {
    try {
        firebase.database().ref(path).on("child_removed", (snapshot) => {
            window.unityInstance.SendMessage(object, successCallback, JSON.stringify(snapshot.val()));
        });
    } catch (error) {
        console.log("There was an error: " + error.message);
        window.unityInstance.SendMessage(object, failedCallback);
    }
}
//#endregion

//#region - Close Listener -
// 停止監聽資料
// path: 資料庫路徑
function CloseListener(path) {
    firebase.database().ref(path).off();
    console.log("Success: " + path + "'s listener was closed.");
}
//#endregion
