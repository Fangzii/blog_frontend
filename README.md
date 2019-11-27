
<h1 align="center">Fang's Blog</h1>

<div align="center">
Fork于
<a href="https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn/" target="_blank">Ant Design of Vue</a>
</div>


- 首页:  [Fang's Blog](http://fangzicheng.cn)


环境和依赖
----

- node
- yarn
- webpack
- eslint
- @vue/cli ~3
- [ant-design-vue](https://github.com/vueComponent/ant-design-vue) - Ant Design Of Vue 实现
- [vue-draggable-resizable](https://github.com/mauricius/vue-draggable-resizable) - Vue 可拖动元素

> 请注意，我们强烈建议本项目使用 [Yarn](https://yarnpkg.com/) 包管理工具，这样可以与本项目演示站所加载完全相同的依赖版本 (yarn.lock) 。由于我们没有对依赖进行强制的版本控制，采用非 yarn 包管理进行引入时，可能由于 Pro 所依赖的库已经升级版本，而引入了新版本所照成的问题。作者可能会由于时间问题无法及时排查而导致您采用本项目作为基项目而出现问题。



项目下载和运行
----

- 拉取项目代码
```bash
git clone https://github.com/Fangzii/blog-frontend.git
cd blog-frontend
```

- 安装依赖
```
yarn install
```

- 开发模式运行
```
yarn run serve
```

- 编译项目
```
yarn run build
```

- Lints and fixes files
```
yarn run lint
```


> 此项目是基于 Ant Design of Vue 来做的一个博客系统，以及自己想造的一些轮子和想实现的交互，业余时间折腾

已实现功能
----

- 搜索功能
- 博客文章
- 留言功能
- 添加属性

待实现功能
----

- 接入第三方登入
- 搜索功能拓展
- 菜单栏改版
