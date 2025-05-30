<script setup>
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, watch, ref, toRef } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['update:modelValue'])

const editor = ref(null)
const modelValueRef = toRef(props, 'modelValue')

watch(modelValueRef, (new_val) => {
  // HTML
  const isSame = editor.value.getHTML() === new_val

  // JSON
  // const isSame = JSON.stringify(editor.value.getJSON()) === JSON.stringify(new_val)

  if (isSame) {
    return
  }

  editor.value.commands.setContent(new_val, false)
})

onMounted(() => {
  editor.value = new Editor({
    extensions: [StarterKit],
    content: props.modelValue,
    onUpdate: () => {
      // HTML
      emits('update:modelValue', editor.value.getHTML())

      // JSON
      // this.$emit('update:modelValue', this.editor.getJSON())
    }
  })
})

onBeforeUnmount(() => {
  editor.value.destroy()
})
</script>

<template>
  <EditorContent :editor="editor" />
</template>

<style lang="css">
.tiptap {
  outline: none;
}
/* Basic editor styles */
.tiptap:first-child {
  margin-top: 0;
}

/* List styles */
.tiptap ul,
.tiptap ol {
  padding: 0 1rem;
  margin: 1.25rem 1rem 1.25rem 0.4rem;
}

.tiptap ul li p,
.tiptap ol li p {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

/* Heading styles */
.tiptap h1,
.tiptap h2,
.tiptap h3,
.tiptap h4,
.tiptap h5,
.tiptap h6 {
  line-height: 1.1;
  margin-top: 1.5rem;
  text-wrap: pretty;
}

.tiptap h1,
.tiptap h2 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.tiptap h1 {
  font-size: 1.4rem;
}

.tiptap h2 {
  font-size: 1.2rem;
}

.tiptap h3 {
  font-size: 1.1rem;
}

.tiptap h4,
.tiptap h5,
.tiptap h6 {
  font-size: 1rem;
}

/* Code and preformatted text styles */
.tiptap code {
  background-color: var(--purple-light);
  border-radius: 0.4rem;
  color: var(--black);
  font-size: 0.85rem;
  padding: 0.25em 0.3em;
}

.tiptap pre {
  background: var(--black);
  border-radius: 0.5rem;
  color: var(--white);
  font-family: 'JetBrainsMono', monospace;
  margin: 1.5rem 0;
  padding: 0.75rem 1rem;
}

.tiptap pre code {
  background: none;
  color: inherit;
  font-size: 0.8rem;
  padding: 0;
}

.tiptap blockquote {
  border-left: 3px solid var(--gray-3);
  margin: 1.5rem 0;
  padding-left: 1rem;
}

.tiptap hr {
  border: none;
  border-top: 1px solid var(--gray-2);
  margin: 2rem 0;
}
</style>
