import { shallow } from 'enzyme';
import * as React from 'react';

import ReactListify from '../src';
import { withPageSize } from '../src/hocs';

describe('withPageSize', () => {
  test('Correctly passess props', () => {
    const Enhanced = withPageSize(ReactListify, 2);
    const wrapper = shallow(<Enhanced members={[]} />);
    expect(wrapper.props().paginationProps).toEqual({ pageSize: 2 });
  });
});
