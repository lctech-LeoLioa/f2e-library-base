<template>
  <div v-if="isDEV" v-html="sheetHtml"></div>
</template>

<script setup lang="ts">
import { useHeadStyleDev } from '@/service/utils/useHeadStyleDev'

defineOptions({
  name: 'DevStyleComponent',
})

const isDEV = import.meta.env.DEV
const { sheetHtml } = useHeadStyleDev()
</script>

<style lang="scss" scoped></style>
