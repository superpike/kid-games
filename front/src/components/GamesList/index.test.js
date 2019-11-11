import React from 'react';
import ReactDOM from 'react-dom';
import { gamesList as GameList } from './index';
// query utilities:
import {
    getByLabelText,
    getByText,
    getByTestId,
    getByDisplayValue,
    // Tip: all queries are also exposed on an object
    // called "queries" which you could import here as well
    wait,
} from '@testing-library/dom'
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

const store = {

}

describe("Testing gamesList", () => {
    describe("Is label", () => {
        test('should be label for list', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <GameList
                    games={[
                        {
                            name: 'qwert',
                            id: 1
                        },
                        {
                            name: 'qwert2',
                            id: 2
                        }
                    ]}
                    activeGame={{ name: 'qwert2', id: 1 }}
                    dispatch={() => { }}
                    isFavorite={false}
                />, div);
            const label = div.querySelector('label');
            expect(label.innerHTML).toBe('games for you');
        })
    })
    describe("List of the games", () => {
        test('should be chosen an active game', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <GameList
                    games={[
                        {
                            name: 'qwert',
                            id: 1
                        },
                        {
                            name: 'qwert2',
                            id: 2
                        }
                    ]}
                    activeGame={{ name: 'qwert2', id: 2 }}
                    dispatch={() => { }}
                    isFavorite={false}
                />, div);
            const input = div.querySelector('input');
            expect(input.value).toBe('qwert2');
        })
        test('after click should appears a list', async () => {
            const { container, getByText } = render(<GameList
                games={[
                    {
                        name: 'qwert',
                        id: 1
                    },
                    {
                        name: 'qwert2',
                        id: 2
                    }
                ]}
                activeGame={{ name: 'qwert2', id: 2 }}
                dispatch={() => { }}
                isFavorite={false}
            />)
            const button = container.querySelector('.fa-chevron-down').parentElement;
            button.click();
            await wait(() => {
                expect(getByText('qwert')).toBeInTheDocument();
                expect(getByText('qwert2')).toBeInTheDocument();
            }
            );
        })
    })
    describe("Favorites", () => {
        test('should render favorite icon', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <GameList
                    games={[]}
                    activeGame={{ name: 'qwert', id: 1 }}
                    dispatch={() => { }}
                    isFavorite={true}
                />, div);
            const fav = div.querySelector('.fa-star');
            expect(fav.classList.contains('fas')).toBe(true);
        })
        test('should render non-favorite icon', () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <GameList
                    games={[]}
                    activeGame={{ name: 'qwert', id: 1 }}
                    dispatch={() => { }}
                    isFavorite={false}
                />, div);
            const fav = div.querySelector('.fa-star');
            expect(fav.classList.contains('far')).toBe(true);
        })
    })
})