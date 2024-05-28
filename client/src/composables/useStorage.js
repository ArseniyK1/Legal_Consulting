import { toValue, tryOnMounted } from "src/composables/utils";
import { ref, shallowRef, watch } from "vue";

/**
 * Набор заготовленных сериализаторов
 */
const StorageSerializers = {
  boolean: {
    read: (v) => v === "true",
    write: (v) => String(v),
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v),
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v),
  },
  any: {
    read: (v) => v,
    write: (v) => String(v),
  },
  string: {
    read: (v) => v,
    write: (v) => String(v),
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries())),
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v)),
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString(),
  },
};

/**
 * @typedef Serializer
 * @type {object}
 * @prop {function} read
 * @prop {function} write
 */
/**
 * @typedef Options
 * @type {object}
 * @prop {boolean} deep
 * @prop {boolean} writeDefaults
 * @prop {boolean} reassignMode
 * @prop {(o: any, e: any) => boolean} preventFromUpdate
 * @prop {shallowRef} shallowRef
 * @prop {(e: any) => {}} onError
 * @prop {Serializer} serializer
 */
/**
 * Возвращает рективную переменную, изменения которой автоматически синхронизирутся с `Storage`
 * @param {string} key Ключ для записи в `Storage`
 * @param {*} defaults Значение по умолчанию
 * @param {string} type Тип возращаемого значения
 * @param {Storage} storage Browser Storage Object: `localStorage`, `sessionStorage` и т.д.
 * @param {Options} options Настройки
 * @example
 * const data = useLocalStorage('my-data', {}, { onError: (e) => console.error('Произошла неизвестная ошибка', e) })
 * @example
 * const data = useLocalStorage('my-data', 'object', {}, localStorage, { writeDefaults: true, deep: false })
 * @returns {Ref<T>} Возращаемая реактивная переменная имеет тип, указанный в парамметре {@link type}
 */
export function useStorage(
  key,
  defaults,
  type = "any",
  storage = localStorage,
  options = {}
) {
  const {
    deep = true,
    writeDefaults = false,
    reassignMode = true,
    preventFromUpdate = (o, n) =>
      Array.isArray(o) && Array.isArray(n) && o.length === n.length,
    shallow,
    onError = (e) => {
      console.error(e);
    },
  } = options;
  const data = (shallow ? shallowRef : ref)(
    typeof defaults === "function" ? defaults() : defaults
  );
  if (!storage) return data;
  const rawInit = toValue(defaults);
  const serializer = options.serializer ?? StorageSerializers[type];
  function write(v) {
    try {
      const oldValue = storage.getItem(key);
      if (v === null) {
        storage.removeItem(key);
      } else {
        const serialized = serializer.write(v.value);
        if (oldValue !== serialized && !reassignMode && type === "object") {
          const old = serializer.read(oldValue);
          Object.assign(old, v.value);
          const oldSerialized = serializer.write(old);
          storage.setItem(key, oldSerialized);
        } else {
          storage.setItem(key, serialized);
        }
      }
    } catch (e) {
      onError(e);
    }
  }
  if (window) {
    tryOnMounted(() => {
      try {
        const oldValue = storage.getItem(key);
        const serialized = serializer.write(rawInit);
        if (writeDefaults) storage.setItem(key, serialized);
        if (oldValue === null && serialized) {
          storage.setItem(key, serialized);
        } else {
          data.value = serializer.read(oldValue);
        }
      } catch (e) {
        onError(e);
      }
    });
  }
  watch(
    () => data,
    (oldRef, newRef) => {
      if (preventFromUpdate(oldRef.value, newRef.value)) {
        write(newRef);
      }
    },
    { deep: deep }
  );

  return data;
}
