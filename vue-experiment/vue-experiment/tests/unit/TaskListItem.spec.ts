import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import TaskListItem from '@/components/TaskListItem.vue';

describe('TaskListItem.vue', () => {
  it('should work', () => {
    const wrapper = shallowMount(TaskListItem, {
      propsData: {
        task: {
          id: 'task-one',
          text: 'the task one'
        }
      }
    });
    expect(wrapper.text()).to.contain('id=task-one');
    expect(wrapper.text()).to.contain('text=the task one');
  });
});
