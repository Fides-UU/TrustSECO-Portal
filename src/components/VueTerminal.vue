<template>
  <div class="vue-terminal-wrapper">
    <div class="lds-css" v-if="this.waiting">
      <div style="width:100%;height:100%" class="lds-rolling">
        <div>
        </div>
      </div>
    </div>
    <div v-bind:style="{ maxHeight: this.height }"
         id="terminal"
         class="boring"
         data-theme="boring">
      <div class="content">
        <div class="cmd_out" v-for="(item, index) in messages" :key="index">
          {{ consoleSign + ' ' + item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTerminal',
  data() {
    return {
      waiting: false,
    };
  },
  props: {
    height: {
      type: String,
      default: '100%',
    },
    consoleSign: {
      type: String,
      default: '$',
    },
    messages: {
      type: Array,
    },
  },
};
</script>

<style lang="css">
/* hight settings */
#terminal.default-height {
  max-height: 250px;
}

#terminal.fullscreen-height {
  height: 100vh;
}

/* basic bw theme */
.boring, .boring .prompt, .boring .content {
  font-family: "Courier New", Courier, monospace;
  background-color: #111;
  color: #ddd;
}

.boring .content {
  padding: 15px 15px 0 15px;
}

.boring .prompt {
  padding: 0 15px 15px 15px;
}

.boring .loading span::after {
  content: "⚙";
  color: #ddd;
  font-size: 10em;
  border-radius: 10em;
  opacity: 0.4;
}

.boring .content ul {
  margin: 0;
}

.boring .prompt .input.show-caret {
  color: #ddd;
  opacity: .85;
}

.boring .prompt .input, .boring .prompt .input::before, .boring .prompt .input::after {
  color: transparent;
  text-shadow: 0 0 0 #ddd;
}

.boring .content div .cmd_in .cmd_ps, .boring .prompt .input::before {
  padding-right: 10px;
}

.boring .content ul li {
  list-style-type: none;
}

.boring div.prompt div.input::after {
  font-size: 2em;
}

.boring div.prompt div.input, .boring div.content div div.cmd_in, .boring div.prompt div.input::before {
  line-height: 2em;
}

/* other styles */
#terminal {
  position: relative;
  display: block;
  overflow-X: hidden;
  height: 100%;
  text-align: left;
}

#terminal div.content div p {
  margin: 0;
}

#terminal div.content div {
  clear: both;
  word-wrap: break-word;
}

#terminal div.content div ul {
  padding: 0;
  white-space: normal
}

#terminal div.content div ul li {
  list-style: none;
}

#terminal div.content div ul.sq-li li {
  display: inline-block;
  text-align: center;
  padding: 10px;
  min-width: 5%;
}

</style>

<!-- This program has been developed by students from the bachelor Computer Science at Utrecht University within the Software Project course.
© Copyright Utrecht University (Department of Information and Computing Sciences) -->
