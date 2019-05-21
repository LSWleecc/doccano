<template>
  <div class="aside">
    <div class="main">
      <a href="#" class="item" v-for="(doc, index) in docs" v-bind:class="{ active: index == pageNumber }" v-on:click="editPageNumber(index)"
         v-bind:data-preview-id="index">
          <span class="icon">
            <i class="fa fa-check" v-show="annotations[index] && annotations[index].length"></i>
          </span>
        <span class="name">{{doc.text.slice(0, 60)}}...</span>
      </a>
    </div>
  </div>
</template>
<script type="text/javascript">
  import annotationMixin from '../../mixins/demo_mixin';
  import {mapState , mapActions} from 'vuex'
  export default {
    mixins: [annotationMixin],
    computed: {
      ...mapState({
        pageNumber : state => state.pageNumber,
        docs: state => state.docs,
        annotations: state => state.annotations
      })
    },
    methods: {
      ...mapActions(['EDIT_PAGE_NUMBER']),
      editPageNumber(index){
        this.$store.dispatch('editPageNumber',index)
      }
    }
  }
</script>
<style scoped>
  .aside{
    display: block;
    background-color: #2a2e2f;
    border-right: 1px solid #DEDEDE;
    flex: none;
    width: 260px;
  }
  .aside .main{
    padding: 20px 40px;
    color: #6F7B7E;
  }
  .aside .main .item.active{
    background-color: #5a5e5f;
    margin: 0 -50px;
    padding-left: 40px;
  }
  .aside .main .item{
    display: flex;
    padding: 10px 20px 10px 40px;
    margin: 0 -50px;
    color: #6F7B7E;
  }
  .main a{
    cursor: pointer;
    text-decoration: none;
  }
  .aside .main .name{
    font-size: 15px;
    color: #f3f3f3;
    font-weight: 500;
  }
</style>
