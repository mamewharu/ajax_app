function check() {
  const posts = document.querySelectorAll(".post");
  posts.forEach(function (post) {
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => {
      const postId = post.getAttribute("data-id");
      const XHR = new XMLHttpRequest();
      XHR.open("GET", `/posts/${postId}`, true);
      XHR.responseType = "json";
      XHR.send();
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        const item = XHR.response.post;
        if (item.checked === true) {
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);

// indexから要素を指定してその要素を並べる
// その要素がクリックされたらイベント発火する
// 発火したらエンドポイントでコントローラーにリクエストが送られる
// XMLHttpRequestで使うレスポンスとしてjsonを指定する
// ここまでがリクエスト送信の準備
// ここからはレスポンスを受け取る
// XHR.responseでレスポンスされてきた(渡された)jsonにアクセスできる
// コントローラーのcheckアクションで取得したitemはXHR.responseで取得できる
// そして取得した内容が既読であればtrueをセットし、そうでなければdata-checkごと削除する
// HTTPステータスが200以外の時にifはtrueとなりアラートを出す。
// XHR.statusTextによって、エラーが生じたオブジェクトに含まれるエラーメッセージが表示する
// return　null;　でJavaScriptから抜け出す。これから先の処理を行わせないため。
// リロードしないで更新する実装をしたいのでsetintervalを記述し1秒に一回更新するようにする
// これだけだと1秒に1回のペースでメモの投稿にaddEventListenerがセットされてしまう
// 1回のクリックに対して複数回post.addEventListener以降の処理が実行されてしまう
// post.setAttribute("data-load", "true")とすることで要素であるpostにtrueを追加させている。
// １周回ってきたときにif文で中身が空じゃないと判断されreturn nullで処理がとまる