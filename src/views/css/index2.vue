<template>
  <div class="container">
    <div class="wrap">
      <p class="i0">江北水城</p>
      <p class="i1">聊城</p>
      <p class="i2">水上之都</p>
      <p class="i3">强的狠！</p>
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
      <div class="g-group">
        <div class="item item-right"></div>
        <div class="item item-left"></div>
        <div class="item item-top"></div>
        <div class="item item-bottom"></div>
        <div class="item item-middle"></div>
      </div>
    </div>
    <div class="shape-wrapper">
      <button class="btn1">
        <svg width="300" height="140" OK xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="30" class="rect" height="80px" width="240px"></rect>
        </svg>
        <span class="hover-text">HOVER ME</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
<style lang="less" scoped>
  @speed: 8s;
  @wordCount: 4;

  .container {
    padding: 10px;
  }

  .wrap {
    background: #000;
    font-family: 'Montserrat', sans-serif;
    color: #fff;
    font-size: 60px;
    height: 300px;
    filter: contrast(15);

    p {
      position: absolute;
      top: 50%;
      z-index: 1;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: change @speed infinite ease-in-out;
      .loop();
    }
  }

  .loop(@i: 1) when (@i <5) {
    .loop(@i + 1); // 递归调用自身

    &:nth-child(@{i}) {
      animation-delay: (@speed / (@wordCount + 1) * @i) - @speed;
    }

    // .i@{i} {
    //   animation-delay: (@speed / (@wordCount + 1) * @i) - @speed;
    // }
  }

  @keyframes change {
    0%,
    5%,
    100% {
      filter: blur(0px);
      opacity: 1;
    }

    50%,
    80% {
      filter: blur(80px);
      opacity: 0;
    }
  }
</style>
<style lang="scss" scoped>
  @function randomNum($max, $min: 0, $u: 1) {
    @return ($min + random($max)) * $u;
  }

  @function randomColor() {
    @return rgb(randomNum(255), randomNum(255), randomNum(255));
  }

  @function shadowSet($maxWidth, $maxHeight, $count) {
    $shadow: 0 0 0 0 randomColor();

    @for $i from 0 through $count {
      $x: #{random(10000) / 10000 * $maxWidth};
      $y: #{random(10000) / 10000 * $maxHeight};

      $shadow: $shadow, #{$x} #{$y} 0 #{random(5)}px randomColor();
    }

    @return $shadow;
  }
  .wrap {
    perspective: 5px;
    perspective-origin: 50% 50%;
    position: relative;
    animation: hueRotate 20s infinite linear;
    overflow: hidden;
  }

  .g-group {
    position: absolute;
    width: 100vw;
    height: 100vh;
    left: 0vw;
    top: 0vh;
    transform-style: preserve-3d;
    animation: move 8s infinite linear;
  }

  .g-group:nth-child(2) {
    animation: move 8s infinite linear;
    animation-delay: -4s;
  }

  .item {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(#05040a, #03010e);
    background-size: cover;
    opacity: 1;
    animation: fade 8s infinite linear;
    animation-delay: 0;
  }

  .item::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 1px;
    height: 1px;
    border-radius: 50%;
    box-shadow: shadowSet(100vw, 100vh, 500);
  }

  .g-group:nth-child(2) .item {
    animation-delay: -4s;
  }

  .item-right {
    transform: rotateY(90deg) translateZ(500px);
  }

  .item-left {
    transform: rotateY(-90deg) translateZ(500px);
  }

  .item-top {
    transform: rotateX(90deg) translateZ(500px);
  }

  .item-bottom {
    transform: rotateX(-90deg) translateZ(500px);
  }

  .item-middle {
    transform: rotateX(180deg) translateZ(1000px);
  }

  @keyframes move {
    0% {
      transform: translateZ(-200px) rotate(0deg);
    }

    100% {
      transform: translateZ(150px) rotate(0deg);
    }
  }

  @keyframes fade {
    0% {
      opacity: 0.2;
    }

    25%,
    60% {
      opacity: 1;
    }

    100% {
      opacity: 0.2;
    }
  }

  @keyframes hueRotate {
    0% {
      filter: hue-rotate(0);
    }

    100% {
      filter: hue-rotate(360deg);
    }
  }
</style>
