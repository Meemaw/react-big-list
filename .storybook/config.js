import { withKnobs } from '@storybook/addon-knobs/react';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';

addDecorator(withKnobs);
addDecorator(story => <div style={{ margin: 20 }}>{story()}</div>);

setOptions({
  name: 'React Listify',
  url: '#',
});

configure(() => require('../stories/index'), module);
