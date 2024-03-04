小程序的根页面标签为 `page`， 类似于 html 中的 `body` 标签


如果想让页面中某个元素占据剩余空间，那么整体可以采用flex布局。
下面例子中 container的高度为800px， box1的高度为200px，如果想让box2占据剩余高度，可以设置 `flex: 1`属性，让其占据剩余布局轴向空间
```html
    <div class="container">
        <div class="box1"></div>
        <div class="box2"></div>
    </div>


     <style>
        .container {
            background-color: dodgerblue;
            height: 800px;
            display: flex;
            flex-direction: column;
        }

        .box1 {
            height: 200px;
            width: 200px;
            background-color: aquamarine;
        }


        .box2 {
            background-color: cadetblue;
            flex: 1;
        }
    </style>
```


并行发送多个请求
```js
onMounted(async () => {
    await Promise.all([getBannerData(), getCategoryData(), getHotData()])
})
```

组件中如果包含状态控制变量，例如loading，需要在网络请求后关闭，不能写成如下方式
```js
// 这样的方式为异步执行，在执行到getCategoryData方法时，不会阻塞，而是继续往下执行，此时状态改变后网路请求可能还没完成
onMounted(() => {
    loading.value = true;
    getCategoryData();
    loading.value = false;
})
```
需要写成如下方式
```js
// 这种方式为同步执行, 在执行到getCategoryData方法时会等待网络请求返回
onMounted(async () => {
    loading.value = true;
    await getCategoryData();
    loading.value = false;
})
```


页面数据之间的通信与渲染：
1. 确认订单页面展示收货地址，点击收货地址可以跳转到另外一个页面展示收货地址列表，然后选中某一个列表项后跳转回确认订单页面，此时确认订单页面的数据同时进行了修改。（用状态管理工具）
2. 组件内部维护数据时，父组件通过ref调用子组件，并且子组件需要暴露对应的方法



uniapp中获取页面参数方式
```js
defineProps({
    type: string
})
```


[uniapp 中引入 iconfont 报错问题解决方法](https://ask.dcloud.net.cn/article/35443)


响应式原理的本质是 **函数与数据的关联**，同时还需要满足一下三点要求：
1. 被监控的函数（render 模板代码、computed回调、watchEffect、watch）
2. 函数运行期间用到了响应式数据（ref,reactive）
3. 响应式数据的变化导致函数重新运行

```js
const props = defineProps({
    count: Number
})

// 1 此处为数据和数据的关联，本质不满足
const doubleCount = ref(props.count * 2)

// 2 可以，watchEffect内函数与数据关联
const doubleCount = ref(0);
watchEffect(() => {
    doubleCount.value = props.count * 2;
})

// 3 监控函数运行期间没有用到响应式数据 （watchEffect 内函数的 count 不是响应式数据）
function useDouble(count) {
    const doubleCount = ref(count * 2);
    watchEffect(() => {
        doubleCount.value = count * 2;
    });
    return doubleCount;

}

const doubleCount = useDouble(props.count);
```


uniapp 中页面传参（接收上一个页面的参数）可以通过defineProps进行接收和处理


时间动画（交互动画技巧）: 利用 动画延时，可以通过用户交互来播放动画效果

```html
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .box {
        --delay: -0s;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: red;
        animation: goto 1s var(--delay) linear forwards paused;
    }

    @keyframes goto {
        100% {
            transform: translate(800px);
        }
    }


</style>

<body>
    <div class="box"></div>

    <input id="range" type="range" min="0" max="1" step="0.01" value="0" />
</body>

<script>
    var box = document.querySelector(".box");
    var range = document.querySelector("#range");
    range.addEventListener("input", (e) => {
        let val = range.value;
        box.style.setProperty("--delay", `-${val}s`);
    })
</script>
```