import { mount } from 'enzyme';
import * as React from 'react';

import ReactBigList from '../src';
import { withBigListConfig } from '../src/hocs';
import assertWithTimeout from './utils/assertWithTimeout';

const TestComponent = _ => {
  return <div>DummyComponent</div>;
};

describe('withBigList', () => {
  test('Passes props', done => {
    const Enhanced = withBigListConfig({
      pageSize: 10,
    })(TestComponent);

    const members = [1, 2, 3];

    const wrapper = mount(<Enhanced members={members} />);

    (wrapper.find(ReactBigList).instance() as any).setQueryString('2');

    assertWithTimeout(() => {
      wrapper.update();
      const passedProps = wrapper.find(TestComponent).props();
      expect(passedProps.displayedMembers).toEqual([2]);
      expect(passedProps.numPages).toBe(1);
      expect(passedProps.filteredCount).toBe(1);
    }, done);
  });
});
