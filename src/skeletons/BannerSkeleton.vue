<template>
  <Skeleton>
    <div class="relative w-full h-screen">
      <div class="absolute inset-0 flex items-center px-12">
        <div class="w-[40%] space-y-6">
          <div class="w-4/6 font-bold h-8"></div>

          <div class="w-full text-lg h-20"></div>

          <div class="flex items-center space-x-2">
            <button-skeleton />
            <button-skeleton />
          </div>
        </div>
      </div>
    </div>
  </Skeleton>
</template>

<script>
import Skeleton from "../components/Skeleton/index.vue";
import ButtonSkeleton from "./ButtonSkeleton.vue";

export default {
  components: {
    Skeleton,
    ButtonSkeleton,
  },
};
</script>

<style>
</style>