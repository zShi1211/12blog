<script setup lang='ts'>
import "css-doodle";

</script>

<template>
    <div class="sayhiWrapper">
        <h1 class="title">SayHi.</h1>
        <div class="box">
            <div class="left">
                <p class="email">
                    <a href="mailto:zshi1211@qq.com">
                    2459924732@qq.com
                    </a>
                </p>
                <p class="decor"></p>
                <div class="introduction">
                  <p>我程序员小白一位</p>
                  <p>喜欢emmm...</p>
                  <p>这个问题好像自己也不知道</p>
                  <p>但有时莫名感到快乐</p>
                </div>
                <p class="name">
                    bangban12
                </p>
                <p class="links">
                    <a href="">
                        <i class="iconfont icon-github"></i>
                    </a>
                </p>
            </div>
            <div class="right">
                <css-doodle>
                    --color: @p(#51eaea, #fffde1, #ff9d76, #FB3569); :doodle { @grid:
                    30x1 / 18vmin; --deg: @p(-180deg, 180deg); } :container {
                    perspective: 30vmin; } :before { content: ''; @place-cell:
                    @r(100%) @r(100%); @size: @r(6px); @shape: heart; } @place-cell:
                    center; @size: 100%; box-shadow: @m(2, (0 0 50px var(--color)));
                    background: @m(100, ( radial-gradient(var(--color) 50%,
                    transparent 0) @r(-20%, 120%) @r(-20%, 100%) / 1px 1px no-repeat
                    )); will-change: transform, opacity; animation: scale-up 12s
                    linear infinite; animation-delay: calc(-12s / @size() * @i());
                    @keyframes scale-up { 0%, 95.01%, 100% { transform: translateZ(0)
                    rotate(0); opacity: 0; } 10% { opacity: 1; } 95% { transform:
                    translateZ(35vmin) rotateZ(@var(--deg)); } } }
                </css-doodle>
            </div>
        </div>
    </div>
</template>

<style  scoped>
.sayhiWrapper {
    background: #e74;
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
    flex-direction: column;
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
    /* justify-content: space-between; */
    color:#fff;
}

.email{
    font-size: 50px;
    word-break:break-word;
    margin-bottom: 50px;
}

.introduction{
    flex-grow: 1;
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-basis: 100px;
}
.decor{
    height: 3px;
    width: 100px;
    background:#fff;
    margin-bottom: 50px;
}


.name{
    margin-bottom: 50px;

}

.links a{
    display: inline-block;
    font-size: 35px;
}
</style>