import { onBeforeUnmount, onMounted } from "vue";

export const useClickOutside = (el: any , cb: () => void) => {

    if (!el.value) return;

    let listener = (e: any) => {
        if (e.target === el.value || e.composePath.includes(el.value)) {
            return
        }

        if (typeof cb === 'function') {
            cb()
        }
    }

    onMounted(() => {
        window.addEventListener('click', listener)
    })
    onBeforeUnmount(() => {
        window.removeEventListener('click', listener)
    })

    return {
        listener
    }

}