// ham
const header = document.querySelector(".l-header");
const ham = document.querySelector("#hamburger");
const link = document.querySelector(".p-top__link");

ham.addEventListener("click", function () {
  header.classList.toggle("active");
});

if (document.querySelector("body").classList.contains("home")) {
  link.addEventListener("click", function () {
    header.classList.toggle("active");
  });

  // slider-top
  window.addEventListener("DOMContentLoaded", (event) => {
    const slides = document.querySelectorAll(".c-slider");

    for (let i = 0; i < slides.length; ++i) {
      // ロゴ数の取得
      const target = slides[i];
      const childNum = target.firstElementChild.children.length;
      // slides[i].style.width = "720vh"; //360 > 40
      target.style.width = 40 * childNum * 2 + "vh";
      // 対象ラッパー要素
      // ループ1回分の時間
      const duration = parseInt(target.dataset.duration) * 1800 || 18000;
      console.log(duration);
      // スライダーの進行方向(右から左 or 左から右)
      const isAlternate = target.classList.contains("alternate");
      // ロゴの幅の算出
      const logoWidth = (((100 / childNum) * 100) / 100).toFixed(2);
      // ロゴの幅をセット
      target.style.setProperty("--logo-width", `${logoWidth}%`);

      // 開始時間
      let startTime = 0;
      // 経過時間
      let elapsed = 0;
      // 進捗(0-1)
      let progress = 0;

      const loop = (currentTime) => {
        if (!startTime) {
          startTime = currentTime;
        }
        // 現在の経過時間
        elapsed = currentTime - startTime;
        // 現在の進捗
        progress = Math.min(1, elapsed / duration);

        // 進捗が 100%(位置が 50%)になったらリセットして再ループ
        if (progress >= 1) {
          startTime = 0;
          elapsed = 0;
          progress = 0;
        }

        // スライドの位置を更新
        if (isAlternate) {
          // 左から右の場合
          target.style.transform = `translate3d(${-50 + progress * 50}%, 0, 0)`;
        } else {
          // 右から左の場合
          target.style.transform = `translate3d(-${progress * 50}%, 0, 0)`;
        }

        // 次のフレームをリクエストする
        window.requestAnimationFrame(loop);
      };

      // ループを開始
      window.requestAnimationFrame(loop);
    }
  });
}

if (document.querySelector(".l-main").classList.contains("works-single")) {
  // simple-slider-mockup
  const swiper = new Swiper(".swiper", {
    loop: true, // ループ
    speed: 1500, // 少しゆっくり(デフォルトは300)
    autoplay: {
      // 自動再生
      delay: 2000, // 2秒後に次のスライド
      disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
    },
    // ページネーション
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// gsap
window.addEventListener("load", () => {
  const yellowBoxes = document.querySelectorAll(".c-yellow-box");
  for (const yellowBox of yellowBoxes) {
    console.log(yellowBox.querySelector(".--text").innerHTML.length);
    const length = yellowBox.querySelector(".--text").innerHTML.length;
    const tl = gsap
      .timeline({
        scrollTrigger: {
          trigger: yellowBox,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
      .to(yellowBox, {
        clipPath: "inset(0 0% -10% 0)",
        // duration: 0.05 * length,
        duration: 0.5,
      })
      .to(yellowBox.querySelector(".--box"), {
        clipPath: "inset(0 0 -10% 100%)",
        // duration: 0.05 * length,
        duration: 0.5,
      });
  }
});

const strengthCards = document.querySelectorAll(".p-strength__grid-ttl-block");
if (strengthCards.length > 0) {
  const strengthCnt = document.querySelector(".p-strength__grid-cnt");
  if (window.innerWidth > 960) {
    gsap.to(strengthCards, {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1,
      scrollTrigger: {
        trigger: strengthCnt,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  } else {
    for (const strengthCard of strengthCards) {
      gsap.to(strengthCard, {
        y: 0,
        opacity: 1,
        stagger: 0.6,
        // duration: 0.4,
        scrollTrigger: {
          trigger: strengthCard,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }
}
