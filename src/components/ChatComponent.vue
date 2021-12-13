<template>
    <div align="center">
        <v-card width="70%" color="#F8F8F8">
            <v-card-title class="justify-center"><h2>Chat</h2></v-card-title>
            <v-divider />

            <div class="message-container">
                <div v-for="msg in messages" :key="msg.id">
                    <div :style="calculateStyle(msg.name)" class="message">
                        <span class="speech" :style="'background-color:' + teamColor +'!important'" >{{msg.text}}</span>
                    </div> 
                </div>
            </div>

            <br/>

            <div>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="11" align="left">
                                <v-text-field v-model="message" style="text-align: center;" placeholder="Message" outlined clearable left></v-text-field>
                            </v-col>
                            <v-col cols="1" align="left">
                                <v-btn @click="send" style="margin-top: 5px;" dark large :color="teamColor">Send!</v-btn>
                            </v-col>
                        </v-row>
                   </v-container>
                </v-form>
            </div>
        </v-card> 
    </div>
</template>

<script>
export default {
  name: "chat-component",
  data() {
    return {
        loading: false,
        messages: [
            {text: 'Lorem ipsum dolor sit amet', name: 'admin', id:"1"}, 
            {text: 'Consectetur adipiscing elit', name: 'me', id:"2"}, 
            {text: 'Sed do eiusmod tempor incididunt ut', name: 'admin', id:"3"}, 
            {text: 'Ut enim ad minim veniam :)', name: 'me', id:"4"}, 
            {text: 'Nemo enim ipsam voluptatem!', name: 'admin', id:"5"}, 
            {text: 'At vero eos et accusamus et iusto odio dignissimos', name: 'me', id:"6"}, 
            {text: 'Ex ea commodi consequatur?', name: 'admin', id:"7"}, 
            {text: 'Itaque earum rerum hic tenetur a sapiente delectus', name: 'admin', id:"8"}
        ],
        message: '',
        teamColor: this.$store.state.color,
    };
  },
  methods: {
      calculateStyle(name) {
          if(name === 'admin') {
              return 'text-align: left;';
          } else {
              return 'text-align: right;';
          }
      },
      send() {
          this.messages.push({text: this.message, name: 'me', id: this.messages.length+1});
          this.message = '';
      }
  }
};
</script>

<style scoped>
.message {
    margin-left: 20px;
    margin-right: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14pt;
}
.msg-wrapper {
    border-color: aqua;
    border-radius: 20px;
}
input {
  border:none;
  outline:none;
  width:100%;
}

.message-container {
    overflow-y: auto; 
    height:400px;
}
.speech {
  color: #fff;
  background: #a53884;
  border-radius: 10px;
  padding: 8px;
}
</style>
