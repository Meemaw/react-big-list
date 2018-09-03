import assertWithTimeout from './utils/assertWithTimeout';
import { mount } from 'enzyme';
import * as React from 'react';
import { asBigList } from '../src/hocs';

const TestComponent = _ => {
  return <div>DummyComponent</div>;
};

describe('asBigList', () => {
  test('Passes props', done => {
    const Enhanced = asBigList(TestComponent);
    const members = [1, 2, 3];
    const wrapper = mount(<Enhanced members={members} />);

    assertWithTimeout(() => {
      wrapper.update();
      const passedProps = wrapper.find(TestComponent).props();
      expect(passedProps.displayedMembers).toEqual(members);
      expect(passedProps.numPages).toBe(1);
      expect(passedProps.filteredCount).toBe(members.length);
    }, done);
  });
});
