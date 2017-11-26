var addtodo = function() {
    // 문자리스트 생성
    // input box을 선택하고 변수 지정
    var inputbox = document.getElementById('input-list');
    // inputbox의 value를 잡아내고 변수 지정
    var new_text = document.createTextNode(inputbox.value);
    // li 태그의 엘리먼트를 생성하는 변수 지정
    var new_elem = document.createElement('li');
    // ul 태그의 첫번째 요소를 변수로 지정
    var list = document.getElementsByTagName('ul')[0]

    // li 태그 생성하고 그 자식요소로 inputbox의 value값으로 삽입
    new_elem.appendChild(new_text);
    // ul 태그의 첫번째 요소에 자식요소로 new_elem을 삽입
    list.appendChild(new_elem);

    // input 비우기
    inputbox.value = "";
}
// 엔터 이벤트로 바꾸기
document.addEventListener('keyup', function (e) {
    var key = e.keyCode;
    if (key !== 13) return; {
        addtodo();
    }
})

document.getElementById('list').addEventListener('click', function (e) {
    var list = document.getElementById('list');
    console.log(e)
    if (!e.target || e.target.nodeName !== 'LI') return;
    list.removeChild(e.target);
    // e.target.parentNode.removeChild(e.target);
});