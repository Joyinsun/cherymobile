
export default function doXMLHttpRequest(url: string, type: string = "GET") : any {
  let result;
   var request = new XMLHttpRequest();
   request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }

    if (request.status === 200) {
     alert("请求成功！");
       result = { responseText: request.responseText };
       console.log(request.responseText);

      } else {
       alert("请求失败！");
      }
    };

   request.open(type, url, false);
   request.send();
 return result;
}
