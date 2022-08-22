<script setup lang='ts'>

</script>

<template>
    <div class="sectionwrapper">
        <slot />
    </div>
</template>

<style  scoped>
.sectionwrapper {
  width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 992px) {
  .sectionwrapper {
    width: 720px;
  }
}

@media (max-width: 768px) {
  .sectionwrapper {
    width: 540px;
  }
}
@media (max-width: 576px) {
  .sectionwrapper {
    width: 100%;
    padding: 0 15px;
  }
}
</style>