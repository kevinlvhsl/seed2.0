<template lang="jade">
a.back-button(v-bind:href="indexPageUrl")
</template>

<script>
// 返回按钮组件
export default {
    props: ['redirectUrl'],
    data () {
        return {
            indexPageUrl : Intv.config.baseUrl + 'index.html#/wechat'
        }
    },
    ready () {
        if (this.redirectUrl) {
            this.indexPageUrl = Intv.config.baseUrl + 'index.html#/' + this.redirectUrl
        }
    }
}
</script>