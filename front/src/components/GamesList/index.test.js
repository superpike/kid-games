import React from 'react';
import ReactDOM from 'react-dom';
import { gamesList as GameList } from './index';
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

describe("Testing gamesList", () => {
    const games = [
        {
            name: 'qwert',
            id: 1
        },
        {
            name: 'qwert2',
            id: 2
        }
    ]
    describe("Is label", () => {
        test('should be label for list', () => {
            const { container } = render(
                <GameList
                    games={games}
                    activeGame={{ ...games[0] }}
                    dispatch={() => { }}
                    isFavorite={false}
                />
            );
            expect(container).toMatchSnapshot();
        })
    })
    describe("List of the games", () => {
        test('should be chosen an active game', () => {
            const { container } = render(
                <GameList
                    games={games}
                    activeGame={{ ...games[1] }}
                    dispatch={() => { }}
                    isFavorite={false}
                />
            );
            expect(container).toMatchSnapshot();
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
            expect(getByText('qwert')).toBeInTheDocument();
            expect(getByText('qwert2')).toBeInTheDocument();
        })
    })
    describe("Favorites", () => {
        test('should render favorite icon', () => {
            const { container } = render(
                <GameList
                    games={games}
                    activeGame={{ ...games[0] }}
                    dispatch={() => { }}
                    isFavorite={true}
                />
            );
            expect(container).toMatchSnapshot();
        })
        test('should render non-favorite icon', () => {
            const { container } = render(
                <GameList
                    games={games}
                    activeGame={{ ...games[0] }}
                    dispatch={() => { }}
                    isFavorite={false}
                />
            );
            expect(container).toMatchSnapshot();
        })
    })
})