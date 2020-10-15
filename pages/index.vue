<template>
  <v-row>
      <v-col>
          <h1 >Title</h1>
        <p ref="article"  @click="show" >{{text}}</p>
      </v-col>
      <v-snackbar
      top
      v-model="alertShow"
      color="primary"
    > 
    <v-icon>
        mdi-link-variant
    </v-icon>
     Text copied! Link available in the clipboard.
    </v-snackbar>
      <v-menu
        v-model="showMenu"
        :position-x="x+10"
        :position-y="y-50"
        absolute
        offset-y
    >
      <v-btn shaped color="teal" class="rounded-tr-xl rounded-br-xl rounded-tl-xl" @click="copylink">
        <v-icon>
            mdi-link-variant
        </v-icon>
      </v-btn>
          
    </v-menu>
    
  </v-row>
</template>

<script>
import text from '@/mock/text'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
export default {
    data:()=>({
        text: text,
        showMenu: false,
        selection: "",
        x: 0,
        y: 0,
        alertShow: false
    }),
    methods:{
        show (e) {
            if(this.selection){
                e.preventDefault()
                this.showMenu = false
                this.x = e.clientX
                this.y = e.clientY
                this.$nextTick(() => {
                    this.showMenu = true
                })
            }
      },
      async copylink(){
        const uuid = uuidv4();
        const payload = {
            key: uuid,
            text:this.selection
        }
        axios.post('/', payload)
        
        var clipboard = await navigator.clipboard.writeText(`/?id=${uuid}`)
        this.alertShow = true
      },
      async navScroll(uuid){
        const result = await axios.get(`/link/${uuid}`)
        const text = result.data
        this.findAndReplace(text, uuid)
        document.getElementById(uuid).scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"}); 
      },
      findAndReplace(searchText, uuid) {
        if (!searchText || !uuid) {
            throw new Error('Error')
        }
        const foundIndex = this.$refs.article.textContent.indexOf(searchText)
        const length = searchText.length
        const span = document.createElement('span')
        span.classList.add('teal')
        span.id=uuid
        span.textContent = searchText
        const before = document.createTextNode(this.$refs.article.textContent.slice(0, foundIndex))
        const after = document.createTextNode(this.$refs.article.textContent.slice(foundIndex + length))
        
        this.$refs.article.appendChild(before)
        this.$refs.article.appendChild(span)
        this.$refs.article.appendChild(after)

        }
    },
    mounted(){
        document.addEventListener('selectionchange',(e)=>{
             this.selection = document.getSelection().toString()
        })
        if(this.$route.query.id){
            this.navScroll(this.$route.query.id)
        }
        

    }
}
</script>

<style>

</style>