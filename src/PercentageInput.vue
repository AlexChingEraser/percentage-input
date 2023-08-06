<template>
  <div class="pi"
       :class="{
        'shake': needErrorShake && error,
        'error': error
       }"
  >
    <input type="text"
           v-model="lValue"
           :style="{
            'color': textColor,
           }"
           @input="onInputEvtFire"
           @blur="onBlurEvtFire"
           @focus="onFocusEvtFire"
    >
  </div>
</template>
<script>
const percentageRegex = /^[+-]?(\d*\.)?\d+$/

export default {
  name: 'PercentageInput',
  props: {
    value: String,
    min: [String, Number],
    max: [String, Number],
    originTextColor: {
      type: String,
      default: '#000000'
    },
    editTextColor: {
      type: String,
      default: '#16b5b5'
    },
    needErrorShake: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lValue: this.value,
      textColor: this.originTextColor,
      error: false
    }
  },
  watch: {
    value: {
      handler(newValue) {
        // insure `newValue` has `%`
        if (this.hasPercentageLabel(newValue)) {
          this.lValue = Number(newValue)
        } else {
          this.lValue = `${Number(newValue)}%`
        }
      },
      immediate: true
    },
  },
  methods: {
    onInputEvtFire(e) {
      let testValue = e.target.value
      if (percentageRegex.test(testValue)) {
        this.lValue = testValue
      } else {
        this.lValue = ''
        e.target.value = ''
      }
    },
    onBlurEvtFire(e) {
      let testValue = e.target.value
      if (percentageRegex.test(testValue)) {
        if (testValue > Number(this.max) || testValue < Number(this.min)) {
          this.error = true
          this.lValue = ''
          e.target.value = ''
        } else {
          this.lValue = `${testValue}%`
        }
      } else {
        this.error = true
        this.lValue = ''
        e.target.value = ''
      }
    },
    reset() {
      this.error = false
      this.textColor = this.originTextColor
    },
    onFocusEvtFire() {
      this.error = false
      this.textColor = this.editTextColor
      this.lValue = this.lValue.substring(0, this.lValue.length - 1)
    },
    hasPercentageLabel(str) {
      return (typeof str === 'string') && (str[str.length - 1 !== '%'])
    }
  }
}
</script>
<style>
.pi {
  display: inline-block;
}
.pi.shake > input {
  animation-duration: .3s;
  animation-name: shake;
}
.pi.error > input {
  outline: none;
  border: 1px solid salmon;
}
@keyframes shake {
  from,
  to {
    transform: translateX(0);
  }

  20%,
  80% {
    transform: translateX(-10%);
  }

  40%,
  60% {
    transform: translateX(10%);
  }
}
</style>