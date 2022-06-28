

// console.log('<----- Injected script started running ----->');

// function parseEssentialDetails() {
//     let main = {};

//     main.performance = JSON.parse(JSON.stringify(window.performance)) || null;

//     return main;
// }

// setInterval(() => {
//     let essential = parseEssentialDetails();
//     window.postMessage({ type: "FROM_PAGE", essential });
// }, 500);
// var ChromeRequest = (function () {
//   var requestId = 0;

//   function getData(data) {
//     var id = requestId++;

//     return new Promise(function (resolve, reject) {
//       var listener = function (evt) {
//         if (evt.detail.requestId == id) {
//           // Deregister self
//           window.removeEventListener("sendChromeData", listener);
//           resolve(evt.detail.data);
//         }
//       };

//       window.addEventListener("sendChromeData", listener);

//       var payload = { data: data, id: id };

//       window.dispatchEvent(
//         new CustomEvent("getChromeData", { detail: payload })
//       );
//     });
//   }

//   return { getData: getData };
// })();

// ChromeRequest.getData("whatever").then(function (data) {
//   console.log(data);
//   alert(data);
// });
