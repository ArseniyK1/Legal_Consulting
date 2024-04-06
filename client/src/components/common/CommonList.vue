<template>
  <div class="q-mx-auto relative-position">
    <q-scroll-area
      id="scroll-area-with-virtual-scroll-1"
      :bar-style="barStyle"
      :style="'height: calc(100vh - ' + subtractHeight + 'px)'"
      :thumb-style="thumbStyle"
    >
      <q-virtual-scroll
        class="scroll full-width"
        :items="items"
        :virtual-scroll-item-size="scrollItemSize"
        @virtual-scroll="onScroll"
        bordered="bordered"
        scroll-target="#scroll-area-with-virtual-scroll-1 &gt; .scroll"
        separator="separator"
      >
        <template v-slot="{ item, index }">
          <q-item
            class="full-width bg-primary"
            :clickable="clickable"
            :id="`id${item.id}`"
            :key="index"
            :style="itemStyle"
          >
            <slot :item="item"></slot>
          </q-item>
        </template>
      </q-virtual-scroll>
      <div class="full-width text-center" v-if="isLoading">
        <q-spinner-dots color="primary" size="40px"></q-spinner-dots>
      </div>
    </q-scroll-area>
  </div>
</template>

<script setup="props, emit">
import { useQuasar } from "quasar";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  scrollItemSize: {
    type: Number,
    default: 32,
  },
  items: {
    type: Array,
    default: () => [],
  },
  openPath: {
    type: String,
    default: "",
  },
  query: {
    type: String,
    default: "",
  },
  parent: {
    type: String,
    default: "",
  },
  forceReload: {
    type: String,
    default: "",
  },
  addPayload: {
    type: Object,
    default: () => ({}),
  },
  hideBtn: {
    type: Boolean,
    default: false,
  },
  isTree: {
    type: Boolean,
    default: false,
  },
  topMargin: {
    type: String,
    default: "0",
  },
  useFab: {
    type: Boolean,
    default: false,
  },
  fabParam: {
    type: Array,
    default: () => [],
  },
  itemStyle: {
    type: String,
    default: "",
  },
  clickable: {
    type: Boolean,
    default: true,
  },
  subtractHeight: {
    type: Number,
    default: 110,
  },
});

const emits = defineEmits(["onScroll"]);

const router = useRouter();
const currentRoute = useRoute();
const quasar = useQuasar();

const isLoading = ref(false);

const thumbStyle = {
  right: "3px",
  borderRadius: "8px",
  backgroundColor: "#251e1e",
  width: "6px",
  opacity: 0.75,
};
const barStyle = {
  right: "2px",
  borderRadius: "14px",
  backgroundColor: "#382727",
  width: "8px",
  opacity: 0.2,
  marginTop: "0",
  marginBottom: "0",
  paddingTop: "3px",
  paddingBottom: "3px",
};

const onScroll = ({ index, to, direction }) => {
  if (index === to && direction === "increase") {
    emits("onScroll");
  }
};
</script>

<style scoped>
.absolute-right-bottom {
  position: absolute;
  right: 20px;
  bottom: 20px;
}
</style>
