import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

import { BaseTemplate } from './BaseTemplate';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: 'Example/BaseTemplate',
  component: BaseTemplate,
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/7.0/react/configure/story-layout
    layout: 'fullscreen',
  },
} satisfies Meta<typeof BaseTemplate>;

export default meta;
type Story = StoryObj<typeof BaseTemplate>;

export const BaseWithReactComponent = {
  args: {
    children: <div>Children node</div>,
  },
} satisfies Story;

export const BaseWithString = {
  args: {
    children: 'String',
  },
} satisfies Story;

// More on interaction testing: https://storybook.js.org/docs/7.0/react/writing-tests/interaction-testing
export const BaseWithHomeLink: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = await canvas.getByRole('link', {
      name: /Home/i,
    });

    await userEvent.click(loginButton);
  },
} satisfies Story;