function reqListener () {
    console.log(JSON.parse(this.responseText));
  }
  
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "http://www.example.org/example.txt");
  oReq.send();