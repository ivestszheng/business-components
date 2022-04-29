<template>
  <div>
    <div class="title-container title-container-bg">
      <p class="title" :class="{ titleMarquee: isTitleMarquee }" :text="title">{{ title }}</p>
    </div>
    <div class="list-container" :style="`height: ${height}`">
      <div id="con1" ref="list" :class="{ anim: animate == true }" @mouseenter="mEnter" @mouseleave="mLeave">
        <div v-for="(item, index) in list" :key="index" class="content">
          <div class="level">{{ item.label }}</div>
          <div class="text" @click="getContent(item)">
            <p
              :text="item.value"
              class="text-content"
              :class="{ contentMarquee: isContentMarquee }"
              @mouseenter="contentEnter"
              @mouseleave="contentLeave"
            >
              {{ item.value }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseRollingUp',
  props: {
    title: {
      type: String,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
    height: {
      type: String,
      default: '500px',
    },
    rowLen: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      animate: false,
      timer: null,
      isTitleMarquee: false,
      isContentMarquee: false,
    };
  },
  mounted() {
    this.startScroll();
  },
  destroyed() {
    clearInterval(this.timer); // 防止造成不可预测的 bug
  },
  methods: {
    scroll() {
      // 建一个方法
      const { list } = this.$refs;
      list.style.marginTop = '-36px'; // 设置style样式 向上移动36px
      this.animate = !this.animate; //
      setTimeout(() => {
        const newList = this.list;
        newList.push(this.list[0]);
        newList.shift();
        this.$emit('update:list', newList);
        list.style.marginTop = '0px'; // 设置style样式 向上移动30px 再回到原位
        this.animate = !this.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500);
    },
    contentEnter(mouseEvent) {
      const {
        target: { clientWidth, scrollWidth },
      } = mouseEvent;
      this.isContentMarquee = scrollWidth > clientWidth;
    },
    contentLeave() {
      this.isContentMarquee = false;
    },
    mEnter() {
      clearInterval(this.timer); // 鼠标移入清除定时器
      this.timer = null;
    },
    mLeave() {
      this.startScroll(); // 鼠标离开启动定时器，执行 scroll
    },
    startScroll() {
      if (this.timer === null && this.list.length > this.rowLen) {
        this.timer = setInterval(this.scroll, 2000);
      }
    },
    getContent(item) {
      this.$emit('contentClick', item);
    },
  },
};
</script>

<style lang="less" scoped>
// 实现内容无缝跑马灯效果
@genDistance: -120%;
.titleMarquee {
  position: relative;
  width: fit-content;
  animation: marqueeAnim 6s linear infinite;
  &::after {
    position: absolute;
    right: @genDistance;
    content: attr(text);
  }
}

@keyframes marqueeAnim {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(@genDistance);
  }
}
// 跑马灯结束
.list-container {
  overflow: hidden;
  transition: all 0.5s;
}
.anim {
  transition: all 0.5s;
}
#con1 li {
  list-style: none;
  line-height: 34px;
  height: 34px;
}
.content {
  color: #fff;
  display: flex;
  margin: 2px 0;
  .level {
    font-size: 20px;
    box-sizing: border-box;
    width: 36px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-image: linear-gradient(
      270deg,
      rgba(70, 142, 253, 0.1) 0%,
      rgba(66, 137, 252, 0.14) 15%,
      rgba(57, 125, 250, 0.24) 39%,
      rgba(43, 105, 247, 0.4) 69%,
      rgba(26, 82, 244, 0.6) 100%
    );
    margin-right: 10px;
  }
  .text {
    font-size: 20px;
    width: 100%;
    height: 34px;
    line-height: 34px;
    width: 100%;
    background-color: #010138;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    cursor: pointer;
    &:hover:extend(.title-container) {
      background: #010138;
    }
    &-content {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.contentMarquee {
  &:hover:extend(.titleMarquee) {
    width: fit-content;
    overflow: initial;
    text-overflow: unset;
  }
  &::after {
    position: absolute;
    right: @genDistance;
    content: attr(text);
    z-index: -1; // 防止文字过长时与前面的文字重叠
  }
}
.title-container {
  display: flex;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  &-bg {
    height: 40px;
    background-image: linear-gradient(
      270deg,
      rgba(70, 142, 253, 0.1) 0%,
      rgba(66, 137, 252, 0.14) 15%,
      rgba(57, 125, 250, 0.24) 39%,
      rgba(43, 105, 247, 0.4) 69%,
      rgba(26, 82, 244, 0.6) 100%
    );
  }
}

.title {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  color: #ffffff;
}
</style>
