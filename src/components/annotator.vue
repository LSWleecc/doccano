<template>
  <div @click="setSelectedRange">
         <span v-for="r in chunks"
               v-bind:class="{tag: id2label[r.label].text_color}"
               v-bind:style="{ color: id2label[r.label].text_color, backgroundColor: id2label[r.label].background_color }"
         >{{ text.slice(r.start_offset, r.end_offset) }}<button class="delete is-small"
                                                                v-if="id2label[r.label].text_color" @click="removeLabel(r)"></button>
         </span>
  </div>
</template>
<script type="text/javascript">
  export default {
    props: {
      labels: {
        type: Array, // [{id: Integer, color: String, text: String}]
        default: () => [],
      },
      text: {
        type: String,
        default: '',
      },
      entityPositions: {
        type: Array, // [{'startOffset': 10, 'endOffset': 15, 'label_id': 1}]
        default: () => [],
      },
    },

    data() {
      return {
        startOffset: 0,
        endOffset: 0,
      };
    },

    computed: {
      sortedEntityPositions() {
        /* eslint-disable vue/no-side-effects-in-computed-properties */
        this.entityPositions = this.entityPositions.sort((a, b) => a.start_offset - b.start_offset);
        return this.entityPositions;
        /* eslint-enable vue/no-side-effects-in-computed-properties */
      },

      chunks() {
        const res = [];
        let left = 0;
        for (let i = 0; i < this.sortedEntityPositions.length; i++) {
          const e = this.sortedEntityPositions[i];
          const l = this.makeLabel(left, e.start_offset);
          res.push(l);
          res.push(e);
          left = e.end_offset;
        }
        const l = this.makeLabel(left, this.text.length);
        res.push(l);

        return res;
      },

      id2label() {
        const id2label = {};
        // default value;
        id2label[-1] = {
          text_color: '',
          background_color: '',
        };
        for (let i = 0; i < this.labels.length; i++) {
          const label = this.labels[i];
          id2label[label.id] = label;
        }
        return id2label;
      },
    },

    watch: {
      entityPositions() {
        console.log()
//        this.resetRange();
      },
    },

    methods: {
      setSelectedRange() {
        let sel = window.getSelection && window.getSelection();
        let start;
        let end;
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          const preSelectionRange = range.cloneRange();
          preSelectionRange.selectNodeContents(this.$el);
          preSelectionRange.setEnd(range.startContainer, range.startOffset);
          start = preSelectionRange.toString().length;
          end = start + range.toString().length;
        } else if (document.selection && document.selection.type !== 'Control') {
          const selectedTextRange = document.selection.createRange();
          const preSelectionTextRange = document.body.createTextRange();
          preSelectionTextRange.moveToElementText(this.$el);
          preSelectionTextRange.setEndPoint('EndToStart', selectedTextRange);
          start = preSelectionTextRange.text.length;
          end = start + selectedTextRange.text.length;
        }
        this.startOffset = start;
        this.endOffset = end;
//        console.log(start, end); // eslint-disable-line no-console
        if(this.endOffset - this.startOffset > 0){
          this.$emit('getPointRange',start,end)
        }

      },

      validRange() {
        if (this.startOffset === this.endOffset) {
          return false;
        }
        if (this.startOffset > this.text.length || this.endOffset > this.text.length) {
          return false;
        }
        if (this.startOffset < 0 || this.endOffset < 0) {
          return false;
        }
        for (let i = 0; i < this.entityPositions.length; i++) {
          const e = this.entityPositions[i];
          if ((e.start_offset <= this.startOffset) && (this.startOffset <= e.end_offset)) {
            return false;
          }
          if ((e.start_offset <= this.endOffset) && (this.endOffset <= e.end_offset)) {
            return false;
          }
        }
        return true;
      },

      resetRange() {
        this.startOffset = 0;
        this.endOffset = 0;
      },

      addLabel(labelId) {
        if (this.validRange()) {
          const label = {
            start_offset: this.startOffset,
            end_offset: this.endOffset,
            label: labelId,
          };
          this.$emit('add-label', label);
        }
      },

      removeLabel(index) {
        this.$emit('remove-label', index);
      },

      makeLabel(startOffset, endOffset) {
        const label = {
          id: 0,
          label: -1,
          start_offset: startOffset,
          end_offset: endOffset,
        };
        return label;
      },
    },
  }
</script>
<style scoped>
  .tag{
    align-items: center;
    background-color: #f5f5f5;
    border-radius: 4px;
    color: #4a4a4a;
    display: inline-flex;
    font-size: .75rem;
    height: 2em;
    justify-content: center;
    line-height: 1.5;
    padding-left: .75em;
    padding-right: .75em;
    white-space: nowrap;
  }
  .tag:not(body) .delete{
    margin-left: .25rem;
    margin-right: -.375rem;
  }
  .is-small.delete, .is-small.modal-close{
    height: 16px;
    max-height: 16px;
    max-width: 16px;
    min-height: 16px;
    min-width: 16px;
    width: 16px;
  }
  .delete, .modal-close{
    -webkit-appearance: none;
    background-color: rgba(10,10,10,.2);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    flex-grow: 0;
    flex-shrink: 0;
    font-size: 0;
    height: 20px;
    max-height: 20px;
    max-width: 20px;
    min-height: 20px;
    min-width: 20px;
    outline: 0;
    position: relative;
    vertical-align: top;
    width: 20px;
  }
  .delete::before, .modal-close::before{
    height: 2px;
    width: 60%;
  }
  .delete::after, .delete::before, .modal-close::after, .modal-close::before{
    background-color: #fff;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }
  .delete::after, .modal-close::after{
    height: 60%;
    width: 2px;
  }
  .delete::after, .delete::before, .modal-close::after, .modal-close::before{
    background-color: #fff;
    content: "";
    display: block;
    left: 50%;
    position: absolute;
    top: 50%;
    -webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
    transform: translateX(-50%) translateY(-50%) rotate(45deg);
    -webkit-transform-origin: center center;
    transform-origin: center center;
  }
</style>
