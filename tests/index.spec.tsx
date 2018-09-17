import { shallow } from 'enzyme';
import * as React from 'react';

import ReactBigList from '../src';
import { STRINGS } from './data';
import { assertWithTimeout, sandbox } from './utils';

function removePassedFunctions(passedData) {
  return Object.keys(passedData).reduce((acc, key) => {
    if (!(typeof passedData[key] === 'function')) {
      acc[key] = passedData[key];
    }
    return acc;
  }, {});
}

describe('ReactBigList', () => {
  let childrenSpy;

  beforeEach(() => {
    childrenSpy = sandbox.spy();
  });

  test('Renders default text with no children function provided', () => {
    const wrapper = shallow(<ReactBigList members={[]} />);
    expect(wrapper.html()).toEqual(
      '<div>Please provide children function to render your data!</div>',
    );
  });

  test('Renders custom children function', () => {
    const children = () => 'Render that!';
    const wrapper = shallow(<ReactBigList members={[]}>{children}</ReactBigList>);
    expect(wrapper.text()).toEqual('Render that!');
  });

  test('Correctly caches', done => {
    const wrapper: any = shallow(<ReactBigList members={STRINGS}>{childrenSpy}</ReactBigList>);
    wrapper.instance().setQueryString('ee');
    wrapper.instance().setSort();
    assertWithTimeout(() => {
      expect(wrapper.instance().queryStringCache).toEqual({ 'ee-asc-': ['deee'] });
      expect(wrapper.instance().sortingCache).toEqual({
        'asc-': ['azz', 'b', 'deee', 'e', 'g', 'z'],
      });
    }, done);
  });

  test('Calls children function two times on mount', done => {
    shallow(<ReactBigList members={[]}>{childrenSpy}</ReactBigList>);
    expect(childrenSpy.calledOnce).toBeTruthy();
    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(2);
    }, done);
  });

  test('Passes correct initial props', done => {
    shallow(<ReactBigList members={STRINGS}>{childrenSpy}</ReactBigList>);
    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(2);
      const data = removePassedFunctions(childrenSpy.getCall(1).args[0]);

      expect(data).toEqual({
        activeFilters: [],
        activePage: 1,
        displayedCount: STRINGS.length,
        filteredMembers: STRINGS,
        displayingFrom: 1,
        displayedMembers: STRINGS,
        initialCount: STRINGS.length,
        numPages: 1,
        displayingTo: STRINGS.length,
        queryString: '',
        filteredCount: 6,
        sortColumn: undefined,
      });
    }, done);
  });

  test('Correctly handles queryString change', done => {
    const wrapper: any = shallow(<ReactBigList members={STRINGS}>{childrenSpy}</ReactBigList>);
    wrapper.instance().setQueryString('ee');

    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(3);
      const data: any = removePassedFunctions(childrenSpy.getCall(2).args[0]);
      expect(data.displayedMembers).toEqual(['deee']);
      expect(data.queryString).toBe('ee');
      expect(data.displayedCount).toBe(1);
    }, done);
  });

  test('Correctly handles page change', done => {
    const wrapper: any = shallow(
      <ReactBigList members={STRINGS} paginationProps={{ pageSize: 2 }}>
        {childrenSpy}
      </ReactBigList>,
    );

    wrapper.instance().setPageNumber(2);
    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(3);
      const data: any = removePassedFunctions(childrenSpy.getCall(2).args[0]);
      expect(data).toEqual({
        sortColumn: undefined,
        sortDirection: undefined,
        filteredMembers: STRINGS,
        activeFilters: [],
        initialCount: 6,
        numPages: 3,
        displayingFrom: 3,
        displayingTo: 4,
        activePage: 2,
        filteredCount: 6,
        queryString: '',
        displayedMembers: ['b', 'deee'],
        displayedCount: 2,
      });
    }, done);
  });

  test('Correctly handles setSort', done => {
    const wrapper: any = shallow(<ReactBigList members={STRINGS}>{childrenSpy}</ReactBigList>);
    wrapper.instance().setSort();
    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(3);
      const data: any = removePassedFunctions(childrenSpy.getCall(2).args[0]);
      expect(data).toEqual({
        activeFilters: [],
        filteredMembers: ['azz', 'b', 'deee', 'e', 'g', 'z'],
        activePage: 1,
        displayedCount: 6,
        displayingFrom: 1,
        displayingTo: 6,
        filteredCount: 6,
        initialCount: 6,
        displayedMembers: ['azz', 'b', 'deee', 'e', 'g', 'z'],
        numPages: 1,
        queryString: '',
        sortColumn: undefined,
        sortDirection: 'asc',
      });
    }, done);
  });

  test('Correctly handles actions combined', done => {
    const wrapper: any = shallow(
      <ReactBigList members={STRINGS} paginationProps={{ pageSize: 3 }}>
        {childrenSpy}
      </ReactBigList>,
    );
    wrapper.instance().setPageNumber(2);
    wrapper.instance().setSort();

    assertWithTimeout(() => {
      expect(childrenSpy.callCount).toBe(4);
      const data: any = removePassedFunctions(childrenSpy.getCall(3).args[0]);
      expect(data).toEqual({
        sortColumn: undefined,
        sortDirection: 'asc',
        activeFilters: [],
        initialCount: 6,
        numPages: 2,
        displayingFrom: 4,
        filteredMembers: ['azz', 'b', 'deee', 'e', 'g', 'z'],
        displayingTo: 6,
        activePage: 2,
        filteredCount: 6,
        queryString: '',
        displayedMembers: ['e', 'g', 'z'],
        displayedCount: 3,
      });
    }, done);
  });
});
