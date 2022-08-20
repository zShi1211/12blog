<script setup lang='ts'>
import { getAllLetter } from '@/api/letter';
import { watchEffect } from 'vue';


watchEffect(() => {
    const res: any = getAllLetter({
    });
    console.log(res);
})
</script>

<template>
    <div>
111
    </div>
</template>

<style  scoped>
</style>