// 과제 7번. 메시지와 로딩


function MessageBox({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`message ${message.type}`}>
      {message.text}
    </div>
  );
}

export default MessageBox;