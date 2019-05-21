<template>
  <div>
    <div class="demo">
      <SlideBar></SlideBar>
      <div class="card">
        <header class="card-header">
          <div class="card-header-title has-background-royalblue" style="padding:1.5rem;">
            <div class="field is-grouped is-grouped-multiline">
              <div class="control" v-for="label in labels">
                <div class="tags has-addons">
                  <a class="tag is-medium" v-bind:style="{ color: label.text_color, backgroundColor: label.background_color }" v-on:click="annotate(label.id)"
                     v-shortkey.once="[ label.shortcut ]" @shortkey="annotate(label.id)">
                    {{label.text}}
                  </a>
                  <span class="tag is-medium">{{label.shortcut}}</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div class="card-content">
          <div class="content" v-if="docs[pageNumber] && annotations[pageNumber]">
            <annotator @getPointRange="getRange" ref="annotator" v-bind:labels="labels" v-bind:entity-positions="annotations[pageNumber]" v-bind:text="docs[pageNumber].text"
                       @remove-label="removeLabel" @add-label="addLabel"></annotator>
          </div>
        </div>
        <div class="level mt30">
          <a class="button level-left" style="cursor: pointer" v-on:click="prevPages" v-shortkey="{prev1: ['ctrl', 'p'], prev2: ['arrowup'], prev3: ['arrowleft']}"
             @shortkey="prevPages">
        <span class="icon">
          <i class="fas fa-chevron-left"></i>
        </span>
            <span>上一页</span>
          </a>

          <a class="button level-right" style="cursor: pointer" v-on:click="nextPage" v-shortkey="{next1: ['ctrl', 'n'], next2: ['arrowdown'], next3: ['arrowright']}"
             @shortkey="nextPage">
            <span>下一页</span>
            <span class="icon">
          <i class="fas fa-chevron-right"></i>
        </span>
          </a>
        </div>
      </div>
      <div class="selectClassify">
        <el-dialog
          title="点击添加标签"
          :close-on-click-modal = "true"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose">
          <div class="field is-grouped is-grouped-multiline">
            <div class="control" v-for="label in labels">
              <div class="tags has-addons"  @click="dialogVisible = false">
                <a class="tag is-medium" v-bind:style="{ color: label.text_color, backgroundColor: label.background_color }" v-on:click="annotate(label.id)"
                   v-shortkey.once="[ label.shortcut ]" @shortkey="annotate(label.id)">
                  {{label.text}}
                </a>
                <span class="tag is-medium">{{label.shortcut}}</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import annotationMixin from '../../mixins/demo_mixin';
  import {mapState , mapActions} from 'vuex'
  export default {
    name: 'Msit',
    mixins: [annotationMixin],
    data(){
      return{
        dialogVisible: false,
        labels: [
          {
            id: 1,
            text: 'Person',
            shortcut: 'p',
            background_color: '#209cee',
            text_color: '#ffffff',
          },
          {
            id: 2,
            text: 'Loc',
            shortcut: 'l',
            background_color: '#ffcc00',
            text_color: '#333333',
          },
          {
            id: 3,
            text: 'Org',
            shortcut: 'o',
            background_color: '#333333',
            text_color: '#ffffff',
          },
          {
            id: 4,
            text: 'Event',
            shortcut: 'e',
            background_color: '#33cc99',
            text_color: '#ffffff',
          },
          {
            id: 5,
            text: 'Date',
            shortcut: 'd',
            background_color: '#ff3333',
            text_color: '#ffffff',
          },
          {
            id: 6,
            text: 'Other',
            shortcut: 'z',
            background_color: '#9933ff',
            text_color: '#ffffff',
          },
        ]
      }
    },
    computed: {
      ...mapState({
        pageNumber : state => state.pageNumber,
        docs: state => state.docs,
        annotations: state => state.annotations
      })
    },
    methods: {
      nextPage(){
        this.$store.dispatch('nextPages')
      },
      ...mapActions(['prevPages']),
      removeLabel(index){
       this.$store.dispatch('removeLabel', index)
      },
      annotate(labelId) {
        this.$refs.annotator.addLabel(labelId);
        this.dialogVisible = false
      },

      addLabel(labelId) {
        this.annotations[this.pageNumber].push(labelId);
      },
      getRange(start, end){
        console.log(start, end)
        this.dialogVisible = true
      },
      handleClose(done) {
        this.dialogVisible = false
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>
  .demo{
    display: flex;
  }
  .card {
    background-color: #fff;
    box-shadow: 0 2px 3px rgba(10,10,10,.1), 0 0 0 1px rgba(10,10,10,.1);
    color: #4a4a4a;
    max-width: 100%;
    position: relative;
    width: 50%;
  }
  .card .card-header {
    align-items: stretch;
    box-shadow: 0 1px 2px rgba(10,10,10,.1);
    display: flex;
  }
  .card-header-title{
    align-items: center;
    color: #363636;
    display: flex;
    flex-grow: 1;
    font-weight: 700;
    padding: 1.5rem;
  }
  .has-background-royalblue {
    background-color: royalblue !important;
  }
  .field.is-grouped{
    display: flex;
    justify-content: flex-start;
  }
  .field.is-grouped.is-grouped-multiline{
    flex-wrap: wrap;
  }
  .field.is-grouped.is-grouped-multiline:last-child{
    margin-bottom: -.75rem;
  }
  .control{
    font-size: 1rem;
    position: relative;
    text-align: left;
    height: 32px;
  }
  .field.is-grouped>.control{
    flex-shrink: 0;
  }
  .field.is-grouped>.control:not(:last-child){
    margin-right: .75rem;
  }
  .field.is-grouped.is-grouped-multiline>.control:last-child, .field.is-grouped.is-grouped-multiline>.control:not(:last-child){
    margin-bottom: .75rem;
  }
  .tags{
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding: 10px;
    cursor: pointer;
  }
  .tags:last-child{
    margin-bottom: -.5rem;
  }
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
  .tags.has-addons .tag:not(:last-child){
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .tags.has-addons .tag:not(:first-child){
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
  .card-content{
    padding: 1.5rem;
  }
  .content{
    font-size: 16pt;
    line-height: 250%;
  }
  .content .tag{
    font-size: 16pt;
    height: 1.5em;
    padding-left: .5em;
    padding-right: .5em;
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->

