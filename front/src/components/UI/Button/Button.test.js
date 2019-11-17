import React from 'react';
import Button from './index';
// query utilities:
// import {
//     getByLabelText,
//     getByText,
//     getByTestId,
//     getByDisplayValue,
//     // Tip: all queries are also exposed on an object
//     // called "queries" which you could import here as well
//     wait,
// } from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

describe("Testing button", () => {
    // describe("classes", () => {
        test('should be only Main', () => {
            const { container } = render(
                <Button btnType='Main' clicked={() => {}}>Button</Button>
            );
            expect(container).toMatchSnapshot();
        })
        test('should be only Middle', () => {
            const { container } = render(
                <Button btnType='Middle' clicked={() => {}}>Button</Button>
            );
            expect(container).toMatchSnapshot();
        })
        test('should be all classes', () => {
            const { container } = render(
                <Button btnType='Main Middle' clicked={() => {}}>Button</Button>
            );
            expect(container).toMatchSnapshot();
        })
    // })
})