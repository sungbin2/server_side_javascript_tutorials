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
      document.querySelector(".result").innerHTML = 'Email이 중복되었습니다.';
      return;
    } else {
      document.querySelector(".result").innerHTML = '기도편지 동역자가 되셨습니다.';
      }
  });
}
$('#sw').click(function(){
    var word = document.forms[0].elements[0].value;

    if(word != ''){
      var inputdata = document.forms[0].elements[0].value;
        // sendAjax 함수를 만들고 URL과 data를 전달
      sendAjax('/ajax_send_email', inputdata)
    } else {
      document.querySelector(".result").innerHTML = '동역자 정보를 알려주세요.';
    };
});
