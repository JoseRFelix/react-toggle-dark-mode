import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { DarkModeSwitch } from '../src';

describe('it renders', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <DarkModeSwitch onChange={() => {}} checked={false} />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
