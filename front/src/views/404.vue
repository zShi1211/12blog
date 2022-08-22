<script setup lang='ts'>
import Section from '@/components/Section.vue';
</script>

<template>
    <div class="notFoundWrapper">
        <Section>
            <div class="container">
                <img src="@/assets/img/notfound.png" alt="" />
                <div class="centent">
                    <p>你好像迷路了</p>
                    <p>
                        <router-link to="/" replace>回家</router-link>吧
                    </p>
                </div>
            </div>
        </Section>
    </div>
</template>

<style  scoped>
.notFoundWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}

img {
    width: 100%;
    max-width: 600px;
}

.centent {
    margin-top: 20px;
    color: #999;
    font-style: oblique;
    line-height: 1.5;

}

a {
    color: #0088cc;
    text-decoration: underline;
}
</style>