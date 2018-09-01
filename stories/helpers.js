import React from 'react';
import {
  Divider,
  Icon,
  Label,
  List,
  Segment,
  Menu,
  Button,
  Dropdown,
  Input,
} from 'semantic-ui-react';

function renderMembersSimple(members, field = null) {
  return members.map(member => {
    let value = field ? member[field] : member;
    if (typeof value === 'number') {
      value = value.toString();
    }

    return (
      <List.Item key={value}>
        <List.Icon name={value.toLowerCase()} />
        <List.Content>{value}</List.Content>
      </List.Item>
    );
  });
}

function renderHeaderSimple(count, initialCount) {
  return (
    <React.Fragment>
      <Label>
        <Icon name="users" />
        {count}
        <Label.Detail>Items in list</Label.Detail>
      </Label>
      {initialCount !== count && (
        <Label>
          <Icon name="users" />
          {initialCount}
          <Label.Detail>Initial item count</Label.Detail>
        </Label>
      )}
      <Divider />
    </React.Fragment>
  );
}

export function renderSimple({ members, displayedCount, initialCount, field = null }) {
  return (
    <Segment>
      {renderHeaderSimple(displayedCount, initialCount)}
      <List>{renderMembersSimple(members, field)}</List>
    </Segment>
  );
}

export function renderCombinedHeader({
  displayingFrom,
  displayingTo,
  filteredCount,
  sortDirection,
  setSort,
  filterOptions,
  activeFilters,
  toggleFilter,
  queryString,
  setQueryString,
  renderAscendingButton = false,
}) {
  return (
    <Menu>
      <Menu.Item>
        <Label>
          <Icon name="users" />
          Showing {displayingFrom} - {displayingTo} of <b>{filteredCount}</b> items
        </Label>
      </Menu.Item>
      {renderAscendingButton && (
        <Menu.Item>
          <Button
            icon={sortDirection === 'asc' ? 'sort ascending' : 'sort descending'}
            content={sortDirection}
            onClick={() => setSort()}
          />
        </Menu.Item>
      )}

      <Menu.Item>
        <Dropdown text="Filter Posts" multiple icon="filter">
          <Dropdown.Menu>
            <Dropdown.Header icon="tags" content="Tag Label" />
            <Dropdown.Menu scrolling>
              {filterOptions.map(option => {
                const isActive = activeFilters.includes(option.value);
                return (
                  <Dropdown.Item
                    {...option}
                    key={option.value}
                    icon={isActive ? 'checkmark' : 'remove'}
                    onClick={() => toggleFilter(option.value)}
                    active={isActive}
                  />
                );
              })}
            </Dropdown.Menu>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>

      <Menu.Menu position="right">
        <Menu.Item>
          <Input
            icon="search"
            placeholder="Search..."
            value={queryString}
            onChange={(_, { value }) => setQueryString(value)}
          />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
