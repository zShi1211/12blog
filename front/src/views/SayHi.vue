<script setup lang='ts'>
import "css-doodle";
</script>

<template>
  <div class="sayhiWrapper">
    <h1 class="title">SayHi.</h1>
    <div class="box">
      <div class="left">
        <p class="email item">
          <a href="mailto:zshi1211@qq.com"> zshi1211@qq.com </a>
        </p>
        <p class="decor item"></p>
        <div class="introduction item">
          <p>😳你好啊，我是12</p>
          <p>😢生于南方临于北，零零后一枚。</p>
          <p>😂不识诗书，但我会加油的！！！</p>
          <p>🤔不追剧不热点，小曲爱听不唱。</p>
          <p>😊感谢你的逗留，祝你无刻不开心。</p>
        </div>
        <p class="name item">——12</p>
        <p class="links">
          <a href="https://github.com/zShi1211/12blog" target="_blank">
            <i class="iconfont icon-github"></i>
          </a>
          <a href="https://gitee.com/zshi1211/12blog" target="_blank">
            <i class="iconfont icon-gitee-fill-round"></i>
          </a>
          <RouterLink to="/">
            <i
              class="iconfont icon-home-fill"
            ></i>
          </RouterLink>
        </p>
      </div>
      <div class="right">
        <css-doodle>
          --color: @p(#51eaea, #fffde1, #ff9d76, #FB3569); :doodle { @grid: 30x1
          / 18vmin; --deg: @p(-180deg, 180deg); } :container { perspective:
          30vmin; } :before { content: ''; @place-cell: @r(100%) @r(100%);
          @size: @r(6px); @shape: heart; } @place-cell: center; @size: 100%;
          box-shadow: @m(2, (0 0 50px var(--color))); background: @m(100, (
          radial-gradient(var(--color) 50%, transparent 0) @r(-20%, 120%)
          @r(-20%, 100%) / 1px 1px no-repeat )); will-change: transform,
          opacity; animation: scale-up 12s linear infinite; animation-delay:
          calc(-12s / @size() * @i()); @keyframes scale-up { 0%, 95.01%, 100% {
          transform: translateZ(0) rotate(0); opacity: 0; } 10% { opacity: 1; }
          95% { transform: translateZ(35vmin) rotateZ(@var(--deg)); } } }
        </css-doodle>
      </div>
    </div>
  </div>
</template>

<style  scoped>
.sayhiWrapper {
  background: var(--color10);
  height: 100vh;

  padding: 0 10% 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 120px;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: left;
  transform: translateY(25px);
  position: relative;
  z-index: 10;
  color: #fff;
  white-space: nowrap;
}

.box {
  background: #3d4d5e;
  width: 100%;
  flex-grow: 1;
  display: flex;
}

.left,
.right {
  width: 100%;
}

.right {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  flex-grow: 1;
}

.left {
  padding: 40px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #fff;
}

.email {
  font-size: 50px;
  word-break: break-word;
}

.introduction {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.introduction p {
  padding: 10px 0;
}

@media (max-width: 576px) {
  .title {
    font-size: 100px;
  }
  .box {
    flex-direction: column;
  }

  .email {
    font-size: 30px;
  }

  .introduction p {
    padding: 5px 0;
  }
  .box .left .item {
    margin-bottom: 15px;
  }
}

.decor {
  height: 3px;
  width: 100px;
  background: #fff;
}

.links a {
  display: inline-block;
  font-size: 35px;
  margin-right: 15px;
}
</style>