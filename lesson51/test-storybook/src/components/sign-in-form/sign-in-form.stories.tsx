import type { Meta, StoryObj } from "@storybook/react-vite";

import { SignInForm } from "./sign-in-form";

const meta = {
  title: "Pages/SignInForm",
  component: SignInForm,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {};
