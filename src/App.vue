<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
/* @import url('https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css'); */
@import '../src/assets/styles/fonts.css';

* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: inherit;
}
ul,
ol {
  list-style: none;
}
h1,
h2,
h3,
h4 {
  font: inherit;
}
input,
select,
button {
  font: inherit;
}
html,
body {
  height: 100%;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  overflow:hidden;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  height: 100%;
  overflow: hidden;
}
</style>
