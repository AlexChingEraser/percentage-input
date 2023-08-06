import { shallowMount } from '@vue/test-utils'
import PercentageInput from '@/PercentageInput.vue'

describe('PercentageInput.vue', () => {
  it('init state is not error', () => {
    const wrapper = shallowMount(PercentageInput, {})
    expect(wrapper.find('.pi').classes()).not.toContain('error')
  })
})
