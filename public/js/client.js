$(document).ready(function () {
    $('#sendBtn').click(function () {
      const pormpt = $('#msg').val();
      sendMessageToServer(pormpt);
    });
  
    function sendMessageToServer(pormpt) {
      $.ajax({
        url: '/getGptResponse', // 서버 엔드포인트
        type: 'POST',
        data: JSON.stringify({ pormpt }),
        contentType: 'application/json',
        success: function (response) {
          const answer = response.answer;
          addToDiscussion('user', pormpt);
          addToDiscussion('AI', answer);
        },
        error: function (error) {
          console.error('서버 요청 오류:', error);
        },
      });
    }
  
    function addToDiscussion(writer, msg) { 
      $('.discussion').append('<li><strong>' + writer + ':</strong> ' + msg + '</li>');
      $('.discussion').animate({ scrollTop: $('.discussion').prop('scrollHeight') });
    }
  });
  