document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;
  const track = slider.querySelector('.slides');
  if (!track) return;

  // 元スライドを取得
  const originals = Array.from(slider.querySelectorAll('.slide'));
  if (originals.length <= 1) return;

  // 無限ループ用に先頭/末尾のクローンを追加
  const firstClone = originals[0].cloneNode(true);
  const lastClone = originals[originals.length - 1].cloneNode(true);
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');
  track.appendChild(firstClone);
  track.insertBefore(lastClone, originals[0]);

  const count = originals.length; // オリジナル枚数
  let index = 1; // 0: 末尾クローン, 1..count: オリジナル, count+1: 先頭クローン

  function setTransition(enabled) {
    track.style.transition = enabled ? '' : 'none';
  }

  function go(i, withTransition = true) {
    setTransition(withTransition);
    index = i;
    track.style.transform = 'translateX(' + (-100 * index) + '%)';
  }

  // 初期位置をオリジナル1枚目にセット（遷移なし）
  go(index, false);

  // 3秒ごとに右方向へ移動（自動のみ）
  function next() { go(index + 1, true); }
  let timer = setInterval(next, 3000);

  // タブ非表示で停止/復帰
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearInterval(timer);
    } else {
      // 二重起動を避けるため一度クリアしてから再起動
      clearInterval(timer);
      timer = setInterval(next, 3000);
    }
  });

  // ラップ時に遷移を切って実位置へ瞬間移動（見た目は連続右移動）
  track.addEventListener('transitionend', function () {
    // 先頭クローンへ到達したら、オリジナル1枚目へ瞬間移動
    if (index === count + 1) {
      go(1, false);
      // リフローしてから遷移を戻す
      void track.offsetHeight;
      setTransition(true);
    }
    // 左方向が必要な場合のための逆ラップ（今回は自動右移動だが保険）
    else if (index === 0) {
      go(count, false);
      void track.offsetHeight;
      setTransition(true);
    }
  });
});
