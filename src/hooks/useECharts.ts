import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';
import { tryOnUnmounted, useEventListener, useTimeoutFn } from '@vueuse/core';
import { unref, nextTick, watch, computed, ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import echarts from '@/utils/echarts';

export function useECharts(elRef: Ref<HTMLDivElement>, props = { theme: 'default' }) {
  let chartInstance: echarts.ECharts | null = null;
  const resize = () => {
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: 'quadraticIn',
      },
    });
  };
  let resizeFn: Fn = resize;
  const cacheOptions = ref({}) as Ref<EChartsOption>;

  resizeFn = useDebounceFn(resize, 200);

  const getOptions = computed(() => {
    if (props.theme !== 'dark') {
      return cacheOptions.value;
    }
    return {
      //   backgroundColor: 'transparent',
      ...cacheOptions.value,
    };
  });

  const initCharts = (t = props.theme) => {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);
    useEventListener(window, 'resize', resizeFn);
    useTimeoutFn(() => {
      resizeFn();
    }, 30);
  };

  const setOptions = (options: EChartsOption | any, clear = true) => {
    cacheOptions.value = options;
    console.log(cacheOptions);
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(props?.theme);

          if (!chartInstance) return;
        }
        clear && chartInstance?.clear();

        chartInstance?.setOption(unref(getOptions));
      }, 30);
    });
  };
  tryOnUnmounted(() => {
    if (!chartInstance) return;
    chartInstance.dispose();
    chartInstance = null;
  });

  const getInstance = (): echarts.ECharts | null => {
    if (!chartInstance) {
      initCharts(props?.theme);
    }
    return chartInstance;
  };
  return { initCharts, getOptions, chartInstance, setOptions, resize, echarts, getInstance };
}
