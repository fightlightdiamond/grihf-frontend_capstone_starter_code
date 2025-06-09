import type { Meta, StoryObj } from '@storybook/react-vite';
import Stack from './Stack';
import type {ComponentProps} from "react";

type StoryProps = ComponentProps<typeof Stack> & {
    numberOfChildren: number
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<StoryProps> = {
    title: 'Stack',
    component: Stack,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs', 'ui', 'interactive'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        numberOfChildren: {
            options: [
                1, 5, 10, 20
            ],
            control: 'select'
        },
        orientation: {
            options: [
                'vertical',
                'horizontal'
            ],
            control: 'select'
        },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // this is props in button component
    args: { numberOfChildren: 5, orientation:  'horizontal'},
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

function createChildren(numberOfChildren: number) {
    return Array(numberOfChildren)
        .fill(null)
        .map((_, index) => {
            return <div key={index}
                className={'w-6 h-6 bg-red-500'}
            ></div>
        })
}

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const vertical: Story = {
    args: {
        orientation:  'vertical',
        numberOfChildren:  7
    },
    render: ({numberOfChildren, ...args}) => {
        return <Stack {...args}>{createChildren(numberOfChildren)}</Stack>
    }
};

export const horizontal: Story = {
    args: {
        orientation: 'horizontal',
        numberOfChildren:  9
    },
    render: ({numberOfChildren, ...args}) => {
        return <Stack {...args}>{createChildren(numberOfChildren)}</Stack>
    }
};