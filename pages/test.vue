<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-text-field label="Items count" v-model='genCount' type="number"></v-text-field>
      <div class="d-flex flex-column">

      <span>Generated in: {{genTime}}ms ({{genTime/1000}}s)</span>
      <span>Items length = {{items.length.toLocaleString('ru-RU')}}</span>
      </div>
      <v-btn @click="onClickGen(genCount)" class="mt-4">generate</v-btn>
    </v-col>
    <v-col cols="12" sm="8" md="6">
     
      <div class="d-flex flex-column">

      
      <span>Sort {{items.length.toLocaleString('ru-RU')}} length array</span>
      <span>Sorted in: {{sortTime}}ms ({{sortTime/1000}}s)</span>
      <span>First element: {{items[0]}}</span>
      <span>Last element: {{items[items.length-1]}}</span>
      </div>
      <v-btn @click="onClickSort(items)" class="mt-4">sort</v-btn>
    </v-col>
    <v-col cols="12" sm="8" md="6">
     
      <div class="d-flex flex-column">

      
      <v-text-field label="Find first and last index of" v-model="numToFind" type="number" min="1"></v-text-field>
      <v-select label="Sort type" v-model="searchType" :items="searchTypes"></v-select>
      <span>Found in: {{findTime}}ms ({{findTime/1000}}s)</span>
      <span>First index: {{foundIndex.first}}</span>
      <span>Last index: {{foundIndex.last}}</span>
      </div>
      <v-btn @click="onClickFind(items,numToFind)" class="mt-4">find</v-btn>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data:()=>({
    genCount: 1000,
    items:[],
    genTime: 0,
    sortTime: 0,
    findTime: 0,
    numToFind: 1,
    searchType:'buildIn',
    searchTypes:[{text:'JS Build In Methods( indexOf() && lastIndexOf() )', value:'buildIn'},{text:'Binary Search', value:'binarySearch'}],
    foundIndex:{
      first: -1,
      last: -1
    }
  }),
  watch:{
    numToFind(upd, old){
      this.numToFind = parseInt(upd, 10)
    }
  },
  methods:{
     onClickGen(){
      this.genTime = 0
      const begin = Date.now()
      this.items =  this.generate(this.genCount)
      this.genTime = Date.now() - begin

    },

    onClickSort(arr){
      this.sortTime = 0
      const begin = Date.now()
      this.sort(arr)
      this.sortTime = Date.now() - begin
    },

    onClickFind(arr, num){
      this.foundIndex = { first: -1, last: -1 },
      this.findTime = 0
      const begin = Date.now()
      this.foundIndex = this.find(arr, num, this.searchType)
      this.findTime = Date.now() - begin
    },

    generate(count){
      const parsed = parseInt(count, 10)
      const result = []
      for(let i = 0; i < count; i++){
        result.push(this.getRandom())
      }
      return result
    },

    getRandom(){
      return  Math.round(Math.random()*9 + 1)
    },

    sort(arr){
      arr.sort((a,b)=>a-b)
    },
    find(arr, num, type){
      const result = { first: null, last: null }

      if(type === 'buildIn'){
        result.first = tempArray.indexOf(num)
        result.last = tempArray.lastIndexOf(num)
      }

      if(type === "binarySearch"){

        
        while(pointer){
          let pointer = tempArray[Math.ceil(tempArray.length / 2)] 
          if(tempArray[pointer] > num){
            tempArray = arr.slice(0, center)
          }else if(tempArray[center] < num){
            tempArray = arr.slice(center+1)
          }

        }


      }

      return result

    }
  }
 
}
</script>
