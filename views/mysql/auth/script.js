function sendAjax(url, data){

  // 입력값을 변수에 담고 문자열 형태로 변환
  var data = {'email' : data};
  data = JSON.stringify(data);

  // content-type을 설정하고 데이터 송신
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url);
  xhr.setRequestHeader('Content-type', "application/json");
  xhr.send(data);

  // 데이터 수신이 완료되면 표시
  xhr.addEventListener('load', function(){
    console.log(xhr.responseText);
    var result = JSON.parse(xhr.responseText);
    console.log(result.result);
    if(result.result !== 'ok') {
      document.querySelector(".result").innerHTML = 'x중복아이디입니다.';
      return;
    } else {
      document.querySelector(".result").innerHTML = 'o';
    }
  });
}
$(document).ready(function(){
  $('#sw').keyup(function(){
    var word = $("#sw").val();

      if(word != ''){
        var inputdata = document.forms[0].elements[0].value;
          // sendAjax 함수를 만들고 URL과 data를 전달
        sendAjax('http://127.0.0.1/ajax_send_email', inputdata)
      } else {
        document.querySelector(".result").innerHTML = 'x';
      }
      ;
  });
});
