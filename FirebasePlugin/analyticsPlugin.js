//#region - Set User Properties -
// 設定使用者屬性
// properties: 使用者屬性的JSON字串
function SetUserProperties(properties) {
    var parsedProperties = JSON.parse(properties);
    firebase.analytics().setUserProperties(parsedProperties);
    console.log("Success: user properties was set.");
}
//#endregion

//#region - Log Event -
// 紀錄事件
// name: 事件名
// parameter: 事件參數的JSON字串
function LogEvent(name, parameter) {
    var parsedParameter = JSON.parse(parameter);
    console.log(parsedParameter);
    firebase.analytics().logEvent(name, parsedParameter);
    console.log("Success: " + name + " was log.");
}
//#endregion
